import React, { useState } from "react";
import { likePopularCard, unlikePopularCard } from "../../../api/popularlist";
import defaultLogo from "../../../assets/logoGray.svg";
import "./PopularCard.scss";
import { useNavigate } from "react-router-dom";
import { getUserPageById } from "../../../api/getUserPage";
import { useUserId } from "../../../contexts/UserIdContext";

const PopularCard = ({ followerId, userName, account, isFollowed, avatar }) => {
  const [isFollow, setIsFollow] = useState(isFollowed);
  const navigate = useNavigate();
  const { setUserIdFromTweet } = useUserId();

  const handleUserPage = async () => {
    setUserIdFromTweet(followerId);

    const userData = await getUserPageById(followerId);
    if (userData) {
      console.log(followerId);
      navigate(`/user/${userData.name}`);
    }
  };

  //  加入更新資料的邏輯
  const handleFollow = async () => {
    if (isFollow === false) {
      try {
        await likePopularCard(followerId);
      } catch (error) {
        console.log(error);
        console.log("likePopularCard failed");
      }
    } else {
      try {
        await unlikePopularCard(followerId);
      } catch (error) {
        console.log(error);
      }
    }
    setIsFollow(!isFollow);
  };

  return (
    <div className="popularCard">
      <img
        src={avatar ?? defaultLogo}
        alt="user"
        className="popularCardLogo"
        onClick={handleUserPage}
      />
      <div className="popularCardInfo">
        <h4 className="popularCardUserName">{userName}</h4>
        <p className="popularCardAccount">{account}</p>
      </div>
      <button
        className={`whiteButton  ${isFollow ? "isFollow" : ""}`}
        onClick={handleFollow}
      >
        {isFollow ? "正在跟隨" : "跟隨"}
      </button>
    </div>
  );
};

export default PopularCard;
