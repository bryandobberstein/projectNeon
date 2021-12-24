import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Folder from './components/Folder';
import Menu from './components/Menu';
import Settings from './components/Settings';

const App = () => {
  return (
    <>
      <Menu />
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path='/'
            element={<Folder />}></Route>
          <Route
            exact
            path='/settings'
            element={<Settings />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
