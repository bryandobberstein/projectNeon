import React from 'react';
import ReactDom from 'react-dom';
import { useSelector } from 'react-redux';

import AddFolder from './AddFolder';

import styles from '../../css/ModalRoot.module.css';

const Modal = () => {
  const modal = useSelector(state => state.modal);

  if (!modal.open) {
    return null;
  }
  return ReactDom.createPortal(
    <div className={styles.overlay}>
      {modal.child === 'addFolder' && (
        <AddFolder />
      )}
    </div>,
    document.getElementById('modal')
  );
};

export default Modal;
