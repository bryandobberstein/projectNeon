import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { FaFolderPlus } from "react-icons/fa";

import SignIn from "./components/SignIn";
import Folder from "./components/Folder";
import Modal from "./components/modals/Modal";
import FolderContext from "./context/folder/context";

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
      <>
        <SignIn cookieHandler={cookieHandler} />
      </>
    );
  }

  return (
    <>
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
    </>
  );
}

export default App;
