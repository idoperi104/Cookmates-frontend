import { utilService } from "./util.service";
// import { FastAverageColor } from 'fast-average-color'
import Axios from "axios";

export const uploadService = {
  uploadImg,
};

async function uploadImg(file) {
  const UPLOAD_PRESET = "profile";
  const CLOUD_NAME = "devp6bou9";

  const formData = new FormData();
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("file", file);

  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  try {
    const formData = new FormData();
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("file", file);

    const res = await fetch(UPLOAD_URL, {
      method: "POST",
      body: formData,
    });

    const {url} = await res.json();
    return url;
  } catch (err) {
    console.error("Failed to upload", err);
    throw err;
  }
}
