import React from 'react';
import ReactDom from 'react-dom';
import { useSelector } from 'react-redux';

import AddFolder from './AddFolder';
import EditFolder from './EditFolder';
import DeleteFolder from './DeleteFolder';
import AddLink from './AddLink';
import EditLink from './EditLink';

import styles from '../../css/ModalRoot.module.css';

const Modal = () => {
  const modal = useSelector(state => state.modal);

  if (!modal.show) {
    return null;
  }
  return ReactDom.createPortal(
    <div className={styles.overlay}>
      {modal.child === 'addFolder' && <AddFolder />}
      {modal.child === 'editFolder' && <EditFolder />}
      {modal.child === 'deleteFolder' && <DeleteFolder />}
      {modal.child === 'addLink' && <AddLink />}
      {modal.child === 'editLink' && <EditLink />}
    </div>,
    document.getElementById('modal')
  );
};

export default Modal;
