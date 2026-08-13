import { ReadingProgress } from "@/components/motion/ReadingProgress";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { POSTS } from "@/data/site";
import { PageHero } from "@/components/layout/PageHero";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = POSTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "مقال"} | مدونة نجم الشارقة للسيارات` },
      { name: "description", content: loaderData?.excerpt ?? "مقال من مدونة نجم الشارقة للسيارات." },
      { property: "og:title", content: loaderData?.title ?? "مقال" },
      { property: "og:description", content: loaderData?.excerpt ?? "نصائح السيارات." },
      { property: "og:type", content: "article" },
    ],
  }),
  component: Post,
});

function Post() {
  const post = Route.useLoaderData();

  return (
    <>
      <PageHero
        title={post.title}
        crumbs={[{ label: "المدونة", to: "/blog" }, { label: post.title }]}
      />
      <ReadingProgress />
      <article className="mx-auto max-w-3xl px-4 py-12">
        <img
          src={post.image}
          alt={post.title}
          width={1200}
          height={800}
          className="w-full rounded-2xl object-cover"
        />
        <time className="mt-6 block text-xs text-muted-foreground" dir="ltr">
          {post.date}
        </time>
        <p className="mt-4 text-base leading-9 text-muted-foreground">{post.body}</p>
      </article>
    </>
  );
}
