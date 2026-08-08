import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { T } from "@/lib/motion";

type Props = { images: { src: string; alt: string }[] };

export function CarGallery({ images }: Props) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

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

  return (
    <div>
      <motion.div layoutId="car-gallery-image" className="relative overflow-hidden rounded-2xl bg-muted">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={current.src}
            src={current.src}
            alt={current.alt}
            width={1200}
            height={800}
            drag={reduce ? false : "x"}
            dragElastic={0.2}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (Math.abs(info.offset.x) > 60) go(info.offset.x > 0 ? -1 : 1);
            }}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1, transition: T.base }}
            exit={{ opacity: 0, transition: T.base }}
            className="aspect-[3/2] w-full cursor-zoom-in object-cover"
            onClick={() => setOpen(true)}
          />
        </AnimatePresence>
        <button
          type="button"
          aria-label="تكبير الصورة"
          onClick={() => setOpen(true)}
          className="absolute bottom-3 end-3 z-10 grid size-11 place-items-center rounded-full bg-background/85 text-foreground backdrop-blur"
        >
          <ZoomIn className="size-5" />
        </button>
        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="الصورة السابقة"
              onClick={() => go(-1)}
              className="absolute start-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-background/85 backdrop-blur"
            >
              <ChevronRight className="size-5" />
            </button>
            <button
              type="button"
              aria-label="الصورة التالية"
              onClick={() => go(1)}
              className="absolute end-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-background/85 backdrop-blur"
            >
              <ChevronLeft className="size-5" />
            </button>
            <span className="absolute bottom-3 start-3 z-10 rounded-full bg-background/85 px-3 py-1 text-xs backdrop-blur">
              {index + 1} / {images.length}
            </span>
          </>
        )}
      </motion.div>

      <div className="mt-3 grid grid-cols-5 gap-2">
        {images.map((img, i) => (
          <button
            key={img.src + i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`عرض الصورة ${i + 1}`}
            aria-current={i === index}
            className="relative overflow-hidden rounded-lg"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              width={240}
              height={160}
              className={`aspect-[3/2] w-full object-cover transition-opacity ${
                i === index ? "opacity-100" : "opacity-70 hover:opacity-100"
              }`}
            />
            {i === index && (
              <motion.span
                layoutId="gallery-thumb-active"
                transition={T.base}
                className="pointer-events-none absolute inset-0 rounded-lg border-2 border-accent"
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="معرض صور السيارة"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: T.base }}
            exit={{ opacity: 0, transition: T.fast }}
            onClick={() => setOpen(false)}
          >
            <button
              type="button"
              aria-label="إغلاق المعرض"
              onClick={() => setOpen(false)}
              className="absolute end-4 top-4 z-10 grid size-11 place-items-center rounded-full bg-background/90"
            >
              <X className="size-5" />
            </button>
            <motion.img
              {...(reduce ? {} : { layoutId: "car-gallery-image" })}
              transition={T.base}
              src={current.src}
              alt={current.alt}
              drag={reduce ? false : "x"}
              dragElastic={0.2}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 60) go(info.offset.x > 0 ? -1 : 1);
              }}
              className="max-h-[85vh] w-auto max-w-full rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
