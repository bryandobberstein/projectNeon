import React from 'react';

const MenuButton = (props) => {
  return <button type='submit' className={props.cssClass}>{props.children}</button>;
};

export default MenuButton;
