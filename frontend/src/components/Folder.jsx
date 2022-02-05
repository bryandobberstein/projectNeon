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
  FaAngleRight,
  FaAngleDown,
} from 'react-icons/fa';
import Link from './Link';

const Folder = () => {
  const folders = useSelector(state => state.folders);
  const links = useSelector(state => state.links);
  const dispatch = useDispatch();

  // const [menuClicked, setmenuClicked] = useState('');
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
  }, []);

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
  }, []);

  const linkHoverHandler = id => {
    setlinkHovered(id);
    showHideStyle = linkListStyle;
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

  const folderStyle = {
    display: 'grid',
    margin: 'auto',
    width: '400px',
    gridTemplateColumns: '1fr 1fr',
    justifyItems: 'center',
  };

  const folderListStyle = {
    gridColumn: '1',
    justifySelf: 'center',
  };

  const linkListStyleHidden = {
    display: 'hidden',
  };

  const linkListStyle = {
    gridColumn: '2',
    justifySelf: 'center',
  };

  let showHideStyle = linkListStyleHidden;

  const collection = folders.folders.map((folder, fi) => (
    <>
      <li key={fi} style={folderListStyle} onMouseLeave={() => linkHoverHandler('')}>
        {menuOpen &&
          <button type="submit" onClick={() => deleteFolderHandler(folder._id)}>
            <FaFolderMinus />
          </button>
        }
        {menuOpen &&
          <button onClick={() => editFolderHandler(folder._id)}>
            <FaEdit />
          </button>
        }
        {menuOpen &&
          <button onClick={addLinkHandler}>
            <FaLink />
          </button>
        }
        {folder.title}
        <span onMouseOver={() => linkHoverHandler(folder._id)}>
          {linkHovered !== folder._id && <FaAngleRight />}
          {linkHovered === folder._id && <FaAngleDown />}
        </span>
      </li>
      {links.links.map((link, i) => {
        if (link.parent === folder._id) {
          return (
            <span style={showHideStyle}>
              {linkHovered === folder._id &&
                <button onClick={() => editLinkHandler(link._id)}>
                  <FaEdit />
                </button>
              }
              {linkHovered === folder._id && <Link key={i} link={link} />}
            </span>
          );
        }
        return false;
      })}
    </>
  ));

  return (<>
    <button onClick={openMenuToggle}>
      <FaHamburger />
    </button>
    <ul style={folderStyle}>
      {collection}
    </ul>
  </>);
};

export default Folder;
