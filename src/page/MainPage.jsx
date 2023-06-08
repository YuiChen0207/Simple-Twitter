import Navbar from "../component/navbar/Navbar";
import PopularList from "../component/popularList/PopularList";
import "./MainPage.scss";

const Main = () => {
  return (
    <div className="main-container">
      <Navbar />
      <div className="main-content">
        {/* 
        <Post />
        <Tweets /> */}
      </div>
      <PopularList />
    </div>
  );
};

export default Main;
