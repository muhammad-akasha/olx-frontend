import axios from "axios";
import Cookies from "js-cookie";

export const refreshToken = async () => {
  try {
    const res = await api.post("refreshtoken", {}, { withCredentials: true });
    saveAccessToken(res.data.accessToken);
  } catch (error) {
    console.log(error);
  }
};

export const saveAccessToken = (accessToken) => {
  Cookies.set("accessToken", accessToken, { expires: 1 / 24 }); // Expires in 1 hour
};

const api = axios.create({
  baseURL: "https://olx-backend-deploy.vercel.app/api/v1/", // Your API URL
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken"); // Get token from cookies using js-cookie

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 403) {
      console.error("Token expired or invalid. Logging out...");
      await refreshToken();
    }

    return Promise.reject(error);
  }
);

export default api;
