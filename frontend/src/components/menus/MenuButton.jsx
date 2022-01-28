import React from 'react';

const MenuButton = (props) => {
  return <button type='submit' className={props.class}>{props.children}</button>;
};

export default MenuButton;
