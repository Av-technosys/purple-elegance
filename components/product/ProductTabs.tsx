export default function ProductTabs({ description }: { description?: string | null }) {
  if (!description) return null;

  return (
    <section className="mx-auto max-w-[1290px] px-4 py-8 text-[#160903] md:px-8 md:py-12 border-t border-slate-100">
      <div className="max-w-4xl">
        <h2 className="font-heading text-[16px] font-bold tracking-normal uppercase text-[#160903] mb-4">
          Description
        </h2>
        <div className="text-[14px] leading-relaxed text-[#3F322B] whitespace-pre-line">
          {description}
        </div>
      </div>
    </section>
  );
}
