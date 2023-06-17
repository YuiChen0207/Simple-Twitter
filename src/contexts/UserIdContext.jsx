import { createContext, useContext, useState } from "react";

const UserIdContext = createContext(null);

export const useUserId = () => useContext(UserIdContext);

export const UserIdProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  const setUserIdFromTweet = (userId) => {
    setUserId(userId);
  };

  return (
    <UserIdContext.Provider value={{ userId, setUserIdFromTweet }}>
      {children}
    </UserIdContext.Provider>
  );
};

export default UserIdContext;
