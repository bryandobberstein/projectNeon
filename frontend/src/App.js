import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { FaSun, FaMoon, FaFolderPlus, FaSignOutAlt } from 'react-icons/fa';

import SignIn from './components/SignIn';
import Folder from './components/Folder';
import Modal from './components/modals/ModalRoot';
import { openModal } from './features/modal/modalSlice';

import styles from './css/app.module.css';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies([
    'authenticate',
    'theme',
  ]);
  const dispatch = useDispatch();

  const [theme, settheme] = useState(cookies.theme ? cookies.theme : 'light');

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

  if (theme === 'dark') {
    document.body.classList.add('dark');
  }

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

  const pageTopper = ['Links', 'Lynx', 'Skinks', 'Klinks', 'Blinks'];

  const pageTopperSelector = () => {
    const number = Math.floor(Math.random() * pageTopper.length);
    return pageTopper[number];
  };

  const themeHandler = mode => {
    cookieHandler('theme', mode, new Date('3000-01-01'));
    settheme(mode);
    document.body.classList.toggle('dark');
  };

  if (!isAuthenticated) {
    return (
      <>
        <h1>{pageTopperSelector()}</h1>
        <div className={styles.app}>
          <SignIn cookieHandler={cookieHandler} />
        </div>
      </>
    );
  }

  return (
    <>
      <h1>{pageTopperSelector()}</h1>
      <>
        {theme === 'dark' && (
          <span onClick={() => themeHandler('light')}>
            <FaMoon />
          </span>
        )}
        {theme === 'light' && (
          <span onClick={() => themeHandler('dark')}>
            <FaSun />
          </span>
        )}
      </>
      <div className={styles.app}>
        <Folder />
        <div className={styles.button}>
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
