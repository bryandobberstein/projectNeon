import React from 'react';
import ReactDom from 'react-dom';

import { Placeholder } from './Modals';

const Modal = props => {
  const closeModal = () => {
    console.log('clicked');

    props.close();
  };
  if (!props.open) {
    return null;
  }
  return ReactDom.createPortal(
    <div>
      <Placeholder close={closeModal} />
    </div>,
    document.getElementById('modal')
  );
};

export default Modal;
