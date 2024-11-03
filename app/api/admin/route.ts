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

    // Validate the form data
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const imageFile = formData.get("image") as File | null;

    if (!title || !category) {
      return addCorsHeaders(
        new NextResponse(
          JSON.stringify({ error: "Title and category are required" }),
          { status: 400 }
        ),
        origin
      );
    }

    let icon = "";

    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const fileName = `${Date.now()}-${imageFile.name}`;

      const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: buffer,
        ContentType: imageFile.type,
      };

      await s3.send(new PutObjectCommand(params));
      icon = `${process.env.LIARA_ENDPOINT}/${bucketName}/${fileName}`;
    } else {
      icon = "http://nirvanacafe.ir/uploads/logo.webp";
    }

    const newSection = await prisma.section.create({
      data: {
        title,
        category,
        icon, // Save the S3 URL in the database
      },
    });

    const response = new NextResponse(JSON.stringify(newSection), {
      status: 201,
    });
    return addCorsHeaders(response, origin);
  } catch (error) {
    console.error(error);
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
    const isAdmin = req.nextUrl.pathname.startsWith("/api/admin");

    const sections = await prisma.section.findMany({
      include: {
        menuItems: {
          where: isAdmin ? {} : { isEnable: true }, // Adjust based on admin check
          include: {
            extraItems: true, // This includes related ExtraItems for each MenuItem
          },
        },
      },
    });

    const response = new NextResponse(JSON.stringify(sections));
    return addCorsHeaders(response, origin);
  } catch (error) {
    console.error("Error fetching sections:", error);
    const response = new NextResponse("Internal server error", { status: 500 });
    return addCorsHeaders(response, origin);
  }
}
