import { configureStore } from "@reduxjs/toolkit";
import folderReducer from "../features/folder/folderSlice";
import modalReducer from "../features/modal/modalSlice";

export default configureStore({
  reducer: {
    folders: folderReducer,
    modal: modalReducer,
  },
});
