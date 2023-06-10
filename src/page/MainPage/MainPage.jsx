import Navbar from "../../component/navbar/Navbar";
import PopularList from "../../component/popularList/PopularList";
import Post from "../../component/post/Post";
import TweetsList from "../../component/tweets/TweetList";
import "./MainPage.scss";

const Main = () => {
  return (
    <div className="mainContainer">
      <Navbar />
      <div className="mainContent">
        <div className="postSection">
          <Post />
        </div>
        <div className="tweetsSection">
          <TweetsList className="tweetsSection" />
        </div>
      </div>
      <PopularList />
    </div>
  );
};

export default Main;
