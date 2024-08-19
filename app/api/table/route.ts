import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Fetch order by ID
    const order = await prisma.order.findMany({
      where: {
        isPaid: false,
      },
      include: {
        orderItems: {
          include: {
            menuItem: true,
            orderExtraItem: {
              include: {
                extraItem: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      return new NextResponse("Order not found", { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
