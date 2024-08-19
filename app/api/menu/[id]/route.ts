import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const {
    title,
    src,
    price,
    details,
    hasExtra,
    isAvailable,
    isNew,
    isLarge,
    isEnable,
    isTax,
  } = body;

  const menuItemObj = await prisma.menuItem.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!menuItemObj)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  const updatedMenuItem = await prisma.menuItem.update({
    where: { id: menuItemObj.id },
    data: {
      title,
      src,
      price,
      details,
      hasExtra,
      isAvailable,
      isNew,
      isLarge,
      isEnable,
      isTax,
    },
  });
  return NextResponse.json(updatedMenuItem);
}
