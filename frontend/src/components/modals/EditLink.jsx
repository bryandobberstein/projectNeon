import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { editLink } from '../../features/links/linkSlice';
import { close } from '../../features/modal/modalSlice';
import { FaRegWindowClose } from 'react-icons/fa';
import { setSelected } from '../../features/folder/folderSlice';

const EditLink = () => {
  const links = useSelector(state => state.links);
  const folders = useSelector(state => state.folders.folders);
  const dispatch = useDispatch();

  const linkTitle = useRef();
  const linkUrl = useRef();
  const linkPosition = links.length;
  const parent = useRef();

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
            position: linkPosition,
            parent: parent.current.value
          })
        }
      );
      dispatch(editLink({
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

  return <div>
    <button onClick={dispatch(close)}><FaRegWindowClose /></button>
    <form onSubmit={submitLinkHandler}>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" ref={linkTitle} />
      <label htmlFor="url">URL</label>
      <input type="text" id="url" ref={linkUrl} />
      <select id="parent" ref={parent}>
        {folders.map(folder => {
          return <option key={folder._id} value={folder}>{folder}</option>;
        })}
      </select>
    </form>
    <button type="submit" onClick={submitLinkHandler}>Add Link</button>
  </div>;
};

export default EditLink;
