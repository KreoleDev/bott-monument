import Image from "next/image";

export function About() {
  return (
    // ADICIONADO: id="about" para o Header encontrar esta seção
    <section id="about" className="py-12 md:py-1 bg-[#1a1d23] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual Side */}
          <div className="relative h-[450px] md:h-[600px] w-full">
            {/* Main image - Craftsman */}
            <div className="absolute left-0 top-0 w-[90%] h-[90%] overflow-hidden shadow-2xl">
              <Image
                src="/images/craftsman.jpg"
                alt="Drew Bott crafting a memorial"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Second image — Family (The Heart of the Brand) */}
            <div className="absolute right-0 bottom-0 w-[45%] h-[50%] overflow-hidden border-[8px] border-[#1a1d23] shadow-2xl z-10">
              <Image
                src="/images/bott-family.jpg"
                alt="The Bott Family"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Decorative Gold Element */}
            <div className="absolute -left-4 -bottom-4 w-24 h-24 border-l-2 border-b-2 border-[#f9b000]/30 -z-10" />
          </div>

          {/* Content Side */}
          <div className="flex flex-col justify-center">
            <p className="text-[10px] tracking-[0.4em] text-[#f9b000] font-bold uppercase mb-4">
              Our Legacy
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-8 leading-tight">
              A Family Dedicated to <br/>
              <span className="italic text-white/90">the Art of Remembrance</span>
            </h2>

            <div className="space-y-6 text-base md:text-lg text-white/60 font-light leading-relaxed max-w-xl">
              <p>
                Drew and Kara Bott are the visionaries behind <span className="text-white font-medium">Bott Monument</span>. 
                With a passion for excellence, every memorial is a testament to their 
                commitment to honoring life.
              </p>
              <p>
                As a true family-owned business, Drew personally designs, crafts, 
                and installs every monument. Kara, our CFO, is the cornerstone of 
                every operation—often found on-site ensuring every delivery is handled 
                with the utmost care.
              </p>
              <p>
                Their daughters represent the future of this craft, capturing 
                the process through photography and time-lapse, documenting 
                each tribute from stone to sanctuary.
              </p>
            </div>

            {/* Stats Block - US Social Proof */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-10 border-t border-white/10">
              <div className="text-center lg:text-left">
                <span className="block font-serif text-3xl md:text-4xl text-[#f9b000]">6</span>
                <p className="text-[9px] uppercase tracking-widest text-white/40 mt-2">
                  Harold Schaller <br/> Awards
                </p>
              </div>
              <div className="text-center lg:text-left">
                <span className="block font-serif text-3xl md:text-4xl text-[#f9b000]">27</span>
                <p className="text-[9px] uppercase tracking-widest text-white/40 mt-2">
                  National <br/> First Places
                </p>
              </div>
              <div className="text-center lg:text-left">
                <span className="block font-serif text-3xl md:text-4xl text-[#f9b000]">18</span>
                <p className="text-[9px] uppercase tracking-widest text-white/40 mt-2">
                  Magazine <br/> Features
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}