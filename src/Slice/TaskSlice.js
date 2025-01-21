import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { deleteTaskApi, updateTaskApi } from "../API/Task";

const initialState = {
  task: [],
  loading: false,
  error: null,
};

// Thunk for updating a task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await updateTaskApi(taskData);
      return response.data; // Backend should return the updated task
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for deleting a task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, { rejectWithValue }) => {
    try {
      await deleteTaskApi(taskId);
      return taskId; // Return the deleted task ID
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const TasksSlice = createSlice({
  name: "Task",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.task = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addTask: (state, action) => {
      state.task = [action.payload, ...state.task];
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle updateTask
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.task.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.task[index] = action.payload; // Update the task in state
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle deleteTask
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.task = state.task.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setTasks, setLoading, setError, addTask } = TasksSlice.actions;

export default TasksSlice.reducer;
