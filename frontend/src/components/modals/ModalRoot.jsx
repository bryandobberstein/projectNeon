import React from 'react';
import ReactDom from 'react-dom';

import AddFolder from './AddFolder';

import styles from './ModalRoot.module.css';

const Modal = props => {
  const closeModal = () => {
    props.close();
  };
  if (!props.open) {
    return null;
  }
  return ReactDom.createPortal(
    <div className={styles.overlay}>
      {props.children === 'addFolder' && (
        <AddFolder close={closeModal} />
      )}
    </div>,
    document.getElementById('modal')
  );
};

export default Modal;
