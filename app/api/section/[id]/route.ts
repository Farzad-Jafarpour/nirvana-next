import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const sectionId = parseInt(params.id, 10);

  if (isNaN(sectionId)) {
    return NextResponse.json({ error: "Invalid section ID" }, { status: 400 });
  }

  try {
    // Parse the request body to get the fields that need to be updated
    const body = await request.json();
    const { title, icon, category } = body;

    // Update the section using Prisma
    const updatedSection = await prisma.section.update({
      where: {
        id: sectionId,
      },
      data: {
        title: title || undefined, // Update only if the value exists
        icon: icon || undefined, // Update only if the value exists
        category: category || undefined, // Update only if the value exists
      },
    });

    return NextResponse.json(updatedSection);
  } catch (error) {
    console.error("Error updating section:", error);
    return NextResponse.json(
      { error: "Failed to update section" },
      { status: 500 }
    );
  }
}
