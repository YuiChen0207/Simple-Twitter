import { useState } from "react";

import Navbar from "../../component/navbar/Navbar";
import PopularList from "../../component/popularList/PopularList";
import Post from "../../component/post/Post";
import TweetsList from "../../component/tweets/TweetList";
import "./FollowAndFollower.scss";

const FollowAndFollower = () => {
  const [tweets, setTweets] = useState([]);

  return (
    <div className="mainContainer">
      <Navbar />
      <div className="mainContent">
        <div className="postSection">
          <Post />
        </div>
        <div className="tweetsSection">
          <TweetsList tweets={tweets} className="tweetsSection" />
        </div>
      </div>
      <PopularList />
    </div>
  );
};

export default FollowAndFollower;
