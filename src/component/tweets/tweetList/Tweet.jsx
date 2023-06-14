import React from "react";
import commitIcon from "../../../assets/commit.svg";
import heartIcon from "../../../assets/heart.svg";
import "./Tweet.scss";

const Tweet = ({
  logo,
  username,
  accountName,
  postTime,
  content,
  comments,
  likes,
}) => {
  return (
    <>
      <div className="tweetContainer">
        <img src={logo} alt="Logo" className="userLogo"/>
        <div className="tweetContent">
          <div className="tweetHeader">
            <span className="tweetUsername">{username}</span>

            <span className="tweetAccountName">@{accountName}</span>
            <span className="dot" />
            <span className="tweetPostTime">{postTime}</span>
          </div>
          <div className="tweetText">{content}</div>
          <div className="tweetFooter">
            <div className="tweetComments">
              <img src={commitIcon} alt="commit icon" />
              <span className="commentCount">{comments}</span>
            </div>
            <div className="tweetLikes">
              <img src={heartIcon} alt="heart icon" />
              <span className="likeCount">{likes}</span>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Tweet;
