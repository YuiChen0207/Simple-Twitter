import UserPageTweet from "../userPageTweet/UserPageTweet";
import { formatTime } from "../../utils/timeUtils";
import { useAuth } from "../../contexts/AuthContext";

const UserLikesList = ({ likes, setTweetsList, userImage }) => {
  const { currentMember } = useAuth();
  return (
    <div className="tweetsListContainer">
      {likes.map((like) => (
        <UserPageTweet
          key={like.TweetId}
          logo={
            like.tweetOwnerAccount === currentMember?.account
              ? userImage
              : like.tweetOwnerAvatar
          }
          username={like.tweetOwnerName}
          accountName={like.tweetOwnerAccount}
          postTime={formatTime(like.createdAt)}
          content={like.description}
          comments={like.replyCount}
          likes={like.likeCount}
          isLiked={like.currentUserIsLiked}
          tweetId={like.TweetId}
          setList={setTweetsList}
        />
      ))}
    </div>
  );
};

export default UserLikesList;
