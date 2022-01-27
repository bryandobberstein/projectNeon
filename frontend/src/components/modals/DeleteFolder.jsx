import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { remove, setSelected } from '../../features/folder/folderSlice';
import { close } from '../../features/modal/modalSlice';

const DeleteFolder = () => {
  const folders = useSelector(state => state.folders);
  const modal = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const folder = folders.folders.filter(folder => {
    folder.id === folders.folders.selected;
  });

  const deleteHandler = async e => {
    e.preventDefault();
    try {
      await fetch(
        'http://localhost:8000/folders/deleteFolder',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify({ _id: folder.id })
        }
      );
      dispatch(remove({ id: folder.id }));
      dispatch(setSelected({ id: null }));
      dispatch(close());
    } catch (err) {

    }
  };
  const cancelHandler = (e) => {
    e.preventDefault();
    dispatch(setSelected({ id: null }));
    dispatch(close());

  };

  return <div>
    <button type="submit" onClick={deleteHandler}>Delete Permanently</button>
    <button type="submit" onClick={cancelHandler}>Cancel</button>
  </div>;
};

export default DeleteFolder;
