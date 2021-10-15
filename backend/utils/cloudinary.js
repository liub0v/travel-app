const config = require("config");
const cloudinary = require("cloudinary").v2;

const getPublicId = (url) => url.slice(url.search(/[^/]+.$/), -4);
cloudinary.config({
  cloud_name: config.get("CLOUDINARY_CLOUD_NAME"),
  api_key: config.get("CLOUDINARY_API_KEY"),
  api_secret: config.get("CLOUDINARY_API_SECRET"),
});
async function uploadToCloud(source, folder) {
  // if (source.type !== "image/jpeg") {
  //   throw new Error("Image should has .jpg extension");
  // }

  try {
    const response = await cloudinary.uploader.upload(source.path, {
      resource_type: "image",
      folder: folder,
      invalidate: true,
    });
    return response.secure_url;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function removeFromCloud(url, folder) {
  const public_id = getPublicId(url);

  try {
    await cloudinary.uploader.destroy(`${folder}/${public_id}`, {
      resource_type: "image",
    });

    return url;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateCloudImage(url, source, folder) {
  // if (source.type !== "image/jpeg") {
  //   throw new Error("Image should has .jpg extension");
  // }

  const public_id = getPublicId(url);

  try {
    const response = await cloudinary.uploader.upload(source.path, {
      public_id,
      resource_type: "image",
      folder,
      invalidate: true,
      overwrite: true,
    });

    return response.secure_url;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  uploadToCloud,
  removeFromCloud,
  updateCloudImage,
};
