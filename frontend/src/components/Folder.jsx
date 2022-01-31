import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setSelected } from '../features/folder/folderSlice';
import { openModal } from '../features/modal/modalSlice';
import { setLinkSelected } from '../features/links/linkSlice.js';
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

  const deleteFolderHandler = id => {
    dispatch(setSelected({ id: id }));
    dispatch(openModal({ child: 'deleteFolder' }));
  };

  const editFolderHandler = id => {
    dispatch(setSelected({ id: id }));
    dispatch(openModal({ child: 'editFolder' }));
  };

  const addLinkHandler = () => {
    dispatch(openModal({ child: 'addLink' }));
  };

  const editLinkHandler = id => {
    dispatch(setLinkSelected(id));
    dispatch(openModal({ child: 'editLink' }));
  };

  const collection = folders.folders.map(folder => (
    <li key={folder.position} className={styles.folderItem}>
      <button onClick={() => menuButtonHandler(folder._id)} className={styles.folderMenuButton}><FaHamburger /></button>
      {menuClicked === folder._id &&
        <button type="submit" onClick={() => deleteFolderHandler(folder._id)} className={styles.folderMenuButton}>
          <FaFolderMinus />
        </button>
      }
      {menuClicked === folder._id &&
        <button onClick={() => editFolderHandler(folder._id)} className={styles.folderMenuButton}>
          <FaEdit />
        </button>
      }
      {menuClicked === folder._id &&
        <button onClick={addLinkHandler} className={styles.folderMenuButton}>
          <FaLink />
        </button>
      }
      {folder.title}
      <button><FaAngleRight /></button>
      {links.links.map(link => {
        if (link.parent === folder._id) {
          return (
            <span>
              <Link key={link._id} link={link} />
              <button onClick={() => editLinkHandler(link._id)}><FaEdit /></button>
            </span>
          );
        }
        return false;
      })}
    </li>
  ));

  return <ul className={styles.folderList}>{collection}</ul>;
};

export default Folder;
