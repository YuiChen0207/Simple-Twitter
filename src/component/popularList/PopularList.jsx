import React from "react";
import PopularCard from "./PopularCard/PopularCard";
import "./popularList.scss";

const PopularList = ({
  popularCards,
  setPopularCards,
  isFollowedFromUserPage,
  follow,
  handleCardFollow,
  userData,
  setFollow,
}) => {
  return (
    <div className="popularList">
      <h4 className="medium">Who to follow</h4>
      <hr />
      <div className="popularCards">
        {popularCards.map((card) => (
          <PopularCard
            key={card.id}
            userName={card.name}
            avatar={card.avatar}
            account={card.account}
            isFollowed={card.isFollowed}
            followerId={card.id}
            setPopularCards={setPopularCards}
            isFollowedFromUserPage={isFollowedFromUserPage}
            userData={userData}
            setFollow={setFollow}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularList;
