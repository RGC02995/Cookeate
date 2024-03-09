import axios from "axios";
import { errorHandler } from "./errorHandler";
import { UploadStatusResponse } from "./statusResponse.model";

export const tokenApi = async () => {
  const localStorageToken = localStorage.getItem("token");

  try {
    const response = await axios.post(
      "http://localhost:5000/api/user/verify-token",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorageToken,
        },
      }
    );

    const { data } = response;
    const { message, authData, token } = data;

    return { customStatus: UploadStatusResponse.OK, message, authData, token };
  } catch (error) {
    errorHandler();
  }
};
