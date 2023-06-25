import grayLogo from "../../assets/logoGray.svg";
import UserPageTweet from "../userPageTweet/UserPageTweet";
import { formatTime } from "../../utils/timeUtils";


const UserRepliesList = ({ likes, username, userImage }) => {
  return (
    <div className="tweetsListContainer">
      {likes.map((like) => (
        <UserPageTweet
          key={like.id}
          logo={userImage}
          username={username}
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
