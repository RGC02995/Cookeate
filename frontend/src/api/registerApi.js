import axios from "axios";
import { UploadStatusResponse } from "./statusResponse.model";
import { errorHandler } from "./errorHandler";
import validator from "validator";

export const registerApi = async ({ name, surname, nick, email, password }) => {
  if (!validator.isEmail(email)) {
    return { customStatus: UploadStatusResponse.INVALID_FIELD };
  }

  if (!name || !surname || !nick || !password) {
    return { customStatus: UploadStatusResponse.FIELD_REQUIRED };
  }

  try {
    const response = await axios.post(
      "http://localhost:5000/api/user/register",
      {
        name,
        surname,
        nick,
        email,
        password,
      }
    );
    const { data } = response;
    const { message } = data;

    return {
      customStatus: UploadStatusResponse.OK,
      message,
    };
  } catch (error) {
    return errorHandler(error);
  }
};
