import { useState } from 'react';
import { useCookies } from 'react-cookie';
import './App.css';

function App() {
  const [authenticated, setauthenticated] = useState(false);
  const [cookies, setcookies] = useCookies(['user'])
  return <>{authenticated || <SignIn />}</>;
}

export default App;
