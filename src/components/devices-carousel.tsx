"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export type DeviceCard = {
  id: number | string;
  name: string;
  slug: string;
  category: string;
  categoryId: number | null;
  description: string;
  image: string;
};

export type CategoryPill = {
  id: number;
  name: string;
  count: number;
};

type Props = {
  devices: DeviceCard[];
  categories: CategoryPill[];
};

export function DevicesCarousel({ devices, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const filteredDevices = useMemo(() => {
    if (activeCategory === null) return devices;
    return devices.filter((d) => d.categoryId === activeCategory);
  }, [devices, activeCategory]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    slidesToScroll: "auto",
    containScroll: "trimSnaps",
  });

  const [prevEnabled, setPrevEnabled] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevEnabled(emblaApi.canScrollPrev());
    setNextEnabled(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Re-init Embla when the filtered device list changes so snap points recalculate.
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    emblaApi.scrollTo(0, true);
  }, [emblaApi, filteredDevices.length]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  return (
    <div>
      {/* Category pills */}
      <div className="mb-10 -mx-4 px-4 overflow-x-auto scrollbar-none">
        <div className="flex gap-2 min-w-max">
          <CategoryPillButton
            active={activeCategory === null}
            onClick={() => setActiveCategory(null)}
          >
            Toate
          </CategoryPillButton>
          {categories.map((cat) => (
            <CategoryPillButton
              key={cat.id}
              active={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name}
            </CategoryPillButton>
          ))}
        </div>
      </div>

      {filteredDevices.length === 0 ? (
        <p className="text-slate-500 py-12 text-center">
          Niciun produs în această categorie.
        </p>
      ) : (
        <>
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-3 md:-ml-4 touch-pan-y">
                {filteredDevices.map((device) => (
                  <div
                    key={device.id}
                    className="min-w-0 pl-3 md:pl-4 flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%]"
                  >
                    <DeviceCardItem device={device} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-10 gap-6">
            <div className="flex gap-2 flex-wrap">
              {snaps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Du-te la slide-ul ${i + 1}`}
                  onClick={() => scrollTo(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === selectedIndex
                      ? "w-8 bg-pink-600"
                      : "w-1.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={scrollPrev}
                disabled={!prevEnabled}
                aria-label="Slide anterior"
                className="w-12 h-12 rounded-full border border-slate-200 bg-white text-slate-700 hover:border-pink-600 hover:bg-pink-600 hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center shadow-sm"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                disabled={!nextEnabled}
                aria-label="Slide următor"
                className="w-12 h-12 rounded-full border border-slate-200 bg-white text-slate-700 hover:border-pink-600 hover:bg-pink-600 hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center shadow-sm"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function CategoryPillButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all border ${
        active
          ? "bg-pink-600 text-white border-pink-600 shadow-md shadow-pink-600/20"
          : "bg-white text-slate-700 border-slate-200 hover:border-pink-300 hover:text-pink-600"
      }`}
    >
      {children}
    </button>
  );
}

function DeviceCardItem({ device }: { device: DeviceCard }) {
  return (
    <Link
      href={`/echipamente/${device.slug}`}
      className="group relative flex flex-col h-full select-none"
    >
      <div className="relative aspect-[4/5] rounded-[2rem] bg-gradient-to-b from-white to-slate-50 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-pink-900/5 hover:border-pink-200 transition-all duration-500 overflow-hidden mb-5 hover:-translate-y-1.5">
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
          <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-pink-600 bg-white/90 backdrop-blur-md border border-pink-100 px-3 py-1.5 rounded-full shadow-sm line-clamp-1">
            {device.category}
          </span>
          <div className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-pink-600 transition-all shadow-sm border border-slate-100 group-hover:border-pink-600 flex-shrink-0">
            <ArrowRight
              size={16}
              className="-rotate-45 group-hover:rotate-0 transition-transform duration-300"
            />
          </div>
        </div>
        <div className="absolute inset-0 p-6 pt-20 flex items-center justify-center">
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <Image
              src={device.image}
              alt={device.name}
              fill
              sizes="(min-width: 1024px) 22rem, (min-width: 768px) 30vw, 45vw"
              className="object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-none"
              draggable={false}
            />
          </div>
        </div>
      </div>

      <div className="px-1 flex flex-col">
        <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-900 mb-2 tracking-tight group-hover:text-pink-600 transition-colors line-clamp-2">
          {device.name}
        </h4>
        <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-4 line-clamp-2">
          {device.description}
        </p>
        <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 border-b-2 border-transparent group-hover:border-pink-500 pb-0.5 transition-all w-fit">
          Vezi Detalii{" "}
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </span>
      </div>
    </Link>
  );
}
