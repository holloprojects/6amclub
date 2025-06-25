"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Calendar as CalendarIcon } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

const events = [
  {
    id: "saturday-10k",
    title: "Бямба гарагийн өглөөний 10К",
    date: "Бямба гараг, 2024 оны 3-р сарын 15",
    time: "08:00 - 10:00",
    location: "Төв цэцэрлэгт хүрээлэн, Улаанбаатар",
    participants: "45/60 оролцогч",
    badge: { text: "Онцлох", color: "bg-[#ff7345]" },
    status: { text: "Нээлттэй", color: "text-green-600 border-green-600" },
    description:
      "Төв цэцэрлэгт хүрээлэнгээр дамжин өнгөрөх 10К гүйлтэд нэгдээрэй. Хурдаа сайжруулахыг хүсч буй дунд түвшний гүйгчдэд тохиромжтой.",
    image: "/image.png",
  },
  {
    id: "sunset-5k",
    title: "Нар жаргах 5К хөгжилтэй гүйлт",
    date: "Баасан гараг, 2024 оны 3-р сарын 20",
    time: "18:30 - 20:00",
    location: "Туул голын эрэг, Улаанбаатар",
    participants: "28/40 оролцогч",
    badge: { text: "Анхан шатны", color: "bg-[#ff7345]" },
    status: { text: "Нээлттэй", color: "text-green-600 border-green-600" },
    description:
      "Анхан шатны гүйгчид эсвэл нар жаргах үзэсгэлэнтэй оройн нийгмийн гүйлт хийхийг хүсэгчдэд тохиромжтой тайван 5К гүйлт.",
    image: "/image1.png",
  },
  {
    id: "half-marathon",
    title: "Хагас марафоны бэлтгэл",
    date: "Ням гараг, 2024 оны 3-р сарын 22",
    time: "07:00 - 10:00",
    location: "Богд хан уул, Улаанбаатар",
    participants: "15/25 оролцогч",
    badge: { text: "Сорилт", color: "bg-[#ff7345]" },
    status: { text: "Нээлттэй", color: "text-green-600 border-green-600" },
    description:
      "Хагас марафоны эрчимтэй бэлтгэлийн хичээл. Туршлагатай дасгалжуулагчидтайгаа тэсвэр хатуужил, хурдыг бэхжүүлээрэй.",
    image: "/image2.png",
  },
  {
    id: "coffee-jog",
    title: "Кофе ба 3 миль гүйлт",
    date: "Лхагва гараг, 2024 оны 3-р сарын 25",
    time: "07:00 - 09:00",
    location: "Сүхбаатарын талбай",
    participants: "18/20 оролцогч",
    badge: { text: "", color: "bg-[#ff7345]" },
    status: { text: "Нээлттэй", color: "text-green-600 border-green-600" },
    description:
      "Амархан хэмнэлтэй 3 милийн гүйлт, дараа нь кофе уугаад сүлжээ үүсгэх. Гүйгч найзуудтайгаа танилцахад маш сайн!",
    image: "/image3.png",
  },
  {
    id: "city-lights",
    title: "Хотын гэрэл 8К",
    date: "Бямба гараг, 2024 оны 3-р сарын 28",
    time: "19:00 - 21:00",
    location: "Чингисийн талбайгаас Зайсан толгой",
    participants: "32/50 оролцогч",
    badge: { text: "Шөнийн гүйлт", color: "bg-[#ff7345]" },
    status: { text: "Нээлттэй", color: "text-green-600 border-green-600" },
    description:
      "Хотын гайхамшигтай үзэсгэлэнтэй оройн 8К гүйлтээр хотыг урьд өмнө хэзээ ч мэдэрч байгаагүй байдлаар мэдрээрэй.",
    image: "/image.png",
  },
  {
    id: "latest",
    title: "",
    date: "",
    time: "",
    location: "",
    participants: "",
    badge: { text: "", color: "bg-[#ff7345]" },
    status: { text: "", color: "" },
    description: "",
    image: "/placeholder.jpg",
  },
];

