import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setSelected } from '../features/folder/folderSlice';
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

  const collection = folders.folders.map(folder => (
    <li key={folder.position} onMouseOver={() => sethovered(folder._id)} className={styles.folderItem}>
      <MenuButton cssClass='folderMenuButton'><FaHamburger /></MenuButton>
      {folder.title}
      {hovered === folder._id &&
        <MenuButton cssClass='folderMenuButton' onClick={() => deleteHandler(folder._id)}>
          {<FaFolderMinus />}
        </MenuButton>
      }
      {hovered === folder._id &&
        <MenuButton cssClass='folderMenuButton' onClick={() => editHandler(folder._id)}>
          {<FaEdit />}
        </MenuButton>
      }
    </li>
  ));

  return <ul className={styles.folderList}>{collection}</ul>;
};

export default Folder;
