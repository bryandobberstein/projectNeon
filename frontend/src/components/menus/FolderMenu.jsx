import React from 'react';
import { FaEdit, FaFolderPlus, FaLink } from 'react-icons/fa';

import FolderContext from '../../context/folder/context';

const FolderMenu = props => {
  const context = useContext(FolderContext);

  const folder = context.folders.filter(fldr => fldr.name == props.folderName);

  return <div>
    <button><FaEdit />Edit Folder</button>
    <button><FaLink />Add Link</button>
  </div>;
};

export default FolderMenu;
