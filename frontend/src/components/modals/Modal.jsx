import React from 'react';
import ReactDom from 'react-dom';

const Modal = (children, props) => {
  if (!props.open) {
    return;
  }
  return ReactDom.createPortal(
    <div></div>,
    document.getElementById('modal')
  );
};

export default Modal;
