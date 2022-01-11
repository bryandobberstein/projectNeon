import React, { useState } from 'react';

import SignIn from './components/SignIn';
import Folder from './components/Folder';

import './App.css';

function App() {
  const [authenticated, setauthenticated] = useState(false);
  return (
    <>
      {authenticated || (
        <SignIn setauthenticated={setauthenticated} />
      )}
      {authenticated && <Folder />}
    </>
  );
}

export default App;
