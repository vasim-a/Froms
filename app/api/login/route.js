import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "../../../models/User";
import { connectToDatabase } from "../../../lib/db";

export async function POST(request) {
  try {
    await connectToDatabase();

    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required", ok: false },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User not found", ok: false },
        { status: 404 }
      );
    }

    // Compare password using bcrypt
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password", ok: false },
        { status: 401 }
      );
    }

    // Success response
    return NextResponse.json(
      {
        message: "Login successful",
        OK: true,
        user: { name: user.name, email: user.email },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error during login:", err);
    return NextResponse.json(
      { error: "Server error", ok: false },
      { status: 500 }
    );
  }
}
