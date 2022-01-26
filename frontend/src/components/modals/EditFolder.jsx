import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { edit } from '../../features/folder/folderSlice';
import { close } from '../../features/modal/modalSlice';

const EditFolder = () => {
  const modal = useSelector(state => state.modal);
  const folders = useSelector(state => state.folders);
  const dispatch = useDispatch();
  const [fldr, setfldr] = useState({
    title: '',
    position: null
  });

  const folder = folders.folders.filter(folder => {
    folder.id === folders.folders.selected;
  });

  setfldr(folder);

  const submitChangeHandler = async e => {
    e.preventDefault();
    try {
      await fetch(
        'http://localhost:8000/folders/updateFolder',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          crossDomain: true,
          method: 'PUT',
          body: JSON.stringify({
            title: fldr.title,
            position: fldr.position,
          }),
        }
      );
      dispatch(edit({ id: folder.id, key: "title", value: fldr.title }));
      setfldr({ title: '', position: null });
      dispatch(close);
    } catch (error) {
      console.error(error);
    }
  };

  const inputChangeHandler = e => {
    setfldr({
      ...fldr,
      [e.target.name]: e.target.value,
    });
  };

  return <form onSubmit={submitChangeHandler}>
    <label htmlFor="title">Title</label>
    <input type="text" name="title" value={fldr.title} onChange={inputChangeHandler} />
    <button type="submit" onClick={submitChangeHandler}>Submit</button>
  </form>;
};

export default EditFolder;
