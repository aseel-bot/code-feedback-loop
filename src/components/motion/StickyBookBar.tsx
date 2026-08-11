import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { T } from "@/lib/motion";

/** شريط حجز ثابت أسفل الشاشة يظهر بعد التمرير — مستوحى من نمط "Book now" */
export function StickyBookBar({
  carName,
  price,
  monthly,
}: {
  carName: string;
  price?: number | undefined;
  monthly?: number | undefined;
}) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setVisible(v > 520));
    return () => unsub();
  }, [scrollY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/90 px-4 py-3 backdrop-blur-xl lg:hidden"
          initial={reduce ? { opacity: 0 } : { y: 80, opacity: 0 }}
          animate={reduce ? { opacity: 1 } : { y: 0, opacity: 1, transition: T.base }}
          exit={reduce ? { opacity: 0 } : { y: 80, opacity: 0, transition: T.fast }}
        >
          <div className="mx-auto flex max-w-7xl items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs text-muted-foreground">{carName}</p>
              {price ? (
                <p className="font-display text-base font-black leading-tight">
                  {price.toLocaleString("en-US")}{" "}
                  <span className="text-[11px] font-medium text-muted-foreground">ريال</span>
                  {monthly ? (
                    <span className="ms-2 text-[11px] font-medium text-accent">
                      {monthly.toLocaleString("en-US")} / شهريًا
                    </span>
                  ) : null}
                </p>
              ) : (
                <p className="font-display text-sm text-accent">السعر عند الطلب</p>
              )}
            </div>
            <Button asChild size="sm" className="shrink-0">
              <Link to="/purchase/customers" search={{ car: carName }}>
                طلب شراء
              </Link>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
