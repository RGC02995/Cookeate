import { UploadStatusResponse } from "./statusResponse.model";

export const errorHandler = (error) => {
  const { response } = error;
  const { data, status } = response;
  const { message } = data;

  if (status === 403) {
    console.error("A tu puta casa crack, fiera, mastodonte");
    localStorage.removeItem("token");
    location.href = "/login";
    return;
  }

  return {
    customStatus: UploadStatusResponse.ERROR_API,
    message,
  };
};
