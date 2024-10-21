// import prisma from "@/lib/prisma";
// import { promises as fs } from "fs";
// import { NextRequest, NextResponse } from "next/server";
// import path from "path";

// export async function POST(request: NextRequest) {
//   const data = await request.formData();

//   const title = data.get("title") as string;
//   const price = parseFloat(data.get("price") as string);
//   const hasExtra = data.get("hasExtra") === "true";
//   const isAvailable = data.get("isAvailable") === "true";
//   const isNew = data.get("isNew") === "true";
//   const isLarge = data.get("isLarge") === "true";
//   const isTax = data.get("isTax") === "true";
//   const isEnable = data.get("isEnable") === "true";
//   const sectionId = parseInt(data.get("sectionId") as string);
//   let src = (data.get("src") as string) || "";

//   const imageFile = data.get("image") as File;
//   if (imageFile) {
//     const buffer = Buffer.from(await imageFile.arrayBuffer());
//     const fileName = `${Date.now()}-${imageFile.name}`; // Generate a unique filename
//     const uploadDir = path.join(process.cwd(), "public/uploads");

//     // Ensure the uploads directory exists
//     await fs.mkdir(uploadDir, { recursive: true });

//     const filePath = path.join(uploadDir, fileName);
//     await fs.writeFile(filePath, buffer);
//     src = `http://nirvanacafe.ir/uploads/${fileName}`; // Store the relative path
//   }

//   if (!imageFile) {
//     src = "http://nirvanacafe.ir/uploads/logo.webp";
//   }

//   const newMenuItem = await prisma.menuItem.create({
//     data: {
//       title,
//       price,
//       hasExtra,
//       isAvailable,
//       isNew,
//       isLarge,
//       isTax,
//       isEnable,
//       sectionId,
//       src, // Store the relative path to the uploaded file
//     },
//   });

//   return NextResponse.json(newMenuItem);
// }

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
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

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");

  // Check if the origin is allowed
  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse("CORS policy violation", {
      status: 403,
    });
  }

  const data = await request.formData();

  const title = data.get("title") as string;
  const details = data.get("details") as string;
  const price = parseFloat(data.get("price") as string);
  const hasExtra = data.get("hasExtra") === "true";
  const isAvailable = data.get("isAvailable") === "true";
  const isNew = data.get("isNew") === "true";
  const isLarge = data.get("isLarge") === "true";
  const isTax = data.get("isTax") === "true";
  const isEnable = data.get("isEnable") === "true";
  const sectionId = parseInt(data.get("sectionId") as string);

  let src = "";

  // S3 Configuration
  const s3 = new S3Client({
    endpoint: endpoint as string, // Ensure endpoint is a string
    region: "us-west-1", // Adjust according to your region
    credentials: {
      accessKeyId: accessKeyId as string, // Ensure accessKeyId is a string
      secretAccessKey: secretAccessKey as string, // Ensure secretAccessKey is a string
    },
  });

  const imageFile = data.get("image") as File;
  if (imageFile) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const fileName = `${Date.now()}-${imageFile.name}`;

    const params = {
      Bucket: bucketName as string, // Ensure bucketName is a string
      Key: fileName,
      Body: buffer,
      ContentType: imageFile.type,
    };

    await s3.send(new PutObjectCommand(params));

    src = `${endpoint}/${bucketName}/${fileName}`;
  } else {
    src = "http://nirvanacafe.ir/uploads/logo.webp"; // Default fallback
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
      src,
    },
  });

  const response = NextResponse.json(newMenuItem);

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
