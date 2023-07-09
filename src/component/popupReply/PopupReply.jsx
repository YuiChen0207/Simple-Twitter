import { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import CloseIcon from "../../assets/closeIcon.svg";
import { getPostTweet, postReply } from "../../api/tweets";
import { useId } from "../../contexts/IdContext";
import { useAuth } from "../../contexts/AuthContext";
import { getSingleTweet } from "../../api/tweets";
import grayLogo from "../../assets/logoGray.svg";
import "./PopupReply.scss";
import { formatTime } from "../../utils/timeUtils";

const PopupReply = ({ open, onClose, repliesSet, tweetSet, setList }) => {
  const [replyMsg, setReplyMsg] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [avatar, setAvatar] = useState("");
  const { currentId } = useId();
  const { currentMember } = useAuth();
  const [singleTweet, setSingleTweet] = useState({});
  const tweet = { ...singleTweet };

  useEffect(() => {
    const getTweet = async () => {
      const tweet = await getSingleTweet(currentId);
      setSingleTweet(tweet);

      const avatar = await getPostTweet();
      setAvatar(avatar);
    };
    getTweet();
  }, []);

  const handleTweetTextChange = ({ target: { value } }) => {
    setErrorMessage("");
    setReplyMsg(value);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      handleTweet();
    }
  };

  const handlePopupClose = () => {
    setReplyMsg("");
    onClose();
  };

  const handleTweet = async () => {
    if (replyMsg.length === 0) {
      setErrorMessage("Content cannot be blank");
      return;
    }
    try {
      const response = await postReply({ id: currentId, comment: replyMsg });

      setReplyMsg("");
      setErrorMessage("");

      onClose();

      setList?.((prev) => {
        return prev.map((tweet) => {
          if (tweet.id === currentId || tweet.TweetId === currentId) {
            return {
              ...tweet,
              RepliesCount: tweet.RepliesCount + 1,
              replyCount: tweet.replyCount + 1,
            };
          }
          return { ...tweet };
        });
      });

      repliesSet?.((prev) => {
        return [
          ...prev,
          {
            ...response.data,
            user: { ...currentMember },
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

  const popupContentStyle = isMobile
    ? {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        borderRadius: "0",
        background: "var(--white)",
      }
    : {
        position: "absolute",
        top: "56px",
        left: "50%",
        width: "634px",
        height: "auto",
        borderRadius: "14px",
        background: "var(--white)",
        transform: "translateX(-50%)",
      };

  const overlayStyle = {
    background: "rgba(0, 0, 0, 0.5)",
  };

  return (
    <Popup
      open={open}
      modal
      closeOnDocumentClick
      onClose={handlePopupClose}
      contentStyle={popupContentStyle}
      overlayStyle={overlayStyle}
    >
      <div className="replyModal">
        <div className="replyModalHeader">
          <img src={CloseIcon} alt="close" onClick={handlePopupClose} />
        </div>
        <div className="replyContentBody">
          <div className="imgBox">
            <img
              className="userImg"
              src={tweet.tweetOwnerAvatar ?? grayLogo}
              alt="user-img"
            />
            <span className="bar"></span>
          </div>
          <div className="singleReplyMainContent">
            <div className="singleReplyContent">
              <span className="name">{tweet.tweetOwnerName}</span>
              <span className="account">@{tweet.tweetOwnerAccount}</span>
              <span className="dot"></span>
              <span className="date">{formatTime(tweet.updatedAt)}</span>
            </div>
            <div className="content">{tweet.description}</div>
            <span className="replyTo">@{tweet.tweetOwnerAccount}</span>
          </div>
        </div>
        <div className="modalBody">
          <img className="userImg" src={avatar ?? grayLogo} alt="avatar" />
          <textarea
            className="tweetInput"
            value={replyMsg}
            onChange={handleTweetTextChange}
            onKeyDown={handleKeyDown}
            placeholder="Tweet your reply!"
          />
        </div>
        <div className="modalFooter">
          <div>
            {errorMessage && <p className="characterLimit">{errorMessage}</p>}
            <button className="btn" onClick={handleTweet}>
              Reply
            </button>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default PopupReply;
