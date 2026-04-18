import Image from "next/image";

export function About() {
  return (
    <section className="py-8 md:py-12 bg-card">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
          {/* Image */}
          <div className="relative h-[400px] md:h-[500px]">
            {/* Main image */}
            <div className="absolute left-0 top-0 w-[100%] h-[100%] overflow-hidden">
              <Image
                src="/images/craftsman.jpg"
                alt="Drew Bott trabalhando em um memorial"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 border border-primary/20" />
            </div>

            {/* Second image — offset bottom right */}
            <div className="absolute right-0 bottom-0 w-[40%] h-[55%] overflow-hidden border-4 border-card">
              <Image
                src="/images/bott-family.jpg"
                alt="Família Bott"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 border border-primary/20" />
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] text-primary uppercase mb-2 md:mb-3">
              WHO WE ARE
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-4 md:mb-6 text-balance">
              A MONUMENT FAMILY
            </h2>

            <div className="space-y-3 md:space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
              <p>
                Drew and Kara Bott are the driving force behind Bott Monument.
              </p>
              <p>
                Drew designs, crafts and installs every memorial. Kara is the
                CFO and is also Drew’s right-hand woman on every job. If you
                come watch the delivery, chances are she’s right there with him.
              </p>
              <p>
                The girls come along as often as possible and make every trip
                enjoyable. They also handle all the photography and time lapse
                videos.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8 pt-6 md:pt-8 border-t border-border/50">
              <div>
                <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary">
                  6
                </span>
                <p className="text-xs text-muted-foreground mt-1">
                  Harold J. Schaller Award wins
                </p>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary">
                  27
                </span>
                <p className="text-xs text-muted-foreground mt-1">
                  National first place awards
                </p>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary">
                  18
                </span>
                <p className="text-xs text-muted-foreground mt-1">
                  Magazine covers featured
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
