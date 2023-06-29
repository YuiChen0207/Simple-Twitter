import AdminTweet from "./adminTweet/AdminTweet";
import "./AdminTweetList.scss";

const AdminTweetList = ({ tweets, setList }) => {
  // console.log(tweets);
  return (
    <div className="adminTweetsListContainer">
      {tweets.map((tweet) => (
        <AdminTweet
          key={tweet.id}
          tweetId={tweet.UserId}
          img={tweet.tweetOwnerAvatar}
          username={tweet.tweetOwnerName}
          accountName={tweet.tweetOwnerAccount}
          postTime={tweet.updatedAt}
          content={tweet.description}
          setList={setList}
        />
      ))}
    </div>
  );
};

export default AdminTweetList;
