import "./FollowAndFollowerTweet.scss";
import { following, unFollowing } from "../../api/followShip";

const FollowAndFollowerTweet = ({
  index,
  userName,
  intro,
  avatar,
  followerId,
  isFollowShip,
  allList,
  setList,
  tabStatus,
}) => {
  const handleFollow = async () => {
    if (isFollowShip) {
      try {
        await unFollowing(String(followerId));
        const newList = allList.map((user, i) => {
          if (index === i) {
            return tabStatus === "followers"
              ? { ...user, isFollowed: false }
              : { ...user, isFollowing: false };
          } else {
            return user;
          }
        });
        setList(newList);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await following({ id: String(followerId) });
        const newList = allList.map((user, i) => {
          if (index === i) {
            return tabStatus === "followers"
              ? { ...user, isFollowed: true }
              : { ...user, isFollowing: true };
          } else {
            return user;
          }
        });
        setList(newList);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div key={index} className="followAndFollowerTweetContainer">
        <div className="upSection">
          <img src={avatar} alt="user-logo" className="userLogo" />
          <h4 className="userName">{userName}</h4>
          <button
            className={`whiteButton  ${isFollowShip ? "isFollow" : ""}`}
            onClick={handleFollow}
          >
            {isFollowShip ? "Following" : "Follow"}
          </button>
        </div>
        <h4 className="tweet">{intro}</h4>
      </div>
      <hr />
    </>
  );
};

export default FollowAndFollowerTweet;
