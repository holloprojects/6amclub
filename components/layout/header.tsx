"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import StarBorder from "../StarBorder";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const footerRef = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ... FOOTER OBSERVER AND LOGIN CHECK (same as before)
  // Keep your existing code here

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("/api/me");
        const data = await res.json();
        setLoggedIn(!!data.loggedIn);
      } catch {
        setLoggedIn(false);
      }
    };
    checkLogin();
    document.addEventListener("visibilitychange", checkLogin);
    window.addEventListener("focus", checkLogin);
    return () => {
      document.removeEventListener("visibilitychange", checkLogin);
      window.removeEventListener("focus", checkLogin);
    };
  }, [pathname]);

  // --- CLOSE MOBILE MENU ON ROUTE CHANGE ---
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // --- OPTIONAL: CLOSE MOBILE MENU WHEN CLICKING OUTSIDE ---
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mobileMenuOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    fetch("/api/logout", { method: "POST" }).then(() => {
      setLoggedIn(false);
      setDropdownOpen(false);
      router.refresh();
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 h-fit font-bionix right-0 ${
        mobileMenuOpen ? "" : "mix-blend-difference"
      }
 z-50 px-4 py-4 lg:px-6 flex items-center transition-all duration-300 ${
   isScrolled ? "  text-white" : "bg-transparent text-white"
 }`}
    >
      {footerInView ? (
        <button
          className="flex items-center justify-center w-[100px] h-[100px] rounded-ful hover:bg-opacity-30 transition-colors group"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-10 h-10 text-white group-hover:text-yellow-400 transition-colors"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      ) : (
        <Link href="/" className="flex items-center justify-center">
          <img
            src="/Logo1.png"
            className="w-[100px] ml-4 object-contain object-center bg-repeat h-[100px]"
            alt=""
          />
        </Link>
      )}

      {/* --- Desktop Nav --- */}
      <nav className="ml-auto hidden md:flex items-center gap-4 sm:gap-6">
        <Link
          href="/events"
          className="md:text-xl text-xs font-bold transition-colors hover:text-[#ff7345]"
        >
          Events
        </Link>
        <Link
          href="/community"
          className="md:text-xl text-xs font-bold transition-colors hover:text-[#ff7345]"
        >
          Community
        </Link>
        <Link
          href="/about"
          className="md:text-xl text-xs font-bold transition-colors hover:text-[#ff7345]"
        >
          About us
        </Link>
        <div className="ml-6 flex gap-2 relative">
          {loggedIn ? (
            <div className="relative">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                onClick={() => setDropdownOpen((v) => !v)}
              >
                <img
                  src="/placeholder-user.jpg"
                  alt="Profile"
                  className="md:w-8 md:h-8 h-4 w-4 rounded-full"
                />
                <span className="md:text-xl text-xs">Profile</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <StarBorder
              as={Link}
              href="/auth/signin"
              className=""
              color="white"
              speed="2s"
            >
              <p className="text-xl">Get started</p>
            </StarBorder>
          )}
        </div>
      </nav>

      {/* --- Mobile Menu Button (only when closed) --- */}
      {!mobileMenuOpen && (
        <button
          className="ml-auto md:hidden flex items-center z-[1000]"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}

      {/* --- Mobile Menu Drawer --- */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] mix-blend-multiply bg-black flex md:hidden flex-col">
          {/* X icon inside drawer, top right */}
          <button
            className="absolute top-12 right-4 z-[10000]"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg
              className="w-8 h-8 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div
            ref={mobileMenuRef}
            className="ml-auto w-2/3 max-w-xs bg-white text-black h-full shadow-2xl flex flex-col p-4"
          >
            <nav className="flex flex-col bg-white gap-6 mt-12">
              <Link
                href="/events"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-bold transition-colors hover:text-[#ff7345]"
              >
                Events
              </Link>
              <Link
                href="/community"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-bold transition-colors hover:text-[#ff7345]"
              >
                Community
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-bold transition-colors hover:text-[#ff7345]"
              >
                About us
              </Link>
              <div className="flex flex-col gap-2 mt-8">
                {loggedIn ? (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-2 py-2 rounded hover:bg-gray-800"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="block text-left px-2 py-2 rounded hover:bg-gray-800"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <StarBorder
                    as={Link}
                    href="/auth/signin"
                    className="text-xl"
                    color="white"
                    speed="2s"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <p className="text-xl">Get started</p>
                  </StarBorder>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
