import React, { useState } from "react";
import { likeTweet, unlikeTweet } from "../../../api/likeAndUnlike";
import commitIcon from "../../../assets/commit.svg";
import heartIcon from "../../../assets/heart.svg";
import { useId } from "../../../contexts/IdContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Tweet.scss";
import PopupReply from "../../popupReply/PopupReply";
import { useAuth } from "../../../contexts/AuthContext";

const Tweet = ({
  logo,
  username,
  accountName,
  postTime,
  content,
  comments,
  tweetId,
  likes,
  replyTo,
  hideFooter,
  onGetUserIdFromTweet,
  setList,
  tweet,
  isLiked,
}) => {
  const { checkItemId } = useId();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { currentMember } = useAuth();
  const userId = currentMember?.id;

  const handleOneTweet = async () => {
    checkItemId(tweetId);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLike = async () => {
    try {

      if (isLiked) {
        await unlikeTweet(String(tweetId));
        setList?.((prev) => {
          return prev.map((tweet) => {
            if (tweet.id === tweetId) {
              return {
                ...tweet,
                LikesCount: tweet.LikesCount - 1,
                isLiked: false,
              };
            }
            return { ...tweet };
          });
        });
      } else {
        await likeTweet(String(tweetId));
        setList?.((prev) => {
          return prev.map((tweet) => {
            if (tweet.id === tweetId) {
              return {
                ...tweet,
                LikesCount: tweet.LikesCount + 1,
                isLiked: true,
              };
            }
            return { ...tweet };
          });
        });
      }
    } catch (error) {
      console.error("like tweet successful:", error);
    }
  };

  return (
    <div
      className="tweetContainer"
      onClick={(e) => {
        if (e.target.tagName !== "IMG") {
          checkItemId(tweetId);
          navigate("/reply_list");
        }
      }}
    >
      <Link
        to={
          userId === tweet.User.id ? "/user/self" : `/user/${tweet.User.name}`
        }
        onClick={onGetUserIdFromTweet}
      >
        <img src={logo} alt="Logo" className="userLogo" />
      </Link>

      <div className="tweetContent">
        <div className="tweetHeader">
          <span className="tweetUsername">{username}</span>

          <span className="tweetAccountName">@{accountName}</span>
          <span className="dot" />
          <span className="tweetPostTime">{postTime}</span>
        </div>

        {replyTo && (
          <div className="replyText">
            Replying to <span>@{replyTo}</span>
          </div>
        )}

        <div className="tweetText">{content}</div>

        <div className="tweetFooter">
          {!hideFooter && (
            <>
              <div className="tweetComments" onClick={() => handleOneTweet()}>
                <img
                  src={commitIcon}
                  alt="commit icon"
                  onClick={handleOpenModal}
                />
                <span className="commentCount">{comments}</span>
              </div>
              <div className="tweetLikes" onClick={handleLike}>
                <img
                  src={heartIcon}
                  alt="heart icon"
                  className={`heartIcon ${isLiked ? "liked" : ""}`}
                />
                <span className="likeCount">{likes}</span>
              </div>
            </>
          )}
        </div>
        {showModal && (
          <PopupReply
            open={showModal}
            onClose={handleCloseModal}
            setList={setList}
          />
        )}
      </div>
    </div>
  );
};

export default Tweet;
