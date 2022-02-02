import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setSelected } from '../features/folder/folderSlice';
import { openModal } from '../features/modal/modalSlice';
import { setLinkSelected } from '../features/links/linkSlice.js';
import {
  FaHamburger,
  FaFolderMinus,
  FaEdit,
  FaLink,
  FaAngleRight,
  FaAngleDown,
} from 'react-icons/fa';
import Link from './Link';

import styles from '../css/Folders.module.css';

const Folder = () => {
  const folders = useSelector(state => state.folders);
  const links = useSelector(state => state.links);
  const dispatch = useDispatch();

  // const [menuClicked, setmenuClicked] = useState('');
  const [linkHovered, setlinkHovered] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);



  // const menuButtonHandler = (id) => {
  //   if (id === menuClicked) {
  //     setmenuClicked('');
  //   }
  //   else {
  //     setmenuClicked(id);
  //   }
  // };

  const linkHoverHandler = id => {
    setlinkHovered(id);
  };

  const deleteFolderHandler = id => {
    dispatch(setSelected({ id: id }));
    dispatch(openModal({ child: 'deleteFolder' }));
  };

  const editFolderHandler = id => {
    dispatch(setSelected({ id: id }));
    dispatch(openModal({ child: 'editFolder' }));
  };

  const addLinkHandler = () => {
    dispatch(openModal({ child: 'addLink' }));
  };

  const editLinkHandler = id => {
    dispatch(setLinkSelected(id));
    dispatch(openModal({ child: 'editLink' }));
  };

  const openMenuToggle = () => {
    if (menuOpen === false) {
      return setMenuOpen(true);
    }
    return setMenuOpen(false);
  };

  const collection = folders.folders.map((folder, fi) => (
    <>
      <li key={fi} className={styles.folderItem} onMouseLeave={() => linkHoverHandler('')}>
        {menuOpen &&
          <button type="submit" onClick={() => deleteFolderHandler(folder._id)} className={styles.folderMenuButton}>
            <FaFolderMinus />
          </button>
        }
        {menuOpen &&
          <button onClick={() => editFolderHandler(folder._id)} className={styles.folderMenuButton}>
            <FaEdit />
          </button>
        }
        {menuOpen &&
          <button onClick={addLinkHandler} className={styles.folderMenuButton}>
            <FaLink />
          </button>
        }
        {folder.title}
        <span onMouseOver={() => linkHoverHandler(folder._id)}>
          {linkHovered !== folder._id && <FaAngleRight />}
          {linkHovered === folder._id && <FaAngleDown />}
          {links.links.map((link, i) => {
            if (link.parent === folder._id) {
              return (
                <span>
                  {linkHovered === folder._id && <Link key={i} link={link} />}
                  {linkHovered === folder._id &&
                    <button onClick={() => editLinkHandler(link._id)}>
                      <FaEdit />
                    </button>
                  }
                </span>
              );
            }
            return false;
          })}
        </span>
      </li>
    </>
  ));

  return (<>
    <button onClick={openMenuToggle} className={styles.folderMenuButton}>
      <FaHamburger />
    </button>
    <ul className={styles.folderList}>
      {collection}
    </ul>
  </>);
};

export default Folder;
