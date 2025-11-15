"use client";

export default function ScheduleFilters({ selected, onChange }) {
  const items = [
    { id: "released", label: "Released" },
    { id: "today", label: "Today" },
    { id: "upcoming", label: "Upcoming" },
    { id: "announced", label: "Announced" }
  ];

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className={`w-full text-left px-6 py-3 rounded-lg transition
            ${
              selected === item.id
                ? "bg-purple-600 text-white font-semibold"
                : "bg-zinc-400/10 hover:bg-white/20"
            }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
