import axios from "axios";

const baseUrl = `${process.env.REACT_APP_API_URL}`;
const token = `Bearer ${localStorage.getItem("token")}`;
export const sendTaskApi = (data) => {
  try {
    const response = axios.post(`${baseUrl}/api/createTask`, data, {
      headers: {
        Authorization: token,
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getTaskApi = (userId) => {
  try {
    const response = axios.get(`${baseUrl}/api/getTask/${userId}`, {
      headers: {
        Authorization: token,
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
