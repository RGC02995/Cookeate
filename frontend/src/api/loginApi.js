import axios from "axios";

export const loginAPI = axios.create({
  baseURL: "http://localhost:5000/api/user",
});
