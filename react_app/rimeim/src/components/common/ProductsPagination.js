import React from "react";

export default function ProductsPagination() {
  return (
    <ul className="pagination">
      <li className="disabled">
        <a href="#!">
          <i className="material-icons">chevron_left</i>
        </a>
      </li>
      <li className="active">
        <a href="#!">1</a>
      </li>
      <li className="">
        <a href="#!">2</a>
      </li>
      <li className="">
        <a href="#!">3</a>
      </li>
      <li className="">
        <a href="#!">4</a>
      </li>
      <li className="">
        <a href="#!">5</a>
      </li>
      <li className="">
        <a href="#!">
          <i className="material-icons">chevron_right</i>
        </a>
      </li>
    </ul>
  );
}
