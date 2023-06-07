import React from "react";
import NavbarLogo from "../assets/logo.svg";
import NavbarHomeIcon from "../assets/home.svg";
import NavbarUserIcon from "../assets/userInfo.svg";
import NavbarSettingIcon from "../assets/setting.svg";
import "../styles/navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={NavbarLogo} alt="logo" />
      </div>
      <div className="navbar-info">
        <div className="navbar-item navbar-home">
          <img src={NavbarHomeIcon} alt="home" />
          <h5 className="Bold">首頁</h5>
        </div>
        <div className="navbar-item navbar-user">
          <img src={NavbarUserIcon} alt="user" />
          <h5 className="Bold">個人資料</h5>
        </div>
        <div className="navbar-item navbar-setting">
          <img src={NavbarSettingIcon} alt="setting" />
          <h5 className="Bold">設定</h5>
        </div>
        <div className="navbar-item navbar-button">
          <button>推文</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
