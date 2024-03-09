import { UploadStatusResponse } from "./statusResponse.model";

export const errorHandler = (error) => {
  const { response } = error;
  const { data } = response;
  const { message } = data;

  return {
    customStatus: UploadStatusResponse.ERROR_API,
    message,
  };
};
