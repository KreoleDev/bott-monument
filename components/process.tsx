"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Check } from "lucide-react";

const steps = [
  { 
    number: "01", 
    title: "FIRST ENCOUNTER", 
    description: "By phone, email, or in person, Drew will listen and get to know you and your loved one to understand your vision.",
    image: "/images/work-1.jpg" 
  },
  { 
    number: "02", 
    title: "DESIGN PROCESS", 
    description: "Drew will craft a unique memorial based on your input, providing detailed 3D designs for your personal review.",
    image: "/images/work-2.jpg" 
  },
  { 
    number: "03", 
    title: "FINISHED PRODUCT", 
    description: "After your final approval, the memorial is meticulously created and prepared for its lasting place of honor.",
    image: "/images/work-3.jpg" 
  },
];

export function Process() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  
  const isSectionInView = useInView(containerRef, { once: false, amount: 0.2 });
  const duration = 3000;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isSectionInView) {
      setActiveIndex(0);
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
      }, duration);
    }

    return () => clearInterval(interval);
  }, [isSectionInView]);

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-card overflow-hidden relative">
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-20 md:mb-28 text-center space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-6 bg-primary/40" />
            <motion.span 
              initial={{ opacity: 0, letterSpacing: "0.3em" }}
              animate={isSectionInView ? { opacity: 0.75, letterSpacing: "0.6em" } : { opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="text-primary text-[10px] font-bold uppercase tracking-[0.6em]"
            >
              The Journey
            </motion.span>
            <div className="h-[1px] w-6 bg-primary/40" />
          </div>
          <h2 className="font-serif text-5xl md:text-6xl text-white tracking-tight">
            Our <span className="italic font-light text-white/80">Process</span>
          </h2>
        </div>

        <div className="relative">
          {/* Premium Progress Connector - Desktop */}
          <div className="hidden md:block absolute top-[88px] left-[16.67%] right-[16.67%] z-10">
            {/* Background track */}
            <div className="absolute inset-0 top-1/2 -translate-y-1/2 h-[2px] bg-white/5 rounded-full" />
            
            {/* Animated progress line */}
            <div className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-primary via-primary to-primary/50 rounded-full transition-all duration-700 ease-out"
              style={{ 
                width: `${(activeIndex / (steps.length - 1)) * 100}%`,
                boxShadow: '0 0 12px rgba(200,166,106,0.4)'
              }} 
            />
            
            {/* Connector dots */}
            {steps.map((_, index) => {
              const isCompleted = activeIndex > index;
              const isActive = activeIndex === index;
              const position = (index / (steps.length - 1)) * 100;
              
              return (
                <motion.div
                  key={index}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                  style={{ left: `${position}%` }}
                  animate={{
                    scale: isActive ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Outer glow ring for active */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 -m-2 rounded-full bg-primary/20"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  
                  {/* Main connector dot */}
                  <motion.div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                      isCompleted 
                        ? 'bg-primary border-primary' 
                        : isActive 
                          ? 'bg-primary/20 border-primary' 
                          : 'bg-card border-white/20'
                    }`}
                    animate={{
                      boxShadow: isActive || isCompleted ? '0 0 16px rgba(200,166,106,0.5)' : 'none'
                    }}
                  >
                    {isCompleted && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <Check className="w-2.5 h-2.5 text-primary-foreground" strokeWidth={3} />
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-20">
            {steps.map((step, index) => {
              const isCompleted = activeIndex > index;
              const isActive = activeIndex === index;

              return (
                <div 
                  key={index} 
                  className="relative flex flex-col items-center cursor-pointer group select-none"
                  onClick={() => setActiveIndex(index)}
                >
                  {/* Mobile Progress Line */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden absolute top-[88px] left-1/2 w-[2px] h-12 -translate-x-1/2 translate-y-full">
                      <div className="w-full h-full bg-white/10 rounded-full" />
                      <motion.div 
                        className="absolute top-0 left-0 w-full bg-primary rounded-full"
                        animate={{ height: isCompleted || isActive ? '100%' : '0%' }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  )}

                  {/* Image Circle Container */}
                  <div className="relative z-20 mb-6">
                    {/* Circular progress ring */}
                    <svg className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)] -rotate-90">
                      {/* Background ring */}
                      <circle
                        cx="50%" cy="50%" r="48%"
                        stroke="currentColor" 
                        strokeWidth="1" 
                        fill="transparent"
                        className="text-white/10"
                      />
                      {/* Progress ring */}
                      {isActive && isSectionInView && (
                        <motion.circle
                          cx="50%" cy="50%" r="48%"
                          stroke="url(#progressGradient)"
                          strokeWidth="2"
                          fill="transparent"
                          strokeLinecap="round"
                          strokeDasharray="301.59"
                          initial={{ strokeDashoffset: 301.59 }}
                          animate={{ strokeDashoffset: 0 }}
                          transition={{ duration: duration / 1000, ease: "linear" }}
                        />
                      )}
                      {/* Completed ring */}
                      {isCompleted && (
                        <circle
                          cx="50%" cy="50%" r="48%"
                          stroke="#C8A66A"
                          strokeWidth="2"
                          fill="transparent"
                          className="opacity-60"
                        />
                      )}
                      <defs>
                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#C8A66A" stopOpacity="0.3" />
                          <stop offset="50%" stopColor="#C8A66A" stopOpacity="1" />
                          <stop offset="100%" stopColor="#C8A66A" stopOpacity="0.3" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Image Frame */}
                    <motion.div 
                      animate={{ 
                        scale: isActive ? 1.05 : 1,
                        borderColor: isActive ? "#C8A66A" : isCompleted ? "rgba(200,166,106,0.5)" : "rgba(255,255,255,0.15)",
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="w-36 h-36 md:w-44 md:h-44 rounded-full border-2 overflow-hidden bg-secondary relative"
                    >
                      <motion.img 
                        src={step.image}
                        alt={step.title}
                        animate={{ 
                          filter: isCompleted || isActive ? "grayscale(0%)" : "grayscale(40%)",
                          scale: isActive ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      
                      {/* Overlay for inactive */}
                      <motion.div 
                        className="absolute inset-0 bg-black/40"
                        animate={{ opacity: isCompleted || isActive ? 0 : 0.4 }}
                        transition={{ duration: 0.5 }}
                      />

                      {/* Step number badge */}
                      <motion.div
                        className={`absolute -bottom-1 -right-1 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                          isCompleted 
                            ? 'bg-primary border-primary text-primary-foreground' 
                            : isActive 
                              ? 'bg-primary border-primary text-primary-foreground'
                              : 'bg-card border-white/20 text-white/60'
                        }`}
                        animate={{ 
                          scale: isActive ? [1, 1.1, 1] : 1,
                        }}
                        transition={{ duration: 0.5, repeat: isActive ? Infinity : 0, repeatDelay: 1 }}
                      >
                        {isCompleted ? <Check className="w-4 h-4" strokeWidth={3} /> : step.number}
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Phase Label */}
                  <motion.span 
                    animate={{ opacity: isActive ? 0.9 : 0.5 }}
                    className="text-[10px] font-sans font-semibold tracking-[0.3em] text-primary mb-2"
                  >
                    PHASE {step.number}
                  </motion.span>

                  {/* Step Title */}
                  <motion.h3 
                    animate={{ 
                      color: isCompleted || isActive ? "#ffffff" : "rgba(255,255,255,0.6)",
                    }}
                    className="font-serif text-sm md:text-base tracking-[0.2em] uppercase text-center"
                  >
                    {step.title}
                  </motion.h3>
                </div>
              );
            })}
          </div>

          {/* Dynamic Description Area */}
          <div className="max-w-3xl mx-auto text-center min-h-[100px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-6 flex flex-col items-center"
              >
                <p className="text-white/70 text-base md:text-lg font-light leading-relaxed max-w-2xl px-4 font-serif italic">
                  &ldquo;{steps[activeIndex].description}&rdquo;
                </p>
                
                {/* Step Progress Indicator */}
                <div className="flex items-center gap-3 mt-4">
                  {steps.map((_, dotIndex) => (
                    <button 
                      key={dotIndex}
                      onClick={() => setActiveIndex(dotIndex)}
                      className="relative group"
                    >
                      <motion.div
                        className={`h-1 rounded-full transition-all duration-500 ${
                          activeIndex === dotIndex 
                            ? 'w-10 bg-primary' 
                            : activeIndex > dotIndex 
                              ? 'w-4 bg-primary/50' 
                              : 'w-4 bg-white/20'
                        }`}
                        whileHover={{ scale: 1.2 }}
                      />
                      {activeIndex === dotIndex && (
                        <motion.div
                          className="absolute inset-0 bg-primary/30 rounded-full blur-sm"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
