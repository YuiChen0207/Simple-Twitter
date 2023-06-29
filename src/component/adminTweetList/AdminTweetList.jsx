import AdminTweet from "./adminTweet/AdminTweet";
import "./AdminTweetList.scss";

const AdminTweetList = ({ tweets, setList }) => {
  console.log(tweets);
  return (
    <div className="adminTweetsListContainer">
      {tweets.map((tweet) => (
        <AdminTweet
          tweetId={tweet.id}
          userId={tweet.UserId}
          tweetOwnerAvatar={tweet.tweetOwnerAvatar}
          username={tweet.tweetOwnerName}
          accountName={tweet.tweetOwnerAccount}
          postTime={tweet.createdAt}
          content={tweet.description}
          setList={setList}
        />
      ))}
    </div>
  );
};

export default AdminTweetList;
