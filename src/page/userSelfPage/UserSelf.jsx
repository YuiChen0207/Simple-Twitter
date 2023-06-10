import Header from "../../component/header/Header";
import Navbar from "../../component/navbar/Navbar";
import PopularList from "../../component/popularList/PopularList";
import TabBar from "../../component/tabBar/TabBar";
import TweetsList from "../../component/tweets/TweetList";
import UserInfo from "../../component/userInfo/UserInfo";
import "../MainPage/MainPage.scss";

const UserSelf = () => {
  return (
    <div className="mainContainer">
      <Navbar />
      <div className="mainContent">
        <Header username="John Doe" tweetCount={25} />
        <div className="postSection">
          <UserInfo
            username="John Doe"
            accountName="heyjohn"
            bio="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. "
            followingCount={34}
            followersCount={59}
          />
        </div>
        <TabBar />
        <hr />
        <div className="tweetsSection">
          <TweetsList className="tweetsSection" />
        </div>
      </div>
      <PopularList />
    </div>
  );
};

export default UserSelf;
