import { User, Users, Flag } from "lucide-react";
import Image from "next/image";

const pillars = [
  {
    icon: Users,
    title: "Uniquely Yours",
    description:
      "No catalogs, no clipart. Every design is one-of-a-kind — crafted in granite, bronze, or stainless steel to honor your loved one in a way only Drew can.",
    image: "/images/creative.jpg",
  },
  {
    icon: User,
    title: "Personal & One on One",
    description:
      "We build a relationship before we ever talk monuments. You work with Drew and only Drew — from first conversation to final installation.",
    image: "/images/personal.jpg",
  },
  {
    icon: Flag,
    title: "American Made & Award-Winning",
    description:
      "Only American quarries, only American craftsmen. Every memorial is built to magazine-worthy standards — backed by national awards to prove it.",
    image: "/images/american-made.jpg.jpg",
  },
]

export function Features() {
  return (
    <section id="sobre" className="py-8 md:py-12 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-8">
          <p className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] text-primary uppercase mb-2">
            WHY CHOOSE US
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground text-balance">
            OUR PILLARS
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="group relative p-5 md:p-6 border border-border/50 hover:border-primary/30 transition-all duration-500 text-center overflow-hidden min-h-[260px] flex flex-col items-center justify-center"
            >
              {/* Background image on hover */}
              <div className="absolute inset-0 ">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 border border-primary/30 mb-4 md:mb-5 group-hover:border-primary transition-colors duration-500">
                  <pillar.icon
                    className="h-5 w-5 md:h-6 md:w-6 text-primary"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-serif text-lg md:text-xl text-foreground mb-2 md:mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed ">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
