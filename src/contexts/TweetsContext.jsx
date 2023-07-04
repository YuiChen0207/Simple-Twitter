import React, { createContext, useEffect, useState } from "react";
import { getTweets } from "../api/tweets";

export const TweetsContext = createContext();

export const TweetsProvider = ({ children }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const getTweetsAsync = async () => {
      const tweets = await getTweets();
      setTweets(tweets);
    };
    getTweetsAsync();
  }, []);

  return (
    <TweetsContext.Provider value={{ tweets, setTweets }}>
      {children}
    </TweetsContext.Provider>
  );
};
