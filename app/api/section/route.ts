import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Initialize S3 Client
const s3 = new S3Client({
  endpoint: process.env.LIARA_ENDPOINT as string,
  region: "us-west-1", // Adjust to your S3 region
  credentials: {
    accessKeyId: process.env.LIARA_ACCESS_KEY as string,
    secretAccessKey: process.env.LIARA_SECRET_KEY as string,
  },
});
const bucketName = process.env.LIARA_BUCKET_NAME as string;

// List of allowed origins for CORS
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
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return response;
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");

  // CORS Preflight check
  if (request.method === "OPTIONS") {
    return addCorsHeaders(new NextResponse(null, { status: 204 }), origin);
  }

  // CORS check
  if (origin && !allowedOrigins.includes(origin)) {
    return addCorsHeaders(
      new NextResponse("CORS policy violation", { status: 403 }),
      origin
    );
  }

  try {
    // Parse form data
    const formData = await request.formData();

    // Extract fields from form data
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const order = parseInt(formData.get("order") as string) || 1; // Default order to 1 if not provided
    const mainItemId = parseInt(formData.get("mainItemId") as string) || null; // Extract mainItemId
    const imageFile = formData.get("image") as File | null;

    // Validate required fields
    if (!title || !category) {
      return addCorsHeaders(
        new NextResponse(
          JSON.stringify({ error: "Title and category are required" }),
          { status: 400 }
        ),
        origin
      );
    }

    // Check if the referenced MainItem exists
    if (mainItemId) {
      const mainItemExists = await prisma.mainItem.findUnique({
        where: { id: mainItemId },
      });
      if (!mainItemExists) {
        return addCorsHeaders(
          new NextResponse(
            JSON.stringify({ error: "Invalid mainItemId provided" }),
            { status: 400 }
          ),
          origin
        );
      }
    }

    let icon = "http://nirvanacafe.ir/uploads/logo.webp"; // Default icon URL

    // If an image file is provided, upload it to S3
    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const fileName = `${Date.now()}-${imageFile.name}`;

      const uploadParams = {
        Bucket: bucketName,
        Key: fileName,
        Body: buffer,
        ContentType: imageFile.type,
      };

      await s3.send(new PutObjectCommand(uploadParams));
      icon = `${process.env.LIARA_ENDPOINT}/${bucketName}/${fileName}`;
    }

    // Create the new Section in the database
    const newSection = await prisma.section.create({
      data: {
        title,
        category,
        order,
        icon, // Save the S3 URL or fallback icon in the database
        mainItemId, // Associate the Section with the MainItem if provided
      },
    });

    const response = new NextResponse(JSON.stringify(newSection), {
      status: 201,
    });
    return addCorsHeaders(response, origin);
  } catch (error) {
    console.error("Error creating Section:", error);
    const response = new NextResponse("Internal server error", { status: 500 });
    return addCorsHeaders(response, origin);
  }
}

export async function GET(req: NextRequest) {
  const origin = req.headers.get("origin");

  // CORS Preflight check
  if (req.method === "OPTIONS") {
    return addCorsHeaders(new NextResponse(null, { status: 204 }), origin);
  }

  // CORS check
  if (origin && !allowedOrigins.includes(origin)) {
    return addCorsHeaders(
      new NextResponse("CORS policy violation", { status: 403 }),
      origin
    );
  }

  try {
    const sections = await prisma.section.findMany({
      orderBy: {
        order: "asc", // Change to 'desc' if you want descending order
      },
      include: {
        mainItem: true, // Include the related MainItem in the response
        menuItems: {
          orderBy: {
            order: "asc", // Change to 'desc' if you want descending order
          },
          where: {
            isEnable: true,
          },
          include: {
            extraItems: {
              where: {
                isEnable: true, // Only include ExtraItems where isEnable is true
              },
            },
          },
        },
      },
    });

    const response = new NextResponse(JSON.stringify(sections));
    return addCorsHeaders(response, origin);
  } catch (error) {
    console.error(error);
    const response = new NextResponse("Internal server error", { status: 500 });
    return addCorsHeaders(response, origin);
  }
}
