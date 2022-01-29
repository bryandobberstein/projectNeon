import React from 'react';

const MenuButton = (props) => {
  return <button type='submit' cssClass={props.class}>{props.children}</button>;
};

export default MenuButton;
