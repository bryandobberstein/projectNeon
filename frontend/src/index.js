import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Modal from "./components/modals/ModalRoot";
import { CookiesProvider } from "react-cookie";
import store from "./app/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <App />
      <Modal />
    </Provider>
  </CookiesProvider>,
  document.getElementById("root")
);
