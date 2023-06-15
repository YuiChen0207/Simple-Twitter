import Tweet from "./tweetList/Tweet";
import grayLogo from "../../assets/logoGray.svg";

const TweetsList = ({ tweets }) => {
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
      {tweets.map(
        (tweet) =>
          tweet.User?.account && (
            <Tweet
              key={tweet.id}
              logo={grayLogo}
              username={tweet.User?.account ?? ""}
              accountName={tweet.User?.account ?? ""}
              postTime={formatTime(tweet.createdAt)}
              content={tweet.description ?? ""}
              comments={tweet.RepliesCount ?? 0}
              tweetId={tweet.id}
              likes={tweet.LikesCount}
            />
          )
      )}
    </div>
  );
};

export default TweetsList;
