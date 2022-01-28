import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { initialize, setSelected } from '../features/folder/folderSlice';
import { openModal } from '../features/modal/modalSlice';
import { FaHamburger, FaFolderMinus, FaEdit } from 'react-icons/fa';

import styles from '../css/Folders.module.css';

const Folder = () => {
  const folders = useSelector(state => state.folders);
  const modal = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    dispatch(setSelected({ id: id }));
    dispatch(openModal({ child: 'deleteFolder' }));
  };

  const editHandler = id => {
    dispatch(setSelected({ id: id }));
    dispatch(openModal({ child: 'editFolder' }));
  };

  useEffect(async () => {
    const result = await fetch(
      'http://localhost:8000/folders/getFolders',
      {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        crossDomain: true,
      }
    );
    const data = await result.json();
    data.sort((a, b) => a.position - b.position);
    dispatch(initialize(data));
  }, [modal.show]);

  const collection = folders.folders.map(folder => (
    <li key={folder.position}>
      <button>
        <FaHamburger />
      </button>
      {folder.title}
      <button onClick={() => deleteHandler(folder._id)}>
        <FaFolderMinus />
      </button>
      <button type="submit" onClick={() => editHandler(folder._id)}>
        <FaEdit />
      </button>
    </li>
  ));

  return <ul className={styles.folderList}>{collection}</ul>;
};

export default Folder;
