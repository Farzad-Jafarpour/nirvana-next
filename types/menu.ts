import { z } from "zod";

export const schema = z.object({
  title: z.string().min(1).trim(),
  price: z.number().positive(),
  src: z.string().url(),
  hasExtra: z.boolean(),
  details: z.string().optional(),
  isAvailable: z.boolean(),
  isNew: z.boolean(),
  isLarge: z.boolean(),
  sectionId: z.number().positive(),
  isEnable: z.boolean(),
  isTax: z.boolean(),
});

export interface MenuItemType {
  id: number;
  title: string;
  price: number;
  src: string;
  hasExtra: boolean;
  details?: string | null;
  isAvailable: boolean;
  isNew: boolean;
  isLarge: boolean;
  isTax: boolean;
  isEnable: boolean;
  sectionId: number;
}
