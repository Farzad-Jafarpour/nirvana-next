// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// const endpoint = process.env.LIARA_ENDPOINT;
// const accessKeyId = process.env.LIARA_ACCESS_KEY;
// const secretAccessKey = process.env.LIARA_SECRET_KEY;
// const bucketName = process.env.LIARA_BUCKET_NAME;

// if (!endpoint || !accessKeyId || !secretAccessKey || !bucketName) {
//   throw new Error("Missing environment variables");
// }

// // Allowed Origins (Adjust these according to your setup)
// const allowedOrigins = [
//   "http://localhost:3000", // Development
//   "http://nirvanacafe.ir",
//   "https://nirvanacafe.ir",
//   "https://www.nirvanacafe.ir",
//   "http://www.nirvanacafe.ir",
// ];

// export async function PATCH(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const origin = request.headers.get("origin");

//   // Check if the origin is allowed
//   if (origin && !allowedOrigins.includes(origin)) {
//     return new NextResponse("CORS policy violation", {
//       status: 403,
//     });
//   }

// async function uploadImageToS3(imageFile?: File): Promise<string> {
//   if (!imageFile) {
//     return "http://nirvanacafe.ir/uploads/logo.webp"; // Default fallback
//   }

//   const s3 = new S3Client({
//     endpoint: process.env.LIARA_ENDPOINT as string,
//     region: "us-west-1",
//     credentials: {
//       accessKeyId: process.env.LIARA_ACCESS_KEY as string,
//       secretAccessKey: process.env.LIARA_SECRET_KEY as string,
//     },
//   });

//   const buffer = Buffer.from(await imageFile.arrayBuffer());
//   const filetitle = `${Date.now()}-${imageFile.name}`; // Correctly define the file name here

//   const params = {
//     Bucket: process.env.LIARA_BUCKET_NAME as string,
//     Key: filetitle, // Use the correct variable name
//     Body: buffer,
//     ContentType: imageFile.type,
//   };

//   await s3.send(new PutObjectCommand(params));
//   return `${process.env.LIARA_ENDPOINT}/${process.env.LIARA_BUCKET_NAME}/${filetitle}`; // Use the correct variable name
// }

// export async function PATCH(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const origin = request.headers.get("origin");

//   if (origin && !allowedOrigins.includes(origin)) {
//     return new NextResponse("CORS policy violation", { status: 403 });
//   }

//   try {
//     const id = parseInt(params.id, 10);
//     if (isNaN(id)) {
//       const response = new NextResponse(
//         JSON.stringify({ error: "Invalid ID" }),
//         { status: 400 }
//       );
//       return addCorsHeaders(response, origin);
//     }

//     const data = await request.formData();
//     const title = data.get("title") as string | null;
//     const path = data.get("path") as string;
//     const imageFile = data.get("image") as File | null;
//     const isEnable = data.get("isEnable") === "true"; // Parse `isEnable` field

//     // Fetch the existing MainItem
//     const mainItem = await prisma.mainItem.findUnique({ where: { id } });
//     if (!mainItem) {
//       const response = new NextResponse(
//         JSON.stringify({ error: "MainItem not found" }),
//         { status: 404 }
//       );
//       return addCorsHeaders(response, origin);
//     }

//     let src = mainItem.src;
//     if (imageFile) {
//       src = await uploadImageToS3(imageFile);
//     }

//     const updatedMainItem = await prisma.mainItem.update({
//       where: { id },
//       data: {
//         title: title || mainItem.title,
//         src,
//         path,
//         isEnable, // Update `isEnable` field
//       },
//     });

//     const response = NextResponse.json(updatedMainItem);
//     return addCorsHeaders(response, origin);
//   } catch (error) {
//     console.error("Error updating MainItem:", error);
//     const response = new NextResponse("Internal Server Error", { status: 500 });
//     return addCorsHeaders(response, origin);
//   }
// }

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

  try {
    const formData = await request.formData();

    // Extract form data and parse values
    const { title, path, isEnable } = {
      title: formData.get("title") as string,
      path: formData.get("path") as string,
      isEnable: formData.get("isEnable") === "true", // Parse `isEnable` field
    };

    const imageFile = formData.get("image") as File | null;

    // Find the existing menu item
    const mainItemObj = await prisma.mainItem.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!mainItemObj) {
      return NextResponse.json(
        { error: "main item not found" },
        { status: 404 }
      );
    }

    let newSrc = mainItemObj.src; // Default to the existing src

    if (imageFile) {
      // Handle image upload and deletion
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const fileName = `${Date.now()}-${imageFile.name}`;

      const s3 = new S3Client({
        endpoint: endpoint as string,
        region: "us-west-1",
        credentials: {
          accessKeyId: accessKeyId as string,
          secretAccessKey: secretAccessKey as string,
        },
      });

      const uploadParams = {
        Bucket: bucketName as string,
        Key: fileName,
        Body: buffer,
        ContentType: imageFile.type,
      };

      await s3.send(new PutObjectCommand(uploadParams));
      newSrc = `${endpoint}/${bucketName}/${fileName}`;

      // Delete the old image if it's not the default one
      if (
        mainItemObj.src &&
        mainItemObj.src !== "http://nirvanacafe.ir/uploads/logo.webp"
      ) {
        const oldFileName = mainItemObj.src.split("/").pop();
        if (oldFileName) {
          const deleteParams = {
            Bucket: bucketName as string,
            Key: oldFileName,
          };
          await s3.send(new DeleteObjectCommand(deleteParams));
        }
      }
    }

    // Update the menu item, including extra item associations
    const updatedMainItem = await prisma.mainItem.update({
      where: { id: mainItemObj.id },
      data: {
        title,
        path,
        isEnable,
        src: newSrc,
      },
    });

    const response = NextResponse.json(updatedMainItem);

    // Set CORS headers
    setCorsHeaders(response, origin);

    return response;
  } catch (error) {
    console.error("Error updating MenuItem:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Helper function to set CORS headers
function setCorsHeaders(response: NextResponse, origin: string | null) {
  response.headers.set("Access-Control-Allow-Origin", origin || "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
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
