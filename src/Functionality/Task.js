import React, { useEffect, useState } from "react";
import { sendTaskApi } from "../API/Task";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DisplayTask from "./DisplayTask";

const Task = () => {
  const navigate = useNavigate();
  //Selector
  const { user } = useSelector((state) => state.userProfile) || {};
  const { tasks } = useSelector((state) => state.task) || {};
  //states
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleAddTask = async () => {
    console.log(formData);
    const response = await sendTaskApi({ ...formData, userId: user._id });
    if (response.status === 201) {
      toast.success(response.data.message);
      // navigate("/Task");
      setFormData({ title: "", description: "", status: "pending" });
    }
    if (response.status === 400) {
      toast.error(response.data.message);
    }
    if (response.status === 500) {
      toast.error(response.data.message);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center p-8 bg-base-200 min-h-screen">
        <h1 className="text-5xl font-extrabold text-base-800 mb-8">
          📝 Task Manager
        </h1>{" "}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Add a task title..."
            className="input input-bordered w-72 shadow-lg text-lg placeholder-base-400"
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add a description..."
            className="input input-bordered w-72 shadow-lg text-lg placeholder-base-400"
          />
          <select
            value={formData.status}
            onChange={handleChange}
            name="status"
            className="select select-bordered w-40 shadow-lg text-lg"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <button
            onClick={handleAddTask}
            className="btn btn-primary px-6 py-2 text-lg"
          >
            Add
          </button>
        </div>
        <DisplayTask />
      </div>
    </>
  );
};

export default Task;
