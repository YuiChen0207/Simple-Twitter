import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { getPostTweet, postTweet } from "../../../api/tweets";
import Popup from "reactjs-popup";
import CloseIcon from "../../../assets/closeIcon.svg";
import grayLogo from "../../../assets/logoGray.svg";
import "../../popupModal/PopupModal.scss";

const MobileTweet = ({ open, onClose, setList, setTweetsList }) => {
  const [tweetText, setTweetText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userLogo, setUserLogo] = useState("");
  const { currentMember } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const logo = await getPostTweet();
      setUserLogo(logo);
    };

    fetchData();
  }, []);

  const handleTweetTextChange = (event) => {
    setErrorMessage("");
    setTweetText(event.target.value);
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
      setErrorMessage("字數不可超過140字");
      return;
    }

    if (tweetText.length === 0) {
      setErrorMessage("內容不可空白");
      return;
    }
    try {
      const response = await postTweet({ tweetText });
      console.log("推文已發布:", response.data);

      setList?.((prev) => {
        return [
          {
            Likes: [],
            LikesCount: 0,
            Replies: [],
            RepliesCount: 0,
            ...response.data,
            User: { ...currentMember },
          },
          ...prev,
        ];
      });

      setTweetsList?.((prev) => {
        return [
          {
            ...response.data,
            account: currentMember.account,
            avatar: currentMember.avatar,
            currentUserIsLiked: false,
            likeCount: 0,
            name: currentMember.name,
            replyCount: 0,
          },
          ...prev,
        ];
      });

      setTweetText("");
      setErrorMessage("");
      onClose();
    } catch (error) {
      console.error("發佈推文失败:", error);
    }
  };
  const popupContentStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: 0,
    background: "var(--white)",
  };

  return (
    <Popup
      open={open}
      modal
      closeOnDocumentClick
      onClose={handlePopupClose}
      contentStyle={popupContentStyle}
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
            placeholder="有什麼新鮮事？"
          />
        </div>
        <div className="modalFooter">
          <div className="tweetCount">
            Remaining : {calculateRemainingCharacters()}
          </div>
          {errorMessage && <p className="characterLimit">{errorMessage}</p>}
          <button className="orangeButton" onClick={handleTweet}>
            推文
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default MobileTweet;
