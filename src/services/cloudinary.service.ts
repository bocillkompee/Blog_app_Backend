import cloudinary from "../config/cloudinary";

export const uploadImage = (buffer: Buffer): Promise<{
  url: string;
  publicId: string;
}> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "blog-app",
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve({
          url: result!.secure_url,
          publicId: result!.public_id,
        });
      }
    );

    uploadStream.end(buffer);
  });
};