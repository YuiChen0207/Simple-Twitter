import React, { useState, useEffect } from "react";
import home from "../../../assets/home.svg";
import tweet from "../../../assets/tweet-mobile.svg";
import profile from "../../../assets/userInfo.svg";
import setting from "../../../assets/setting.svg";
import homeActive from "../../../assets/homeActive.svg";
import profileActive from "../../../assets/userInfoActive.svg";
import settingActive from "../../../assets/settingActive.svg";
import { useLocation, useNavigate } from "react-router-dom";
import PopupModal from "../../popupModal/PopupModal";
import "./MobileMenu.scss";


const MobileMenu = ({ setList, setTweetsList }) => {
  const location = useLocation();
  const { pathname } = location;
  const [activeItem, setActiveItem] = useState(pathname.substring(1));
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handlePageChange = (page, path) => {
    if (activeItem !== page) {
      setActiveItem(page);
      navigate(path);
    }
  };

  const handleTweetIconClick = () => {
    setIsPopupOpen(true);
  };

  const handleCloseModal = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="mobileMenuContainer">
      <div
        className={`menuIcon`}
        onClick={() => handlePageChange("home", "/mainPage")}
      >
        <img src={activeItem === "home" ? homeActive : home} alt="home icon" />
      </div>
      <div className="menuIcon">
        <img src={tweet} alt="tweet icon" onClick={handleTweetIconClick} />
      </div>
      {isPopupOpen && (
        <PopupModal
          open={isPopupOpen}
          onClose={handleCloseModal}
          setList={setList}
          setTweetsList={setTweetsList}
        />
      )}
      <div
        className={`menuIcon`}
        onClick={() => handlePageChange("profile", "/user/self")}
      >
        <img
          src={activeItem === "profile" ? profileActive : profile}
          alt="profile icon"
        />
      </div>
      <div
        className={`menuIcon`}
        onClick={() => handlePageChange("setting", "/settings")}
      >
        <img
          src={activeItem === "setting" ? settingActive : setting}
          alt="setting icon"
        />
      </div>
    </div>
  );
};

export default MobileMenu;
