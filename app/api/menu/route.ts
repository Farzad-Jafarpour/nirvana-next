import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const data = await request.formData();

  const title = data.get("title") as string;
  const price = parseFloat(data.get("price") as string);
  const hasExtra = data.get("hasExtra") === "true";
  const isAvailable = data.get("isAvailable") === "true";
  const isNew = data.get("isNew") === "true";
  const isLarge = data.get("isLarge") === "true";
  const isTax = data.get("isTax") === "true";
  const isEnable = data.get("isEnable") === "true";
  const sectionId = parseInt(data.get("sectionId") as string);

  let src = "";

  const imageFile = data.get("image") as File;
  if (imageFile) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const fileName = `${Date.now()}-${imageFile.name}`; // Generate a unique filename
    const uploadDir = path.join(process.cwd(), "public/uploads");

    // Ensure the uploads directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, fileName);
    await fs.writeFile(filePath, buffer);
    src = `/public/uploads/${fileName}`; // Store the relative path
  }

  const newMenuItem = await prisma.menuItem.create({
    data: {
      title,
      price,
      hasExtra,
      isAvailable,
      isNew,
      isLarge,
      isTax,
      isEnable,
      sectionId,
      src, // Store the relative path to the uploaded file
    },
  });

  return NextResponse.json(newMenuItem);
}
