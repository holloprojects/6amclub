"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const res = await fetch("/api/me");
      const data = await res.json();
      setUser(data.user || null);
      setLoggedIn(!!data.loggedIn);
      setLoading(false);
      if (!data.loggedIn) {
        router.replace("/auth/signin");
      }
    };
    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#18181b] text-white flex items-center justify-center">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#18181b] text-white">
      <Header />
      <div className="max-w-3xl mx-auto pt-32 px-4">
        <h1 className="text-3xl font-bold mb-8">PROFILE</h1>
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="info">My Info</TabsTrigger>
            <TabsTrigger value="events">My Events</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            <div className="p-6 bg-[#23232b] rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-2">Welcome!</h2>
              <p>
                This is your dashboard. Here you can see an overview of your
                activity.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="info">
            <div className="p-6 bg-[#23232b] rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-2">My Info</h2>
              {user ? (
                <div>
                  <p>
                    <b>Username:</b> {user.username || user.name || "-"}
                  </p>
                  <p>
                    <b>Email:</b> {user.email || "-"}
                  </p>
                  {/* Add more user info fields as needed */}
                </div>
              ) : (
                <p>No user info found.</p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="events">
            <div className="p-6 bg-[#23232b] rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-2">My Events</h2>
              <p>Coming soon: List of events you have joined or created.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
