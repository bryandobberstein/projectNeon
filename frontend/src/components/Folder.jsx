import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { initialize, setSelected } from '../features/folder/folderSlice';
import { open } from '../features/modal/modalSlice';
import { FaHamburger } from 'react-icons/fa';

import styles from '../css/Folders.module.css';

const Folder = () => {
  const folders = useSelector(state => state.folders);
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    dispatch(open({ child: 'deleteFolder' }));
    dispatch(setSelected({ id: id }));
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
  }, []);

  const collection = folders.folders.map(folder => (
    <li key={folder.position}><button><FaHamburger /></button>{folder.title}</li>
  ));

  return <ul className={styles.folderList}>{collection}</ul>;
};

export default Folder;
