import { LandingOne, LandingPageOne, LandingPageThree, LandingPageTwo, LandingThree, LandingTwo } from "@/assets";
import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section
      className="flex items-center justify-start relative py-24 bg-cover bg-center bg-no-repeat container mx-auto rounded-md shadow-md shadow-[#10182814] border !border-white"
      style={{
        background: 'linear-gradient(180deg, #E0F3FE 34.14%, rgba(224, 243, 254, 0) 119.15%)',
      }}
    >
      <div className="container mx-auto px-6 md:px-10 lg:px-16 ">
        {/* text area */}
        <div className="bg-[#170053] backdrop-blur-sm p-6 md:p-10 rounded-lg w-full shadow-lg">
          <div className="">
            <h1 className="!text-xl md:!text-2xl lg:!text-3xl text-white mb-2 leading-tight w-full lg:!w-3/5 xl:!w-2/5 ">
              Best Deal Online on Real Estate Properties
            </h1>

            <h2 className="!text-xl md:!text-2xl lg:!text-3xl font-extrabold text-primary">UP to 80% OFF</h2>
          </div>
        </div>

        {/* images area */}

        <div className="absolute top-15 xl:top-10 right-8 xl:right-10 hidden lg:block">
          <img
            src={LandingPageOne}
            alt="hero"
            className=" lg:w-64 xl:w-80 lg:h-72 xl:h-80 object-cover rounded-md"
          />
          <div className="absolute top-16 xl:top-20 -left-20 xl:-left-30">
            <img
              src={LandingPageTwo}
              alt="hero"
              className="w-32 h-36 xl:w-48 xl:h-48 object-cover rounded-lg "
            />

            <div className="absolute -bottom-10 -left-10 xl:-left-20">
              <img
                src={LandingPageThree}
                alt="hero"
                className="w-24 h-24 xl:w-32 xl:h-32 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
