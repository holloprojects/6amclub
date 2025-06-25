"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import TiltedCard from "../TiltedCard";

export function EventsSection() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Drag-to-scroll refs
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Mouse events
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    scrollRef.current.classList.add("cursor-grabbing");
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1; // sensitivity
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) {
      scrollRef.current.classList.remove("cursor-grabbing");
    }
  };

  const onMouseLeave = () => {
    isDragging.current = false;
    if (scrollRef.current) {
      scrollRef.current.classList.remove("cursor-grabbing");
    }
  };

  // Touch events
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = e.touches[0].pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onTouchEnd = () => {
    isDragging.current = false;
  };

  const pastEvents = [
    {
      id: 1,
      title: "Morning Run & Coffee",
      date: "May 25, 2024",
      image: "/image.png",
    },
    {
      id: 2,
      title: "5K Charity Run",
      date: "April 12, 2024",
      image: "/image1.png",
    },
    {
      id: 3,
      title: "Beach Yoga Session",
      date: "March 30, 2024",
      image: "/image2.png",
    },
    {
      id: 4,
      title: "Mountain Hike",
      date: "February 18, 2024",
      image: "/image3.png",
    },
    {
      id: 5,
      title: "Community Potluck",
      date: "January 20, 2024",
      image: "/image.png",
    },
  ];

  return (
    <section className="h-fit bg-white p-8">
      {/* Title and Description */}
      <div>
        <h1 className="text-7xl text-end font-thin font-rammeto mb-2">
          Join our next events
        </h1>
        <p className="text-gray-800 text-end mb-8 font-mono text-lg">
          Be part of our vibrant community! Discover upcoming gatherings and
          relive memorable moments from past events.
        </p>
      </div>

      <div className="flex md:justify-between justify-center items-center mb-4">
        <div className="flex items-center gap-8">
          <div className="flex bg-white rounded-full p-1 border">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={cn(
                "px-6 py-2 rounded-full transition-colors",
                activeTab === "upcoming"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={cn(
                "px-6 py-2 rounded-full transition-colors",
                activeTab === "past"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              Past Events
            </button>
          </div>
        </div>
      </div>

      {activeTab === "upcoming" && (
        <section className="w-full flex flex-col h-full mb-36">
          <div
            className="container flex flex-col py-12 px-4 md:px-6 relative"
            style={{ minHeight: 500 }}
          >
            {/* Headline text absolutely positioned */}
            <div className="absolute mix-blend-difference inset-0 flex items-center justify-start p-8 md:p-12 lg:p-16 pointer-events-none z-10">
              <div className="max-w-2xl">
                <h2 className="font-alfa text-4xl font-thin leading-none tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-8xl drop-shadow-lg">
                  WHAT IS
                  <br />
                  THE
                  <br />
                  6.AM CLUB
                  <br />
                  ALL ABOUT?
                </h2>
              </div>
            </div>
            {/* The tilting image */}
            <TiltedCard
              imageSrc="/About.png"
              altText="6.AM Club members running"
              captionText=""
              containerHeight="500px" // Use a px value!
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={10}
              scaleOnHover={1}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={false}
              overlayContent={null}
            />
            {/* Join button absolutely positioned */}
            <Link href="/events">
              <Button className="absolute right-12 bottom-24 bg-black font-bold w-[100px] hover:backdrop-invert hover:bg-black rounded-3xl p-2 flex items-center justify-center z-20">
                Join
              </Button>
            </Link>
          </div>
        </section>
      )}

      {activeTab === "past" && (
        <section
          className="w-full overflow-x-auto scrollbar-hide cursor-grab select-none"
          ref={scrollRef}
          style={{ scrollSnapType: "x mandatory" }}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchMove={onTouchMove}
        >
          <div className="flex gap-4 px-4 pb-4">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="relative flex-shrink-0 md:w-[400px] md:h-[450px] w-[200px] h-[250px] rounded-3xl overflow-hidden scroll-snap-align-start"
              >
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="max-w-xs text-center">
                    <h2 className="font-alfa text-2xl font-thin leading-tight tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-black to-white drop-shadow-lg whitespace-pre-line">
                      {event.title.toUpperCase()}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
