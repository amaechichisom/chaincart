import { LandingPageOne, LandingPageThree, LandingPageTwo } from "@/assets";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 2;

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slides = [
    {
      id:1,
      title: "Best Deal Online on Real Estate Properties",
      subtitle: "UP to 80% OFF",
      description: "", 
      images: [LandingPageTwo, LandingPageThree, LandingPageOne],
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #4c1d95 100%)'
    },
    {
      id:2,
      title: "UP to 80% OFF on",
      subtitle: "Land properties around Lagos-Ikeja",
      description: "",
      images: [LandingPageOne, LandingPageTwo, LandingPageThree],
      background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #D2691E 100%)'
    },
    
  ];

  const slideVariants = {
    enter: {
      opacity: 0,
      scale: 0.8,
    },
    center: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 1.2,
    }
  };

  const textVariants = {
    enter: {
      opacity: 0,
      y: 20,
    },
    center: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -20,
    }
  };

  return (
    <section
      className="flex items-center justify-start relative py-16 md:py-24 bg-cover bg-center bg-no-repeat container mx-auto rounded-md shadow-md shadow-[#10182814] border !border-white overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #E0F3FE 34.14%, rgba(224, 243, 254, 0) 119.15%)',
      }}
    >
      <div className="container mx-auto px-6 md:px-10 lg:px-16 relative z-10 ">
        {/* Text area */}
        <motion.div 
          className="backdrop-blur-sm p-6 md:p-10 rounded-lg w-full shadow-lg relative z-20"
          style={{
            background: slides[currentSlide].background,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          initial={{ opacity: 0, y: 50 }}
        >
          <div className="space-y-2">
            <AnimatePresence mode="wait">
              <motion.h1 
                key={`title-${currentSlide}`}
                className={`!text-xl md:!text-2xl lg:!text-3xl ${slides[currentSlide].id % 2 === 0 ? "text-[#F59E0B] font-bold" : "text-white"} mb-2 leading-tight w-full lg:!w-3/5`}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {slides[currentSlide].title}
              </motion.h1>
            </AnimatePresence>
            
            <AnimatePresence mode="wait">
              <motion.h2 
                key={`subtitle-${currentSlide}`}
                className={`!text-xl md:!text-2xl lg:!text-3xl font-extrabold ${slides[currentSlide].id % 2 === 0 ? "text-white" : " text-[#36C5FA] font-bold"}`}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, delay: 0.1, ease: "easeInOut" }}
              >
                {slides[currentSlide].subtitle}
              </motion.h2>
            </AnimatePresence>
            
            <AnimatePresence mode="wait">
              <motion.p 
                key={`description-${currentSlide}`}
                className="text-white text-sm md:text-base opacity-90"
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
              >
                {slides[currentSlide].description}
              </motion.p>
            </AnimatePresence>
          </div>
          
          {/* Dots indicator */}
          <div className="flex gap-2 mt-6">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? `${slides[currentSlide].id % 2 !== 0 ? "bg-[#36C5FA]" : "bg-[#F59E0B]"}` 
                    : 'bg-[#F59E0B]/40 hover:bg-[#F59E0B]/60'
                }`}
                animate={{
                  width: index === currentSlide ? 24 : 12,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Images area */}
        <div className="absolute top-10 xl:-top-15 right-10 xl:right-20 hidden lg:block z-30 scale-95 ">
          <div className="relative">
            {/* Main large image */}
            <div className="relative overflow-hidden rounded-md">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`main-${currentSlide}`}
                  src={slides[currentSlide].images[0]}
                  alt="hero"
                  className="lg:w-64 xl:w-80 lg:h-72 xl:h-80 object-cover rounded-md"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </AnimatePresence>
            </div>
            
            {/* Medium image - top left overlay */}
            <div className={`absolute  ${slides[currentSlide].id % 2 === 0 ? "top-10 xl:top-16 -right-20 xl:-right-30" :"top-16 xl:top-20 -left-20 xl:-left-30"}  z-40`}>
              <div className="relative overflow-hidden rounded-lg">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`medium-${currentSlide}`}
                    src={slides[currentSlide].images[1]}
                    alt="hero"
                    className="w-32 h-36 xl:w-48 xl:h-48 object-cover rounded-lg"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
                  />
                </AnimatePresence>
              </div>

              {/* Small image - bottom left overlay */}
              <div className={`absolute  ${slides[currentSlide].id % 2 === 0 ? "bottom-10 -left-70 xl:-left-80" :"-bottom-10 -left-10 xl:-left-20"} z-50 `}>
                <div className="relative overflow-hidden rounded-lg">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`small-${currentSlide}`}
                      src={slides[currentSlide].images[2]}
                      alt="hero"
                      className="w-24 h-24 xl:w-32 xl:h-32 object-cover rounded-lg"
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
                    />
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Image Display */}
        <div className="block lg:hidden mt-8">
          <div className="flex justify-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={`mobile-${currentSlide}`}
                src={slides[currentSlide].images[0]}
                alt="hero"
                className="w-full max-w-sm h-48 md:h-64 object-cover rounded-md"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <motion.button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-300 z-50 hidden md:block"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>
      
      <motion.button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % totalSlides)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-300 z-50 hidden md:block"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
    </section>
  );
};

export default HeroSection;     