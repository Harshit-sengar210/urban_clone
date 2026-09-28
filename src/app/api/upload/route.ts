import { NextResponse } from "next/server";
import cloudinary from "@/backend/cloudinary";

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
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
