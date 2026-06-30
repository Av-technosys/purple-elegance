import Image from "next/image";
import {
  IconArrowRight,
  IconFlower,
  IconRefresh,
  IconShieldLock,
  IconTruckDelivery,
} from "@tabler/icons-react";

const collections = [
  {
    title: "WEDDING EDIT",
    image: "/collection-1.png",
    className: "md:col-span-3",
  },
  {
    title: "FESTIVE COLLECTION",
    image: "/collection-2.png",
    className: "md:col-span-3",
  },
  {
    title: "PARTY WEAR",
    image: "/collection-3.png",
    className: "md:col-span-2",
  },
  {
    title: "EVERYDAY WEAR",
    image: "/collection-4.png",
    className: "md:col-span-2",
  },
  {
    title: "SUMMER COLLECTION",
    image: "/collection-5.png",
    className: "md:col-span-2",
  },
];

const benefits = [
  {
    title: "FREE SHIPPING",
    text: "On orders above ₹999",
    icon: IconTruckDelivery,
  },
  {
    title: "EASY RETURNS",
    text: "15-days return policy",
    icon: IconRefresh,
  },
  {
    title: "PREMIUM FABRICS",
    text: "Quality you can feel",
    icon: IconFlower,
  },
  {
    title: "SECURE PAYMENTS",
    text: "100% safe & trusted",
    icon: IconShieldLock,
  },
];

export default function ExploreCollection() {
  return (
    <section className="relative overflow-hidden bg-[#f8ecd8] px-5 py-9 text-[#2A0C00] sm:py-12 lg:py-[28px]">
      <Image
        src="/explore-collection.png"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />

      <div className="relative mx-auto max-w-[1088px]">
        <div className="text-center">
          <p className="text-[13px] font-medium tracking-[0.14em] text-[#7F5240]">
            EXPLORE • OUR • COLLECTION
          </p>
          <h2 className="mt-2 text-[30px] leading-none font-semibold text-[#2A0C00] sm:text-[38px]">
            Timeless Ethnic Styles, For Every You
          </h2>
          <p className="mt-3 text-[14px] text-[#7F5240]">
            Discover our most-loved pieces, crafted for every occasion.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-[14px] md:grid-cols-6">
          {collections.map((collection) => (
            <article
              key={collection.title}
              className={`group relative min-h-[215px] overflow-hidden rounded-[9px] bg-[#6f4b32] shadow-[0_8px_18px_rgba(42,12,0,0.18)] sm:min-h-[250px] ${collection.className}`}
            >
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/22 to-transparent" />
              <div className="absolute top-1/2 left-6 max-w-[215px] -translate-y-1/2 text-white sm:left-7">
                <h3 className="text-[25px] leading-[1.05] font-semibold sm:text-[31px]">
                  {collection.title}
                </h3>
                <p className="mt-4 max-w-[180px] text-[13px] leading-5 text-white">
                  Crafted for your most precious moments.
                </p>
                <a
                  href="#"
                  className="mt-5 inline-flex items-center gap-2 text-[13px] text-white"
                >
                  Explore
                  <IconArrowRight size={15} stroke={1.8} />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-7 grid max-w-[1030px] grid-cols-1 rounded-[2px] bg-[#f4e7d6]/95 shadow-[0_10px_25px_rgba(42,12,0,0.08)] sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className={[
                  "flex items-center gap-4 px-9 py-5 text-left",
                  index !== 0 ? "border-[#d6c2ab] lg:border-l" : "",
                  index > 1 ? "sm:border-t lg:border-t-0" : "",
                ].join(" ")}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#7F5240] text-[#7F5240]">
                  <Icon size={24} stroke={1.5} />
                </span>
                <span>
                  <span className="block text-[12px] font-bold tracking-wide text-[#7F5240]">
                    {benefit.title}
                  </span>
                  <span className="mt-1 block text-[10px] text-[#5f5047]">
                    {benefit.text}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
