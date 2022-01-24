import { configureStore } from "@reduxjs/toolkit";
import folderReducer from "../features/folder/folderSlice";

export default configureStore({
  reducer: {
    folders: folderReducer,
  },
});
