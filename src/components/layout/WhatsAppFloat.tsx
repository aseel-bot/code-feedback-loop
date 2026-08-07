import { useRouterState } from "@tanstack/react-router";
import { CONTACT } from "@/data/site";

export function WhatsAppFloat() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const context = pathname.startsWith("/cars/")
    ? `بخصوص السيارة الموجودة على الصفحة: ${pathname.replace("/cars/", "")}`
    : "بخصوص خدماتكم";
  const message = encodeURIComponent(`السلام عليكم، أرغب بالاستفسار ${context}.`);

  return (
    <a
      href={`https://wa.me/${CONTACT.whatsapp}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا عبر واتساب"
      className="fixed bottom-5 end-5 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] shadow-lg transition hover:scale-105"
    >
      <svg viewBox="0 0 24 24" className="size-7 fill-white" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.42 9.42 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.89.99 6.67 2.77a9.38 9.38 0 0 1 2.76 6.68c0 5.2-4.24 9.43-9.45 9.43M20.5 3.49A11.8 11.8 0 0 0 12.05 0C5.5 0 .18 5.32.18 11.86c0 2.09.55 4.13 1.59 5.93L.08 24l6.36-1.67a11.8 11.8 0 0 0 5.61 1.43h.01c6.54 0 11.86-5.32 11.86-11.86 0-3.17-1.23-6.15-3.47-8.4" />
      </svg>
    </a>
  );
}
