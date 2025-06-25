import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const uri = process.env.MONGODB_URI;
  const JWT_SECRET = process.env.JWT_SECRET || "changeme";

  if (!uri) {
    return NextResponse.json({
      success: false,
      error: "MONGODB_URI environment variable is not set.",
    }, { status: 500 });
  }

  const client = new MongoClient(uri);

  try {
    const user = await req.json();
    await client.connect();
    const db = client.db();
    const users = db.collection("google_users");
    // Upsert user by sub (Google user id)
    const result = await users.updateOne(
      { sub: user.sub },
      { $set: user },
      { upsert: true }
    );
    // Create JWT token (payload can be customized)
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
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return response;
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : error,
    }, { status: 500 });
  } finally {
    try {
      await client.close();
    } catch (e) {
      // Ignore close errors
    }
  }
}
