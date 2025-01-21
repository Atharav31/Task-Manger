import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa"; // Font Awesome Icons

const DisplayTask = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.TasksSlice.task) || [];

  const handleEdit = (id) => {
    console.log(`Edit Task ID: ${id}`);
    // Add logic for editing, e.g., open modal or navigate
  };

  const handleDelete = (id) => {
    console.log(`Delete Task ID: ${id}`);
    // Add logic for deleting, e.g., dispatch delete action
  };

  const handleStatusUpdate = (id, currentStatus) => {
    console.log(`Update Status for Task ID: ${id}`);
    const updatedStatus = currentStatus === "pending" ? "completed" : "pending";
    // Dispatch an action to update the status
    // dispatch({
    //   type: "UPDATE_TASK_STATUS", // Replace with your Redux action type
    //   payload: { id, status: updatedStatus },
    // });
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* Table Head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {tasks?.length > 0 ? (
            tasks.map((task, index) => (
              <tr key={task?._id}>
                <th>{index + 1}</th>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status} </td>
                <td>
                  <button
                    className="btn btn-sm btn-primary mr-2"
                    onClick={() => handleEdit(task?._id)}
                  >
                    <FaEdit title="Edit Task" />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(task?._id)}
                  >
                    <FaTrash title="Delete Task" />
                  </button>
                </td>
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
