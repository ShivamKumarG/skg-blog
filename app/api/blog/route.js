import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";

export async function GET() {
  try {
    await ConnectDB();
    const blogs = await BlogModel.find({});
    return NextResponse.json({ success: true, blogs });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { success: false, msg: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await ConnectDB();

    const formData = await request.formData();
    const timestamp = Date.now();

    // Save image locally
    const image = formData.get("image");
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);
    const imgUrl = `/${timestamp}_${image.name}`;

    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      image: imgUrl,
      authorImg: formData.get("authorImg"),
    };

    await BlogModel.create(blogData);
    console.log("✅ Blog Saved");

    return NextResponse.json({ success: true, msg: "Blog Added" });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { success: false, msg: "Failed to add blog" },
      { status: 500 }
    );
  }
}
