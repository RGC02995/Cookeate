import axios from "axios";

export const registerAPI = axios.create({
  baseURL: "http://localhost:5000/api/user",
});
