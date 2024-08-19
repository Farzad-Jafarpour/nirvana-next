import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { orderSchema, orderItemType } from "@/types/order";

const prisma = new PrismaClient();

const calcTotalPrice = (orderItems) =>
  orderItems.reduce((total, orderItem) => {
    const totalPrice = orderItem.price * orderItem.quantity;
    const extraItemPrice = orderItem.orderExtraItem.reduce(
      (extraTotal, extraItem) =>
        extraTotal + parseFloat(extraItem.price) * (extraItem.count || 1),
      0
    );
    return total + totalPrice + extraItemPrice;
  }, 0);

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const body = await req.json();

    // Validate the request body against the schema
    const validatedData = orderSchema.parse(body);

    const { orderItems } = validatedData;

    // Create the order with order items and nested order extra items
    const newOrder = await prisma.order.create({
      data: {
        table: parseInt(id, 10),
        totalPrice: calcTotalPrice(orderItems),
        isReady: false,
        isPaid: false,
        orderItems: {
          create: orderItems.map((item) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            price: item.price,
            orderExtraItem: {
              create:
                item.orderExtraItem?.map((extraItem) => ({
                  extraItemId: extraItem.extraItemId,
                  quantity: extraItem.quantity,
                  price: extraItem.price,
                })) || [],
            },
          })),
        },
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify({ error: error.errors }), {
        status: 400,
      });
    }
    console.error(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Fetch order by ID
    const order = await prisma.order.findMany({
      where: {
        AND: [
          { table: parseInt(id, 10) },
          { isReady: false },
          { isPaid: true },
        ],
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
