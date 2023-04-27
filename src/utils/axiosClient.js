import axios from "axios";
import { loggedInUser } from "./localFUnctions";

const baseURL = "/api/";
const DEFAULT_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

var token;
if (typeof window !== null && typeof window !== "undefined") {
  token = loggedInUser?.token;
}
var headers;
if (typeof window !== null && typeof window !== "undefined" && token) {
  headers = { ...DEFAULT_HEADERS, Authorization: `Bearer${token}` };
} else {
  headers = { ...DEFAULT_HEADERS };
}

const axiosClient = axios.create({
  baseURL: baseURL,
  headers: headers,
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || "Something went wrong")
);

export default axiosClient;
