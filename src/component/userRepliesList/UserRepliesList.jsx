import grayLogo from "../../assets/logoGray.svg";
import UserPageTweet from "../userPageTweet/UserPageTweet";

const UserRepliesList = ({ replies }) => {
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
      {replies.map((reply) => (
        <UserPageTweet
          key={reply.id}
          logo={reply.replyAvatar ?? grayLogo}
          username={reply.replyName}
          accountName={reply.replyAccount}
          postTime={formatTime(reply.createdAt)}
          content={reply.comment}
          replyTo={reply.Tweet?.User?.account}
          hideFooter={true}
        />
      ))}
    </div>
  );
};

export default UserRepliesList;
