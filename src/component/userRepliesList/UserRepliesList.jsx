
import { formatTime } from "../../utils/timeUtils";
import UserPageTweet from "../userPageTweet/UserPageTweet";


const UserRepliesList = ({ replies, username }) => {
  return (
    <div className="tweetsListContainer">
      {replies.map((reply) => (
        <UserPageTweet
          key={reply.id}
          logo={reply.replyAvatar}
          username={username}
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
