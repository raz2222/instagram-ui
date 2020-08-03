import React from "react";
import { Link } from "react-router-dom";
import "./Menu.scss";

import MenuAvatar from "./MenuAvatar/MenuAvatar";

var header = "#navbar";
window.scroll(function () {
  var scroll = window.scrollTop();
  if (scroll >= window.innerHeight) {
    header.addClass("fixed");
  } else {
    header.removeClass("fixed");
  }
});

const btns = document.querySelectorAll(".btn");

for (const btn of btns) {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
  });
}
function Menu() {
  return (
    <header className="Header ">
      <ul className="btns-wrapper center">
        <li className="btn">
          <Link className="nav-link" to="/">
            <box-icon name="home-circle" color="#ffffff"></box-icon>
          </Link>
        </li>
        <li className="btn">
          <div className="inner-wrapper">
            <i className="bx bx-home-circle">
              <Link className="nav-link" to="/post/create">
                <box-icon name="plus" color="#ffffff"></box-icon>
              </Link>
            </i>
          </div>
        </li>
        <li className="btn">
          <div className="inner-wrapper">
            <i className="material-icons-round">
              <Link className="nav-link" to="/register">
                <box-icon name="user-plus" color="#ffffff"></box-icon>
              </Link>
            </i>
          </div>
        </li>
        <li className="btn">
          <div className="inner-wrapper">
            <i className="material-icons-round">
              <Link className="nav-link" to="/login">
                <box-icon name="log-in-circle" color="#ffffff"></box-icon>
              </Link>
            </i>
          </div>
        </li>
        <li className="btn">
          <div className="inner-wrapper">
            <MenuAvatar />
          </div>
        </li>
      </ul>
    </header>
  );
}

export default Menu;
