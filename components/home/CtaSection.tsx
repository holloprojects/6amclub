"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export function CtaSection() {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <section className="w-full py-12 md:py-24 lg:mt-36 lg:py-[180px] text-black bg-white relative overflow-hidden">
      {/* Overlay always on top */}
      {hovered && (
        <div
          className="pointer-events-none z-[9999] fixed"
          style={{
            left: mousePos.x + 12 + "px",
            top: mousePos.y + 12 + "px",
            transform: "translate(-50%, -100%)",
            position: "fixed",
            pointerEvents: "none",
          }}
        >
          <div className="backdrop-invert cursor-none rounded-full px-4 py-3 flex items-center justify-center">
            <span className="z-50 text-black text-2xl font-bold shadow-lg whitespace-nowrap">
              Join ?
            </span>
          </div>
        </div>
      )}
      <div
        className="absolute inset-0  border-[1px] border-black h-full z-0 cursor-pointer"
        style={{
          backgroundImage: 'url("/upscale.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden="true"
      />
      {/* New parent div for hover logic */}
      <div
        className="absolute inset-0 w-full h-full z-10 flex items-center justify-center cursor-none"
        style={{ pointerEvents: "auto" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={(e) => {
          setMousePos({
            x: e.clientX,
            y: e.clientY,
          });
        }}
      >
        <div className="relative container px-4 z-20">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex flex-col  p-4  items-center gap-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl  text-white">
                Community-д нэгдэхэд бэлэн үү?
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
