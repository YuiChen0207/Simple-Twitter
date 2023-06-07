import React from "react";
import "../styles/navbar.scss";
import logo from "../assets/logo.svg";
import home from "../assets/home.svg"
import user from "../assets/userInfo.svg"
import setting from "../assets/setting.svg";


const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="navbar-info">
        <div className="navbar-item navbar-home">
          <img src={home} alt="home" />
          <span>首頁</span>
        </div>
        <div className="navbar-item navbar-user">
          <img src={user} alt="user" />
          <span>個人資料</span>
        </div>
        <div className="navbar-item navbar-setting">
          <img src={setting} alt="setting" />
          <span>設定</span>
        </div>
        <div className="navbar-item navbar-button">
          <button>推文</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
