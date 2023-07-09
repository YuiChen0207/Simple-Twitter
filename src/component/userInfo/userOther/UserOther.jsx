import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import grayLogo from "../../../assets/logoGray.svg";
import btnMsg from "../../../assets/btnMsg.svg";
import btnNotfi from "../../../assets/btnNotfi.svg";
import activeNotfi from "../../../assets/btn_notfi.svg";
import "./UserOther.scss";
import MobileMenu from "../../mobileMode/mobileMenu/MobileMenu";
import defaultBanner from "../../../assets/backgroundImage.svg";

const UserOtherItem = ({
  avatar,
  username,
  accountName,
  bio,
  followingCount,
  followersCount,
  isFollowed,
  id,
  setUserIdFromTweet,
  handleFollow,
  isFollow,
  setIsFollow,
}) => {
  const [notificationIcon, setNotificationIcon] = useState(btnNotfi);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFollow(isFollowed);
  }, [isFollowed]);

  const handleNotificationClick = () => {
    if (notificationIcon === btnNotfi) {
      setNotificationIcon(activeNotfi);
    } else {
      setNotificationIcon(btnNotfi);
    }
  };

  const handleFollowingClick = () => {
    setUserIdFromTweet(id, username);
    navigate("/follower");
  };

  const handleFollowersClick = () => {
    setUserIdFromTweet(id, username);
    navigate("/follow");
  };
  return (
    <div className="userInfoContainer">
      <img src={defaultBanner} alt="banner" className="background" />
      <div className="userContext">
        <div className="upSection">
          <img
            src={avatar ?? grayLogo}
            alt="User Icon"
            className="userAvatar"
          />
          <div className="btnSection">
            <img src={btnMsg} alt="msg" className="msgIcon" />
            <img
              src={notificationIcon}
              alt="notfi"
              className="notiIcon"
              onClick={handleNotificationClick}
            />
            <button
              className={`whiteButton  ${isFollow ? "isFollow" : ""}`}
              onClick={handleFollow}
            >
              {isFollow ? "Following" : "Follow"}
            </button>
          </div>
        </div>
        <div className="lowerSection">
          <h5 className="medium">{username}</h5>
          <div className="accountName">@{accountName}</div>
          <div className="bio">{bio}</div>
          <div className="countSection">
            <div
              className="count followingCount"
              onClick={handleFollowingClick}
            >
              {followersCount} <span>Following</span>
            </div>
            <div
              className="count followersCount"
              onClick={handleFollowersClick}
            >
              {followingCount} <span>Followers</span>
            </div>
          </div>
        </div>
      </div>
      <MobileMenu />
    </div>
  );
};

export default UserOtherItem;
