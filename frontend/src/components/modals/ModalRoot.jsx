import React from 'react';
import ReactDom from 'react-dom';
import { useSelector } from 'react-redux';

import AddFolder from './AddFolder';
import EditFolder from './EditFolder';
import DeleteFolder from './DeleteFolder';
import AddLink from './AddLink';
import EditLink from './EditLink';

const Modal = () => {
  const modal = useSelector(state => state.modal);

  const overlayStyle = {
    position: 'fixed',
    right: '0',
    left: '0',
    top: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: '999',
    margin: '0',
    padding: '0',
  };

  const modalStyle = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'antiquewhite',
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
  };

  if (!modal.show) {
    return null;
  }
  return ReactDom.createPortal(
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {modal.child === 'addFolder' && <AddFolder />}
        {modal.child === 'editFolder' && <EditFolder />}
        {modal.child === 'deleteFolder' && <DeleteFolder />}
        {modal.child === 'addLink' && <AddLink />}
        {modal.child === 'editLink' && <EditLink />}
      </div>
    </div>,
    document.getElementById('modal')
  );
};

export default Modal;
