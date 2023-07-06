import SingleReply from "./singleReply/SingleReply";
import "./ReplyListBox.scss";

const ReplyListBox = ({ replies, replyTo, userData }) => {
  return (
    <div className="replyListBox">
      {replies.map((reply) => (
        <SingleReply
          key={reply.id}
          img={userData.avatar ?? reply.User.avatar}
          username={userData.name ?? reply.User.name}
          accountName={userData.account ?? reply.User.account}
          postTime={reply.updatedAt}
          content={reply.comment}
          replyTo={replyTo}
        />
      ))}
    </div>
  );
};

export default ReplyListBox;
