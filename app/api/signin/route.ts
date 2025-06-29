import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const uri = process.env.MONGODB_URI;
  const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

  if (!uri) {
    return NextResponse.json({
      success: false,
      error: "MONGODB_URI environment variable is not set.",
    }, { status: 500 });
  }

  const client = new MongoClient(uri);

  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ success: false, error: "Username and password are required." }, { status: 400 });
    }
    await client.connect();
    const db = client.db();
    const users = db.collection("users");
    const user = await users.findOne({ username });
    if (!user) {
      return NextResponse.json({ success: false, error: "Invalid credentials." }, { status: 401 });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ success: false, error: "Invalid credentials." }, { status: 401 });
    }
    // Create JWT token
    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
    const response = NextResponse.json({ success: true });
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return response;
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