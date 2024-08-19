import { schema } from "@/types/menu";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// const verifyToken = (token: string) => {
//   try {
//     return jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
//   } catch (error) {
//     return null;
//   }
// };

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validate the body
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // Create new menu item
  const newMenuItem = await prisma.menuItem.create({
    data: body,
  });

  return NextResponse.json(newMenuItem, { status: 201 });
}
