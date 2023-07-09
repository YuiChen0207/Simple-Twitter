import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getPopularList } from "../../api/popularList";
import { getFollowerList, getFollowingList } from "../../api/followShip";
import { useUserId } from "../../contexts/UserIdContext";
import defaultLogo from "../../assets/logoGray.svg";
import Header from "../../component/header/Header";
import TabBar from "../../component/tabBar/TabBar";
import Navbar from "../../component/navbar/Navbar";
import PopularList from "../../component/popularList/PopularList";
import FollowAndFollowerTweet from "../../component/followAndFollowerTweet/FollowAndFollowerTweet";
import "./FollowAndFollower.scss";

const FollowAndFollower = () => {
  const location = useLocation();
  const path = location.pathname;
  const initialTab = path === "/follow" ? "followers" : "following";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [popularCards, setPopularCards] = useState([]);
  const [followShipList, setFollowShipList] = useState("");
  const [list, setList] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { userId, usernameFromContext } = useUserId();
  const { currentMember } = useAuth();

  useEffect(() => {
    const getFollowShipList = async () => {
      try {
        const list =
          activeTab === "followers"
            ? await getFollowerList(userId)
            : await getFollowingList(userId);

        activeTab === "followers"
          ? setFollowShipList([...list.followers])
          : setFollowShipList([...list.followings]);
        setList(list);
      } catch (error) {
        console.error(error);
      }
    };
    getFollowShipList();
  }, [activeTab, userId]);

  useEffect(() => {
    const getPopularCardsAsync = async () => {
      const popularCards = await getPopularList();
      setPopularCards(popularCards);
    };
    getPopularCardsAsync();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className="mainContainer">
      <Navbar />
      <div className="mainContent">
        <Header
          username={usernameFromContext}
          tweetCount={list?.tweetCount}
          pageName={
            currentMember?.id === userId
              ? "user/self"
              : `/user/${usernameFromContext}`
          }
        />
        <hr />
        <TabBar
          activePage="FollowAndFollower"
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />

        {[...followShipList]?.map((list, i) => {
          if (activeTab === "followers") {
            return (
              <FollowAndFollowerTweet
                key={list?.followerId}
                userName={list?.followerName}
                intro={list?.followerIntroduction}
                avatar={list.followerAvatar ?? defaultLogo}
                isFollowShip={list?.isFollowed}
                followerId={list?.followerId}
                setList={setFollowShipList}
                allList={[...followShipList]}
                tabStatus={activeTab}
              />
            );
          } else {
            return (
              <FollowAndFollowerTweet
                key={list?.followingId}
                userName={list?.followingName}
                intro={list?.followingIntroduction}
                avatar={list?.followingAvatar}
                isFollowShip={list?.isFollowing}
                followerId={list?.followingId}
                setList={setFollowShipList}
                allList={[...followShipList]}
                tabStatus={activeTab}
              />
            );
          }
        })}
      </div>
      <PopularList popularCards={popularCards} />
    </div>
  );
};

export default FollowAndFollower;
