import axios from "axios";
import { UploadStatusResponse } from "./statusResponse.model";
import { errorHandler } from "./errorHandler";

const token = localStorage.getItem("token");

export const uploadRecipe = async ({ title, subtitle, food, guide }) => {
  if (!title || !subtitle || !food || !guide) {
    return { customStatus: UploadStatusResponse.FIELD_REQUIRED };
  }

  try {
    const responseApi = await axios.post(
      "http://localhost:5000/api/recipes/save",
      { title, subtitle, food, guide },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    const { data } = responseApi;
    const { message } = data;

    return {
      customStatus: UploadStatusResponse.OK,
      message,
    };
  } catch (error) {
    return errorHandler(error);
  }
};
