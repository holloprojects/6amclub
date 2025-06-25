"use client";
import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !videoRef.current.muted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src="/video/Hero.webm"
          autoPlay
          muted={isMuted}
          className="absolute inset-0 object-cover w-full h-full"
        >
          <source src="/Hero.webm" type="video/webm" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20 "></div>
      </div>

      {/* Mute/Unmute button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 z-20 bg-black/50 p-3  rounded-full text-white hover:bg-black/70 transition"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col mix-blend-difference items-center justify-center h-full text-center px-4">
        <h1 className="text-5xl md:text-8xl lg:text-7xl font-bionix font-bold text-white mb-8 tracking-wider">
          MOVEMENT, NOT A MOMENT.
        </h1>
      </div>
    </section>
  );
}
