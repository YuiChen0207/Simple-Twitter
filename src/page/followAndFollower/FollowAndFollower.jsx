import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../component/header/Header";
import TabBar from "../../component/tabBar/TabBar";
import Navbar from "../../component/navbar/Navbar";
import PopularList from "../../component/popularList/PopularList";
import FollowAndFollowerTweet from "../../component/followAndFollowerTweet/FollowAndFollowerTweet";
import "./FollowAndFollower.scss";

const FollowAndFollower = () => {
  const location = useLocation();
  const path = location.pathname;
  const initialTab = path === "/follow" ? "following" : "followers";
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="mainContainer">
      <Navbar />
      <div className="mainContent">
        {/* Header帶入api資料 */}
        {/* 帶入的pageName可以在優化成其他使用者 */}
        <Header username="John Doe" tweetCount={25} pageName="user/self" />
        <hr />
        <TabBar
          activePage="FollowAndFollower"
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />
        <FollowAndFollowerTweet
          userName="Apple"
          tweet="Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. "
        />
      </div>
      <PopularList />
    </div>
  );
};

export default FollowAndFollower;
