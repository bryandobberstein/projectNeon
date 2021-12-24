import { createContext, useState } from 'react';

const FolderContext = createContext();

export const FolderProvider = ({ children }) => {
  const [folder, setfolder] = useState([]);
  return (
    <FolderContext.Provider value={{}}>
      {children}
    </FolderContext.Provider>
  );
};
