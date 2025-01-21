import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { updateTask, deleteTask } from "../Slice/TaskSlice"; // Replace with your actual Redux actions

const DisplayTask = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.TasksSlice.task) || [];
  const [editTaskId, setEditTaskId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const handleEditClick = (task) => {
    setEditTaskId(task._id);
    setEditFormData({ ...task });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = () => {
    dispatch(updateTask(editFormData)); // Dispatch update action
    setEditTaskId(null); // Exit edit mode
  };

  const handleCancelClick = () => {
    setEditTaskId(null); // Exit edit mode without saving
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(id)); // Dispatch delete action
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.length > 0 ? (
            tasks.map((task, index) => (
              <tr key={task._id}>
                {editTaskId === task._id ? (
                  <>
                    <td>{index + 1}</td>
                    <td>
                      <input
                        type="text"
                        name="title"
                        value={editFormData.title}
                        onChange={handleEditChange}
                        className="input input-bordered w-full"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="description"
                        value={editFormData.description}
                        onChange={handleEditChange}
                        className="input input-bordered w-full"
                      />
                    </td>
                    <td>
                      <select
                        name="status"
                        value={editFormData.status}
                        onChange={handleEditChange}
                        className="select select-bordered w-full"
                      >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-success mr-2"
                        onClick={handleSaveClick}
                      >
                        <FaCheck title="Save Task" />
                      </button>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={handleCancelClick}
                      >
                        <FaTimes title="Cancel Edit" />
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{index + 1}</td>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.status}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary mr-2"
                        onClick={() => handleEditClick(task)}
                      >
                        <FaEdit title="Edit Task" />
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(task._id)}
                      >
                        <FaTrash title="Delete Task" />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No tasks available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayTask;
