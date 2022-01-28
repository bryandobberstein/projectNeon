import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { initialize, setSelected } from '../features/folder/folderSlice';
import { openModal } from '../features/modal/modalSlice';
import { FaHamburger, FaFolderMinus, FaEdit } from 'react-icons/fa';
import MenuButton from './menus/MenuButton';

import styles from '../css/Folders.module.css';

const Folder = () => {
  const folders = useSelector(state => state.folders);
  const modal = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const [hovered, sethovered] = useState('');

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
    <li key={folder.position} onMouseOver={() => sethovered(folder._id)}>
      {folder.title}
      {hovered === folder._id &&
        <MenuButton class='folderMenuButton' method={deleteHandler}>{<FaFolderMinus />}</MenuButton>}
      {hovered === folder._id &&
        <MenuButton class='folderMenuButton' method={editHandler}>{<FaEdit />}</MenuButton>}
    </li>
  ));

  return <ul className={styles.folderList}>{collection}</ul>;
};

export default Folder;
