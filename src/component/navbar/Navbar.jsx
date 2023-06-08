import React from "react";
import NavbarLogo from "../../assets/logo.svg";
import NavbarHomeIcon from "../../assets/home.svg";
import NavbarUserIcon from "../../assets/userInfo.svg";
import NavbarSettingIcon from "../../assets/setting.svg";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={NavbarLogo} alt="logo" />
      </div>
      <div className="navbar-info">
        <div className="navbar-item">
          <img src={NavbarHomeIcon} alt="home" />
          <h5 className="medium">首頁</h5>
        </div>
        <div className="navbar-item">
          <img src={NavbarUserIcon} alt="user" />
          <h5 className="medium">個人資料</h5>
        </div>
        <div className="navbar-item">
          <img src={NavbarSettingIcon} alt="setting" />
          <h5 className="medium">設定</h5>
        </div>
        <div className="navbar-item navbar-button">
          <button>推文</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
