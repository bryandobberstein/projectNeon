import React from 'react';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { FaFolderPlus, FaSignOutAlt } from 'react-icons/fa';

import SignIn from './components/SignIn';
import Folder from './components/Folder';
import Modal from './components/modals/ModalRoot';
import { openModal } from './features/modal/modalSlice';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['authenticate']);
  const dispatch = useDispatch();

  const cookieHandler = (name, data, expiration) => {
    setCookie(name, data, {
      path: '/',
      expires: expiration,
      sameSite: 'strict',
    });
  };

  const openModalAddModal = child => {
    dispatch(openModal({ child: child }));
  };

  const isAuthenticated = cookies.authenticate;

  const signOut = async () => {
    await fetch('http://localhost:8000/user/logout', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      crossDomain: true,
    });
    removeCookie('authenticate');
  };

  const appStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    // top: '100%',
    // right: '100%',
    height: '100%',
    width: '100%',
    position: 'relative',
  };

  const buttonStyle = {
    flexDirection: 'row',
    cursor: 'pointer',
  };

  const pageTopper = ['Links', 'Lynx', 'Skinks', 'Klinks', 'Blinks'];

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
        <div style={buttonStyle}>
          <span onClick={() => openModalAddModal('addFolder')}>
            <FaFolderPlus />
            &nbsp;
          </span>
          <span onClick={signOut}>
            <FaSignOutAlt />
          </span>
        </div>
        <Modal />
      </div>
    </>
  );
}

export default App;
