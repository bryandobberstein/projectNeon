import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setSelected, initializeFolders } from '../features/folder/folderSlice';
import { openModal } from '../features/modal/modalSlice';
import { setLinkSelected, initializeLinks } from '../features/links/linkSlice.js';
import {
  FaHamburger,
  FaFolderMinus,
  FaEdit,
  FaLink,
} from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Link from './Link';

import styles from '../css/Folders.module.css';

const Folder = () => {
  const folders = useSelector(state => state.folders);
  const links = useSelector(state => state.links);
  const modalShow = useSelector(state => state.modal.show);
  const dispatch = useDispatch();

  const modalBool = modalShow === false;

  const [linkHovered, setlinkHovered] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(async () => {
    const result = await fetch("http://localhost:8000/folders/getFolders", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      crossDomain: true,
    });
    const data = await result.json();
    dispatch(initializeFolders(data));
  }, [modalBool]);

  useEffect(async () => {
    const result = await fetch("http://localhost:8000/link/get-links", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      crossDomain: true,
    });
    const data = await result.json();
    dispatch(initializeLinks(data));
  }, [modalBool]);

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

  const addLinkHandler = id => {
    dispatch(setSelected({ id: id }));
    dispatch(openModal({ child: 'addLink' }));
  };

  const editLinkHandler = (id, folder) => {
    dispatch(setSelected(folder));
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
    <div onMouseLeave={() => linkHoverHandler('')}>
      <li key={fi} className={styles.folderListStyle}>
        {menuOpen &&
          <span type="submit" onClick={() => deleteFolderHandler(folder._id)} className={styles.button}>
            <FaFolderMinus />
            &nbsp;
          </span>
        }
        {menuOpen &&
          <span onClick={() => editFolderHandler(folder._id)} className={styles.button}>
            <FaEdit />
            &nbsp;
          </span>
        }
        {menuOpen &&
          <span onClick={() => addLinkHandler(folder._id)} className={styles.button}>
            <FaLink />
            &nbsp;
          </span>
        }
        <span onMouseOver={() => linkHoverHandler(folder._id)}>
          {folder.title}
        </span>
      </li>
      {links.links.map((link, i) => {
        if (link.parent === folder._id) {
          return (
            <span className={styles.linkListStyle}>
              {linkHovered === folder._id &&
                <span onClick={() => editLinkHandler(link._id, folder._id)} className={styles.button}>
                  <MdDelete />
                  &nbsp;
                </span>
              }
              {linkHovered === folder._id && <Link key={i} link={link} />}
            </span>
          );
        }
        return false;
      })}
    </div>
  ));

  return (<>
    <span className={styles.button} onClick={openMenuToggle}>
      <FaHamburger />
    </span>
    <ul className={styles.folderStyle}>
      {collection}
    </ul>
  </>);
};

export default Folder;
