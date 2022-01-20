import React from 'react';
import ReactDom from 'react-dom';
import { Placeholder } from './Modals';

import { Placeholder, AddFolder } from './Modals';

const Modal = props => {
  const closeModal = () => {
    props.close();
  };
  if (!props.open) {
    return null;
  }
  return ReactDom.createPortal(
    <div>
      {props.children === '' && (
        <Placeholder close={closeModal} />
      )}
      {props.children === 'addFolder' && (
        <AddFolder close={closeModal} />
      )}
    </div>,
    document.getElementById('modal')
  );
};

export default Modal;
