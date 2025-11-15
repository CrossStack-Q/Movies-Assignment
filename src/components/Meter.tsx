"use client";

import React, { useState } from "react";

type MeterProps = {
  data?: {
    score?: number;
    votes?: number;
    categories?: Record<string, number>;
  };
};

export default function Meter({ data }: MeterProps) {
  const categories = data?.categories || {
    "Go for it": 40,
    Timepass: 35,
    Skip: 15,
    Perfection: 10,
  };

  const labels = Object.keys(categories);
  const values = Object.values(categories);

  const total = values.reduce((a, b) => a + b, 0) || 1;

  const defaultLabel = labels[0];
  const defaultValue = Math.round((values[0] / total) * 100);

  const [hoverLabel, setHoverLabel] = useState<string | null>(null);

  const centerValue = hoverLabel
    ? Math.round(((categories[hoverLabel] || 0) / total) * 100)
    : defaultValue;

  // Arc settings
  const radius = 160;
  const stroke = 26;
  const circumference = Math.PI * radius;

  let offsetAcc = 0;
  const arcs = labels.map((label) => {
    const v = categories[label] ?? 0;
    const percentage = v / total;

    const len = circumference * percentage;
    const arc = { label, len, offset: offsetAcc };
    offsetAcc += len;
    return arc;
  });

  const colorMap = [
    "#4ade80",
    "#fbbf24",
    "#f87171",
    "#a78bfa", 
    "#38bdf8", 
  ];

  return (
    <div className="w-full rounded-2xl">

      <div className="flex flex-col items-center justify-center">
        <svg width="100%" height="200" viewBox="0 0 500 260">
          <g transform="translate(250,250) rotate(180)">
            {arcs.map((arc, i) => {
              const isHovered = hoverLabel === arc.label;
              return (
                <circle
                  key={arc.label}
                  r={radius}
                  fill="none"
                  stroke={colorMap[i % colorMap.length]}
                  strokeWidth={isHovered ? stroke + 6 : stroke}
                  strokeDasharray={`${arc.len} ${circumference - arc.len}`}
                  strokeDashoffset={-arc.offset}
                  strokeLinecap="round"
                  style={{
                    transition: "all 0.25s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setHoverLabel(arc.label)}
                  onMouseLeave={() => setHoverLabel(null)}
                />
              );
            })}
          </g>
        </svg>

        <div className="text-center -mt-10">
  <p
    className="text-5xl font-bold transition-colors duration-200"
    style={{
      color: hoverLabel
        ? colorMap[labels.indexOf(hoverLabel) % colorMap.length]
        : colorMap[0],
    }}
  >
    {centerValue}%
  </p>

  <p className="text-lg">
    {data?.votes ? `${data.votes} Votes` : ""}
  </p>
</div>
        <div className="mt-12 flex flex-wrap justify-center gap-8">
          {labels.map((label, i) => {
            const pct = Math.round(((categories[label] || 0) / total) * 100);
            return (
              <div
                key={label}
                onMouseEnter={() => setHoverLabel(label)}
                onMouseLeave={() => setHoverLabel(null)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ background: colorMap[i % colorMap.length] }}
                />
                <span className="">{label}</span>
                <span className=" text-sm">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
