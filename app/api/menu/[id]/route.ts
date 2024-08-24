import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Ensure environment variables are set
const endpoint = process.env.LIARA_ENDPOINT;
const accessKeyId = process.env.LIARA_ACCESS_KEY;
const secretAccessKey = process.env.LIARA_SECRET_KEY;
const bucketName = process.env.LIARA_BUCKET_NAME;

if (!endpoint || !accessKeyId || !secretAccessKey || !bucketName) {
  throw new Error("Missing environment variables");
}

// Allowed Origins (Adjust these according to your setup)
const allowedOrigins = [
  "http://localhost:3000", // Development
  "http://nirvanacafe.ir",
  "https://nirvanacafe.ir",
  "https://www.nirvanacafe.ir",
  "http://www.nirvanacafe.ir",
];

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const origin = request.headers.get("origin");

  // Check if the origin is allowed
  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse("CORS policy violation", {
      status: 403,
    });
  }

  const formData = await request.formData();

  const title = formData.get("title") as string;
  const price = parseFloat(formData.get("price") as string);
  const hasExtra = formData.get("hasExtra") === "true";
  const isAvailable = formData.get("isAvailable") === "true";
  const isNew = formData.get("isNew") === "true";
  const isLarge = formData.get("isLarge") === "true";
  const isTax = formData.get("isTax") === "true";
  const isEnable = formData.get("isEnable") === "true";
  const details = formData.get("details") as string | null;

  const imageFile = formData.get("image") as File | null;

  // Initialize S3 client
  const s3 = new S3Client({
    endpoint: endpoint as string,
    region: "us-west-1", // Adjust according to your region
    credentials: {
      accessKeyId: accessKeyId as string,
      secretAccessKey: secretAccessKey as string,
    },
  });

  const menuItemObj = await prisma.menuItem.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!menuItemObj) {
    return NextResponse.json({ error: "Menu item not found" }, { status: 404 });
  }

  let newSrc = menuItemObj.src; // Default to the existing src

  if (imageFile) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const fileName = `${Date.now()}-${imageFile.name}`; // Generate a unique filename

    // Upload new image to S3
    const uploadParams = {
      Bucket: bucketName as string,
      Key: fileName,
      Body: buffer,
      ContentType: imageFile.type,
    };

    await s3.send(new PutObjectCommand(uploadParams));
    newSrc = `${endpoint}/${bucketName}/${fileName}`; // Update src to point to the new image

    // Delete the old image from S3 if it's not the default fallback
    if (
      menuItemObj.src &&
      menuItemObj.src !== "http://nirvanacafe.ir/uploads/logo.webp"
    ) {
      const oldFileName = menuItemObj.src.split("/").pop(); // Extract the file name from the URL

      if (oldFileName) {
        const deleteParams = {
          Bucket: bucketName as string,
          Key: oldFileName,
        };

        await s3.send(new DeleteObjectCommand(deleteParams));
      }
    }
  }

  const updatedMenuItem = await prisma.menuItem.update({
    where: { id: menuItemObj.id },
    data: {
      title,
      src: newSrc,
      price,
      details,
      hasExtra,
      isAvailable,
      isNew,
      isLarge,
      isEnable,
      isTax,
    },
  });

  const response = NextResponse.json(updatedMenuItem);

  // Add CORS headers
  response.headers.set("Access-Control-Allow-Origin", origin || "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  return response;
}

export async function OPTIONS() {
  const response = NextResponse.json({ message: "CORS Preflight" });

  // Add CORS headers
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  return response;
}
