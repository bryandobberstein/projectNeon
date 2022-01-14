import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

import SignIn from './components/SignIn';
import Folder from './components/Folder';

import './App.css';

function App() {
  useEffect(() => {
    if (
      cookies.Authenticate &&
      cookies.Authenticated === true &&
      cookies.Authenticated.expires < Date.now()
    ) {
      setauthenticated(true);
    }
  }, [cookies]);

  const [authenticated, setauthenticated] = useState(false);
  const [cookies, setCookie] = useCookies([]);

  const cookieHandler = (name, data, expiration) => {
    setCookie(name, data),
      { path: '/', expires: expiration, sameSite: strict };
  };

  return (
    <>
      {authenticated || (
        <SignIn cookieHandler={cookieHandler} />
      )}
      {authenticated && <Folder />}
    </>
  );
}

export default App;
