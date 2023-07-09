import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getPostTweet, postTweet } from "../../api/tweets";
import Popup from "reactjs-popup";
import CloseIcon from "../../assets/closeIcon.svg";
import grayLogo from "../../assets/logoGray.svg";
import "./PopupModal.scss";
import { getUserPageById } from "../../api/getUserPage";

const PopupModal = ({ open, onClose, setList, setTweetsList }) => {
  const [tweetText, setTweetText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userLogo, setUserLogo] = useState("");
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { currentMember } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const logo = await getPostTweet();
        setUserLogo(logo);
      } catch (error) {
        console.error("獲取用户Logo失敗:", error);
      }
    };

    fetchData();
  }, []);

  const getName = async () => {
    const getNameFromPage = await getUserPageById(currentMember?.id);
    setName(getNameFromPage.name);
    setAccount(getNameFromPage.account)
  };
  getName();

  const handleTweetTextChange = (event) => {
    setErrorMessage("");
    setTweetText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      handleTweet();
    }
  };

  const handlePopupClose = () => {
    setTweetText("");
    onClose();
  };

  const calculateRemainingCharacters = () => {
    const maxCharacters = 140;
    const remainingCharacters = maxCharacters - tweetText.length;
    return remainingCharacters >= 0 ? remainingCharacters : 0;
  };

  const handleTweet = async () => {
    if (tweetText.length > 140) {
      setErrorMessage("Exceeded maximum character limit (140)");
      return;
    }

    if (tweetText.length === 0) {
      setErrorMessage("Content cannot be blank");
      return;
    }
    try {
      const response = await postTweet({ tweetText });

      setList?.((prev) => {
        return [
          {
            Likes: [],
            LikesCount: 0,
            Replies: [],
            RepliesCount: 0,
            ...response.data,
            User: {
              ...currentMember,
              avatar: userLogo,
              name: name,
            },
          },
          ...prev,
        ];
      });

      setTweetsList?.((prev) => {
        return [
          {
            ...response.data,
            account: account,
            avatar: userLogo,
            currentUserIsLiked: false,
            likeCount: 0,
            name: name,
            replyCount: 0,
          },
          ...prev,
        ];
      });

      setTweetText("");
      setErrorMessage("");
      onClose();
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
        height: "300px",
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
      <div className="modal">
        <div className="modalHeader">
          <img src={CloseIcon} alt="close" onClick={handlePopupClose} />
        </div>
        <hr />
        <div className="modalBody">
          <img src={userLogo ?? grayLogo} alt="avatar" className="userAvatar" />
          <textarea
            className="tweetInput"
            value={tweetText}
            onChange={handleTweetTextChange}
            onKeyDown={handleKeyDown}
            placeholder="What is happening？!"
          />
        </div>
        <div className="modalFooter">
          <div className="tweetCount">
            Remaining : {calculateRemainingCharacters()}
          </div>
          {errorMessage && <p className="characterLimit">{errorMessage}</p>}
          <button className="orangeButton" onClick={handleTweet}>
            Tweet
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default PopupModal;
