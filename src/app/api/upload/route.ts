import { NextResponse } from "next/server";
import cloudinary from "@/backend/cloudinary";

export const dynamic = 'force-dynamic';

export const maxDuration = 60; // 60 seconds


export async function POST(request: Request) {
  try {
    const { image } = await request.json();
    
    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Upload to cloudinary
    const result = await cloudinary.uploader.upload(image, {
      folder: "urban-clone/vendors",
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error: any) {
    let errMessage = "Unknown error";
    if (error instanceof Error) {
      errMessage = error.message;
    } else if (typeof error === "object" && error !== null) {
      errMessage = error.message || JSON.stringify(error);
    } else {
      errMessage = String(error);
    }
    console.error("Cloudinary upload error:", errMessage);
    return NextResponse.json({ error: "Upload failed: " + errMessage }, { status: 500 });
  }
}
