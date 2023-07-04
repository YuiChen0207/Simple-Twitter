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
  const { currentId } = useId();
  const tweet = { ...singleTweet };
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { setUserIdFromTweet, userId } = useUserId();

  const handlePrevPage = () => {
    window.history.back();
  };

  const handleUserPage = async () => {
    const userData = await getUserPageById(userId);
    if (userData) {
      console.log(userId);
      navigate(`/user/${userData.name}`);
    }
  };
  useEffect(() => {
    const getTweet = async () => {
      try {
        const tweet = await getSingleTweet(currentId);
        setSingleTweet(tweet);
        setUserIdFromTweet(tweet.UserId);
      } catch (error) {
        console.error(error);
      }
    };
    getTweet();
  }, [currentId]);

  useEffect(() => {
    const getReplies = async () => {
      try {
        const replies = await getTweetReplies(currentId);
        setTweetReplies(replies);
        console.log(replies);
      } catch (error) {
        console.error(error);
      }
    };
    getReplies();
  }, [currentId]);

  useEffect(() => {
    const getPopularCardsAsync = async () => {
      try {
        const popularCards = await getPopularList();
        setPopularCards(popularCards.map((users) => ({ ...users })));
      } catch (error) {
        console.error(error);
      }
    };
    getPopularCardsAsync();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);
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
