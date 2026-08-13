import { cn } from "@/lib/utils";

export function CarLogo({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center overflow-hidden rounded-lg bg-accent p-1 shadow-xs transition duration-300 group-hover:scale-105", className)}>
      <img
        src="/logo.png"
        alt="شعار شركة نجم الشارقة للسيارات"
        className="h-full w-full object-contain mix-blend-multiply dark:mix-blend-screen "
      />
    </div>
  );
}
