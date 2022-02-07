import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeLink, setLinkSelected } from '../../features/links/linkSlice';
import { close } from '../../features/modal/modalSlice';
import { MdDelete, MdCancel } from 'react-icons/md';
import { setSelected } from '../../features/folder/folderSlice';

import styles from '../../css/modalStyles.module.css';


const EditLink = () => {
  const links = useSelector(state => state.links);
  const selected = useSelector(state => state.links.selected);
  const dispatch = useDispatch();

  const link = links.links.filter(link => {
    return link._id === selected;
  });

  const linkObj = link[0];

  const deleteHandler = async (e) => {
    e.preventDefault();
    try {
      await fetch(
        'http://localhost:8000/link/delete-link',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify({
            _id: linkObj._id
          })
        }
      );
      dispatch(removeLink({
        id: linkObj._id,
      }));
      dispatch(setSelected(''));
      dispatch(setLinkSelected(''));
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
    <span className={styles.button} type="submit" onClick={deleteHandler} title='Delete folder'><MdDelete /></span>
    <span className={styles.button} type="submit" onClick={cancelHandler} title='Cancel'><MdCancel /></span>
  </div>;
};

export default EditLink;
