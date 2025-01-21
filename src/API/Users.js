import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = `${process.env.REACT_APP_API_URL}`;
const token = `Bearer ${localStorage.getItem("token")}`;
export const SignUpApi = (data) => {
  try {
    const response = axios.post(`${baseUrl}/api/signup`, data);
    return response;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};

export const loginApi = (data) => {
  try {
    const response = axios.post(`${baseUrl}/api/login`, data, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};

export const getProfileApi = (userId) => {
  try {
    const response = axios.post(`${baseUrl}/api/profile/${userId}`, {
      headers: {
        Authorization: token,
      },
      withCredentials: true,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};
export const logoutApi = () => {
  try {
    const response = axios.get(`${baseUrl}/api/logout`, {
      headers: {
        Authorization: token,
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};

export const updateProfileApi = async (formData) => {
  try {
    const response = await axios.put(`${baseUrl}/api/profile`, formData, {
      headers: {
        Authorization: token,
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};
