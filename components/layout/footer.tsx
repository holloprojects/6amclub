import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-whit text-black w-full px-8 py-12 flex flex-col min-h-screen justify-between relative">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 mt-24 gap-8">
        <div>
          <h3 className="font-semibold mb-2 text-sm md:text-2xl">6.AM CLUB</h3>
          <ul className="flex flex-col gap-2 text-sm md:text-2xl">
            <li>
              <Link href="/event" className="underline">
                EVENT{" "}
              </Link>
            </li>
            <li>
              <Link href="/community" className="underline">
                COMMUNITY{" "}
              </Link>
            </li>
            <li>
              <Link href="/about" className="underline">
                ABOUT US
              </Link>
            </li>
            <li>
              <Link href="/get-started" className="underline">
                GET STARTED
              </Link>
            </li>

            <li>
              <Link href="#" className="underline">
                CONTACT
              </Link>
            </li>
          </ul>
        </div>
        {/* LINKS */}
        <div>
          <h3 className="font-semibold mb-2 text-sm md:text-2xl">LINKS</h3>
          <ul className="flex flex-col gap-2 text-sm md:text-2xl">
            <li>
              <Link href="#" className="underline">
                LINKEDIN
              </Link>
            </li>
            <li>
              <Link href="#" className="underline">
                INSTAGRAM
              </Link>
            </li>
            <li>
              <Link href="#" className="underline">
                PRIVACY
              </Link>
            </li>
          </ul>
        </div>
        {/* ADDRESS */}
        <div className="flex flex-col items-end">
          <h3 className="font-semibold justify-start w-fit flex mb-2 text-sm md:text-2xl">
            ADDRESS
          </h3>
          <p className="text-sm md:text-2xl leading-relaxed">
            228 PARK AVENUE SOUTH
            <br />
            NEW YORK, NEW YORK 10003
          </p>
        </div>
        {/* COPYRIGHT */}
      </div>
      {/* Bottom left text */}
      <div className="absolute left-8 bottom-8 uppercase text-sm md:text-6xl font-rubik max-w-full">
        <span>
          Building community,
          <br />
          mile by mile
          <br />
          Rise & Run with the Club!
        </span>
      </div>
      {/* Logo bottom right */}
      <div className="absolute right-8 bottom-8">
        <div className="w-32 h-32  mix-blend-difference flex items-center justify-center">
          <img
            src="/Logo1.png"
            className="md:w-[200px] ml-4 object-contain object-center bg-repeat h-[50px] w-[50px] md:h-[200px]"
            alt=""
          />
        </div>
      </div>
    </footer>
  );
}
