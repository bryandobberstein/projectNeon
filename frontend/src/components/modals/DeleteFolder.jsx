import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { remove, setSelected } from '../../features/folder/folderSlice';
import { close } from '../../features/modal/modalSlice';

import styles from '../../css/modalStyles.module.css';

const DeleteFolder = () => {

  const folders = useSelector(state => state.folders);
  const dispatch = useDispatch();

  const folder = folders.folders.filter(item => {
    return item._id === folders.selected;
  });

  const deleteHandler = async (e) => {
    e.preventDefault();
    try {
      await fetch(
        'http://localhost:8000/folders/deleteFolder',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify({ _id: folder[0]._id })
        }
      );
      dispatch(remove({ id: folder[0]._id }));
      dispatch(setSelected({ id: '' }));
      dispatch(close());
    } catch (err) {
      console.error(err);
    }
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    dispatch(setSelected({ id: '' }));
    dispatch(close());
  };



  return <div className={styles.modalWindow}>
    <button type="submit" onClick={deleteHandler}>Delete Permanently</button>
    <button type="submit" onClick={cancelHandler}>Cancel</button>
  </div>;
};

export default DeleteFolder;
