"use client";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import RotatingText from "@/components/RotatingText";

export default function CommunityPage() {
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
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-5xl md:text-7xl font-rubik font-bold text-white mb-6 tracking-wider drop-shadow-lg">
              <RotatingText
                texts={[
                  "6AM Club Community",
                  "Connect, Share, Grow",
                  "Join the Movement!",
                ]}
                mainClassName="px-2 sm:px-2 md:px-3 font-rubik text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                loop={false}
                staggerDuration={0.005}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={1500}
              />
            </h1>
          </div>
          {/* Animated Scroll Down Button - perfectly centered */}
          <div className="pointer-events-none absolute left-0 right-0 bottom-0 flex justify-center z-20 w-full">
            <button
              onClick={() => {
                const el = document.getElementById("about-community-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="pointer-events-auto mb-6 bg-black hover:bg-white text-[#ff7345] font-bold py-1 px-2 rounded-full shadow-lg flex flex-col items-center animate-bounce transition-all duration-300 border border-[#ff7345]"
              style={{ backdropFilter: "blur(4px)" }}
              aria-label="Scroll Down"
            >
              <svg
                className="w-6 h-6 animate-bounce"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </section>
        {/* About Community Section */}
        <section
          id="about-community-section"
          className="w-full py-12 md:py-16 bg-white"
        >
          <div className="container px-4 md:px-6 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#ff7345]">
              About Our Community
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              The 6AM Club Community brings together people who believe in
              starting their day with purpose. Whether you're a runner, a
              reader, or just want to make the most of your mornings, you'll
              find support and inspiration here.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Share your morning wins and routines</li>
              <li>Find accountability partners</li>
              <li>Join group challenges and events</li>
              <li>Celebrate milestones together</li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
