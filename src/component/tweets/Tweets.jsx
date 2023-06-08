import React from "react";

import NavbarLogo from "../../assets/logo.svg";

const Tweet = () => {
  return (
    <div className="tweet-post">
      <div className="tweet-post-header">
        <h4 className="tweet-post-title">首頁</h4>
      </div>
      <div className="tweet-post-content">
        <div className="tweet-post-box">
          <img
            src={NavbarLogo}
            alt="User Avatar"
            className="tweet-post-avatar"
          />
          <p className="tweet-post-text">有什麼新鮮事？</p>
          <button className="tweet-post-button">推文</button>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
