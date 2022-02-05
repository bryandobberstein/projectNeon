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
    columns: '2',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    margin: 'auto',
    minWidth: 'min-content',
    maxWidth: 'max-content',
    justifyItems: 'center',
  };

  const folderListStyle = {
    flex: '1 1 auto',
    alignSelf: 'flex-start',
  };

  const linkListStyle = {
    flexDirection: 'row',
    flex: '1 1 auto',
    alignSelf: 'flex-end',
    position: 'relative',
    left: '1em',
    bottom: 'auto',
  };

  const buttonStyle = {
    flexDirection: "row",
    cursor: "pointer",
  };

  const collection = folders.folders.map((folder, fi) => (
    <>
      <li key={fi} style={folderListStyle}>
        {menuOpen &&
          <span type="submit" onClick={() => deleteFolderHandler(folder._id)}>
            <FaFolderMinus />
            &nbsp;
          </span>
        }
        {menuOpen &&
          <span onClick={() => editFolderHandler(folder._id)}>
            <FaEdit />
            &nbsp;
          </span>
        }
        {menuOpen &&
          <span onClick={addLinkHandler}>
            <FaLink />
            &nbsp;
          </span>
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
            <span style={linkListStyle}>
              {linkHovered === folder._id &&
                <span onClick={() => editLinkHandler(link._id)}>
                  <FaEdit />
                  &nbsp;
                </span>
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
    <span style={buttonStyle} onClick={openMenuToggle}>
      <FaHamburger />
    </span>
    <ul style={folderStyle}>
      {collection}
    </ul>
  </>);
};

export default Folder;
