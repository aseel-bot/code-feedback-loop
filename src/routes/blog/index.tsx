import { createFileRoute, Link } from "@tanstack/react-router";
import { POSTS } from "@/data/site";
import { PageHero } from "@/components/layout/PageHero";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "المدونة | نصائح ومقالات السيارات — عادل للسيارات" },
      {
        name: "description",
        content: "مقالات ونصائح عن شراء السيارات، التمويل، والصيانة في السوق السعودي.",
      },
      { property: "og:title", content: "مدونة عادل للسيارات" },
      { property: "og:description", content: "نصائح عملية قبل شراء سيارتك القادمة." },
    ],
  }),
  component: Blog,
});

function Blog() {
  return (
    <>
      <PageHero
        title="المدونة"
        subtitle="مقالات ونصائح تساعدك على اتخاذ قرار الشراء الصحيح."
        crumbs={[{ label: "المدونة" }]}
      />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 md:grid-cols-3">
        {POSTS.map((p) => (
          <Link
            key={p.slug}
            to="/blog/$slug"
            params={{ slug: p.slug }}
            className="group overflow-hidden rounded-xl border border-border bg-card"
          >
            <img
              src={p.image}
              alt={p.title}
              loading="lazy"
              width={1200}
              height={800}
              className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="p-5">
              <time className="text-xs text-muted-foreground" dir="ltr">
                {p.date}
              </time>
              <h2 className="mt-2 text-base group-hover:text-accent">{p.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
