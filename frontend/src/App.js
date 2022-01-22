import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { FaFolderPlus } from "react-icons/fa";

import SignIn from "./components/SignIn";
import Folder from "./components/Folder";
import Modal from "./components/modals/ModalRoot";
import FolderContext from "./context/folder/context";

import styles from "./App.module.css";

function App() {
  const [cookies, setCookie] = useCookies(["authenticate"]);
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalChildren, setmodalChildren] = useState("");
  const [folders, setfolders] = useState([]);

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
      <div className={styles.App}>
        <SignIn cookieHandler={cookieHandler} />
      </div>
    );
  }

  return (
    <div className={styles.App}>
      <FolderContext.Provider
        value={{
          folders: folders,
          setfolders: setfolders,
        }}
      >
        <Folder />
        <button onClick={openAddModal}>
          <FaFolderPlus />
        </button>
        <Modal open={modalOpen} close={closeModal}>
          {modalChildren}
        </Modal>
      </FolderContext.Provider>
    </div>
  );
}

export default App;
