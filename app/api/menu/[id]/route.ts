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
    const {
      title,
      price,
      hasExtra,
      isAvailable,
      isNew,
      isLarge,
      isTax,
      isEnable,
      details,
      extraItemIds,
      order
    } = {
      title: formData.get("title") as string,
      price: parseFloat(formData.get("price") as string),
      hasExtra: formData.get("hasExtra") === "true",
      isAvailable: formData.get("isAvailable") === "true",
      isNew: formData.get("isNew") === "true",
      isLarge: formData.get("isLarge") === "true",
      isTax: formData.get("isTax") === "true",
      isEnable: formData.get("isEnable") === "true",
      details: formData.get("details") as string | null,
      extraItemIds: JSON.parse(
        (formData.get("extraItemIds") as string) || "[]"
      ) as number[],
      order: parseInt(formData.get("order") as string) || 1
    };

    const imageFile = formData.get("image") as File | null;

    // Find the existing menu item
    const menuItemObj = await prisma.menuItem.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!menuItemObj) {
      return NextResponse.json(
        { error: "Menu item not found" },
        { status: 404 }
      );
    }

    let newSrc = menuItemObj.src; // Default to the existing src

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
        menuItemObj.src &&
        menuItemObj.src !== "http://nirvanacafe.ir/uploads/logo.webp"
      ) {
        const oldFileName = menuItemObj.src.split("/").pop();
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
    const updatedMenuItem = await prisma.menuItem.update({
      where: { id: menuItemObj.id },
      data: {
        title,
        price,
        details,
        hasExtra,
        isAvailable,
        isNew,
        isLarge,
        isEnable,
        isTax,
        src: newSrc,
        extraItems: {
          set: extraItemIds.map((id) => ({ id })), // Replace existing associations
        },
        order
      },
    });

    const response = NextResponse.json(updatedMenuItem);

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