export default function EventDetailPage() {
  const { id } = useParams();
  const event = events.find((e) => e.id === id);

  // Special case: Event creation form for 'latest'
  if (id === "latest") {
    // Demo event data for the UI
    const eventData = {
      title: "6.AM CLUB: THE LAST EVENT",
      date: "Saturday, June 28",
      time: "6:00pm – 9:30pm",
      host: {
        name: "Tugo Onesixten",
        avatar: "/placeholder-user.jpg",
      },
      location: "RSVP to see location",
      spots: "2432/3000 spots left",
      rsvpBy: "RSVP by Friday",
      tags: [
        {
          icon: "🔥",
          text: "6.AM CLUB: Party + DJ 🎵",
          color: "text-orange-500",
        },
      ],
      image: "/event.png", // Use a bonfire or party image from public/
    };

    return (
      <div
        className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, #ff6600 0%, #b92d06 100%)",
        }}
      >
        {/* Animated streaks background (optional, can be improved with canvas or CSS) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="w-full h-full bg-[url('/cta.png')] bg-cover bg-center opacity-60" />
        </div>
        <Header />
        <main className="relative z-10 flex mt-24 flex-col md:flex-row items-start justify-start w-full h-full px-4 py-12 gap-8">
          {/* Left: Event Info */}
          <div className="flex-1 flex flex-col justify-start items-start max-w-xl text-white drop-shadow-lg">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              {eventData.title}
            </h1>
            <div className="text-2xl mb-2">{eventData.date}</div>
            <div className="text-lg mb-8">{eventData.time}</div>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 border border-white/30 mb-8">
              <span className="text-2xl">…</span>
            </button>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-lg">🏆 Hosted by</span>
              <img
                src={eventData.host.avatar}
                alt="host"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <span className="font-semibold">{eventData.host.name}</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-white/80">📍</span>
              <span className="text-blue-200 underline cursor-pointer">
                {eventData.location}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-white/80">👥</span>
              <span>{eventData.spots}</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-white/80">⏳</span>
              <span>{eventData.rsvpBy}</span>
            </div>
            <div className="flex items-center gap-2 mt-4">
              {eventData.tags.map((tag, i) => (
                <span key={i} className={`text-base font-bold ${tag.color}`}>
                  {tag.icon} <span className="text-blue-300">6.AM CLUB</span>:
                  Party + DJ 🎵
                </span>
              ))}
            </div>
            {/* Event Description */}
            <div className="mb-4 text-white/90 leading-relaxed">
              Амралтын оройг хөгжмийн хэмнэл, шинэ хүмүүстэй танилцах уур
              амьсгалаар дүүрэн өнгөрүүлэх үдэшлэгт урьж байна. Энэ удаагийн
              эвент өмнөхөөсөө өөр. Бид уулзах газрыг 24 цагийн өмнө л зарлана.
              Нууц байдал, догдлол, гэнэтийн мэдрэмжээр дүүрэн орой таныг хүлээж
              байна.
              <br />
              <br />
              ⸻<br />
              <br />
              🕕 <b>Хөтөлбөр:</b>
              <br />
              06:00PM — Цуглах + Warm-up vibes
              <br />
              06:30PM – 09:00PM — Party (DJ Set, Танилцах цаг, Хөгжилтэй мөчүүд)
              <br />
              <br />
              ⸻<br />
              <br />
              📍 <b>Байршил:</b>
              <br />
              Нууц! Зөвхөн бүртгүүлсэн хүмүүст 24 цагийн өмнө байршлыг илгээнэ.
              <br />
              <br />
              ⸻<br />
              <br />
              👥 <b>Хэн ирэх вэ?</b>
              <br />
              • skool.com/6amclub -н гишүүд
              <br />
              • skool.com/1percent - н бизнес эрхлэгчид
              <br />
              • Influencer, контент бүтээгч найзууд
              <br />
              • Өөрийгөө хөгжүүлж, шинэ хүмүүстэй холбогдохыг хүссэн хэн бүхэн
              <br />
              <br />
              ⸻<br />
              <br />
              💡 <b>Яагаад ирэх ёстой вэ?</b>
              <br />
              • Хотын хамгийн өндөр hype, хандалттай оройн эвент
              <br />
              • DJ + найзуудтайгаа chill vibes
              <br />
              • Контент бүтээгчдэд зориулсан төгс орчин
              <br />
              • Хөгжилтэй, бүтээлч, эерэг энерги дүүрэн хүмүүстэй холбогдох
              <br />
              • Dating app-уудаас илүү, энд л та магадгүй ирээдүйн хосоо олно
              шүү 😉
              <br />
              <br />
              ⸻<br />
              <br />
              🎁 <b>Шагналууд:</b>
              <br />
              🔥 Хамгийн өвөрмөц, стильтэй оролцогч — SURPRISE GIFT
              <br />
              <br />
              ⸻<br />
              <br />
              <b>Товчхондоо:</b>
              <br />
              Хотын хамгийн тэс өөр vibe-тэй оройн эвент
              <br />
              — Нууц байршил. Нууц мэдрэмж.
              <br />
            </div>
          </div>
          {/* Right: Event Image and RSVP Buttons */}
          <div className="flex-1 flex flex-col items-center justify-center gap-8 w-full md:w-auto">
            <div className="w-80 h-[28rem] rounded-xl overflow-hidden shadow-2xl border-4 border-white/30 bg-black/30 flex items-center justify-center mb-8">
              <img
                src={eventData.image}
                alt="event"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex gap-12 z-20">
              <button className="w-40 h-40 rounded-full bg-white/30 backdrop-blur-md flex flex-col items-center justify-center text-3xl font-bold shadow-xl border-2 border-white/40 hover:scale-105 transition">
                <span>😘</span>
                <span className="text-lg mt-2 font-semibold">Going</span>
              </button>
              <button className="w-40 h-40 rounded-full bg-white/30 backdrop-blur-md flex flex-col items-center justify-center text-3xl font-bold shadow-xl border-2 border-white/40 hover:scale-105 transition">
                <span>😶‍🌫️</span>
                <span className="text-lg mt-2 font-semibold">Can't Go</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">Арга хэмжээ олдсонгүй</h1>
          <Link href="/events">
            <Button className="mt-4">Буцах</Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <section className="relative w-full h-[100vh] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-wider">
              {event.title}
            </h1>

            <Link href="/events">
              <Button
                variant="outline"
                className="text-black border-white hover:bg-white hover:text-black"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Бүх арга хэмжээнд буцах
              </Button>
            </Link>
          </div>
        </section>
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6 max-w-2xl mx-auto">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-700">
                <Calendar className="h-5 w-5" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <Clock className="h-5 w-5" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <MapPin className="h-5 w-5" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <Users className="h-5 w-5" />
                <span>{event.participants}</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
