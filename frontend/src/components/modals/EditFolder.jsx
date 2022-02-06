import React, { useRef } from 'react';
import { FaRegWindowClose } from 'react-icons/fa';
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
      dispatch(edit({ id: fldrId.current, key: 'title', value: fldrTitle.current.value }));
      dispatch(setSelected(''));
      dispatch(close());
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

  return <div style={modalStyle}>
    <span onClick={() => dispatch(close())}><FaRegWindowClose /></span>
    <form style={formStyle} onSubmit={submitChangeHandler}>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" ref={fldrTitle} />
      <button type="submit" onClick={submitChangeHandler}>Submit</button>
    </form>
  </div>;
};

export default EditFolder;
