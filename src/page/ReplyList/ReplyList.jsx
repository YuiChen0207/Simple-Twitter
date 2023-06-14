import Navbar from '../../component/navbar/Navbar';
import PopularList from '../../component/popularList/PopularList';
import MainReply from '../../component/mainReply/MainReply';
import ReplyListBox from '../../component/replyListBox/ReplyListBox';
import ArrowLeft from '../../assets/arrow.svg';
import { Link, useNavigate } from 'react-router-dom';
import './ReplyList.scss';

const ReplyList = () => {
  return (
    <div className="replyMainContainer">
      <Navbar />
      <div className="subContainer">
        <div className="replyTitleContainer">
          <Link to="/mainpage">
            <img className="img" src={ArrowLeft} alt="arrow" />
          </Link>
          <h4 className="medium">推文</h4>
        </div>
        <MainReply />
        <ReplyListBox />
      </div>
      <PopularList />
    </div>
  );
};

export default ReplyList;
