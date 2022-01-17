import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

import SignIn from './components/SignIn';
import Folder from './components/Folder';
import Modal from './components/modals/Modal';

import './App.css';

function App() {
  const [cookies, setCookie] = useCookies(['authenticate']);
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalChilddren, setmodalChilddren] =
    useState(null);

  const cookieHandler = (name, data, expiration) => {
    setCookie(name, data, {
      path: '/',
      expires: expiration,
      sameSite: 'strict',
    });
  };

  const isAuthenticated = cookies.authenticate;

  return (
    <>
      {!isAuthenticated && (
        <SignIn cookieHandler={cookieHandler} />
      )}
      {isAuthenticated && <Folder />}
      <Modal
        open={modalOpen}
        close={() => setmodalOpen(false)}>
        {modalChildren}
      </Modal>
    </>
  );
}

export default App;
