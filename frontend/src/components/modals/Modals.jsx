import React from 'react';
import { FaRegWindowClose } from 'react-icons/fa';

export const Placeholder = props => {
  return (
    <div class='modal'>
      <button onClick={props.close}>
        <FaRegWindowClose />
        <h1>Modal</h1>
      </button>
    </div>
  );
};
