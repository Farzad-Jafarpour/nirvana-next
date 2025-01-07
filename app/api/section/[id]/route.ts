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

function addCorsHeaders(response: NextResponse, origin: string | null) {
  response.headers.set("Access-Control-Allow-Origin", origin || "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return response;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const origin = request.headers.get("origin");

  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse("CORS policy violation", { status: 403 });
  }

  try {
    const formData = await request.formData();

    const title = (formData.get("title") as string) || undefined;
    const category = (formData.get("category") as string) || undefined;
    const imageFile = formData.get("image") as File | null;
    const order = formData.get("order")
      ? parseInt(formData.get("order") as string)
      : undefined;
    const mainItemId = formData.get("mainItemId")
      ? parseInt(formData.get("mainItemId") as string)
      : undefined;

    // Find the section
    const section = await prisma.section.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!section) {
      const response = new NextResponse(
        JSON.stringify({ error: "Section not found" }),
        { status: 404 }
      );
      return addCorsHeaders(response, origin);
    }

    let newIcon = section.icon;

    // Initialize S3 client
    const s3 = new S3Client({
      endpoint: endpoint as string,
      region: "us-west-1",
      credentials: {
        accessKeyId: accessKeyId as string,
        secretAccessKey: secretAccessKey as string,
      },
    });

    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const fileName = `${Date.now()}-${imageFile.name}`;

      // Upload to S3
      const uploadParams = {
        Bucket: bucketName as string,
        Key: fileName,
        Body: buffer,
        ContentType: imageFile.type,
      };

      await s3.send(new PutObjectCommand(uploadParams));
      newIcon = `${endpoint}/${bucketName}/${fileName}`;

      // Delete old icon
      if (
        section.icon &&
        section.icon !== "http://nirvanacafe.ir/uploads/logo.webp"
      ) {
        const oldFileName = section.icon.split("/").pop();

        if (oldFileName) {
          const deleteParams = {
            Bucket: bucketName as string,
            Key: oldFileName,
          };

          await s3.send(new DeleteObjectCommand(deleteParams));
        }
      }
    }

    // Validate mainItemId
    if (mainItemId) {
      const mainItemExists = await prisma.mainItem.findUnique({
        where: { id: mainItemId },
      });
      if (!mainItemExists) {
        const response = new NextResponse(
          JSON.stringify({ error: "Invalid mainItemId provided" }),
          { status: 400 }
        );
        return addCorsHeaders(response, origin);
      }
    }

    // Update section
    const updatedSection = await prisma.section.update({
      where: { id: section.id },
      data: {
        title: title || section.title,
        category: category || section.category,
        order: order !== undefined ? order : section.order,
        icon: newIcon,
        mainItemId: mainItemId !== undefined ? mainItemId : section.mainItemId,
      },
    });

    const response = NextResponse.json(updatedSection);
    return addCorsHeaders(response, origin);
  } catch (error) {
    console.error("Error updating section:", error);
    const response = new NextResponse("Internal Server Error", { status: 500 });
    return addCorsHeaders(response, origin);
  }
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
