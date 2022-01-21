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
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        crossDomain: true,
      }
    );
    const data = await result.json();
    data.sort((a, b) => a.position - b.position)
    setfolders(data);
    // switch (result.status) {
      //   case 400:
      //     seterror(true);
      //     setmessage('No folders found');
      //     break;
      //   case 500:
      //     seterror(true);
      //     setmessage('Server error');
      //     break;
      //   default:
      //     setfolders(result.json().folders);
      // }
    }, []);
    console.log(folders);
  
  const collection = folders.map(folder => (
    <li key={folder.position}>{folder.title}</li>
  ));
  return <>{collection}</>;
};

export default Folder;
