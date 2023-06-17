import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditPopupModal from "../popupModal/editPopupModal/EditPopupModal";
import userPhoto from "../../assets/postPhoto.svg";
import "./UserInfo.scss";

const UserInfo = ({
  avatar,
  username,
  accountName,
  bio,
  followingCount,
  followersCount,
  banner,
}) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleEditProfileClick = () => {
    setShowModal(true);
  };

  const handleClosePopup = () => {
    setShowModal(false);
  };

  const handleFollowingClick = () => {
    navigate("/follow");
  };

  const handleFollowersClick = () => {
    navigate("/follower");
  };
  return (
    <div className="userInfoContainer">
      <img src={banner} className="background" alt="banner" />
      <div className="userContext">
        <div className="upSection">
          <img
            src={avatar}
            alt="User Icon"
            className="userAvatar"
          />
          <button className="whiteButton" onClick={handleEditProfileClick}>
            編輯個人資料
          </button>
        </div>
        <div className="lowerSection">
          <h5 className="medium">{username}</h5>
          <div className="accountName">@{accountName}</div>
          <div className="bio">{bio}</div>{/* 要新增bio */}
          <div className="countSection">
            <div
              className="count followingCount"
              onClick={handleFollowingClick}
            >
              {followingCount}位<span>跟隨中</span>
            </div>
            <div
              className="count followersCount"
              onClick={handleFollowersClick}
            >
              {followersCount}位<span>跟隨者</span>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <EditPopupModal open={showModal} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default UserInfo;
