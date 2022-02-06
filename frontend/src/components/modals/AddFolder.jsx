import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, setSelected } from '../../features/folder/folderSlice';
import { close } from '../../features/modal/modalSlice';
import {
  FaRegWindowClose,
  FaFolderPlus,
} from 'react-icons/fa';

const AddFolder = () => {
  const folders = useSelector(state => state.folders);
  const dispatch = useDispatch();

  const folderTitle = useRef();
  const position = folders.folders.length;

  const submitHandler = async e => {
    e.preventDefault();
    try {
      await fetch(
        'http://localhost:8000/folders/addFolder',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify({
            title: folderTitle,
            position: position,
          }),
        }
      );
      dispatch(add({ title: folderTitle, position: position }));
      setSelected('');
      dispatch(close);
    } catch (error) {
      console.error(error);
    }
  };

  const modalStyle = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'antiquewhite',
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const formStyle = {
    flex: '1 1 auto',
    alignSelf: 'center'
  };

  return (
    <div style={modalStyle}>
      <button style={formStyle} onClick={() => dispatch(close())}>
        <FaRegWindowClose />
      </button>
      <form onSubmit={submitHandler}>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          name='title'
          ref={folderTitle}
        />
        <button onClick={submitHandler}>
          <FaFolderPlus />
        </button>
      </form>
    </div>
  );
};

export default AddFolder;


