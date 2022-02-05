import React from "react";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { FaFolderPlus, FaSignOutAlt } from "react-icons/fa";

import SignIn from "./components/SignIn";
import Folder from "./components/Folder";
import Modal from "./components/modals/ModalRoot";
import { openModal } from "./features/modal/modalSlice";

function App() {
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

  const appStyle = {
    display: "grid",
    gridTemplateColumns: "1fr",
    justifyContent: "center",
  };

  const pageTopper = ["Links", "Lynx", "Skinks", "Klinks", "Blinks"];

  const pageTopperSelector = () => {
    const number = Math.floor(Math.random() * pageTopper.length);
    return pageTopper[number];
  };

  if (!isAuthenticated) {
    return (
      <>
        <h1>{pageTopperSelector()}</h1>
        <div style={appStyle}>
          <SignIn cookieHandler={cookieHandler} />
        </div>
      </>
    );
  }

  return (
    <>
      <h1>{pageTopperSelector()}</h1>
      <div style={appStyle}>
        <Folder />
        <button onClick={() => openModalAddModal("addFolder")}>
          <FaFolderPlus />
        </button>
        <button onClick={signOut}>
          <FaSignOutAlt />
        </button>
        <Modal />
      </div>
    </>
  );
}

export default App;
