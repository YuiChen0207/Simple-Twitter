import { useEffect, useState } from "react";
import {
  getUserLikes,
  getUserRepliedTweets,
  getUserTweets,
} from "../../api/tweets";
import Header from "../../component/header/Header";
import Navbar from "../../component/navbar/Navbar";
import PopularList from "../../component/popularList/PopularList";
import TabBar from "../../component/tabBar/TabBar";
import UserOtherItem from "../../component/userInfo/userOther/UserOther";
import {
  getPopularList,
  likePopularCard,
  unlikePopularCard,
} from "../../api/popularList.js";
import { getUserPageById } from "../../api/getUserPage";
import { useUserId } from "../../contexts/UserIdContext";
import UserTweetsList from "../../component/userTweetList/UserTweetList";
import UserRepliesList from "../../component/userRepliesList/UserRepliesList";
import UserLikesList from "../../component/userLikesList/UserLikesList";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Skeleton from "react-loading-skeleton";
import "../MainPage/MainPage.scss";

const UserOther = () => {
  const { userId, setUserIdFromTweet } = useUserId();
  const [activeTab, setActiveTab] = useState("tweets");
  const [tweets, setTweets] = useState([]);
  const [replies, setReplies] = useState([]);
  const [likes, setLikes] = useState([]);
  const [popularCards, setPopularCards] = useState([]);
  const [userData, setUserData] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isFollow, setIsFollow] = useState(userData?.isFollowing);
  const [follow, setFollow] = useState(userData?.isFollowing);

  const handleFollow = async () => {
    if (isFollow === false) {
      try {
        const followResult = await likePopularCard(userData?.id);
        setFollow(followResult.isFollowed);
      } catch (error) {
        console.log("likePopularCard failed", error);
      }
    } else {
      try {
        const followResult = await unlikePopularCard(userData?.id);
        setFollow(followResult.isFollowed);
      } catch (error) {
        console.log(error);
      }
    }
    setIsFollow(!isFollow);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchData = async () => {
      const userTweets = await getUserTweets(userId);
      setTweets(userTweets);

      const userReplies = await getUserRepliedTweets(userId);
      setReplies(userReplies);

      const userLikes = await getUserLikes(userId);
      setLikes(userLikes);

      const popularCards = await getPopularList();
      setPopularCards(popularCards);

      const user = await getUserPageById(userId);
      setUserData(user);
    };
    fetchData();
  }, [userId, follow]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);
  return (
    <div className="mainContainer">
      <Navbar />
      <div className="mainContent">
        <Header username={userData?.name} tweetCount={userData?.TweetCount} />
        <div className="postSection">
          {userData ? (
            <UserOtherItem
              id={userData?.id}
              avatar={userData?.avatar}
              username={userData?.name}
              accountName={userData?.account}
              bio={userData?.introduction}
              followingCount={userData?.followingCount}
              followersCount={userData?.followerCount}
              banner={userData?.banner}
              isFollowed={userData?.isFollowing}
              followerId={userData?.id}
              setUserIdFromTweet={setUserIdFromTweet}
              setPopularCards={setPopularCards}
              handleFollow={handleFollow}
              isFollow={isFollow}
              setIsFollow={setIsFollow}
            />
          ) : (
            <>
              <Skeleton count={15} />
              <p className="loading">Loading...</p>
            </>
          )}
        </div>
        <TabBar
          activePage="UserOther"
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />
        <div className="tweetsSection">
          {activeTab === "tweets" && (
            <UserTweetsList
              tweets={tweets}
              className="tweetsSection"
              setTweetsList={setTweets}
            />
          )}
          {activeTab === "replies" && (
            <UserRepliesList replies={replies} className="tweetsSection" />
          )}
          {activeTab === "likes" && (
            <UserLikesList
              likes={likes}
              className="tweetsSection"
              setTweetsList={setLikes}
            />
          )}
        </div>
      </div>
      <PopularList
        popularCards={popularCards}
        isFollowedFromUserPage={userData?.isFollowing}
        userData={userData}
        setFollow={setFollow}
        //onFollowerIdChange={handleFollowerIdChange}
      />
    </div>
  );
};

export default UserOther;
