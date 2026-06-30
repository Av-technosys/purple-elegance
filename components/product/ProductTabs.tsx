const description = [
  "Relaxed fit",
  "Mid-rise waist",
  "Multiple utility pockets",
  "Button & zip closure",
  "Belt loops",
  "Model is 6'1\" and wearing size 32",
];

const productFacts = [
  ["FABRIC", "100% Cotton Twill"],
  ["FIT", "Relaxed Fit"],
  ["RISE", "Mid-Rise"],
  ["PATTERN", "Solid"],
  ["OCCASION", "Casual / Streetwear"],
  ["SUSTAINABILITY", "Conscious Choice"],
];

const care = [
  "Machine wash cold",
  "Do not bleach",
  "Tumble dry low",
  "Iron on low heat",
  "Do not dry clean",
];

const fabric = [
  "Fabric: 100% Cotton Twill",
  "Fit: Relaxed Fit",
  "Rise: Mid-Rise",
  "Pattern: Solid",
  "Occasion: Casual / Streetwear",
  "Sustainability: Conscious Choice",
];

export default function ProductTabs() {
  return (
    <section className="mx-auto grid max-w-[1290px] gap-8 px-4 py-10 text-[#160903] md:grid-cols-[1.4fr_0.7fr_0.8fr_1fr] md:px-8 md:py-18">
      <DetailBlock title="DESCRIPTION">
        <p className="max-w-[385px] text-[12px] leading-5 text-[#3F322B]">
          Designed for everyday movement. These utility cargo pants are crafted
          from premium cotton twill fabric with a relaxed fit and multiple
          pockets for functionality and style.
        </p>
        <ul className="mt-7 space-y-3 text-[12px] text-[#3F322B]">
          {description.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </DetailBlock>

      <div className="space-y-5">
        {productFacts.map(([title, text]) => (
          <DetailBlock key={title} title={title}>
            <p className="text-[12px] text-[#3F322B]">{text}</p>
          </DetailBlock>
        ))}
      </div>

      <DetailBlock title="CARE INSTRUCTIONS">
        <ul className="space-y-3 text-[12px] text-[#3F322B]">
          {care.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </DetailBlock>

      <DetailBlock title="FABRIC">
        <ul className="space-y-3 text-[12px] text-[#3F322B]">
          {fabric.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </DetailBlock>
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
