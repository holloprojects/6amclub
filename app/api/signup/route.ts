import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return NextResponse.json({
      success: false,
      error: "MONGODB_URI environment variable is not set.",
    }, { status: 500 });
  }

  const client = new MongoClient(uri);

  try {
    const { username, password, phone } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ success: false, error: "Username and password are required." }, { status: 400 });
    }
    await client.connect();
    const db = client.db();
    const users = db.collection("users");
    // Check if user already exists
    const existing = await users.findOne({ username });
    if (existing) {
      return NextResponse.json({ success: false, error: "User already exists." }, { status: 409 });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await users.insertOne({ username, password: hashedPassword, phone, createdAt: new Date() });
    return NextResponse.json({ success: true, userId: result.insertedId });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : error }, { status: 500 });
  } finally {
    try {
      await client.close();
    } catch (e) {
      // Ignore close errors
    }
  }
} 