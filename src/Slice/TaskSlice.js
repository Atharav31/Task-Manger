import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  task: [], // Changed from `null` to an empty array for easier management
  loading: false,
  error: null,
};

const TasksSlice = createSlice({
  name: "Task",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      console.log(action.payload);
      state.task = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addTask: (state, action) => {
      // Add the new task to the current list of tasks
      state.task = [action.payload, ...state.task];
    },
    updateTask: (state, action) => {
      const { id, updates } = action.payload;
      if (state.task) {
        const taskIndex = state.task.findIndex((t) => t._id === id);
        if (taskIndex !== -1) {
          state.task[taskIndex] = {
            ...state.task[taskIndex],
            ...updates,
          };
        }
      }
    },
  },
});

export const { setTasks, setLoading, setError, addTask, updateTask } =
  TasksSlice.actions;

export default TasksSlice.reducer;
