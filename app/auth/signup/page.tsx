"use client";
import React, { useState } from "react";
import { Header } from "@/components/layout/header";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Redirect if already logged in (cookie set by server)
  React.useEffect(() => {
    if (typeof document !== "undefined" && document.cookie.includes("token=")) {
      router.replace("/");
    }
  }, [router]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, phone, password }),
      });
      const data = await res.json();
      if (data.success) {
        // After successful signup, redirect to signin
        router.push("/auth/signin");
      } else {
        setMessage(data.error || "Signup failed.");
      }
    } catch (err) {
      setMessage("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId="257516674558-mura8vic91p11abmhqbn0ghh1nomujnp.apps.googleusercontent.com">
      <div>
        <Header />
        <form
          onSubmit={handleSignup}
          className="w-[300px] mx-auto flex flex-col h-screen justify-center px-4 text-white font-mono"
        >
          <div className="mb-6">
            <h1 className="text-xl tracking-wider">Sign Up</h1>
          </div>
          <div className="mb-6 relative group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 bg-transparent border-none outline-none z-10 relative text-white tracking-wide text-base"
            />
            {/* Decorative layers */}
            <div className="absolute h-[10px] -bottom-[10px] left-[5px] right-[-5px] transform -skew-x-[45deg] bg-gradient-to-r from-[#020024] via-[#340979] to-[#00d4ff]" />
            <div className="absolute top-[-5px] left-full w-[10px] bottom-[5px] transform -skew-y-[45deg] bg-[#00d4ff]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020024] via-[#340979] to-[#00d4ff]" />
            <div className="absolute inset-[2px] bg-[#212121] z-0 group-focus-within:bg-white/50 transition-all duration-200" />
          </div>
          {/* Phone number input */}
          <div className="mb-6 relative group">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-4 bg-transparent border-none outline-none z-10 relative text-white tracking-wide text-base"
            />
            <div className="absolute h-[10px] -bottom-[10px] left-[5px] right-[-5px] transform -skew-x-[45deg] bg-gradient-to-r from-[#020024] via-[#340979] to-[#00d4ff]" />
            <div className="absolute top-[-5px] left-full w-[10px] bottom-[5px] transform -skew-y-[45deg] bg-[#00d4ff]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020024] via-[#340979] to-[#00d4ff]" />
            <div className="absolute inset-[2px] bg-[#212121] z-0 group-focus-within:bg-white/50 transition-all duration-200" />
          </div>
          <div className="mb-6 relative group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-transparent border-none outline-none z-10 relative text-white tracking-wide text-base"
            />
            <div className="absolute h-[10px] -bottom-[10px] left-[5px] right-[-5px] transform -skew-x-[45deg] bg-gradient-to-r from-[#020024] via-[#340979] to-[#00d4ff]" />
            <div className="absolute top-[-5px] left-full w-[10px] bottom-[5px] transform -skew-y-[45deg] bg-[#00d4ff]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020024] via-[#340979] to-[#00d4ff]" />
            <div className="absolute inset-[2px] bg-[#212121] z-0 group-focus-within:bg-white/50 transition-all duration-200" />
          </div>
          <button
            type="submit"
            className={`w-full p-4 font-bold text-white text-base tracking-wider relative group overflow-hidden ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            <div className="absolute h-[10px] -bottom-[10px] left-[5px] right-[-5px] transform -skew-x-[45deg] bg-gradient-to-r from-[#020024] via-[#340979] to-[#00d4ff]" />
            <div className="absolute top-[-5px] left-full w-[10px] bottom-[5px] transform -skew-y-[45deg] bg-[#00d4ff]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020024] via-[#340979] to-[#00d4ff]" />
            <div className="absolute inset-[2px] bg-[#212121] group-hover:top-full group-hover:bg-white/50 transition-all duration-200 z-0" />
            <span className="relative z-10 flex items-center justify-center min-h-[24px]">
              {loading ? (
                <img
                  src="/Logo1.png"
                  alt="Loading"
                  width={24}
                  height={24}
                  className="animate-spin"
                />
              ) : (
                "Sign Up"
              )}
            </span>
          </button>
          <div className="mt-4 flex flex-col gap-2">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                const credential = credentialResponse.credential;

                if (!credential) {
                  setMessage("No credential received from Google.");
                  return;
                }

                try {
                  const res = await fetch("/api/google-signin", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ credential }),
                  });

                  const result = await res.json();

                  if (result.success) {
                    // Google signup successful, redirect to home
                    window.location.href = "/";
                  } else {
                    setMessage(
                      "Server error: " + (result.error || "Unknown error")
                    );
                  }
                } catch (err) {
                  setMessage("Failed to sign up with Google.");
                }
              }}
              onError={() => setMessage("Google signup failed.")}
              width="100%"
              theme="filled_black"
              text="signup_with"
              shape="pill"
            />

            <Link
              href="/auth/signin"
              className="text-center text-blue-400 underline"
            >
              Already have an account? Sign in
            </Link>
          </div>
          {message && (
            <div className="mt-4 text-center text-sm text-white bg-black/50 p-2 rounded">
              {message}
            </div>
          )}
        </form>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignupForm;
