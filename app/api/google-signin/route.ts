export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);
const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export async function POST(req: NextRequest) {
  try {
    const user = await req.json();
    await client.connect();
    const db = client.db();
    const users = db.collection("google_users");

    const result = await users.updateOne(
      { sub: user.sub },
      { $set: user },
      { upsert: true }
    );

    const token = jwt.sign(
      { userId: user.sub, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({ success: true, result });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : error,
    });
  } finally {
    await client.close();
  }
}
