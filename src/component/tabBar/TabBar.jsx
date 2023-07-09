import "./TabBar.scss";

const tabOptions = [
  { id: "tweets", label: "Tweets" },
  { id: "replies", label: "Replies" },
  { id: "likes", label: "Likes" },
];

const tabOptionsFollow = [
  { id: "followers", label: "Follower" },
  { id: "following", label: "Following" },
];

const TabBar = ({ activePage, activeTab, onTabClick }) => {
  const options =
    activePage === "UserSelf" || activePage === "UserOther"
      ? tabOptions
      : tabOptionsFollow;

  return (
    <div className="tabBar">
      {options.map((option) => (
        <button
          key={option.id}
          className={`tabButton ${activeTab === option.id ? "active" : ""}`}
          onClick={() => onTabClick(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default TabBar;
