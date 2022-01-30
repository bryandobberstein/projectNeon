import React from 'react';

const Link = props => {
  return <div>
    <a href={props.link.url}>{props.link.title}</a>
  </div>;
};

export default Link;
