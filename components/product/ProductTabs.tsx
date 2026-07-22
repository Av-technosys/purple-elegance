type Attribute = {
  id: string;
  label: string;
  textContent?: string | null;
  listItems?: string[] | null;
  sortOrder: number;
};

export default function ProductTabs({ attributes = [] }: { attributes?: Attribute[] }) {
  if (attributes.length === 0) return null;

  return (
    <section className="mx-auto grid max-w-[1290px] gap-8 px-4 py-10 text-[#160903] md:grid-cols-[1.4fr_0.7fr_0.8fr_1fr] md:px-8 md:py-18">
      {attributes.map((attr) => (
        <DetailBlock key={attr.id} title={attr.label}>
          {attr.textContent && (
            <div className="max-w-[385px] text-[12px] leading-5 text-[#3F322B] space-y-4">
              {attr.textContent.split("\n\n").map((block, i) => {
                const lines = block.split("\n");
                if (lines.length > 1) {
                  return (
                    <div key={i}>
                      <h4 className="font-heading text-[11px] font-bold tracking-normal uppercase text-[#160903] mt-3">
                        {lines[0]}
                      </h4>
                      <p className="mt-1 text-[#3F322B]">{lines[1]}</p>
                    </div>
                  );
                }
                return <p key={i}>{block}</p>;
              })}
            </div>
          )}
          {attr.listItems && attr.listItems.length > 0 && (
            <ul className={`space-y-3 text-[12px] text-[#3F322B] ${attr.textContent ? "mt-7" : ""}`}>
              {attr.listItems.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          )}
        </DetailBlock>
      ))}
    </section>
  );
}

function DetailBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-heading text-[13px] font-bold tracking-normal">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}

