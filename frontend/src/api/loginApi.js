import axios from "axios";
import { UploadStatusResponse } from "./statusResponse.model";
import { errorHandler } from "./errorHandler";

export const loginApi = async ({ email, password }) => {
  if (!email || !password) {
    return { customStatus: UploadStatusResponse.FIELD_REQUIRED };
  }

  try {
    const response = await axios.post("http://localhost:5000/api/user/login", {
      email,
      password,
    });

    const { data } = response;
    const { message, token } = data;

    return {
      customStatus: UploadStatusResponse.OK,
      message,
      token,
    };
  } catch (error) {
    return errorHandler(error);
  }
};
