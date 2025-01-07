import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Fetch order by ID
    const order = await prisma.order.findMany({
      where: {
        AND: [{ table: parseInt(id, 10) }, { isPaid: false }],
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
