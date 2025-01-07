import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const orderObj = await prisma.order.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!orderObj)
    return NextResponse.json({ error: "Invalid id" }, { status: 404 });

  const updatedMenuItem = await prisma.order.update({
    where: { id: orderObj.id },
    data: {
      isPaid: true,
    },
  });
  return NextResponse.json(updatedMenuItem);
}
