import { z } from "zod";
import { SectionType } from "./section"; // Adjust import path as needed

export const mainItemSchema = z.object({
  title: z.string().min(1).trim(), // Title must be a non-empty string
  src: z.string().url().optional(), // Optional src, must be a valid URL if provided
  isEnable: z.boolean(),
  sections: z
    .array(
      z.object({
        id: z.number(),
        title: z.string(),
        icon: z.string().optional(),
        category: z.string(),
      })
    )
    .optional(), // Optional array of sections
});

export interface MainItemType {
  id: number;
  title: string;
  src?: string; // Optional string for the image source
  isEnable: boolean;
  path: string;
  sections?: SectionType[]; // Optional array of sections
}
