import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addLink } from '../../features/links/linkSlice';
import { close } from '../../features/modal/modalSlice';
import { FaRegWindowClose, FaSave } from 'react-icons/fa';
import { setSelected } from '../../features/folder/folderSlice';

import styles from '../../css/modalStyles.module.css';

const AddLink = () => {
  const selected = useSelector(state => state.folders.selected);
  const dispatch = useDispatch();

  const linkTitle = useRef();
  const linkUrl = useRef();

  const submitLinkHandler = async (e) => {
    e.preventDefault();
    try {
      await fetch(
        'http://localhost:8000/link/create-link',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify({
            title: linkTitle.current.value,
            url: linkUrl.current.value,
            parent: selected
          })
        }
      );
      dispatch(addLink({
        title: linkTitle.current.value,
        url: linkUrl.current.value,
        parent: selected
      }));
      dispatch(setSelected(''));
      dispatch(close());
    } catch (err) {
      console.error(err);
    }
  };



  return <div className={styles.modalWindow}>
    <span onClick={() => dispatch(close())}><FaRegWindowClose /></span>
    <form className={styles.formContainer} onSubmit={submitLinkHandler}>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" ref={linkTitle} />
      <label htmlFor="url">URL</label>
      <input type="text" id="url" ref={linkUrl} value='https://' />
    </form>
    <span className={styles.button} type="submit" onClick={submitLinkHandler}><FaSave /></span>
  </div>;
};

export default AddLink;
