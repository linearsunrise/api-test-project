import axios from "axios";

import { REST_URL } from "@/api/config";

const api = axios.create({
  baseURL: REST_URL,
  headers: {
    "Access-Control-Allow-Headers": "content-type, Authorization",
    "Content-Type": "application/json",
  },
});

export default api;
