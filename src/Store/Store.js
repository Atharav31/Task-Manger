import { configureStore } from "@reduxjs/toolkit";
import userProfileReducer from "../Slice/UserProfile"; // Import the userProfileReducer
import TasksSliceReducer from "../Slice/TaskSlice"; // Import the TasksSliceReducer
const store = configureStore({
  reducer: {
    userProfile: userProfileReducer,
    TasksSlice: TasksSliceReducer,
  },
});

export default store;
