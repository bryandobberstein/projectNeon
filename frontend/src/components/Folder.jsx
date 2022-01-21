import React, { useState, useEffect, useContext } from 'react';

import FolderContext from '../context/folder/context';

const Folder = props => {
  const [open, setopen] = useState(null);
  const [error, seterror] = useState(false);
  const [message, setmessage] = useState(null);
  const context = useContext(FolderContext);

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
    data.sort((a, b) => a.position - b.position);
    context.setfolders(data);
  }, []);
  console.log(context.folders);
  const collection = context.folders.map(folder => (
    <li key={folder.position}>{folder.title}</li>
  ));
  return <>{collection}</>;
};

export default Folder;
