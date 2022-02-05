import React from 'react';

const Link = props => {
  return <span>
    <a href={props.link.url}>{props.link.title}</a>
  </span>;
};

export default Link;
