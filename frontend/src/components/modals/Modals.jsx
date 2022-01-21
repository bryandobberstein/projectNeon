import React, { useState } from 'react';
import {
  FaRegWindowClose,
  FaFolderPlus,
} from 'react-icons/fa';

export const Placeholder = props => {
  const closeModal = () => props.close();
  return (
    <div className='overlay'>
      <div className='modal'>
        <button onClick={closeModal}>
          <FaRegWindowClose />
        </button>
        <h1>Modal</h1>
      </div>
    </div>
  );
};

export const AddFolder = props => {
  const [folder, setfolder] = useState({
    title: '',
    position: '',
  });

  const inputChangeHandler = e => {
    setfolder({
      ...folder,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const result = await fetch(
        'http://localhost:8000/folders/addFolder',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify({
            title: folder.title,
            position: folder.position,
          }),
        }        
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='overlay'>
      <div className='modal'>
        <button onClick={props.close}>
          <FaRegWindowClose />
        </button>
        <form onSubmit={submitHandler}>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            value={folder.title}
            onChange={inputChangeHandler}
          />
          <label htmlFor='position'>Position</label>
          <input
            type='number'
            name='position'
            value={folder.position}
            onChange={inputChangeHandler}
          />
          <button onClick={submitHandler}>
            <FaFolderPlus />
          </button>
        </form>
      </div>
    </div>
  );
};
