import { IconHeadset, IconPackage, IconTruckDelivery } from "@tabler/icons-react";

const benefits = [
  {
    title: "Free Shipping",
    text: "on order above ₹999",
    icon: IconTruckDelivery,
  },
  {
    title: "24 X 7 Customer Support",
    text: "Get instant help anytime",
    icon: IconHeadset,
  },
  {
    title: "15-Days Returns",
    text: "Easy exchanges, no questions",
    icon: IconPackage,
  },
];

export default function ProductBenefits() {
  return (
    <section className="bg-[#3A1400] text-white">
      <div className="mx-auto grid max-w-[1290px] grid-cols-3 divide-x divide-white/10 px-3 py-3 md:px-8 md:py-6">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <div
              key={benefit.title}
              className="flex items-center justify-center gap-2 px-2 md:gap-4"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-[#3A1400] md:size-13">
                <Icon size={20} stroke={1.7} />
              </span>
              <span>
                <strong className="block text-[9px] leading-tight md:text-[18px]">
                  {benefit.title}
                </strong>
                <span className="mt-1 block text-[7px] leading-tight text-white/85 md:text-[12px]">
                  {benefit.text}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
