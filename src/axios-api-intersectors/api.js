import axios from "axios";
export const refreshToken = async () => {
  try {
    const res = await axios.post(
      "http://localhost:8000/api/v1/refreshtoken",
      {},
      { withCredentials: true }
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
