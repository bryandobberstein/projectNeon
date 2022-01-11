import React, { useState, useEffect } from 'react';

const Folder = props => {
  const [folders, setfolders] = useState([]);
  const [open, setopen] = useState(null);
  const [error, seterror] = useState(false);
  const [message, setmessage] = useState(null);

  useEffect(async () => {
    const result = await fetch(
      'http://localhost:8000/folders/getFolders',
      {
        credentials: 'include',
      }
    );
    switch (result.status) {
      case 400:
        seterror(true);
        setmessage('No folders found');
        break;
      case 500:
        seterror(true);
        setmessage('Server error');
        break;
      default:
        console.log(result);
        setfolders(result.folders);
    }
  }, []);
  // const folder = folders.map(folder => (
  //   <li key={folder.position}>{folder.title}</li>
  // ));
  return { folders };
};

export default Folder;
