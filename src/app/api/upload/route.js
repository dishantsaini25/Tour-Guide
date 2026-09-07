/**
 * POST /api/upload
 * Receives a multipart/form-data request containing a single file field
 * named "file", uploads it to Cloudinary, and returns { url }.
 * CLOUDINARY_API_SECRET stays server-side only — never exposed to the browser.
 */
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return Response.json(
        { error: "No file provided. Include a 'file' field in the form data." },
        { status: 400 }
      );
    }

    // Convert Web API File → Node Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Strip extension for a clean public_id
    const fileName = file.name.replace(/\.[^.]+$/, "");

    const url = await uploadToCloudinary(buffer, fileName);

    return Response.json({ url }, { status: 200 });
  } catch (err) {
    console.error("[/api/upload]", err);
    return Response.json(
      { error: "Upload failed. Check server logs for details." },
      { status: 500 }
    );
  }
}
