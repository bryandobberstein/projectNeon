import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import Modal from './components/modals/Modal';

ReactDOM.render(
  <CookiesProvider>
    <App />
    <Modal />
  </CookiesProvider>,
  document.getElementById('root')
);
