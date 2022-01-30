import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addLink } from '../../features/links/linkSlice';
import { close } from '../../features/modal/modalSlice';
import { FaRegWindowClose } from 'react-icons/fa';
import { setSelected } from '../../features/folder/folderSlice';

const AddLinkModal = () => {
  const links = useSelector(state => state.links);
  const selected = useSelector(state => state.folders.selected);
  const dispatch = useDispatch();

  const linkTitle = useRef();
  const linkUrl = useRef();
  const linkPosition = links.length;

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
            parent: selected
          })
        }
      );
      dispatch(addLink({
        title: linkTitle.current.value,
        url: linkUrl.current.value,
        position: linkPosition,
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
    </form>
    <button type="submit" onClick={submitLinkHandler}>Add Link</button>
  </div>;
};

export default AddLinkModal;
