import React, { useContext, useEffect, useState } from "react";
import { unlikeTweet, likeTweet } from "../../api/likeAndUnlike";
import { useAuth } from "../../contexts/AuthContext";
import { getPostTweet, postReply } from "../../api/tweets";
import { TweetsContext } from "../../contexts/TweetsContext";
import { formatDate } from "../../utils/timeUtils";
import commentIcon from "../../assets/commit.svg";
import emptyHeart from "../../assets/heart.svg";
import fullHeart from "../../assets/like-heart.svg";
import PopupReply from "../popupReply/PopupReply";
import defaultLogo from "../../assets/logoGray.svg";
import "./MainReply.scss";

const MainReply = ({
  tweet,
  repliesSet,
  tweetSet,
  setTweet,
  onHandleUserPage,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [replyMsg, setReplyMsg] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { currentMember } = useAuth();
  const { setTweets } = useContext(TweetsContext);

  useEffect(() => {
    const fetchData = async () => {
      const getAvatarFromPost = await getPostTweet();
      setAvatar(getAvatarFromPost);
    };

    fetchData();
  }, []);

  const handleTweetTextChange = ({ target: { value } }) => {
    setReplyMsg(value);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      handleTweet();
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLike = async () => {
    try {
      (await tweet.isLiked) ? unlikeTweet(tweet.id) : likeTweet(tweet.id);
      setTweet((prev) => {
        return {
          ...prev,
          tweetLikeCount: prev.isLiked
            ? prev.tweetLikeCount - 1
            : prev.tweetLikeCount + 1,
          isLiked: !prev.isLiked,
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleTweet = async () => {
    if (replyMsg.length === 0) {
      setErrorMessage("Content cannot be blank");
      return;
    }
    try {
      const response = await postReply({ id: tweet.id, comment: replyMsg });

      setReplyMsg("");
      setErrorMessage("");

      setTweets?.((prevTweets) => {
        return prevTweets.map((prevTweet) => {
          if (prevTweet.id === tweet.id) {
            return {
              ...prevTweet,
              RepliesCount: tweet.RepliesCount + 1,
              replyCount: tweet.replyCount + 1,
            };
          }
          return { ...prevTweet };
        });
      });

      repliesSet?.((prev) => {
        return [
          ...prev,
          {
            ...response.data,
            User: { ...currentMember },
          },
        ];
      });

      tweetSet?.((prev) => {
        return { ...prev, tweetReplyCount: prev.tweetReplyCount + 1 };
      });
    } catch (error) {
      console.error("Failed to post tweet:", error);
    }
  };

  return (
    <div className="singleReplyBox">
      <div className="replyMainBody">
        <div className="replyContentBox">
          <img
            className="userImg"
            src={tweet.tweetOwnerAvatar ?? defaultLogo}
            alt="user-img"
            onClick={onHandleUserPage}
          />
          <div className="replyContent">
            <span className="name">{tweet.tweetOwnerName}</span>
            <span className="account">@{tweet.tweetOwnerAccount}</span>
          </div>
        </div>
        <div className="content">{tweet.description}</div>
        <div className="timestamp">
          <p>{formatDate(tweet.updatedAt)}</p>
        </div>
      </div>
      <div className="countBox">
        <span className="replyCount">{tweet.tweetReplyCount}</span>
        <span className="likeCount">{tweet.tweetLikeCount}</span>
      </div>
      <div className="actionBox">
        <span onClick={handleOpenModal}>
          <img src={commentIcon} alt="comment" />
        </span>
        <img
          src={tweet.isLiked ? fullHeart : emptyHeart}
          alt="heart"
          onClick={handleLike}
        />
      </div>
      <div className="modalBody">
        <img className="userImg" src={avatar ?? defaultLogo} alt="avatar" />
        <input
          className="tweetInput"
          value={replyMsg}
          onChange={handleTweetTextChange}
          onKeyDown={handleKeyDown}
          placeholder="Tweet your reply!"
        />

        {errorMessage && <p className="characterLimit">{errorMessage}</p>}
        <button className="orangeButton" onClick={handleTweet}>
          Reply
        </button>
      </div>

      {showModal && (
        <PopupReply
          open={showModal}
          onClose={handleCloseModal}
          repliesSet={repliesSet}
          tweetSet={tweetSet}
        />
      )}
    </div>
  );
};

export default MainReply;
