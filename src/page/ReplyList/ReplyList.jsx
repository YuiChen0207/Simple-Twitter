import Navbar from "../../component/navbar/Navbar";
import PopularList from "../../component/popularList/PopularList";
import MainReply from "../../component/mainReply/MainReply";
import ReplyListBox from "../../component/replyListBox/ReplyListBox";
import ArrowLeft from "../../assets/arrow.svg";
import { useNavigate } from "react-router-dom";
import { getSingleTweet, getTweetReplies } from "../../api/tweets";
import { useEffect, useState } from "react";
import { useId } from "../../contexts/IdContext";
import { getPopularList } from "../../api/popularlist";
import { useAuth } from "../../contexts/AuthContext";
import MobileMenu from "../../component/mobileMode/mobileMenu/MobileMenu";
import { getUserPageById } from "../../api/getUserPage";
import { useUserId } from "../../contexts/UserIdContext";
import "./ReplyList.scss";

const ReplyList = () => {
  const [singleTweet, setSingleTweet] = useState({});
  const [tweetReplies, setTweetReplies] = useState([]);
  const [popularCards, setPopularCards] = useState([]);
  const [userData, setUserData] = useState("");
  const { currentId } = useId();
  const tweet = { ...singleTweet };
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { setUserIdFromTweet, userId } = useUserId();
  const { currentMember } = useAuth();

  const handlePrevPage = () => {
    window.history.back();
  };

  const handleUserPage = async () => {
    const userData = await getUserPageById(userId);
    if (userId === currentMember.id) {
      navigate("/user/self");
    } else {
      navigate(`/user/${userData.name}`);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tweet = await getSingleTweet(currentId);
        const replies = await getTweetReplies(currentId);
        const userData = await getUserPageById(currentMember?.id);
        const popularCards = await getPopularList();

        setSingleTweet(tweet);
        setUserIdFromTweet(tweet.UserId);
        setTweetReplies(replies);
        setUserData(userData);
        setPopularCards(popularCards);

        if (!isAuthenticated) {
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentId, currentMember?.id, isAuthenticated, navigate]);

  return (
    <div className="replyMainContainer">
      <Navbar />
      <div className="subContainer">
        <div className="replyTitleContainer">
          <img
            className="img"
            src={ArrowLeft}
            alt="arrow"
            onClick={handlePrevPage}
          />
          <h4 className="medium">推文</h4>
        </div>
        <MainReply
          tweet={{ ...singleTweet }}
          tweetSet={setSingleTweet}
          repliesSet={setTweetReplies}
          setTweet={setSingleTweet}
          onHandleUserPage={handleUserPage}
        />
        <ReplyListBox
          userData={userData}
          replies={tweetReplies}
          replyTo={tweet.tweetOwnerAccount}
        />
      </div>
      <PopularList popularCards={popularCards} />
      <MobileMenu />
    </div>
  );
};

export default ReplyList;
