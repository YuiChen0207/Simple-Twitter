import Header from "../../component/header/Header";
import TabBar from "../../component/tabBar/TabBar";
import Navbar from "../../component/navbar/Navbar";
import PopularList from "../../component/popularList/PopularList";
import "./FollowAndFollower.scss";

const FollowAndFollower = () => {
  return (
    <div className="mainContainer">
      <Navbar />

      <div className="mainContent">
        {/* Header帶入api資料 */}
        <Header username="John Doe" tweetCount={25} />
        <TabBar activePage="FollowAndFollower" />
      </div>
      <PopularList />
    </div>
  );
};

export default FollowAndFollower;
