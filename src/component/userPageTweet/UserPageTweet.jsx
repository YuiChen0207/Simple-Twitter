import commitIcon from "../../assets/commit.svg";
import heartIcon from "../../assets/heart.svg";
import "./UserPageTweet.scss";

const UserPageTweet = ({
  logo,
  username,
  accountName,
  postTime,
  content,
  comments,
  likes,
  replyTo,
  hideFooter,
  onGetUserIdFromTweet,
  isLike,
}) => {
  return (
    <>
      <div className="tweetContainer">
        <img
          src={logo}
          alt="Logo"
          className="userImage"
          onClick={onGetUserIdFromTweet}
        />

        <div className="tweetContent">
          <div className="tweetHeader">
            <span className="tweetUsername">{username}</span>

            <span className="tweetAccountName">@{accountName}</span>
            <span className="dot" />
            <span className="tweetPostTime">{postTime}</span>
          </div>

          {replyTo && (
            <div className="replyText">
              回覆 <span>@{replyTo}</span>
            </div>
          )}

          <div className="tweetText">{content}</div>

          <div className="tweetFooter">
            {!hideFooter && (
              <>
                <div className="tweetComments">
                  <img src={commitIcon} alt="commit icon" />
                  <span className="commentCount">{comments}</span>
                </div>
                <div className="tweetLikes">
                  <img
                    src={heartIcon}
                    alt="heart icon"
                    className={`${isLike ? "redHeart" : ""}`}
                  />
                  <span className="likeCount">{likes}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default UserPageTweet;
