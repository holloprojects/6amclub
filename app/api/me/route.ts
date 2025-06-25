import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ loggedIn: false });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return NextResponse.json({ loggedIn: true, user: decoded });
  } catch {
    return NextResponse.json({ loggedIn: false });
  }
} 