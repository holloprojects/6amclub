import React from "react";
import Image from "next/image";
import { Header } from "@/components/layout/header";

const page = () => {
  return (
    <div>
      <Header />
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://i.pinimg.com/736x/b7/dd/46/b7dd46714bc9f741d9861adf3b1fa564.jpg"
            alt="Монголын байгаль"
            fill
            className="object-cover"
            priority
          />
          <video
            src="/video/test.mp4"
            autoPlay
            loop
            muted
            className="absolute inset-0 object-cover w-full h-full"
          >
            <source src="/video/test.mp4" type="video/mp4" />
          </video>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Content */}
        <div className="relative  z-10 flex flex-col mix-blend-difference items-center justify-center h-full text-center px-4">
          {/* Main Title */}
          <h1 className="text-6xl flex font-bionix    md:text-8xl lg:text-7xl font-bold text-white mb-8 tracking-wider">
            MOVEMENT, NOT A MOMENT.
          </h1>
        </div>
      </section>
    </div>
  );
};

export default page;
