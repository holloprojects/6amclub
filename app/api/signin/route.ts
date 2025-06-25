import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export async function POST(req: NextRequest) {
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
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : error });
  } finally {
    await client.close();
  }
} 