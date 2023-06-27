import React from "react";
import home from "../../assets/home.svg";
import tweet from "../../assets/tweet-mobile.svg";
import profile from "../../assets/userInfo.svg";
import setting from "../../assets/setting.svg";
import "./MobileMenu.scss";

const MobileMenu = () => {
  return (
    <div className="mobileMenuContainer">
      <img src={home} alt="home icon" />
      <img src={tweet} alt="tweet icon" />
      <img src={profile} alt="profile icon" />
      <img src={setting} alt="setting icon" />
    </div>
  );
};

export default MobileMenu;
