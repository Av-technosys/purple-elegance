import Image from "next/image";

export default function HeritageThreads() {
  return (
    <section className="relative w-full overflow-hidden bg-[#efd7bd]">
      {/* Aspect Ratio Box: Yeh wrapper image ko perfectly 16:9 ratio mein rakhega,
        jiski wajah se image upar ya neeche se kabhi nahi kategi.
      */}
      <div className="relative w-full aspect-[16/9] min-h-[320px] sm:min-h-0">
        
        {/* Background Image */}
        <Image
          src="/heritage-thread-bg.png"
          alt="Heritage ethnic wear collection"
          fill
          priority
          className="object-cover sm:object-contain object-center"
          sizes="100vw"
        />

        {/* Content Overlay - Perfectly Centered */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="w-full max-w-[280px] text-center sm:max-w-[420px] md:max-w-[500px] lg:max-w-[600px]">
            
            {/* Top Minimal Line */}
            <div className="mx-auto mb-2 h-[1px] w-[40px] bg-[#8A3E25]/40 sm:mb-4 sm:w-[80px]" />
            
            {/* Main Heading */}
            <h2 className="font-serif text-[18px] font-normal leading-[1.15] text-[#8A3E25] sm:text-[32px] md:text-[44px] lg:text-[52px]">
              Heritage in
              <br />
              Every Thread,
            </h2>
            
            {/* Script Style Sub-heading */}
            <p className="mt-0.5 font-serif text-[16px] font-normal leading-none text-[#5B6349] italic sm:mt-1 sm:text-[30px] md:text-[40px] lg:text-[48px]">
              Style in Every Step
            </p>
            
            {/* Center Divider Element */}
            <div className="mx-auto mt-2 flex w-[80px] items-center gap-1.5 text-[#b98568]/80 sm:mt-4 sm:w-[120px] md:mt-5 md:w-[140px]">
              <span className="h-[1px] flex-1 bg-[#b98568]/40" />
              <span className="text-[8px] leading-none sm:text-[12px]">✦</span>
              <span className="h-[1px] flex-1 bg-[#b98568]/40" />
            </div>
            
            {/* Short Description */}
            <p className="mx-auto mt-2 max-w-[200px] text-[9px] leading-relaxed text-[#8A3E25]/90 sm:mt-4 sm:max-w-[300px] sm:text-[13px] md:mt-5 md:max-w-[360px] md:text-[14px]">
              Beautifully crafted silhouettes for every celebration and every day.
            </p>
            
          </div>
        </div>
        
      </div>
    </section>
  );
}