import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const clientId = process.env.GOOGLE_CLIENT_ID!;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
const uri = process.env.MONGODB_URI!;
const JWT_SECRET = process.env.JWT_SECRET || "changeme";

const oauthClient = new OAuth2Client(clientId, clientSecret);

export async function POST(req: NextRequest) {
  if (!uri || !clientId || !clientSecret) {
    return NextResponse.json(
      { success: false, error: "Missing environment variables." },
      { status: 500 }
    );
  }

  const client = new MongoClient(uri);

  try {
    const { credential } = await req.json();

    // Validate JWT token with Google OAuth client
    const ticket = await oauthClient.verifyIdToken({
      idToken: credential,
      audience: clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw new Error("Invalid token payload");
    }

    await client.connect();
    const db = client.db();
    const users = db.collection("google_users");

    // Upsert user by Google 'sub' identifier
    await users.updateOne(
      { sub: payload.sub },
      { $set: payload },
      { upsert: true }
    );

    // Create JWT token
    const token = jwt.sign(
      {
        userId: payload.sub,
        email: payload.email,
        name: payload.name,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({ success: true, user: payload });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Google OAuth error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Authentication failed",
      },
      { status: 500 }
    );
  } finally {
    try {
      await client.close();
    } catch {}
  }
}
