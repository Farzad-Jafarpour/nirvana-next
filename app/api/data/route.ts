import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Fetch all sections with their associated menuItems
    const sections = await prisma.section.findMany({
      include: {
        menuItems: true,
      },
    });

    // Fetch all extraItems
    const extraItems = await prisma.extraItem.findMany();

    // Combine sections and extraItems into one response object
    const response = {
      sections,
      extraItems,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
