import { createFileRoute, redirect } from "@tanstack/react-router";

// المسار القديم — يُعاد توجيهه دائمًا إلى /cars/{slug}/print
export const Route = createFileRoute("/cars/print")({
  validateSearch: (search: Record<string, unknown>): { car?: string | undefined } => ({
    car: typeof search["car"] === "string" ? search["car"] : undefined,
  }),
  beforeLoad: ({ search }) => {
    if (search.car) {
      throw redirect({ to: "/cars/$slug/print", params: { slug: search.car }, replace: true });
    }
    throw redirect({ to: "/cars", replace: true });
  },
  component: () => null,
});
