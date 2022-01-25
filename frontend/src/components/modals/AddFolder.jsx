import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../../features/folder/folderSlice';
import { close } from '../../features/modal/modalSlice';
import {
  FaRegWindowClose,
  FaFolderPlus,
} from 'react-icons/fa';

import styles from './addfolder.module.css';

const AddFolder = () => {
  const dispatch = useDispatch();
  const [folder, setfolder] = useState({ title: '', position: context.folders.length + 1 });

  const inputChangeHandler = e => {
    setfolder({
      ...folder,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async e => {
    e.preventDefault();
    try {
      await fetch(
        'http://localhost:8000/folders/addFolder',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify({
            title: folder.title,
            position: folder.position,
          }),
        }
      );
      dispatch(add(folder));
      setfolder({ title: '', position: 0 });
      dispatch(close);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.modal}>
      <button onClick={dispatch(close)}>
        <FaRegWindowClose />
      </button>
      <form onSubmit={submitHandler}>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          name='title'
          value={folder.title}
          onChange={inputChangeHandler}
        />
        <button onClick={submitHandler}>
          <FaFolderPlus />
        </button>
      </form>
    </div>
  );
};

export default AddFolder;


