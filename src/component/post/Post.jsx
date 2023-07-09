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
      const logo = await getPostTweet();
      setUserLogo(logo);
    };

    fetchData();
  }, []);

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
            User: { ...currentMember },
          },
          ...prev,
        ];
      });

      setTweetText("");
      setErrorMessage("");
    } catch (error) {
      console.error("Failed to post tweet:", error);
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
        <h4 className="medium">Home</h4>
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
            placeholder="What is happening?!"
            onChange={handleTweetTextChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div className="ButtonContainer">
        <div className="tweetCount">
          Remaining : {calculateRemainingCharacters()}
        </div>
        {errorMessage && <p className="characterLimit">{errorMessage}</p>}

        <button className="button orangeButton" onClick={handleTweet}>
          Tweet
        </button>
      </div>

      <hr className="thickBar" />
    </div>
  );
};

export default Post;
