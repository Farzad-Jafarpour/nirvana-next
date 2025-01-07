import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const { title, price, category, isEnable } = body;

  const extraItemObj = await prisma.extraItem.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!extraItemObj)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  const updatedExtraItem = await prisma.extraItem.update({
    where: { id: extraItemObj.id },
    data: {
      title,
      price,
      category,
      isEnable,
    },
  });
  return NextResponse.json(updatedExtraItem);
}
