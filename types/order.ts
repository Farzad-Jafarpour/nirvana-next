import { z } from "zod";
import { MenuItemType } from "./menu";
import { ExtraType } from "./extra";

const orderExtraItemSchema = z.object({
  extraItemId: z.number(),
  quantity: z.number().min(1),
  price: z.number().min(0),
});

// Define the schema for an order item using Zod
const orderItemSchema = z.object({
  menuItemId: z.number(),
  quantity: z.number().min(1),
  price: z.number().min(0),
  orderExtraItem: z.array(orderExtraItemSchema),
});

// Define the schema for an order using Zod
export const orderSchema = z.object({
  orderItems: z.array(orderItemSchema),
});

export interface orderExtraItemType {
  id: number;
  quantity: number;
  price: number;
  extraItemId: number;
  extraItem: ExtraType;
}

export interface orderItemType {
  id: number;
  menuItemId: number;
  quantity: number;
  price: number;
  menuItem: MenuItemType;
  orderExtraItem: orderExtraItemType[];
}

export interface orderType {
  id: number;
  table: number;
  totalPrice: number;
  isReady: boolean;
  isPaid: boolean;
  orderItems: orderItemType[];
}
