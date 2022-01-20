import React from 'react';
import ReactDom from 'react-dom';
import { Placeholder } from './Modals';

const Modal = props => {
  if (!props.open) {
    console.log(props.open);
    return null;
  }
  return ReactDom.createPortal(
    <div>
      <Placeholder close={() => props.close(false)} />
    </div>,
    document.getElementById('modal')
  );
};

export default Modal;
