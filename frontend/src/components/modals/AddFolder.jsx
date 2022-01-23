import React, { useState, useContext } from 'react';
import {
  FaRegWindowClose,
  FaFolderPlus,
} from 'react-icons/fa';

import FolderContext from '../../context/folder/context';

import styles from './addfolder.module.css';

const AddFolder = props => {
  const context = useContext(FolderContext);
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
      context.setfolders(context.folders.concat(folder));
      setfolder({ title: '', position: 0 });
      props.close();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.modal}>
      <button onClick={props.close}>
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


