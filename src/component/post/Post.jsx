import React from "react";
import "./Post.scss";
import PostPhoto from "../../assets/postPhoto.svg";

const Post = () => {
  return (
    <div className="tweet-post-container">
      <div className="tweet-post-header">
        <h4 className="medium">首頁</h4>
      </div>
      <hr />
      <div className="tweet-post-content">
        <div className="tweet-post-box">
          <img
            src={PostPhoto}
            alt="User Avatar"
            className="tweet-post-avatar"
          />
          <h5 className="medium tweet-post-text">有什麼新鮮事？</h5>
        </div>
        <button className="button tweet-post-button">推文</button>
      </div>
      <hr className="thickBar"/>
    </div>
  );
};

export default Post;
