import Header from "../../component/header/Header";
import TabBar from "../../component/tabBar/TabBar";
import Navbar from "../../component/navbar/Navbar";
import PopularList from "../../component/popularList/PopularList";
import FollowAndFollowerTweet from "../../component/followAndFollowerTweet/FollowAndFollowerTweet";
import "./FollowAndFollower.scss";

const FollowAndFollower = () => {
  return (
    <div className="mainContainer">
      <Navbar />
      <div className="mainContent">
        {/* Header帶入api資料 */}
        <Header username="John Doe" tweetCount={25} />
        <hr />
        <TabBar activePage="FollowAndFollower" />
        <hr />
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
