import grayLogo from "../../assets/logoGray.svg";
import { formatTime } from "../../utils/timeUtils";
import UserPageTweet from "../userPageTweet/UserPageTweet";

const UserTweetsList = ({ tweets, username, userImage }) => {
  return (
    <div className="tweetsListContainer">
      {tweets.map((tweet) => (
        <UserPageTweet
          key={tweet.id}
          logo={userImage}
          username={username}
          accountName={tweet.account}
          postTime={formatTime(tweet.createdAt)}
          content={tweet.description}
          comments={tweet.replyCount}
          likes={tweet.likeCount}
        />
      ))}
    </div>
  );
};

export default UserTweetsList;
