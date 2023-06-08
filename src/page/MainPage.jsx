import Navbar from "../component/navbar/Navbar";
import PopularList from "../component/popularList/PopularList";
import "./mainPage.scss"

const Main = () => {
  return (
    <div className="main-container">
      <Navbar />
      <div className="main-content">
        {/* <Headers />
        <Post />
        <Tweets /> */}
      </div>
      <PopularList />
    </div>
  );
};

export default Main;
