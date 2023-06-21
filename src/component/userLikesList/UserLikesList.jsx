import grayLogo from "../../assets/logoGray.svg";
import UserPageTweet from "../userPageTweet/UserPageTweet";
import { formatTime } from "../../utils/timeUtils";


const UserRepliesList = ({ likes }) => {
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
