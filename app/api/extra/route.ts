import { schema } from "@/types/extra";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newExtraItem = await prisma.extraItem.create({
    data: body,
  });

  return NextResponse.json(newExtraItem, { status: 201 });
}

export async function GET(req: NextRequest) {
  try {
    // Fetch all extraItems
    const extraItems = await prisma.extraItem.findMany();

    return NextResponse.json(extraItems);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
