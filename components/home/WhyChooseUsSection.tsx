import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    title: "How do I join the Runner Club?",
    content:
      "You can join by signing up through our website. Membership is open to all levels, from beginners to seasoned marathoners.",
  },
  {
    title: "When and where do we meet?",
    content:
      "We meet every Tuesday and Saturday at 6 AM at Central Park's South Gate. Weekend long runs vary by season and distance.",
  },
  {
    title: "Do I need to be an experienced runner?",
    content:
      "Not at all! We welcome runners of all levels and offer different pace groups to accommodate everyone.",
  },
  {
    title: "Is there a membership fee?",
    content:
      "Yes, there is a small annual fee that covers club gear, hydration stations, and event planning. Scholarships are available.",
  },
  {
    title: "What kind of events do you organize?",
    content:
      "We host regular training runs, social events, local races, and annual destination runs for members.",
  },
];

export function RunnerClubFAQSection() {
  return (
    <section className="bg-white text-black py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8 self-start" style={{ height: "24rem" }}>
            <div className="relative h-80 w-full lg:h-[500px]">
              <Image
                src="/QA.png"
                alt="Running group photo"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-12">
            <h2 className="text-4xl text-center font-serif sm:text-5xl lg:text-6xl !leading-tight">
              Runner Club Q&A
            </h2>

            <Accordion type="single" collapsible defaultValue="item-0">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.title}
                  value={`item-${index}`}
                  className="border-gray-700"
                >
                  <AccordionTrigger className="text-lg hover:no-underline">
                    <span className="text-gray-500 mr-4">0{index + 1}.</span>
                    {faq.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 pl-10">
                    {faq.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
