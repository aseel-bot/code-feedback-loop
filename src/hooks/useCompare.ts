import { useCallback, useEffect, useState } from "react";

const KEY = "adel-compare";
const MAX = 3;

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]).slice(0, MAX) : [];
  } catch {
    return [];
  }
}

const listeners = new Set<(v: string[]) => void>();

function write(next: string[]) {
  window.localStorage.setItem(KEY, JSON.stringify(next));
  listeners.forEach((l) => l(next));
}

export function useCompare() {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    setItems(read());
    const l = (v: string[]) => setItems(v);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);

  const toggle = useCallback((slug: string) => {
    const current = read();
    const next = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [...current, slug].slice(0, MAX);
    write(next);
    return next;
  }, []);

  const remove = useCallback((slug: string) => {
    write(read().filter((s) => s !== slug));
  }, []);

  const clear = useCallback(() => write([]), []);

  return { items, toggle, remove, clear, max: MAX };
}
