"use client";
import { useMemo } from "react";

type VibeProps = { data: Record<string, number> };

export default function VibeChart({ data }: VibeProps) {
  const entries = useMemo(() => Object.entries(data), [data]);
  const total = entries.reduce((s, [, v]) => s + v, 0);

  let acc = 0;
  const arcs = entries.map(([k, v]) => {
    const start = acc / total;
    acc += v;
    const end = acc / total;
    return { key: k, value: v, start, end };
  });

  const colors = ["#FFD166", "#8B5CF6", "#FF6B6B", "#00D1B2", "#FFB86B", "#7C3AED"];

  const radius = 80;
  const stroke = 24;
  const cx = 100;
  const cy = 100;

  function arcPath(start: number, end: number) {
    const a0 = 2 * Math.PI * start - Math.PI / 2;
    const a1 = 2 * Math.PI * end - Math.PI / 2;
    const x0 = cx + radius * Math.cos(a0);
    const y0 = cy + radius * Math.sin(a0);
    const x1 = cx + radius * Math.cos(a1);
    const y1 = cy + radius * Math.sin(a1);
    const large = end - start > 0.5 ? 1 : 0;
    return `M ${x0} ${y0} A ${radius} ${radius} 0 ${large} 1 ${x1} ${y1}`;
  }

  const top = entries.reduce((a, b) => (b[1] > a[1] ? b : a), entries[0]);

  return (
    <div className="bg-white/5 p-6 rounded-2xl">
      <h3 className="text-xl font-semibold mb-4">Vibe Chart</h3>

      <div className="flex gap-5 items-center">
        <svg width="200" height="200" viewBox="0 0 200 200">
          {arcs.map((arc, i) => (
            <g key={arc.key}>
              <path d={arcPath(arc.start, arc.end)} fill="none" stroke={colors[i % colors.length]} strokeWidth={stroke} strokeLinecap="round" />
            </g>
          ))}
          <circle cx={cx} cy={cy} r={radius - stroke - 6} fill="#0B0B0C" />
          <text x="100" y="106" textAnchor="middle" fontSize="18" fill="#fff" fontWeight={700}>
            {top[0]}
          </text>
          <text x="100" y="128" textAnchor="middle" fontSize="14" fill="#9CA3AF">
            {Math.round((top[1] / total) * 100)}%
          </text>
        </svg>

        <div className="flex-1">
          <ul className="space-y-2">
            {entries.map(([k, v], i) => (
              <li key={k} className="flex items-center gap-3">
                <span style={{ background: colors[i % colors.length] }} className="w-3 h-3 rounded-full inline-block" />
                <span className="flex-1 text-sm">{k}</span>
                <span className="text-sm text-gray-300">{Math.round((v / total) * 100)}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
