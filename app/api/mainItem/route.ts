import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const allowedOrigins = [
  "http://localhost:3000",
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

export async function GET(req: NextRequest) {
  const origin = req.headers.get("origin");

  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse("CORS policy violation", { status: 403 });
  }

  try {
    const mainItems = await prisma.mainItem.findMany({
      include: { sections: true }, // Include related sections if needed
    });

    const response = NextResponse.json(mainItems);
    return addCorsHeaders(response, origin);
  } catch (error) {
    console.error("Error fetching MainItems:", error);
    const response = new NextResponse("Internal Server Error", { status: 500 });
    return addCorsHeaders(response, origin);
  }
}

async function uploadImageToS3(imageFile?: File): Promise<string> {
  if (!imageFile) {
    return "http://nirvanacafe.ir/uploads/logo.webp"; // Default fallback
  }

  const s3 = new S3Client({
    endpoint: process.env.LIARA_ENDPOINT as string,
    region: "us-west-1",
    credentials: {
      accessKeyId: process.env.LIARA_ACCESS_KEY as string,
      secretAccessKey: process.env.LIARA_SECRET_KEY as string,
    },
  });

  const buffer = Buffer.from(await imageFile.arrayBuffer());
  const fileName = `${Date.now()}-${imageFile.name}`;

  const params = {
    Bucket: process.env.LIARA_BUCKET_NAME as string,
    Key: fileName,
    Body: buffer,
    ContentType: imageFile.type,
  };

  await s3.send(new PutObjectCommand(params));
  return `${process.env.LIARA_ENDPOINT}/${process.env.LIARA_BUCKET_NAME}/${fileName}`;
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse("CORS policy violation", { status: 403 });
  }

  try {
    const data = await request.formData();

    const title = data.get("title") as string;
    const path = data.get("path") as string;
    const imageFile = data.get("image") as File | null;
    const isEnable = data.get("isEnable") === "true"; // Optional field, default to true

    if (!title) {
      return new NextResponse(JSON.stringify({ error: "title is required" }), {
        status: 400,
      });
    }

    // Upload image to S3 and get the URL
    const src = await uploadImageToS3(imageFile || undefined);

    // Create new MainItem
    const newMainItem = await prisma.mainItem.create({
      data: {
        title,
        src,
        path,
        isEnable, // Include isEnable field
      },
    });

    const response = NextResponse.json(newMainItem);
    response.headers.set("Access-Control-Allow-Origin", origin || "*");
    return response;
  } catch (error) {
    console.error("Error creating MainItem:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
