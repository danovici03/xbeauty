"use client";

import { useMemo, useState } from "react";
import { TrendingUp, Info, RotateCcw } from "lucide-react";
import { ProfitChart } from "./profit-chart";

const EUR_TO_RON = 4.97;
const WEEKS_PER_MONTH = 4.33;
const PROJECTION_MONTHS = 24;

type Currency = "EUR" | "RON";
type ScenarioKey = "conservative" | "realistic" | "optimistic";

const SCENARIOS: Record<
  ScenarioKey,
  { label: string; multiplier: number; description: string }
> = {
  conservative: {
    label: "Conservator",
    multiplier: 0.75,
    description: "75% din capacitate — luni slabe, perioade de lansare",
  },
  realistic: {
    label: "Realist",
    multiplier: 1,
    description: "100% — valorile introduse sunt rezultatele medii",
  },
  optimistic: {
    label: "Optimist",
    multiplier: 1.15,
    description: "115% — sezon de vârf, marketing eficient",
  },
};

const DEFAULTS = {
  equipmentPrice: 14000,
  daysPerWeek: 5,
  sessionsPerDay: 5,
  sessionPrice: 50,
  consumableCost: 3,
};

function formatCurrency(value: number, currency: Currency): string {
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function ProfitabilityCalculator() {
  const [currency, setCurrency] = useState<Currency>("EUR");
  const [scenario, setScenario] = useState<ScenarioKey>("realistic");

  const [equipmentPrice, setEquipmentPrice] = useState(DEFAULTS.equipmentPrice);
  const [daysPerWeek, setDaysPerWeek] = useState(DEFAULTS.daysPerWeek);
  const [sessionsPerDay, setSessionsPerDay] = useState(DEFAULTS.sessionsPerDay);
  const [sessionPrice, setSessionPrice] = useState(DEFAULTS.sessionPrice);
  const [consumableCost, setConsumableCost] = useState(DEFAULTS.consumableCost);

  const rate = currency === "RON" ? EUR_TO_RON : 1;

  const allScenarios = useMemo(() => {
    return Object.entries(SCENARIOS).map(([key, config]) => {
      const mult = config.multiplier;
      const sessionsPerMonth =
        sessionsPerDay * daysPerWeek * WEEKS_PER_MONTH * mult;
      const revenue = sessionsPerMonth * sessionPrice;
      const consumables = sessionsPerMonth * consumableCost;
      const profit = revenue - consumables;
      const payback = profit > 0 ? equipmentPrice / profit : null;
      return {
        key: key as ScenarioKey,
        ...config,
        sessionsPerMonth: Math.round(sessionsPerMonth),
        revenue,
        consumables,
        profit,
        payback,
      };
    });
  }, [
    sessionsPerDay,
    daysPerWeek,
    sessionPrice,
    consumableCost,
    equipmentPrice,
  ]);

  const active = allScenarios.find((s) => s.key === scenario)!;

  const resetAll = () => {
    setEquipmentPrice(DEFAULTS.equipmentPrice);
    setDaysPerWeek(DEFAULTS.daysPerWeek);
    setSessionsPerDay(DEFAULTS.sessionsPerDay);
    setSessionPrice(DEFAULTS.sessionPrice);
    setConsumableCost(DEFAULTS.consumableCost);
  };

  return (
    <div className="space-y-8">
      {/* Top bar: currency toggle + reset */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-1 shadow-sm">
          {(["EUR", "RON"] as Currency[]).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCurrency(c)}
              className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                currency === c
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={resetAll}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-pink-600 transition-colors"
        >
          <RotateCcw size={14} /> Resetează
        </button>
      </div>

      <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
        {/* Input panel */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8 space-y-6">
          <SliderField
            label="Preț echipament"
            value={equipmentPrice}
            onChange={setEquipmentPrice}
            min={3000}
            max={30000}
            step={500}
            currency={currency}
            displayRate={rate}
          />
          <SliderField
            label="Zile de lucru pe săptămână"
            value={daysPerWeek}
            onChange={setDaysPerWeek}
            min={1}
            max={7}
            step={1}
            suffix="zile"
          />
          <SliderField
            label="Ședințe pe zi"
            value={sessionsPerDay}
            onChange={setSessionsPerDay}
            min={1}
            max={20}
            step={1}
            suffix="ședințe"
          />
          <SliderField
            label="Preț sesiune"
            value={sessionPrice}
            onChange={setSessionPrice}
            min={20}
            max={500}
            step={5}
            currency={currency}
            displayRate={rate}
          />
          <SliderField
            label="Cost consumabile / ședință"
            value={consumableCost}
            onChange={setConsumableCost}
            min={0}
            max={30}
            step={0.5}
            currency={currency}
            displayRate={rate}
          />

          <p className="flex items-start gap-2 text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-xl p-3">
            <Info size={14} className="mt-0.5 flex-shrink-0" />
            <span>
              Valorile introduse reprezintă media lunilor de funcționare
              normală. Scenariile ajustează automat rata de ocupare.
            </span>
          </p>
        </div>

        {/* Results panel */}
        <div className="lg:col-span-3 space-y-5">
          {/* Scenario tabs */}
          <div className="flex gap-2 p-1 bg-slate-100 rounded-full w-full md:w-fit">
            {Object.entries(SCENARIOS).map(([key, config]) => {
              const isActive = scenario === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setScenario(key as ScenarioKey)}
                  className={`flex-1 md:flex-none px-4 md:px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {config.label}
                </button>
              );
            })}
          </div>

          {/* Big result + chart */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl text-white p-6 md:p-8">
            <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 text-pink-400 mb-2">
                  <TrendingUp size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Profit brut lunar — {active.label}
                  </span>
                </div>
                <p className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight tabular-nums">
                  {formatCurrency(active.profit * rate, currency)}
                </p>
                <p className="text-sm text-slate-400 mt-2">
                  {active.description}
                </p>
              </div>
              {active.payback !== null && (
                <div className="text-right">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                    Recuperare
                  </p>
                  <p className="text-2xl md:text-3xl font-bold">
                    {Math.ceil(active.payback)} luni
                  </p>
                </div>
              )}
            </div>

            <ProfitChart
              equipmentPriceEUR={equipmentPrice}
              monthlyProfitEUR={active.profit}
              months={PROJECTION_MONTHS}
              currency={currency}
              eurToRon={EUR_TO_RON}
            />

            <div className="mt-4 grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-center">
              <MiniStat
                label="Ședințe/lună"
                value={active.sessionsPerMonth.toString()}
              />
              <MiniStat
                label="Venit lunar"
                value={formatCurrency(active.revenue * rate, currency)}
              />
              <MiniStat
                label="Consumabile"
                value={`− ${formatCurrency(active.consumables * rate, currency)}`}
                negative
              />
            </div>
          </div>

          {/* Scenario comparison cards */}
          <div className="grid grid-cols-3 gap-2 md:gap-3">
            {allScenarios.map((s) => {
              const isActive = s.key === scenario;
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setScenario(s.key)}
                  className={`text-left rounded-2xl p-4 md:p-5 border-2 transition-all ${
                    isActive
                      ? "border-pink-500 bg-pink-50/40 shadow-md"
                      : "border-slate-100 bg-white hover:border-slate-300"
                  }`}
                >
                  <p
                    className={`text-xs font-bold uppercase tracking-widest mb-2 ${
                      isActive ? "text-pink-600" : "text-slate-400"
                    }`}
                  >
                    {s.label}
                  </p>
                  <p className="text-lg md:text-xl font-bold text-slate-900 tabular-nums leading-tight">
                    {formatCurrency(s.profit * rate, currency)}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {s.payback
                      ? `~ ${Math.ceil(s.payback)} luni payback`
                      : "fără profit"}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniStat({
  label,
  value,
  negative,
}: {
  label: string;
  value: string;
  negative?: boolean;
}) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
        {label}
      </p>
      <p
        className={`text-sm md:text-base font-bold tabular-nums ${
          negative ? "text-rose-300" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

type SliderFieldProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  currency?: Currency;
  displayRate?: number;
};

function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix,
  currency,
  displayRate = 1,
}: SliderFieldProps) {
  const percent = ((value - min) / (max - min)) * 100;

  const displayed = currency
    ? formatCurrency(value * displayRate, currency)
    : `${value} ${suffix ?? ""}`.trim();

  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
          {label}
        </label>
        <span className="text-sm font-bold text-slate-900 tabular-nums">
          {displayed}
        </span>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full appearance-none h-1.5 rounded-full bg-slate-100 accent-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
        style={{
          background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${percent}%, #e2e8f0 ${percent}%, #e2e8f0 100%)`,
        }}
      />
    </div>
  );
}
