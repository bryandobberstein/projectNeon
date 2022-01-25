import React from 'react';
import { FaEdit, FaFolderPlus, FaLink } from 'react-icons/fa';

import { useSelector } from 'react-redux';

const FolderMenu = props => {
  const folders = useSelector(state => state.folders.folders);

  const folder = folders.filter(fldr => fldr.name == props.folderName);

  return <div>
    <button><FaEdit />Edit Folder</button>
    <button><FaLink />Add Link</button>
  </div>;
};

export default FolderMenu;
