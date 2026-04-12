export const uploadImageToCloudinary = async (file) => {
  // If file is a FileList (e.g. from react-hook-form register), take the first file
  const fileToUpload = file instanceof FileList ? file[0] : file;

  const data = new FormData();
  data.append("file", fileToUpload);
  data.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "olximages",
  );

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dxzkgploq"}/image/upload`,
      {
        method: "POST",
        body: data,
      },
    );

    const result = await res.json();
    if (result.error) {
      throw new Error(result.error.message);
    }
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};
