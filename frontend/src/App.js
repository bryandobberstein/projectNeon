import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import SignIn from './components/SignIn';
import Folder from './components/Folder';

import './App.css';

function App() {
  const [cookies, setCookie] = useCookies(['authenticate']);

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
    </>
  );
}

export default App;
