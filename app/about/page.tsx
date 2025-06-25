"use client";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import RotatingText from "@/components/RotatingText";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <main className="flex-1">
        {/* Hero Section with Video */}
        <section className="relative w-full h-[100vh] md:h-[100vh] overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/video/about.mov"
            autoPlay
            loop
            muted
            playsInline
          />
          {/* optional dark overlay behind text */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Text wrapper: no z-index hack needed for blending */}
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <h1 className="mix-blend-difference text-white text-5xl md:text-[85px] font-bionix font-bold tracking-wider">
              <RotatingText
                texts={[
                  "We are 6.AM",
                  "Rise early,",
                  "run far,",
                  "connect strong,",
                  "thrive daily,",
                  "Join the 6AM Club!",
                ]}
                /* make sure the inner spans also carry the blend mode */
                mainClassName="mix-blend-difference px-2 md:px-3 font-rubik overflow-hidden py-1 rounded-lg"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                loop={false}
                staggerDuration={0.005}
                splitLevelClassName="overflow-hidden pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={1500}
              />
            </h1>
          </div>
        </section>

        {/* About Content Section */}
      </main>
    </div>
  );
}
