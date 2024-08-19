import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth"; // Make sure to create this utility

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json(
      { message: "Username and password are required" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid username or password" },
      { status: 401 }
    );
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid && user.isAdmin === false) {
    return NextResponse.json(
      { message: "Invalid username or password" },
      { status: 401 }
    );
  }

  const token = signToken({ id: user.id, username: user.username });

  return NextResponse.json(
    { message: "Sign in successful", token },
    { status: 200 }
  );
}
