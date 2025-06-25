import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, MapPin, Users, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import Image from "next/image";

// Define the events array above the component if not imported
const eventsList = [
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
    badge: { text: "Нийгмийн", color: "bg-[#ff7345]" },
    status: {
      text: "Бараг дүүрсэн",
      color: "text-orange-600 border-orange-600",
    },
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
];

export default function EventsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        {/* Restore original hero section */}
        <section className="relative w-full h-screen overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/event.png"
              alt="Монголын байгаль"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            {/* Main Title */}
            <h1 className="text-6xl flex font-rubik md:text-8xl lg:text-6xl font-bold text-white mb-8 tracking-wider">
              Join, the latest events.
            </h1>
          </div>
        </section>

        <div className="p-8">
          <h1 className="text-7xl text-end font-bold font-alfa mb-2">
            Join our next events
          </h1>
          <p className="text-gray-600 text-end text-lg">
            Be part of our vibrant community! Discover upcoming gatherings and
            relive memorable moments from past events.
          </p>
        </div>
        <section className="w-full py-12 md:py-16">
          <section className="w-full flex flex-col h-full mb-36">
            <div className="container flex flex-col px-4 md:px-6">
              <Link href="/events">
                <div className="overflow-hidden rounded-3xl w-full max-w-full cursor-pointer  relative min-h-[500px] md:min-h-[600px] lg:min-h-[450px]">
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src="/About.png"
                      alt="6.AM Club members running"
                      fill
                      className="object-cover pl-[300px]"
                    />
                  </div>
                  {/* Text Overlay */}
                  <div className="absolute inset-0 flex items-center justify-start p-8 md:p-12 lg:p-16">
                    <div className="max-w-2xl">
                      <h2 className="font-alfa text-4xl font-thin leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-black to-white sm:text-5xl md:text-6xl lg:text-8xl drop-shadow-lg">
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
                  <Link href="/events/latest">
                    <Button className="absolute right-12 bg-black font-bold from-black to-white hover:bg-black  w-[100px] rounded-3xl bottom-8 justify-center flex items-center  p-8 md:p-12 lg:p-2">
                      Join
                    </Button>
                  </Link>
                </div>
              </Link>
            </div>
          </section>
          {/* End Hero/Intro Section */}
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {eventsList.map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="block"
                >
                  <Card className="border-2 rounded-t-2xl transition-colors h-full">
                    {/* Event Image */}
                    <div className="relative w-full h-48 md:h-56 rounded-t-2xl overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority
                      />
                    </div>
                    {/* End Event Image */}
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge className={`${event.badge.color} text-white`}>
                          {event.badge.text}
                        </Badge>
                        <Badge variant="outline" className={event.status.color}>
                          {event.status.text}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl text-gray-900">
                        {event.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="h-4 w-4" />
                          <span>{event.participants}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        {event.description}
                      </p>
                      <Button className="w-full bg-black rounded-2xl text-white">
                        View
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section className="w-full py-12 md:py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="max-w-2xl mx-auto">
              <div className="text-center space-y-4 mb-8">
                <h2 className="text-3xl font-bold tracking-tighter text-gray-900">
                  Арга хэмжээнд бүртгүүлэх
                </h2>
                <p className="text-gray-600 md:text-lg">
                  Манай удахгүй болох арга хэмжээний аль нэгэнд бүртгүүлэхийн
                  тулд доорх маягтыг бөглөнө үү. Бид 24 цагийн дотор танд хариу
                  өгөх болно.
                </p>
              </div>

              <Card>
                <CardContent className="p-6">
                  <form className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Нэр</Label>
                        <Input id="firstName" placeholder="Нэрээ оруулна уу" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Овог</Label>
                        <Input id="lastName" placeholder="Овгоо оруулна уу" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">И-мэйл</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="И-мэйл хаягаа оруулна уу"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Утасны дугаар</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Утасны дугаараа оруулна уу"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="event">Арга хэмжээ сонгох</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Арга хэмжээ сонгоно уу" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="saturday-10k">
                            Бямба гарагийн өглөөний 10К
                          </SelectItem>
                          <SelectItem value="sunset-5k">
                            Нар жаргах 5К хөгжилтэй гүйлт
                          </SelectItem>
                          <SelectItem value="half-marathon">
                            Хагас марафоны бэлтгэл
                          </SelectItem>
                          <SelectItem value="coffee-jog">
                            Кофе ба 3 миль гүйлт
                          </SelectItem>
                          <SelectItem value="city-lights">
                            Хотын гэрэл 8К
                          </SelectItem>
                          <SelectItem value="trail-12k">
                            Байгалийн зам 12К (Хүлээлгийн жагсаалт)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Гүйлтийн туршлага</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Туршлагын түвшинээ сонгоно уу" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">
                            Анхан шатны (0-6 сар)
                          </SelectItem>
                          <SelectItem value="intermediate">
                            Дунд шатны (6 сар - 2 жил)
                          </SelectItem>
                          <SelectItem value="advanced">
                            Ахисан шатны (2+ жил)
                          </SelectItem>
                          <SelectItem value="competitive">
                            Өрсөлдөөнт гүйгч
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="goals">Гүйлтийн зорилго</Label>
                      <Textarea
                        id="goals"
                        placeholder="Гүйлтийн зорилго болон хүрэхийг хүсч буй зүйлсийнхээ талаар хэлнэ үү..."
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="medical">
                        Эрүүл мэндийн мэдээлэл (Заавал биш)
                      </Label>
                      <Textarea
                        id="medical"
                        placeholder="Бидэнд мэдэх шаардлагатай эмгэг эсвэл гэмтэл байвал бичнэ үү..."
                        className="min-h-[80px]"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#ff7345] hover:bg-[#e55a2b] text-white"
                    >
                      Өргөдөл илгээх
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-600">
          © 2024 ГүйлтийнКлуб. Бүх эрх хуулиар хамгаалагдсан.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4 text-gray-600"
          >
            Үйлчилгээний нөхцөл
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4 text-gray-600"
          >
            Нуулал
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4 text-gray-600"
          >
            Холбоо барих
          </Link>
        </nav>
      </footer>
    </div>
  );
}
