import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setSelected } from '../features/folder/folderSlice';
import { openModal } from '../features/modal/modalSlice';
import { FaHamburger, FaFolderMinus, FaEdit } from 'react-icons/fa';
import Link from './Link';

import styles from '../css/Folders.module.css';

const Folder = () => {
  const folders = useSelector(state => state.folders);
  const links = useSelector(state => state.links);
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
    <li key={folder.position} onMouseOver={() => sethovered(folder._id)} onMouseLeave={() => sethovered('')} className={styles.folderItem}>
      <button type='submit' className={styles.folderMenuButton}><FaHamburger /></button>
      {folder.title}
      {hovered === folder._id &&
        <button type="submit" onClick={() => deleteHandler(folder._id)} className={styles.folderMenuButton}>
          <FaFolderMinus />
        </button>
      }
      {hovered === folder._id &&
        <button type="submit" onClick={() => editHandler(folder._id)} className={styles.folderMenuButton}>
          <FaEdit />
        </button>
      }
      {links.links.map(link => {
        if (link.parent === folder._id) {
          return <Link key={link._id} link={link} />;
        }
      })}
    </li>
  ));

  return <ul className={styles.folderList}>{collection}</ul>;
};

export default Folder;
