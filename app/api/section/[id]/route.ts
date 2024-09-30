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

    // Retrieve form data
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const imageFile = formData.get("image") as File | null;

    // Find the section by its ID
    const section = await prisma.section.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!section) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }

    let newIcon = section.icon; // Default to the existing icon

    // Initialize S3 client
    const s3 = new S3Client({
      endpoint: endpoint as string,
      region: "us-west-1", // Adjust according to your region
      credentials: {
        accessKeyId: accessKeyId as string,
        secretAccessKey: secretAccessKey as string,
      },
    });

    if (imageFile) {
      // Convert image to buffer for S3 upload
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const fileName = `${Date.now()}-${imageFile.name}`; // Unique filename

      // Upload new image to S3
      const uploadParams = {
        Bucket: bucketName as string,
        Key: fileName,
        Body: buffer,
        ContentType: imageFile.type,
      };

      await s3.send(new PutObjectCommand(uploadParams));
      newIcon = `${endpoint}/${bucketName}/${fileName}`; // Set new icon URL

      // If the old icon isn't the default fallback, delete it from S3
      if (
        section.icon &&
        section.icon !== "http://nirvanacafe.ir/uploads/logo.webp"
      ) {
        const oldFileName = section.icon.split("/").pop(); // Extract filename

        if (oldFileName) {
          const deleteParams = {
            Bucket: bucketName as string,
            Key: oldFileName,
          };

          await s3.send(new DeleteObjectCommand(deleteParams));
        }
      }
    }

    // Update the section in the database
    const updatedSection = await prisma.section.update({
      where: { id: section.id },
      data: {
        title,
        category,
        icon: newIcon, // Set the updated icon
      },
    });

    const response = NextResponse.json(updatedSection);

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
  } catch (error) {
    console.error("Error updating section:", error);
    const response = new NextResponse("Internal server error", { status: 500 });

    // Add CORS headers to error response
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
