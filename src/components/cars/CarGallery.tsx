import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

type Props = { images: { src: string; alt: string }[] };

export function CarGallery({ images }: Props) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = (dir: number) => setIndex((i) => (i + dir + images.length) % images.length);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, images.length]);

  const current = images[index]!;

  const swipe = {
    onTouchStart: (e: React.TouchEvent) => {
      touchX.current = e.touches[0]!.clientX;
    },
    onTouchEnd: (e: React.TouchEvent) => {
      if (touchX.current === null) return;
      const delta = e.changedTouches[0]!.clientX - touchX.current;
      if (Math.abs(delta) > 40) go(delta > 0 ? -1 : 1);
      touchX.current = null;
    },
  };

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl bg-muted" {...swipe}>
        <img
          src={current.src}
          alt={current.alt}
          width={1200}
          height={800}
          className="aspect-[3/2] w-full cursor-zoom-in object-cover"
          onClick={() => setOpen(true)}
        />
        <button
          type="button"
          aria-label="تكبير الصورة"
          onClick={() => setOpen(true)}
          className="absolute bottom-3 end-3 grid size-11 place-items-center rounded-full bg-background/85 text-foreground backdrop-blur"
        >
          <ZoomIn className="size-5" />
        </button>
        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="الصورة السابقة"
              onClick={() => go(-1)}
              className="absolute start-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-background/85 backdrop-blur"
            >
              <ChevronRight className="size-5" />
            </button>
            <button
              type="button"
              aria-label="الصورة التالية"
              onClick={() => go(1)}
              className="absolute end-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-background/85 backdrop-blur"
            >
              <ChevronLeft className="size-5" />
            </button>
            <span className="absolute bottom-3 start-3 rounded-full bg-background/85 px-3 py-1 text-xs backdrop-blur">
              {index + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      <div className="mt-3 grid grid-cols-5 gap-2">
        {images.map((img, i) => (
          <button
            key={img.src + i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`عرض الصورة ${i + 1}`}
            aria-current={i === index}
            className={`overflow-hidden rounded-lg border-2 transition ${
              i === index ? "border-accent" : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              width={240}
              height={160}
              className="aspect-[3/2] w-full object-cover"
            />
          </button>
        ))}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="معرض صور السيارة"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            aria-label="إغلاق المعرض"
            onClick={() => setOpen(false)}
            className="absolute end-4 top-4 grid size-11 place-items-center rounded-full bg-background/90"
          >
            <X className="size-5" />
          </button>
          <img
            src={current.src}
            alt={current.alt}
            className="max-h-[85vh] w-auto max-w-full rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
            {...swipe}
          />
          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="الصورة السابقة"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                className="absolute start-4 grid size-11 place-items-center rounded-full bg-background/90"
              >
                <ChevronRight className="size-5" />
              </button>
              <button
                type="button"
                aria-label="الصورة التالية"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                className="absolute end-4 grid size-11 place-items-center rounded-full bg-background/90"
              >
                <ChevronLeft className="size-5" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
