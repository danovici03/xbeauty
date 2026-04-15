"use client";

import { useState } from "react";
import type { ReactNode } from "react";

type Tab = {
  id: string;
  label: string;
  content: ReactNode;
  hidden?: boolean;
};

export function ProductTabs({ tabs }: { tabs: Tab[] }) {
  const visible = tabs.filter((t) => !t.hidden);
  const [activeId, setActiveId] = useState(visible[0]?.id);

  if (visible.length === 0) return null;
  const active = visible.find((t) => t.id === activeId) ?? visible[0];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Detalii produs"
        className="flex gap-2 border-b border-slate-200 overflow-x-auto scrollbar-none mb-8"
      >
        {visible.map((tab) => {
          const isActive = tab.id === active.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => setActiveId(tab.id)}
              className={`whitespace-nowrap px-4 md:px-6 py-3 text-sm md:text-base font-semibold transition-colors border-b-2 -mb-px ${
                isActive
                  ? "text-pink-600 border-pink-600"
                  : "text-slate-500 border-transparent hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${active.id}`}
        aria-labelledby={`tab-${active.id}`}
      >
        {active.content}
      </div>
    </div>
  );
}
