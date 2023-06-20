import grayLogo from "../../assets/logoGray.svg";
import UserPageTweet from "../userPageTweet/UserPageTweet";

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
        <UserPageTweet
          key={like.id}
          logo={like.tweetOwnerAvatar ?? grayLogo}
          username={like.tweetOwnerName}
          accountName={like.tweetOwnerAccount}
          postTime={formatTime(like.createdAt)}
          content={like.description}
          comments={like.replyCount}
          likes={like.likeCount}
          isLike={true}
        />
      ))}
    </div>
  );
};

export default UserRepliesList;
