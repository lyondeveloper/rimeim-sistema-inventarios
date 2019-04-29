import React from 'react';
import icon_empty from '../../public/img/icons/icon_empty.png';

export default function EmptyIcon(props) {
  return (
    <div className={`${props.className} text-center w-100`}>
      <img src={icon_empty} alt="" />
      <h4>{props.message}</h4>
    </div>
  );
}
