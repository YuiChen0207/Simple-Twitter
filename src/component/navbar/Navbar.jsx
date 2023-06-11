import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import NavbarLogo from "../../assets/logo.svg";
import NavbarHomeIcon from "../../assets/home.svg";
import NavbarHomeIconActive from "../../assets/homeActive.svg";
import NavbarUserIcon from "../../assets/userInfo.svg";
import NavbarUserIconActive from "../../assets/userInfoActive.svg";
import NavbarSettingIcon from "../../assets/setting.svg";
import NavbarSettingIconActive from "../../assets/settingActive.svg";
import "./Navbar.scss";

const navItems = [
  {
    path: "mainPage",
    icon: NavbarHomeIcon,
    activeIcon: NavbarHomeIconActive,
    text: "首頁",
  },
  {
    path: "user/self",
    icon: NavbarUserIcon,
    activeIcon: NavbarUserIconActive,
    text: "個人資料",
  },
  {
    path: "settings",
    icon: NavbarSettingIcon,
    activeIcon: NavbarSettingIconActive,
    text: "設定",
  },
];

const Navbar = () => {
  const location = useLocation();
  const { pathname } = location;
  const [activeItem, setActiveItem] = useState(pathname.substring(1));

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={NavbarLogo} alt="logo" />
      </div>
      <div className="navbar-info">
        {navItems.map(({ path, icon, activeIcon, text }) => (
          <NavLink
            exact
            to={`/${path}`}
            key={path}
            className={`navbar-item ${activeItem === path ? "active" : ""}`}
            activeClassName="active"
            onClick={() => handleItemClick(path)}
          >
            <img src={activeItem === path ? activeIcon : icon} alt={path} />
            <h5 className="medium">{text}</h5>
          </NavLink>
        ))}
        <div className="navbar-item navbar-button">
          <button>推文</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
