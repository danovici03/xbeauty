"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type Props = {
  html: string;
  collapsedMaxHeight?: number;
  className?: string;
};

export function CollapsibleHtml({
  html,
  collapsedMaxHeight = 88,
  className,
}: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [needsToggle, setNeedsToggle] = useState(false);

  useEffect(() => {
    if (!contentRef.current) return;
    setNeedsToggle(contentRef.current.scrollHeight > collapsedMaxHeight + 4);
  }, [html, collapsedMaxHeight]);

  return (
    <div className={className}>
      <div
        ref={contentRef}
        style={
          expanded
            ? undefined
            : { maxHeight: `${collapsedMaxHeight}px` }
        }
        className={`relative text-sm text-slate-600 leading-relaxed overflow-hidden transition-[max-height] duration-300 ${
          !expanded && needsToggle ? "" : ""
        }`}
      >
        <div dangerouslySetInnerHTML={{ __html: html }} />
        {!expanded && needsToggle && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white via-white/90 to-transparent" />
        )}
      </div>

      {needsToggle && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-pink-600 hover:text-pink-500 transition-colors"
        >
          {expanded ? "Vezi mai puțin" : "Vezi mai mult"}
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      )}
    </div>
  );
}
