import React, { useEffect, useState } from "react";
import { getPostTweet, postTweet } from "../../api/tweets";
import grayLogo from "../../assets/logoGray.svg";
import { useAuth } from "../../contexts/AuthContext";
import "./Post.scss";

const Post = ({ setList }) => {
  const [userLogo, setUserLogo] = useState("");
  const [tweetText, setTweetText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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

  const handleTweetTextChange = (event) => {
    setErrorMessage("");
    setTweetText(event.target.value);
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
      console.log("推文已發布:", response);

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

      setTweetText("");
      setErrorMessage("");
    } catch (error) {
      console.error("發佈推文失败:", error);
    }
  };

  const calculateRemainingCharacters = () => {
    const maxCharacters = 140;
    const remainingCharacters = maxCharacters - tweetText.length;
    return remainingCharacters >= 0 ? remainingCharacters : 0;
  };
  
  return (
    <div className="postContainer">
      <div className="postHeader">
        <h4 className="medium">首頁</h4>
      </div>
      <hr />
      <div className="postContent">
        <div className="postBox">
          <img
            src={userLogo ?? grayLogo}
            alt="User Avatar"
            className="userAvatar"
          />
          <textarea
            className="postTextInput"
            value={tweetText}
            placeholder="有什麼新鮮事？"
            onChange={handleTweetTextChange}
          />
        </div>
      </div>
      <div className="ButtonContainer">
        <div className="tweetCount">
          Remaining : {calculateRemainingCharacters()}
        </div>
        {errorMessage && <p className="characterLimit">{errorMessage}</p>}

        <button className="button orangeButton" onClick={handleTweet}>
          推文
        </button>
      </div>

      <hr className="thickBar" />
      {/* {showModal && (
        <PopupModal
          open={showModal}
          setList={setList}
          onClose={handleCloseModal}
        />
     )} */}
    </div>
  );
};

export default Post;
