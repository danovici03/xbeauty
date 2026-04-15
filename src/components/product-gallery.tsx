"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import type { WCImage } from "@/types/woocommerce";

type Props = {
  images: WCImage[];
  productName: string;
};

export function ProductGallery({ images, productName }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = useCallback(
    (i?: number) => {
      if (typeof i === "number") setActiveIndex(i);
      setLightboxOpen(true);
    },
    [],
  );

  if (images.length === 0) {
    return (
      <div className="aspect-square rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
        Fără imagine
      </div>
    );
  }

  const active = images[activeIndex];

  return (
    <>
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => openLightbox()}
          aria-label="Deschide galeria"
          className="group relative aspect-[4/3] md:aspect-[5/4] rounded-2xl bg-white border border-slate-100 overflow-hidden shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500/30"
        >
          <Image
            src={active.src}
            alt={active.alt || productName}
            fill
            priority={activeIndex === 0}
            sizes="(min-width: 1024px) 40rem, 100vw"
            className="object-contain p-4 md:p-6 transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn size={14} />
          </div>
          {images.length > 1 && (
            <span className="absolute bottom-3 left-3 text-[11px] font-semibold bg-slate-900/80 backdrop-blur text-white px-2.5 py-1 rounded-full">
              {activeIndex + 1} / {images.length}
            </span>
          )}
        </button>

        {images.length > 1 && (
          <div className="grid grid-cols-6 gap-2">
            {images.slice(0, 6).map((img, i) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Imagine ${i + 1}`}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 bg-white transition-all ${
                  i === activeIndex
                    ? "border-pink-600 shadow-sm"
                    : "border-slate-100 hover:border-slate-300"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt || `${productName} ${i + 1}`}
                  fill
                  sizes="80px"
                  className="object-contain p-1.5"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <Lightbox
          images={images}
          initialIndex={activeIndex}
          productName={productName}
          onClose={() => setLightboxOpen(false)}
          onChangeIndex={setActiveIndex}
        />
      )}
    </>
  );
}

function Lightbox({
  images,
  initialIndex,
  productName,
  onClose,
  onChangeIndex,
}: {
  images: WCImage[];
  initialIndex: number;
  productName: string;
  onClose: () => void;
  onChangeIndex: (i: number) => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % images.length),
    [images.length],
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    onChangeIndex(index);
    setZoomed(false);
  }, [index, onChangeIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, next, prev]);

  const handleMove = (e: React.MouseEvent) => {
    if (!zoomed || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin({ x, y });
  };

  const current = images[index];

  return (
    <div className="fixed inset-0 z-[110] bg-slate-950/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8">
      <button
        type="button"
        onClick={onClose}
        aria-label="Închide galeria"
        className="absolute top-4 right-4 md:top-6 md:right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <X size={22} />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Imaginea anterioară"
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Imaginea următoare"
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <div
        ref={containerRef}
        onClick={() => setZoomed((z) => !z)}
        onMouseMove={handleMove}
        className={`relative w-full h-full max-w-6xl max-h-[85vh] overflow-hidden cursor-${
          zoomed ? "zoom-out" : "zoom-in"
        }`}
      >
        <Image
          src={current.src}
          alt={current.alt || productName}
          fill
          sizes="100vw"
          priority
          className="object-contain transition-transform duration-300 select-none"
          style={{
            transform: zoomed ? "scale(2)" : "scale(1)",
            transformOrigin: zoomed ? `${origin.x}% ${origin.y}%` : "center",
          }}
          draggable={false}
        />
      </div>

      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium">
        {index + 1} / {images.length}
      </div>
    </div>
  );
}
