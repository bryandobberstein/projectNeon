import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addLink } from '../../features/links/linkSlice';
import { close } from '../../features/modal/modalSlice';
import { FaRegWindowClose } from 'react-icons/fa';
import { setSelected } from '../../features/folder/folderSlice';

const AddLink = () => {
  const selected = useSelector(state => state.folders.selected);
  const dispatch = useDispatch();

  const linkTitle = useRef();
  const linkUrl = useRef();

  const submitLinkHandler = async (e) => {
    e.preventDefault();
    console.log(1);
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
      console.log(2);
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

  return <div>
    <span onClick={() => dispatch(close())}><FaRegWindowClose /></span>
    <form onSubmit={submitLinkHandler}>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" ref={linkTitle} />
      <label htmlFor="url">URL</label>
      <input type="text" id="url" ref={linkUrl} />
    </form>
    <button type="submit" onClick={submitLinkHandler}>Add Link</button>
  </div>;
};

export default AddLink;
