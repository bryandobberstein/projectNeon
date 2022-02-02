import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { FaFolderPlus, FaSignOutAlt } from "react-icons/fa";

import SignIn from "./components/SignIn";
import Folder from "./components/Folder";
import Modal from "./components/modals/ModalRoot";
import { openModal } from "./features/modal/modalSlice";
import { initializeFolders } from "./features/folder/folderSlice";
import { initializeLinks } from "./features/links/linkSlice";

import styles from "./App.module.css";

function App() {
  const STYLEAPP = styles.App;

  const [cookies, setCookie, removeCookie] = useCookies(["authenticate"]);
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
    dispatch(initializeFolders(data));
  }, [modal.show, isAuthenticated]);

  useEffect(async () => {
    const result = await fetch("http://localhost:8000/link/get-links", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      crossDomain: true,
    });
    const data = await result.json();
    dispatch(initializeLinks(data));
  }, [modal.show, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className={STYLEAPP}>
        <SignIn cookieHandler={cookieHandler} />
      </div>
    );
  }

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

  return (
    <div className={STYLEAPP}>
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
