import { createFileRoute } from "@tanstack/react-router";
import { FAQS } from "@/data/site";
import { PageHero } from "@/components/layout/PageHero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "الأسئلة الشائعة | عادل للسيارات" },
      {
        name: "description",
        content: "إجابات على أكثر أسئلة العملاء تكرارًا حول الشراء، التمويل، الخدمات والشكاوى.",
      },
      { property: "og:title", content: "الأسئلة الشائعة | عادل للسيارات" },
      { property: "og:description", content: "كل ما تحتاج معرفته قبل شراء سيارتك من عادل للسيارات." },
    ],
  }),
  component: Faq,
});

function Faq() {
  return (
    <>
      <PageHero
        title="الأسئلة الشائعة"
        subtitle="إجابات سريعة على أكثر الأسئلة تكرارًا."
        crumbs={[{ label: "الأسئلة الشائعة" }]}
      />
      <div className="mx-auto max-w-3xl space-y-8 px-4 py-12">
        {FAQS.map((group) => (
          <section key={group.category}>
            <h2 className="mb-3 text-lg text-accent">{group.category}</h2>
            <Accordion type="single" collapsible className="rounded-xl border border-border bg-card px-4">
              {group.items.map((item, i) => (
                <AccordionItem key={item.q} value={`${group.category}-${i}`}>
                  <AccordionTrigger className="text-start text-sm">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        ))}
      </div>
    </>
  );
}
