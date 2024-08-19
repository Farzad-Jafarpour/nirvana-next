import { z } from "zod";

export const schema = z.object({
  title: z.string().min(1).trim(),
  price: z.number().positive(),
  category: z.string().min(1).trim(),
});

export interface ExtraType {
  id: number;
  count?: number;
  title: string;
  price: number;
  category: string;
  foodId?: number;
}
