import axios from "axios";

export const tokenApi = axios.create({
  baseURL: "http://localhost:5000/token",
});