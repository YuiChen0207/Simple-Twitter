import { useState } from 'react';
import Popup from 'reactjs-popup';
import CloseIcon from '../../assets/closeIcon.svg';
import profileImg from '../../assets/img/canadian-girl.jpg';
import './PopupReply.scss';

const PopupReply = ({ open, onClose }) => {
  const [tweetText, setTweetText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleTweetTextChange = ({ target: { value } }) => {
    setTweetText(value);
  };

  const handlePopupClose = () => {
    setTweetText('');
    onClose();
  };

  const handleTweet = () => {
    if (tweetText.length === 0) {
      setErrorMessage('內容不可空白');
    } else {
      // 执行推文操作
      setErrorMessage(''); // 清空错误消息
      onClose();
    }
  };

  const popupContentStyle = {
    position: 'absolute',
    top: '56px',
    left: '50%',
    width: '634px',
    height: 'auto',
    borderRadius: '14px',
    background: 'var(--white)',
    transform: 'translateX(-50%)',
  };

  const overlayStyle = {
    background: 'rgba(0, 0, 0, 0.5)',
  };

  return (
    <Popup
      open={open}
      modal
      closeOnDocumentClick
      onClose={handlePopupClose}
      contentStyle={popupContentStyle}
      overlayStyle={overlayStyle}
    >
      <div className="replyModal">
        <div className="replyModalHeader">
          <img src={CloseIcon} alt="close" onClick={handlePopupClose} />
        </div>
        <div className="replyContentBody">
          <div className="imgBox">
            <img className="userImg" src={profileImg} alt="user-img" />
            <span className="bar"></span>
          </div>
          <div className="singleReplyMainContent">
            <div className="singleReplyContent">
              <span className="name">Apple</span>
              <span className="account">@apple</span>
              <span className="dot"></span>
              <span className="date">3小時</span>
            </div>
            <div className="content">
              'Vestibulum tristique pharetra lorem id eleifend. Maecenas tempus
              odio vitae ipsum aliquet ullamcorper. Sed varius commodo odio, id
              dignissim odio iaculis eu.',
            </div>
            <span className="replyTo">@apple</span>
          </div>
        </div>
        <div className="modalBody">
          <img className="userImg" src={profileImg} alt="avatar" />
          <textarea
            className="tweetInput"
            value={tweetText}
            onChange={handleTweetTextChange}
            placeholder="推你的回覆"
          />
        </div>
        <div className="modalFooter">
          <div>
            {errorMessage && <p className="characterLimit">{errorMessage}</p>}
            <button className="btn" onClick={handleTweet}>
              回覆
            </button>
            {/* 點擊推文按鈕後可以新增reply，等待api串接 */}
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default PopupReply;
