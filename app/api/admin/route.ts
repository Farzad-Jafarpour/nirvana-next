import { schema } from "@/types/section";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Fetch all sections with their associated menuItems
    const sections = await prisma.section.findMany({
      include: {
        menuItems: true,
      },
    });

    return NextResponse.json(sections);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
