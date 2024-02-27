import React from "react";
import { Link } from "react-router-dom";

export default function SubMenuByCategory({ menu, subMenu }) {
  return (
    <div className="sub-menu-by-type">
      <p className="type-row">
        <a className="type">XEM THEO LOẠI</a> |
        <a className="view-all">TẤT CẢ</a>
      </p>
      <div className="sub-menu-items">
        {subMenu.map((sub, index) => {
          return (
            <Link
              key={index}
              to={`${menu}/${sub.pathName}`}
              className="sub-menu-item"
            >
              {sub.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
