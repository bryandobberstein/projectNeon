import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { editLink } from '../../features/links/linkSlice';
import { close } from '../../features/modal/modalSlice';
import { FaRegWindowClose } from 'react-icons/fa';
import { setSelected } from '../../features/folder/folderSlice';

import styles from '../../css/EditLink.module.css';

const EditLink = () => {
  const links = useSelector(state => state.links.links);
  const selected = useSelector(state => state.links.selected);
  const folders = useSelector(state => state.folders.folders);
  const dispatch = useDispatch();

  const linkTitle = useRef();
  const linkUrl = useRef();
  const linkPosition = links.length;
  const parent = useRef();

  const link = folders.filter(link => {
    return link._id === selected;
  });

  const options = folders.map((folder, i) => {
    return <option key={i} value={folder._id}>{folder.title}</option>;
  });

  const submitLinkHandler = async (e) => {
    e.preventDefault();
    try {
      await fetch(
        'http://localhost:8000/link/edit-link',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify({
            _id: link.id,
            title: linkTitle.current.value,
            url: linkUrl.current.value,
            position: linkPosition,
            parent: parent.current.value
          })
        }
      );
      dispatch(editLink({
        id: link._id,
        title: linkTitle.current.value,
        url: linkUrl.current.value,
        position: linkPosition,
        parent: parent.current.value
      }));
      dispatch(setSelected(''));
      dispatch(close());
    } catch (err) {
      console.error(err);
    }
  };

  return <div className={styles.mainDiv}>
    <button onClick={() => dispatch(close())}><FaRegWindowClose /></button>
    <form onSubmit={submitLinkHandler}>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" ref={linkTitle} />
      <label htmlFor="url">URL</label>
      <input type="text" id="url" ref={linkUrl} />
      <label htmlFor="parent">Folder</label>
      <select id="parent" ref={parent}>
        {options}
      </select>
    </form>
    <button type="submit" onClick={submitLinkHandler}>Edit Link</button>
  </div>;
};

export default EditLink;
