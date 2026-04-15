import type { ReactNode } from "react";
import { Breadcrumbs } from "./breadcrumbs";

type Props = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
};

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  breadcrumbs,
}: Props) {
  return (
    <section className="relative pt-32 pb-12 md:pb-16 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}

        <div className="mt-6 max-w-3xl">
          {eyebrow && (
            <p className="text-pink-600 font-bold tracking-widest uppercase text-xs mb-4">
              {eyebrow}
            </p>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-5 leading-[1.1]">
            {title}
          </h1>
          {description && (
            <div className="text-lg md:text-xl text-slate-600 leading-relaxed font-light">
              {description}
            </div>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
