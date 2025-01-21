import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage
import userProfileReducer from "../Slice/UserProfile";
import TasksSliceReducer from "../Slice/TaskSlice";

// Redux Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Combine reducers and apply persistence
const rootReducer = {
  userProfile: persistReducer(persistConfig, userProfileReducer),
  TasksSlice: persistReducer(persistConfig, TasksSliceReducer),
};

const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
export default store;
