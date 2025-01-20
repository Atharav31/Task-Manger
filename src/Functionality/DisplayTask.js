import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { sendTaskApi } from "../API/Task";

const Task = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
  });

  const [todos, setTodos] = useState([]); // State to store the tasks
  const [filterPriority, setFilterPriority] = useState("All");

  const handleAddTodo = () => {
    const { title, description, priority } = formData;
    if (title.trim()) {
      setTodos([...todos, { title, description, priority, completed: false }]);
      sendTaskApi(todos); // Assuming this API sends the tasks data
      setFormData({
        title: "",
        description: "",
        priority: "Medium",
      });
    }
  };

  const handleToggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleFilterChange = (e) => {
    setFilterPriority(e.target.value);
  };

  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const filteredTodos = todos.filter(
    (todo) => filterPriority === "All" || todo.priority === filterPriority
  );

  const getCardClass = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100";
      case "Medium":
        return "bg-yellow-100";
      case "Low":
        return "bg-green-100";
      default:
        return "bg-white";
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-base-200 min-h-screen">
      <h1 className="text-5xl font-extrabold text-base-800 mb-8">
        📝 Task Manager
      </h1>

      <div className="mb-6">
        <label htmlFor="filter" className="mr-4 text-lg text-base-800">
          Filter by Priority:
        </label>
        <select
          id="filter"
          value={filterPriority}
          onChange={handleFilterChange}
          className="select select-bordered w-40"
        >
          <option value="All">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Add a task title..."
          className="input input-bordered w-72 shadow-lg text-lg placeholder-base-400"
        />
        <input
          type="text"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Add a description..."
          className="input input-bordered w-72 shadow-lg text-lg placeholder-base-400"
        />
        <select
          value={formData.priority}
          onChange={(e) =>
            setFormData({ ...formData, priority: e.target.value })
          }
          className="select select-bordered w-40 shadow-lg text-lg"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button
          onClick={handleAddTodo}
          className="btn btn-primary px-6 py-2 text-lg"
        >
          Add
        </button>
      </div>

      {filteredTodos.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTodos.map((todo, index) => (
            <li
              key={index}
              className={`card shadow-md w-80 ${getCardClass(todo.priority)}`}
            >
              <div className="card-body">
                <h2
                  className={`card-title text-xl font-semibold text-base-800 ${
                    todo.completed ? "line-through text-base-500" : ""
                  }`}
                  onClick={() => handleToggleComplete(index)}
                >
                  {`#${index + 1}: ${todo.title}`}{" "}
                </h2>
                <p
                  className={`text-sm text-base-600 mb-4 ${
                    todo.completed ? "line-through text-base-500" : ""
                  }`}
                  onClick={() => handleToggleComplete(index)}
                >
                  {todo.description}
                </p>
                <p className="text-sm text-base-500">
                  Priority: {todo.priority}
                  {todo.completed ? "👌" : "👋"}
                </p>
                <div className="card-actions justify-end">
                  <button
                    onClick={() => handleToggleComplete(index)}
                    className={`btn btn-sm ${
                      todo.completed ? "btn-success" : "btn-primary"
                    }`}
                  >
                    {todo.completed ? "Undo" : "Done"}
                  </button>
                  <MdDelete
                    onClick={() => handleDeleteTodo(index)}
                    sx={{ color: "red", cursor: "pointer" }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-base-600 text-lg italic">
          No tasks yet. Start adding your todos!
        </p>
      )}
    </div>
  );
};

export default Task;
