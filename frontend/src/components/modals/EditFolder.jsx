import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { edit, setSelected } from '../../features/folder/folderSlice';
import { close } from '../../features/modal/modalSlice';

const EditFolder = () => {
  const folders = useSelector(state => state.folders);
  const dispatch = useDispatch();

  const folder = folders.folders.filter(item => {
    const result = item._id === folders.selected;
    return result[0];
  });

  const fldrTitle = useRef(folder.title);
  const fldrPosition = useRef(folder.position);
  const fldrId = useRef(folders.selected);

  const submitChangeHandler = async (e) => {
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
          method: 'POST',
          body: JSON.stringify({
            _id: fldrId.current,
            title: fldrTitle.current.value,
            position: fldrPosition.current,
          }),
        }
      );
      dispatch(edit({ id: fldrId.current, value: fldrTitle.current.value }));
      dispatch(setSelected(''));
      dispatch(close());
    } catch (error) {
      console.error(error);
    }
    console.log(folders.folders);
  };

  return <form onSubmit={submitChangeHandler}>
    <label htmlFor="title">Title</label>
    <input type="text" id="title" ref={fldrTitle} />
    <button type="submit" onClick={submitChangeHandler}>Submit</button>
  </form>;
};

export default EditFolder;
