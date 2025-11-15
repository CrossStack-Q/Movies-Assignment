"use client";

import { useState, useMemo } from "react";
import ScheduleFilters from "@/components/ScheduleFilters";
import TypeTabs from "@/components/TypeTabs";
import scheduleData from "@/data/schedule.json";
import ReleaseDayRow from "@/components/ReleaseSection";

export default function SchedulePage() {
  const [tab, setTab] = useState("released");

  const [type, setType] = useState<"all" | "movie" | "series">("all");
  const [mode, setMode] = useState<"ott" | "theatre" | "all">("all");

  const raw = scheduleData[tab] || [];

  const filtered = useMemo(() => {
    let list = [...raw];

    // match main type (Movies/Series)
    if (type !== "all") {
      list = list.filter((i) => i.type === type);
    }

    // Sub filter (only for movies)
    if (type === "movie") {
      if (mode === "ott") {
        list = list.filter((i) => /ott/i.test(i.label));
      }
      if (mode === "theatre") {
        list = list.filter((i) => /theatre/i.test(i.label));
      }
    }

    return list.sort(
      (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
    );
  }, [raw, type, mode]);

  const grouped = filtered.reduce((acc, item) => {
    const dateKey = item.releaseDate.slice(0, 10);
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(item);
    return acc;
  }, {} as Record<string, any[]>);

  const dates = Object.keys(grouped).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <main className="h-[calc(100vh-64px)] grid grid-cols-[320px_1fr] bg-[#000] px-12 max-w-7xl mx-auto py-10">
      {/* LEFT */}
      <div className="border-r border-white/10 h-full sticky top-[64px] overflow-hidden ">
        <div className="p-6">
          <ScheduleFilters selected={tab} onChange={setTab} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="overflow-y-auto h-full scrollbar-hide p-8">

        {/* FIXED TABS */}
        <div className="mb-6">
          <TypeTabs
            onCategoryChange={(cat) => {
              if (!cat) {
                setType("all");
                setMode("all");
              } else if (cat === "Movies") {
                setType("movie");
                setMode("theatre"); // default
              } else if (cat === "Series") {
                setType("series");
                setMode("all"); // no series mode
              }
            }}
            onSubFilterChange={(sub) => {
              if (sub === "In Theatres") setMode("theatre");
              else if (sub === "On OTT") setMode("ott");
              else setMode("all");
            }}
          />
        </div>

        {dates.map((date) => (
          <ReleaseDayRow key={date} date={date} items={grouped[date]} />
        ))}

        <div className="h-10" />
      </div>
    </main>
  );
}
