import axios from "axios";

const token = localStorage.getItem("token");

export const UploadStatusResponse = {
  OK: "OK",
  ERROR_API: "ERROR_API",
  FIELD_REQUIRED: "FIELD_REQUIRED",
};

export const uploadRecipe = async ({ title, subtitle, food, guide }) => {
  if (!title || !subtitle || !food || !guide) {
    return { customStatus: UploadStatusResponse.FIELD_REQUIRED };
  }

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
  const { status, message } = data;

  if (status === "success") {
    return { customStatus: UploadStatusResponse.ERROR, message };
  }
};
