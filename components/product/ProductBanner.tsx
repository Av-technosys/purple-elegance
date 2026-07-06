import Image from "next/image";

export default function ProductBanner() {
  return (
    <section className="relative overflow-hidden bg-[#f2d9bc] text-[#2A0C00]">
      <div className="relative hidden aspect-[1774/887] min-h-[460px] md:block">
        <Image
          src="/shop-banner.png"
          alt="Woman wearing Purple Elegance embroidered suit"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <BannerCopy className="absolute top-[34%] left-[8.1%]" />
      </div>

      <div className="relative h-[752px] md:hidden">
        <Image
          src="/shopbanner-mobile.png"
          alt="Woman wearing Purple Elegance embroidered suit"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <BannerCopy className="absolute top-[80px] left-1/2 w-full max-w-[310px] -translate-x-1/2 text-center" />
      </div>
    </section>
  );
}

function BannerCopy({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <h1 className="font-heading text-[58px] leading-[0.88] font-semibold tracking-normal md:text-[105px]">
        WOMEN
      </h1>
      <p className="font-heading -mt-1 text-[42px] leading-none font-normal text-[#A8484D] italic md:-mt-3 md:text-[70px]">
        Collection
      </p>
      <div className="mt-6 md:mt-6">
        <p className="text-[17px] leading-none font-semibold tracking-normal md:text-[23px]">
          Elevate Your Everyday Style.
        </p>
        <p className="mt-2 text-[13px] leading-none tracking-normal md:text-[17px]">
          Premium fits. Timeless looks. Made for you.
        </p>
      </div>
    </div>
  );
}
