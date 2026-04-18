const steps = [
  {
    number: "01",
    title: "FIRST ENCOUNTER",
    description:
      "By phone, email, or in person, Drew will listen and get to know you and your loved one. This first visit can be as brief or as long as you need.",
  },
  {
    number: "02",
    title: "DESIGN PROCESS",
    description:
      "Drew will craft a unique memorial based on your input, then send you the designs for review. Revisions are always welcome — no question asked.",
  },
  {
    number: "03",
    title: "FINISHED PRODUCT",
    description:
      "Once you choose a design, Drew will provide the quote and adjust as needed to fit your budget. After approval, your memorial will be created and installation scheduled.",
  },
];

export function Process() {
  return (
    <section id="processo" className="py-8 md:py-12 bg-secondary">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-2">
          <p className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] text-primary uppercase mb-2">
            How it works
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground text-balance">
            THE PROCESS
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <span className="font-serif text-4xl sm:text-5xl md:text-6xl text-primary/20 block mb-1">
                {step.number}
              </span>
              <div>
                <h3 className="font-serif text-lg md:text-xl text-foreground mb-2 md:mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden sm:block absolute top-1/2 -right-4 w-8 h-px bg-primary/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
