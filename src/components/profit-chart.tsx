"use client";

type Props = {
  equipmentPriceEUR: number;
  monthlyProfitEUR: number;
  months: number;
  currency: "EUR" | "RON";
  eurToRon: number;
};

export function ProfitChart({
  equipmentPriceEUR,
  monthlyProfitEUR,
  months,
  currency,
  eurToRon,
}: Props) {
  const width = 640;
  const height = 260;
  const padL = 56;
  const padR = 16;
  const padT = 20;
  const padB = 36;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;

  const rate = currency === "RON" ? eurToRon : 1;
  const equipmentPrice = equipmentPriceEUR * rate;
  const monthlyProfit = monthlyProfitEUR * rate;

  const data: { month: number; cumulative: number }[] = Array.from(
    { length: months + 1 },
    (_, i) => ({
      month: i,
      cumulative: i * monthlyProfit - equipmentPrice,
    }),
  );

  const yMin = Math.min(...data.map((d) => d.cumulative), 0);
  const yMax = Math.max(...data.map((d) => d.cumulative), 0);
  const ySpread = yMax - yMin || 1;

  const xFor = (month: number) => padL + (month / months) * plotW;
  const yFor = (value: number) =>
    padT + plotH - ((value - yMin) / ySpread) * plotH;
  const yZero = yFor(0);

  const linePath = data
    .map((d, i) => `${i === 0 ? "M" : "L"}${xFor(d.month)},${yFor(d.cumulative)}`)
    .join(" ");

  const areaPath =
    `M${xFor(0)},${yZero} ` +
    data.map((d) => `L${xFor(d.month)},${yFor(d.cumulative)}`).join(" ") +
    ` L${xFor(months)},${yZero} Z`;

  const breakEvenMonth =
    monthlyProfit > 0 ? equipmentPrice / monthlyProfit : null;
  const breakEvenX = breakEvenMonth ? xFor(Math.min(breakEvenMonth, months)) : null;

  const yTicks = [yMin, yMin + ySpread / 2, 0, yMax].filter(
    (v, i, a) => a.indexOf(v) === i,
  );

  const formatAxis = (value: number) => {
    const symbol = currency === "EUR" ? "€" : "RON";
    const abs = Math.abs(value);
    const formatted =
      abs >= 1000
        ? `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`
        : value.toFixed(0);
    return `${formatted}${currency === "EUR" ? symbol : " " + symbol}`;
  };

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        role="img"
        aria-label="Grafic profit cumulat"
      >
        <defs>
          <linearGradient id="profit-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Y axis gridlines & labels */}
        {yTicks.map((tick, i) => (
          <g key={i}>
            <line
              x1={padL}
              x2={width - padR}
              y1={yFor(tick)}
              y2={yFor(tick)}
              stroke={tick === 0 ? "#cbd5e1" : "#e2e8f0"}
              strokeDasharray={tick === 0 ? "0" : "2 4"}
            />
            <text
              x={padL - 8}
              y={yFor(tick) + 4}
              textAnchor="end"
              className="fill-slate-400 text-[10px] font-medium"
            >
              {formatAxis(tick)}
            </text>
          </g>
        ))}

        {/* X axis labels */}
        {[0, 6, 12, 18, 24].filter((m) => m <= months).map((m) => (
          <text
            key={m}
            x={xFor(m)}
            y={height - 12}
            textAnchor="middle"
            className="fill-slate-400 text-[10px] font-medium"
          >
            {m === 0 ? "start" : `${m} luni`}
          </text>
        ))}

        {/* Area fill only for positive cumulative */}
        <path d={areaPath} fill="url(#profit-gradient)" opacity="0.8" />

        {/* Main line */}
        <path
          d={linePath}
          fill="none"
          stroke="#ec4899"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Break-even marker */}
        {breakEvenX && breakEvenMonth && breakEvenMonth <= months && (
          <>
            <line
              x1={breakEvenX}
              x2={breakEvenX}
              y1={padT}
              y2={yZero}
              stroke="#0f172a"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <circle
              cx={breakEvenX}
              cy={yZero}
              r="6"
              fill="#fff"
              stroke="#0f172a"
              strokeWidth="2"
            />
            <rect
              x={breakEvenX - 42}
              y={padT - 4}
              width="84"
              height="22"
              rx="11"
              fill="#0f172a"
            />
            <text
              x={breakEvenX}
              y={padT + 11}
              textAnchor="middle"
              className="fill-white text-[10px] font-semibold"
            >
              Break-even · {breakEvenMonth.toFixed(1)} luni
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
