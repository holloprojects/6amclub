"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import StarBorder from "@/components/StarBorder";
import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";

// Animation variants for container and items
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function AboutSection() {
  return (
    <motion.section
      className="w-full mt-36 mb-24 px-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto flex flex-col items-center text-center">
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-medium font-mono mb-4"
          variants={itemVariants}
        >
          What is{" "}
          <span className="font-rubik text-black font-medium">6.AM CLUB</span>{" "}
          all about?
        </motion.h2>
        <motion.p
          className="max-w-2xl text-lg md:text-xl font-serif text-gray-800 mt-12 mb-[80px]"
          variants={itemVariants}
        >
          The 6 A.M. Club is a group of early risers who kick off their day with
          purpose, movement, and community.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/about">
            <motion.div
              className=" text-black hover:text-[#ff7345] cursor-pointer flex flex-col gap-12 overflow-hidden mt-0"
              variants={itemVariants}
            >
              <div className="h-[350px] bg-[url('/1.jpg')] grayscale hover:grayscale-0 bg-cover bg-center" />
              <div className="p-4 text-left">
                <h3 className="font-semibold text-center font-bionix text-2xl">
                  Early Starts
                </h3>
              </div>
            </motion.div>
          </Link>

          <Link href="/about">
            <motion.div
              className=" text-black hover:text-[#ff7345] cursor-pointer flex flex-col gap-12 overflow-hidden mt-0"
              variants={itemVariants}
            >
              <h3 className="font-semibold font-bionix text-center text-2xl">
                All Levels Welcome
              </h3>
              <div className="h-[350px] bg-[url('/3.jpg')] grayscale hover:grayscale-0 bg-cover bg-center" />
              <div className="p-4 text-left"></div>
            </motion.div>
          </Link>

          <Link href="/about">
            <motion.div
              className=" text-black hover:text-[#ff7345] cursor-pointer flex flex-col gap-12 overflow-hidden mt-0"
              variants={itemVariants}
            >
              <div className="h-[350px] bg-[url('/4.jpg')] grayscale hover:grayscale-0 bg-cover bg-center" />
              <div className="p-4 text-left">
                <h3 className="font-semibold text-center  font-bionix text-2xl">
                  Community Vibes
                </h3>
              </div>
            </motion.div>
          </Link>

          <Link href="/about">
            <motion.div
              className=" text-black hover:text-[#ff7345] cursor-pointer flex flex-col gap-12 overflow-hidden mt-0"
              variants={itemVariants}
            >
              <h3 className="font-semibold text-center font-bionix text-2xl">
                BALANCED LIFESTYLE
              </h3>

              <div className="h-[350px] bg-[url('/2.jpg')] grayscale  hover:grayscale-0 bg-cover bg-center" />
            </motion.div>
          </Link>
        </div>

        <motion.div variants={itemVariants} className="mt-4">
          <Button className="bg-white text-black border hover:bg-white px-8 rounded-2xl">
            <a
              href="/about"
              className="items-center flex text-base gap-4 font-bold transition"
            >
              About Us
              <ArrowUpRight />
            </a>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
