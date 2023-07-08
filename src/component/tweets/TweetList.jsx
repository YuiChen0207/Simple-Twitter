import Tweet from "./tweetList/Tweet";
import grayLogo from "../../assets/logoGray.svg";
import { useUserId } from "../../contexts/UserIdContext";
import { formatTime } from "../../utils/timeUtils";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const TweetsList = ({ tweets, setTweetsList }) => {
  const { setUserIdFromTweet } = useUserId();
  const navigate = useNavigate();
  const { currentMember } = useAuth();
  const userId = currentMember?.id;

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
              tweet={tweet}
              likes={tweet.LikesCount}
              onGetUserIdFromTweet={() => {
                const isCurrentUser = tweet.User.id === userId;
                if (!isCurrentUser) {
                  setUserIdFromTweet(tweet.User.id);
                }
                navigate(isCurrentUser ? "/user/self" : `/user/${tweet.name}`);
              }}
              setList={setTweetsList}
              isLiked={tweet.isLiked}
            />
          )
      )}
    </div>
  );
};

export default TweetsList;
