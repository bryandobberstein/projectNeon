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
            title: folderTitle.current.value,
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

  return (
    <div style={modalStyle}>
      <button onClick={() => dispatch(close())}>
        <FaRegWindowClose />
      </button>
      <form style={formStyle} onSubmit={submitHandler}>
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


