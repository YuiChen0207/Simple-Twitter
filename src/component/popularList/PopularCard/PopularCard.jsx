import React, { useEffect, useState } from "react";
import defaultLogo from "../../../assets/logoGray.svg";
import "./PopularCard.scss";
import { useNavigate } from "react-router-dom";
import { getUserPageById } from "../../../api/getUserPage";
import { useUserId } from "../../../contexts/UserIdContext";
import { likePopularCard, unlikePopularCard } from "../../../api/popularList";

const PopularCard = ({
  followerId,
  userName,
  account,
  isFollowed,
  avatar,
  isFollowedFromUserPage,
  userData,
  setFollow,
}) => {
  const [isFollow, setIsFollow] = useState(isFollowed);
  const navigate = useNavigate();
  const { setUserIdFromTweet } = useUserId();

  useEffect(() => {
    setIsFollow(isFollowed);
  }, [isFollowedFromUserPage]);

  const handleUserPage = async () => {
    setUserIdFromTweet(followerId);

    const userData = await getUserPageById(followerId);
    if (userData) {
      console.log(followerId);
      navigate(`/user/${userData.name}`);
    }
  };

  const handleCardFollow = async () => {
    if (followerId === userData?.id) {
      if (isFollowed === false) {
        const followResult = await likePopularCard(userData?.id);
        setFollow(followResult.isFollowed);
      } else {
        const followResult = await unlikePopularCard(userData?.id);
        setFollow(followResult.isFollowed);
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
        onClick={handleCardFollow}
      >
        {isFollow ? "Following" : "Follow"}
      </button>
    </div>
  );
};

export default PopularCard;
