import React, { createContext, useEffect, useState } from "react";
import { getTweets } from "../api/tweets";

export const TweetsContext = createContext();

export const TweetsProvider = ({ children }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const getTweetsAsync = async () => {
      try {
        const tweets = await getTweets();
        setTweets(tweets);
      } catch (error) {
        console.error(error);
      }
    };
    getTweetsAsync();
  }, []);

  return (
    <TweetsContext.Provider value={{ tweets, setTweets }}>
      {children}
    </TweetsContext.Provider>
  );
};
