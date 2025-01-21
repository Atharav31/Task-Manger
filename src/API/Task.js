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

export const updateTaskApi = async (taskData, token) => {
  try {
    const response = await axios.put(
      `${baseUrl}/api/UpdateTask/${taskData._id}`,
      taskData,
      {
        headers: {
          Authorization: token,
        },
        withCredentials: true,
      }
    );
    return response.data; // Return the data from the response
  } catch (error) {
    console.error(
      "Error updating task:",
      error.response?.data || error.message
    );
    throw error; // Throw error to handle it where this function is called
  }
};

export const deleteTaskApi = async (taskId, token) => {
  try {
    const response = await axios.delete(`${baseUrl}/api/DeleteTask/${taskId}`, {
      headers: {
        Authorization: token,
      },
      withCredentials: true,
    });
    return response.data; // Return the data from the response
  } catch (error) {
    console.error(
      "Error deleting task:",
      error.response?.data || error.message
    );
    throw error; // Throw error to handle it where this function is called
  }
};
