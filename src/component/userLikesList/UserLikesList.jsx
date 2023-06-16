import Tweet from "../tweets/tweetList/Tweet";
import grayLogo from "../../assets/logoGray.svg";

const UserRepliesList = ({ likes }) => {
  function formatTime(timestamp) {
    const currentTime = new Date();
    const postTime = new Date(timestamp);

    const diffInMilliseconds = currentTime - postTime;
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return "剛剛";
    } else {
      return `${diffInHours}小時`;
    }
  }

  return (
    <div className="tweetsListContainer">
      {likes.map((like) => (
        <Tweet
          key={like.id}
          logo={/* like.tweetOwnerAvatar ??  */ grayLogo} //要改成user image
          username={like.tweetOwnerName}
          accountName={like.tweetOwnerAccount}
          postTime={formatTime(like.createdAt)}
          content={like.description}
          comments={like.replyCount}
          likes={like.likeCount}
          //isLiked={true} 愛心變紅還沒做
        />
      ))}
    </div>
  );
};

export default UserRepliesList;
