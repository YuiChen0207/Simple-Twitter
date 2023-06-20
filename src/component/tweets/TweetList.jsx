import Tweet from "./tweetList/Tweet";
import grayLogo from "../../assets/logoGray.svg";
import { useUserId } from "../../contexts/UserIdContext";
import { formatTime } from "../../utils/timeUtils";

const TweetsList = ({ tweets, setTweetsList }) => {
  const { setUserIdFromTweet } = useUserId();

  return (
    <div className="tweetsListContainer">
      {tweets.map(
        (tweet) =>
          tweet.User?.account && (
            <Tweet
              key={tweet.id}
              logo={tweet.User.avatar ?? grayLogo}
              username={tweet.User?.name ?? ""}
              accountName={tweet.User?.account ?? ""}
              postTime={formatTime(tweet.createdAt)}
              content={tweet.description ?? ""}
              comments={tweet.RepliesCount ?? 0}
              tweetId={tweet.id}
              likes={tweet.LikesCount}
              onGetUserIdFromTweet={() => setUserIdFromTweet(tweet.User.id)}
              setList={setTweetsList}
            />
          )
      )}
    </div>
  );
};

export default TweetsList;
