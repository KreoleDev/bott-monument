import { User, Users, Flag } from "lucide-react";
import Image from "next/image";

const pillars = [
  {
    icon: Users,
    title: "Uniquely Yours",
    subtitle: "No Clipart. No Catalogs.",
    description:
      "Every design is a bespoke masterpiece. We work in granite, bronze, and stainless steel to craft a tribute as unique as the life it honors.",
    image: "/images/creative.jpg",
  },
  {
    icon: User,
    title: "Direct Connection",
    subtitle: "Personal & One-on-One",
    description:
      "You work exclusively with Drew—from the first conceptual sketch to the final hand-installation. No middlemen, just pure craftsmanship.",
    image: "/images/personal.jpg",
  },
  {
    icon: Flag,
    title: "The American Standard",
    subtitle: "Award-Winning Heritage",
    description:
      "Sourcing only from American quarries. Every memorial is built to national award-winning standards, ensuring a legacy that lasts generations.",
    image: "/images/work-1.jpg",
  },
]

export function Features() {
  return (
    <section id="projects" className="py-24 md:py-20 bg-secondary">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-[10px] tracking-[0.5em] text-primary font-bold uppercase mb-4">
            Why Choose Us
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-white">
            The Pillars of <span className="italic text-white/80">Excellence</span>
          </h2>
          <div className="mt-6 w-12 h-1px bg-primary/40 mx-auto" />
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="group relative min-h-[450px] flex flex-col items-center justify-end overflow-hidden rounded-[2rem] p-8 md:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.36)] ring-1 ring-white/10 transition-all duration-700 hover:-translate-y-2 hover:ring-primary/35"
            >
              <div className="absolute inset-3 rounded-[1.45rem] border border-primary/20 z-20 pointer-events-none transition-colors duration-700 group-hover:border-primary/45" />

              {/* Background Image with Ken Burns Effect */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="rounded-[inherit] object-cover opacity-100 group-hover:scale-110 transition-all duration-[2000ms] ease-out"
                />
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-[70%] rounded-b-[inherit] bg-gradient-to-t from-black/92 via-black/68 via-55% to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 w-full text-center [text-shadow:0_2px_14px_rgba(0,0,0,0.75)]">
                {/* Icon Circle */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-primary/45 bg-black/30 mb-5 group-hover:border-primary group-hover:bg-primary/10 transition-all duration-500">
                  <pillar.icon
                    className="h-6 w-6 text-primary"
                    strokeWidth={1}
                  />
                </div>
                
                <p className="text-[9px] tracking-[0.2em] text-primary uppercase font-bold mb-2 opacity-100 transition-all duration-700">
                  {pillar.subtitle}
                </p>
                
                <h3 className="font-serif text-2xl text-white mb-4">
                  {pillar.title}
                </h3>
                
                <div className="h-auto transition-all duration-700 overflow-hidden opacity-100">
                  <p className="text-sm md:text-[15px] text-white/92 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>

                {/* Bottom Line Decor */}
                <div className="mt-6 w-0 group-hover:w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent transition-all duration-1000" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
