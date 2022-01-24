import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { initialize, add, edit, remove } from '../features/folder/folderSlice';
import { FaHamburger } from 'react-icons/fa';

import FolderContext from '../context/folder/context';
import styles from '../css/Folders.module.css';

const Folder = props => {
  const folders = useSelector(state => state.folders.folders);
  const dispatch = useDispatch;
  const [open, setopen] = useState(null);
  const [error, seterror] = useState(false);
  const [message, setmessage] = useState(null);
  const context = useContext(FolderContext);

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
  const collection = state.folders.folders.map(folder => (
    <li key={folder.position}><button><FaHamburger /></button>{folder.title}</li>
  ));
  return <ul>{collection}</ul>;
};

export default Folder;
