import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { add, setSelected } from '../../features/folder/folderSlice';
import { close } from '../../features/modal/modalSlice';
import {
  FaRegWindowClose,
  FaFolderPlus,
} from 'react-icons/fa';

import styles from '../../css/modalStyles.module.css';

const AddFolder = () => {
  const dispatch = useDispatch();

  const folderTitle = useRef();

  const submitHandler = async e => {
    e.preventDefault();
    console.log(folderTitle);
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
            title: folderTitle.current.value,
          }),
        }
      );
      dispatch(add({ title: folderTitle.current.value }));
      setSelected('');
      dispatch(close());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.modalWindow}>
      <span className={styles.button} onClick={() => dispatch(close())}>
        <FaRegWindowClose />
      </span>
      <form className={styles.formContainer} onSubmit={submitHandler}>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          name='title'
          ref={folderTitle}
        />
        <span className={styles.button} onClick={submitHandler} title='Add Folder'>
          <FaFolderPlus />
        </span>
      </form>
    </div>
  );
};

export default AddFolder;


