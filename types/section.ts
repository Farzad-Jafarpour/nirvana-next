import { z } from "zod";
import { MenuItemType } from "./menu";

export const schema = z.object({
  title: z.string().min(1).trim(),
  icon: z.string().optional(),
  category: z.string().min(1).trim(),
});

export interface SectionType {
  id: number;
  title: string;
  icon: string;
  category: string;
  menuItems: MenuItemType[];
}
