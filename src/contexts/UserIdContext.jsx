import { createContext, useContext, useState } from "react";

const UserIdContext = createContext(null);

export const useUserId = () => useContext(UserIdContext);

export const UserIdProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [usernameFromContext, setUsernameFromContext] = useState(null);

  const setUserIdFromTweet = (userId, username) => {
    setUserId(userId);
    setUsernameFromContext(username);
  };

  return (
    <UserIdContext.Provider
      value={{ userId, usernameFromContext, setUserIdFromTweet }}
    >
      {children}
    </UserIdContext.Provider>
  );
};

export default UserIdContext;
