import axios from "axios";
export const refreshToken = async () => {
  try {
    const res = await axios.post(
      "https://olx-backend-deploy.vercel.app/api/v1/refreshtoken",
      {},
      { withCredentials: true }
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
