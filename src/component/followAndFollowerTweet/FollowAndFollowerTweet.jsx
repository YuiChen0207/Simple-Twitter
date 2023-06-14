import React, { useState } from "react";
import grayLogo from "../../assets/logoGray.svg";
import "./FollowAndFollowerTweet.scss";

const FollowAndFollowerTweet = ({ userName, tweet }) => {
  const [isFollow, setIsFollow] = useState(false);

  const handleFollow = () => {
    setIsFollow(!isFollow);
  };

  return (
    <>
      <div className="followAndFollowerTweetContainer">
        <div className="upSection">
          <img src={grayLogo} alt="logo-gray" className="userLogo" />
          <h4 className="userName">{userName}</h4>
          <button
            className={`whiteButton  ${isFollow ? "isFollow" : ""}`}
            onClick={handleFollow}
          >
            {isFollow ? "正在跟隨" : "跟隨"}
          </button>
        </div>
        <h4 className="tweet">{tweet}</h4>
      </div>
      <hr />
    </>
  );
};

export default FollowAndFollowerTweet;
