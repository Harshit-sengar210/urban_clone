"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ReviewTrendPoint } from "@/types/vendor";
import { cn } from "@/lib/utils";

type Period = "3m" | "6m" | "1y";

interface RatingTrendChartProps {
  data: ReviewTrendPoint[];
}

export function RatingTrendChart({ data }: RatingTrendChartProps) {
  const [period, setPeriod] = useState<Period>("6m");
  const [tooltip, setTooltip] = useState<{ x: number; y: number; point: ReviewTrendPoint } | null>(null);
  const ref = useRef<SVGSVGElement>(null);
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true });

  const periodMap: Record<Period, number> = { "3m": 3, "6m": 6, "1y": 9 };
  const filtered = data.slice(-periodMap[period]);

  const W = 500, H = 140, padX = 30, padY = 16;
  const minR = 4.3, maxR = 5.0;
  const xStep = (W - padX * 2) / Math.max(filtered.length - 1, 1);

  const toX = (i: number) => padX + i * xStep;
  const toY = (r: number) => padY + ((maxR - r) / (maxR - minR)) * (H - padY * 2);

  const points = filtered.map((p, i) => ({ ...p, cx: toX(i), cy: toY(p.rating) }));

  const pathD = points.length > 1
    ? points.reduce((acc, p, i) => {
        if (i === 0) return `M ${p.cx} ${p.cy}`;
        const prev = points[i - 1];
        const cpX = (prev.cx + p.cx) / 2;
        return `${acc} C ${cpX} ${prev.cy}, ${cpX} ${p.cy}, ${p.cx} ${p.cy}`;
      }, "")
    : "";

  const areaD = pathD ? `${pathD} L ${points[points.length - 1].cx} ${H} L ${points[0].cx} ${H} Z` : "";

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="font-bold text-slate-900">Rating Trend</h3>
          <p className="text-xs text-slate-400 mt-0.5">Demo trend based on sample reviews.</p>
        </div>
        <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
          {(["3m", "6m", "1y"] as Period[]).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                period === p ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              {p === "3m" ? "3 Mo" : p === "6m" ? "6 Mo" : "1 Yr"}
            </button>
          ))}
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <svg
          ref={ref}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          style={{ height: 160 }}
          aria-label="Rating trend chart"
          role="img"
          onMouseLeave={() => setTooltip(null)}
        >
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
            <clipPath id="chartClip">
              <motion.rect
                x={0} y={0} height={H}
                initial={{ width: 0 }}
                animate={{ width: inView ? W : 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </clipPath>
          </defs>

          {/* Grid lines */}
          {[4.5, 4.7, 4.9].map(v => (
            <line
              key={v}
              x1={padX} x2={W - padX}
              y1={toY(v)} y2={toY(v)}
              stroke="#f1f5f9"
              strokeWidth={1}
            />
          ))}

          {/* Area fill */}
          <path d={areaD} fill="url(#chartGrad)" clipPath="url(#chartClip)" />

          {/* Line */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="#6366f1"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            clipPath="url(#chartClip)"
          />

          {/* Data Points */}
          {points.map((p, i) => (
            <g key={i}
              onMouseEnter={(e) => {
                const svgRect = ref.current?.getBoundingClientRect();
                if (svgRect) {
                  const scaleX = svgRect.width / W;
                  const scaleY = svgRect.height / H;
                  setTooltip({ x: p.cx * scaleX, y: p.cy * scaleY, point: p });
                }
              }}
            >
              <circle cx={p.cx} cy={p.cy} r={8} fill="transparent" className="cursor-pointer" />
              <circle cx={p.cx} cy={p.cy} r={3.5} fill="white" stroke="#6366f1" strokeWidth={2} />
            </g>
          ))}

          {/* X-axis labels */}
          {points.map((p, i) => (
            <text key={i} x={p.cx} y={H} textAnchor="middle" className="fill-slate-400" style={{ fontSize: 10 }}>
              {p.label}
            </text>
          ))}
        </svg>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="absolute pointer-events-none bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-xl -translate-x-1/2 -translate-y-full -mt-2 whitespace-nowrap"
            style={{ left: tooltip.x, top: tooltip.y - 8 }}
          >
            ★ {tooltip.point.rating.toFixed(1)} · {tooltip.point.count} reviews
          </div>
        )}
      </div>

      {/* Accessible text fallback */}
      <p className="sr-only">
        Rating trend over time: {filtered.map(p => `${p.label}: ${p.rating}`).join(", ")}
      </p>
    </motion.div>
  );
}
