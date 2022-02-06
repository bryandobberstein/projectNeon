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

  const modalStyle = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%);',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'antiquewhite',
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '1000',
  };

  const formStyle = {
    flex: '1 1 auto',
    alignSelf: 'center'
  };

  return <div style={modalStyle}>
    <span onClick={() => dispatch(close())}><FaRegWindowClose /></span>
    <form style={formStyle} onSubmit={submitLinkHandler}>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" ref={linkTitle} />
      <label htmlFor="url">URL</label>
      <input type="text" id="url" ref={linkUrl} />
    </form>
    <button type="submit" onClick={submitLinkHandler}>Add Link</button>
  </div>;
};

export default AddLink;
