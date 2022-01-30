import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setSelected } from '../features/folder/folderSlice';
import { openModal } from '../features/modal/modalSlice';
import { FaHamburger, FaFolderMinus, FaEdit, FaLink, FaAngleRight } from 'react-icons/fa';
import Link from './Link';

import styles from '../css/Folders.module.css';

const Folder = () => {
  const folders = useSelector(state => state.folders);
  const links = useSelector(state => state.links);
  const dispatch = useDispatch();

  const [menuClicked, setmenuClicked] = useState('');

  const menuButtonHandler = (id) => {
    if (id === menuClicked) {
      setmenuClicked('');
    }
    else {
      setmenuClicked(id);
    }
  };

  const deleteHandler = (id) => {
    dispatch(setSelected({ id: id }));
    dispatch(openModal({ child: 'deleteFolder' }));
  };

  const editHandler = id => {
    dispatch(setSelected({ id: id }));
    dispatch(openModal({ child: 'editFolder' }));
  };

  const collection = folders.folders.map(folder => (
    <li key={folder.position} className={styles.folderItem}>
      <button onClick={() => menuButtonHandler(folder._id)} className={styles.folderMenuButton}><FaHamburger /></button>
      {menuClicked === folder._id &&
        <button type="submit" onClick={() => deleteHandler(folder._id)} className={styles.folderMenuButton}>
          <FaFolderMinus />
        </button>
      }
      {menuClicked === folder._id &&
        <button onClick={() => editHandler(folder._id)} className={styles.folderMenuButton}>
          <FaEdit />
        </button>
      }
      {menuClicked === folder._id &&
        <button className={styles.folderMenuButton}>
          <FaLink />
        </button>
      }
      {folder.title}
      <button><FaAngleRight /></button>
      {links.links.map(link => {
        if (link.parent === folder._id) {
          return <Link key={link._id} link={link} />;
        }
        return false;
      })}
    </li>
  ));

  return <ul className={styles.folderList}>{collection}</ul>;
};

export default Folder;
