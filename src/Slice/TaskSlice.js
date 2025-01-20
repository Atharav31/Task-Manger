import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  task: null,
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
  },
});

export const { setTasks, setLoading, setError } = TasksSlice.actions;

export default TasksSlice.reducer;
