import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Users,
  Trophy,
  Calendar,
  ArrowRight,
  ChevronDown,
  Eye,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { EventsSection } from "@/components/events/EventsSection";
import { CtaSection } from "@/components/home/CtaSection";
import { RunnerClubFAQSection } from "@/components/home/WhyChooseUsSection";
import RotatingText from "@/components/RotatingText";
import StarBorder from "../components/StarBorder";
import CommunitySection from "@/components/home/CommunitySection";
import ScrollVelocity from "@/components/Scroll";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />

      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <EventsSection />
        <CommunitySection />
        <div className="bg-black pb-20">
          <ScrollVelocity
            texts={["JOIN NOW!", "Scroll Down"]}
            className="mt-12 text-white"
          />
        </div>
        <RunnerClubFAQSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
