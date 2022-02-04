import React from "react";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { FaFolderPlus, FaSignOutAlt } from "react-icons/fa";

import SignIn from "./components/SignIn";
import Folder from "./components/Folder";
import Modal from "./components/modals/ModalRoot";
import { openModal } from "./features/modal/modalSlice";

// import styles from "./App.module.css";

function App() {
  const container = {
    display: "grid",
    jusitfyContent: "center",
    width: "maxContent",
  };

  const [cookies, setCookie, removeCookie] = useCookies(["authenticate"]);
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

  const signOut = async () => {
    await fetch("http://localhost:8000/user/logout", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      crossDomain: true,
    });
    removeCookie("authenticate");
  };

  if (!isAuthenticated) {
    return (
      <div style={container}>
        <SignIn cookieHandler={cookieHandler} />
      </div>
    );
  }

  return (
    <div style={container}>
      <Folder />
      <button onClick={() => openModalAddModal("addFolder")}>
        <FaFolderPlus />
      </button>
      <button onClick={signOut}>
        <FaSignOutAlt />
      </button>
      <Modal />
    </div>
  );
}

export default App;
