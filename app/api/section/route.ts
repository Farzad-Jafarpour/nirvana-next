import { schema } from "@/types/section";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newSection = await prisma.section.create({
    data: body,
  });

  return NextResponse.json(newSection, { status: 201 });
}

export async function GET(req: NextRequest) {
  try {
    // Fetch all sections with their associated menuItems
    const sections = await prisma.section.findMany({
      include: {
        menuItems: {
          where: {
            isEnable: true,
          },
        },
      },
    });

    return NextResponse.json(sections);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
