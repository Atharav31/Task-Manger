import axios from "axios";

const baseUrl = `${process.env.REACT_APP_API_URL}`;
const token = localStorage.getItem("token");

if (!token) {
  console.log("No token found in localStorage");
  // Handle token absence (e.g., redirect to login page)
}

export const sendTaskApi = (data) => {
  try {
    const response = axios.post(`${baseUrl}/api/createTask`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
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
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const updateTaskApi = async (taskData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("No token found. Cannot make the request.");
    // Handle no token case (e.g., redirect to login)
    return;
  }

  try {
    const response = await axios.put(
      `${baseUrl}/api/UpdateTask/${taskData._id}`,
      taskData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating task:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteTaskApi = async (taskId) => {
  const token = localStorage.getItem("token"); // Adjust token retrieval if needed
  if (!token) {
    console.error("Token is missing. Unable to delete task.");
    // Optionally handle token absence (e.g., redirect to login)
    return;
  }

  try {
    const response = await axios.delete(`${baseUrl}/api/DeleteTask/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting task:",
      error.response?.data || error.message
    );
    throw error;
  }
};
