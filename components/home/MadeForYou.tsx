import Image from "next/image";



export default function MadeForYou() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f5e8d8]">
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] min-h-[420px] sm:min-h-0">
        
        {/* Background Image */}
        <Image
          src="/madefor.png"
          alt="Rooted in tradition collection"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        
        {/* Light overlay for readability on small screens */}
        <div className="absolute inset-0 bg-white/10 md:bg-transparent" />

        {/* Dynamic Wrapper */}
        <div className="absolute inset-0 mx-auto max-w-[1340px] p-4 sm:p-6 md:p-8">
          
          {/* Floating Photo Labels (Visible from sm screen onwards to ensure clean mobile view) */}
          

          {/* Center/Right Content Layout */}
          <div className="flex h-full w-full items-center justify-center md:justify-start">
            
            <div className="w-full max-w-[290px] text-center sm:max-w-[400px] md:ml-[45%] md:max-w-[460px] lg:max-w-[520px]">
              
              {/* Heading */}
              <h2 className="font-serif text-[24px] font-semibold leading-[1.05] tracking-tight text-[#8A3E25] sm:text-[36px] md:text-[46px] lg:text-[58px]">
                ROOTED IN
                <br />
                TRADITION,
              </h2>
              
              {/* Script Subheading */}
              <p className="mt-1 font-serif text-[22px] font-normal leading-none text-[#747960] italic sm:mt-2 sm:text-[34px] md:text-[44px] lg:text-[56px]">
                Made for You
              </p>

              {/* Decorative Top Divider */}
              <div className="mx-auto mt-3 flex w-[100px] items-center gap-2 text-[#b98568] sm:mt-5 sm:w-[150px]">
                <span className="h-[1px] flex-1 bg-[#c79c78]/60" />
                <span className="text-[10px] sm:text-[14px]">✥</span>
                <span className="h-[1px] flex-1 bg-[#c79c78]/60" />
              </div>
              
              {/* Sub-text */}
              <p className="mt-3 text-[9px] font-bold tracking-[0.12em] text-[#8A3E25] sm:mt-5 sm:text-[11px] md:text-[12px]">
                HANDPICKED STYLES FOR EVERY YOU
              </p>
              
              {/* Decorative Bottom Divider */}
              <div className="mx-auto mt-3 flex w-[100px] items-center gap-2 text-[#b98568] sm:mt-5 sm:w-[150px]">
                <span className="h-[1px] flex-1 bg-[#c79c78]/60" />
                <span className="text-[10px] sm:text-[14px]">✥</span>
                <span className="h-[1px] flex-1 bg-[#c79c78]/60" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}