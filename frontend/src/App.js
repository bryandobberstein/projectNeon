import React, { useState } from "react";
import { useSelector, useDipatch } from "react-redux";
import { useCookies } from "react-cookie";
import { FaFolderPlus } from "react-icons/fa";

import SignIn from "./components/SignIn";
import Folder from "./components/Folder";
import Modal from "./components/modals/ModalRoot";

import styles from "./App.module.css";

function App() {
  const STYLEAPP = styles.App;

  const [cookies, setCookie] = useCookies(["authenticate"]);
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalChildren, setmodalChildren] = useState("");

  const cookieHandler = (name, data, expiration) => {
    setCookie(name, data, {
      path: "/",
      expires: expiration,
      sameSite: "strict",
    });
  };

  const closeModal = () => {
    setmodalOpen(false);
  };

  const openAddModal = () => {
    setmodalChildren("addFolder");
    setmodalOpen(true);
  };

  const isAuthenticated = cookies.authenticate;

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
      <button onClick={openAddModal}>
        <FaFolderPlus />
      </button>
      <Modal open={modalOpen} close={closeModal}>
        {modalChildren}
      </Modal>
    </div>
  );
}

export default App;
