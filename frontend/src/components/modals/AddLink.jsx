import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLinks } from '../../features/links/linkSlice';
import { close } from '../../features/modal/modalSlice';

import styles from '../../css/addfolder.module.css';
import { FaRegWindowClose } from 'react-icons/fa';

const AddLinkModal = () => {
  const links = useSelector(state => state.links);
  const dispatch = useDispatch();

  const linkTitle = useRef();
  const linkUrl = useRef();



  return <div>
    <button onClick={dispatch(close)}><FaRegWindowClose /></button>
    <form action="">
      <label htmlFor="title">Title</label>
      <input type="text" id="title" ref={linkTitle} />
      <label htmlFor="url">URL</label>
      <input type="text" id="url" ref={linkUrl} />
    </form>
  </div>;
};

export default AddLinkModal;
