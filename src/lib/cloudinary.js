import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure:     true,
});

/**
 * Uploads a file buffer to Cloudinary and returns the secure_url.
 * @param {Buffer} fileBuffer  - Raw file bytes
 * @param {string} fileName    - Used as the public_id (without extension)
 * @returns {Promise<string>}  - Cloudinary secure_url
 */
export async function uploadToCloudinary(fileBuffer, fileName) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        public_id:     fileName,
        overwrite:     true,
        resource_type: "auto",
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed"));
        } else {
          resolve(result.secure_url);
        }
      }
    );
    stream.end(fileBuffer);
  });
}

export default cloudinary;
