import React from 'react';
import {
  FaRegWindowClose,
  FaFolderPlus,
} from 'react-icons/fa';

const AddFolder = props => {
  const [folder, setfolder] = useState({ title: '', position: 0 });
  const context = useContext(FolderContext);

  const inputChangeHandler = e => {
    setfolder({
      ...folder,
      [e.target.name]: e.target.value,
    });
  };

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
            title: folder.title,
            position: folder.position,
          }),
        }
      );
      context.setfolders(context.folders.concat(folder));
      setfolder({ title: '', position: 0 });
      props.close();
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

export default AddFolder;


