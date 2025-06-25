// ... existing imports ...
import Image from "next/image";
import Link from "next/link";

const CommunitySection = () => {
  return (
    <main className="bg-black text-white h-fit">
      {/* Headline Section */}
      <section className="text-center py-16 px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4">
          Join the Run —<br />
          Empower Your Stride with Our Club
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
          <button className="bg-black text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg">
            JOIN THE CLUB
          </button>
          <span className="text-lg text-white">
            A Community for Every{" "}
            <span className="font-bold text-white">Runner</span>
          </span>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto pb-16">
        {/* Card 1 */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg bg-white flex flex-col justify-end min-h-[550px]">
          <span className="absolute top-4 left-4 bg-white/70 rounded-full px-3 py-1 text-lg font-bold">
            01
          </span>
          <Image
            src="/community2.png"
            alt="Mentors"
            fill
            className="object-cover opacity-80"
          />
          <div className="relative z-10 p-6">
            <div className="flex items-center space-x-2 mb-2"></div>
            <h3 className="text-xl font-bold text-white">
              Learn from best mentors
            </h3>
            <Link href="/community" className="inline-block">
              <button className="mt-4 bg-white/80 text-black px-4 py-2 rounded-full font-semibold">
                START LEARNING →
              </button>
            </Link>
          </div>
        </div>
        {/* Card 2 */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg bg-white flex flex-col justify-end min-h-[350px]">
          <span className="absolute top-4 left-4 bg-white/70 rounded-full px-3 py-1 text-lg font-bold">
            01
          </span>
          <Image
            src="/community.png"
            alt="Mentors"
            fill
            className="object-cover opacity-80"
          />
          <div className="relative z-10 p-6">
            <h3 className="text-xl font-bold text-white">
              Learn from best mentors
            </h3>
          </div>
        </div>
        {/* Card 3 */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg bg-white flex flex-col justify-end min-h-[350px]">
          <span className="absolute top-4 left-4 bg-white/70 rounded-full px-3 py-1 text-lg font-bold">
            01
          </span>
          <Image
            src="/community1.png"
            alt="Mentors"
            fill
            className="object-cover opacity-80"
          />
          <div className="relative z-10 p-6">
            <h3 className="text-xl font-bold text-white">
              Learn from best mentors
            </h3>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CommunitySection;
