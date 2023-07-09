import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUseSettingInfo, putUseSettingInfo } from "../../api/userSetting";
import Navbar from "../../component/navbar/Navbar";
import PageTag from "../../component/pageTag/PageTag";
import UserSettingInput from "../../component/userSetting/UserSettingInput";
import "../SettingPage/SettingPage.scss";
import MobileMenu from "../../component/mobileMode/mobileMenu/MobileMenu";

const SettingPage = () => {
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const userChangeData = {
        name: userName,
        account: account,
        email: email,
        password: password,
        checkPassword: checkPassword,
      };

      await putUseSettingInfo(userChangeData);
    } catch (error) {
      console.error(error);
    }
  };


  const handleClick = () => {
    logout();
  };

  useEffect(() => {
    getUseSettingInfo().then((res) => {
      setAccount(res.data.account);
      setUserName(res.data.name);
      setEmail(res.data.email);
    });
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);
  return (
    <div className="settingMainContainer">
      <div className="navContainer">
        <Navbar />
      </div>
      <div className="settingContainer">
        <PageTag title="Settings" />
        <form className="inputContainer">
          <UserSettingInput
            label="account"
            placeholder="Please enter an account"
            value={account}
            onChange={(accountInputValue) => setAccount(accountInputValue)}
          />
          <UserSettingInput
            label="name"
            placeholder="Please enter a username"
            value={userName}
            onChange={(userNameInputValue) => setUserName(userNameInputValue)}
          />
          <UserSettingInput
            label="Email"
            placeholder="Please enter an email"
            value={email}
            onChange={(emailInputValue) => setEmail(emailInputValue)}
          />
          <UserSettingInput
            type="password"
            label="password"
            placeholder="Please set a password"
            value={password}
            onChange={(passwordInputValue) => setPassword(passwordInputValue)}
          />
          <UserSettingInput
            type="password"
            label="Confirm Password"
            placeholder="Please enter the password again"
            value={checkPassword}
            onChange={(checkPasswordInputValue) =>
              setCheckPassword(checkPasswordInputValue)
            }
          />
          <button className="btn" onClick={handleSubmit}>
            Save
          </button>
        </form>
        <div className="logoutBtn">
          <span className="logout" onClick={handleClick}>
            Logout
          </span>
        </div>
      </div>
      <MobileMenu />
    </div>
  );
};

export default SettingPage;
