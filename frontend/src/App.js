import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { FaFolderPlus } from "react-icons/fa";

import SignIn from "./components/SignIn";
import Folder from "./components/Folder";
import Modal from "./components/modals/ModalRoot";
import { openModal } from "./features/modal/modalSlice";
import { initialize, setSelected } from "../features/folder/folderSlice";

import styles from "./App.module.css";

function App() {
  const STYLEAPP = styles.App;

  const [cookies, setCookie] = useCookies(["authenticate"]);
  const modal = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const cookieHandler = (name, data, expiration) => {
    setCookie(name, data, {
      path: "/",
      expires: expiration,
      sameSite: "strict",
    });
  };

  const openModalAddModal = child => {
    dispatch(openModal({ child: child }));
  };

  const isAuthenticated = cookies.authenticate;

  useEffect(async () => {
    const result = await fetch("http://localhost:8000/folders/getFolders", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      crossDomain: true,
    });
    const data = await result.json();
    data.sort((a, b) => a.position - b.position);
    dispatch(initialize(data));
  }, [modal.show, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className={STYLEAPP}>
        <SignIn cookieHandler={cookieHandler} />
      </div>
    );
  }

  return (
    <div className={STYLEAPP}>
      <Folder />
      <button onClick={() => openModalAddModal("addFolder")}>
        <FaFolderPlus />
      </button>
      <Modal />
    </div>
  );
}

export default App;
