import React from 'react';
import { FaEdit, FaFolderPlus, FaLink } from 'react-icons/fa';

import { useSelector } from 'react-redux';

const FolderMenu = props => {
  const folders = useSelector(state => state.folders.folders);

  const folder = folders.filter(fldr => fldr.name == props.folderName);

  return <div>
    <span className={styles.button}><FaEdit />Edit Folder</span>
    <span className={styles.button}><FaLink />Add Link</span>
  </div>;
};

export default FolderMenu;
