import { useState, useEffect } from 'react';

const Folder = props => {
  const [folder, setfolder] = useState();

  useEffect(async () => {
    await fetch('/folders/getFolders');
  }, [input]);
  return <div></div>;
};

export default Folder;
