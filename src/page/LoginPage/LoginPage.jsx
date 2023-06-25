import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import AuthInput from "../../component/authInput/AuthInput";
import siteLogo from "../../assets/logo.svg";
import Swal from "sweetalert2";
import "../LoginPage/LoginPage.scss";

const LoginPage = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [accountError, setAccountError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const { login, isAuthenticated, currentMember } = useAuth();

  const handleClick = async () => {
    if (!account.length || !account.length) {
      setAccountError("請輸入帳號");
      setPasswordError("請輸入密碼");
      return;
    }
    if (!account.length) {
      setAccountError("請輸入帳號");
      setPasswordError("");
      return;
    }
    if (!password.length) {
      setPasswordError("請輸入密碼");
      setAccountError("");
      return;
    }

    try {
      const success = await login({
        account,
        password,
      });

      if (success) {
        Swal.fire({
          position: "top",
          title: "登入成功!",
          timer: 1000,
          icon: "success",
          showConfirmButton: false,
        });
      } else {
        setAccountError("帳號或密碼不存在");
        setPasswordError("帳號或密碼不存在");
      }
    } catch (error) {
      console.error("[Login Failed]:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && currentMember?.role === "user") {
      navigate("/mainPage");
    }
  }, [navigate, isAuthenticated, currentMember]);

  return (
    <div className="loginContainer">
      <div>
        <img className="logo" src={siteLogo} alt="logo" />
      </div>
      <h1 className="title">登入Alphitter</h1>
      <div className="inputContainer">
        <AuthInput
          label="帳號"
          value={account}
          placeholder={"請輸入帳號"}
          accountError={accountError}
          onChange={(accountInputValue) => setAccount(accountInputValue)}
        />
        {accountError && <p className="error">{accountError}</p>}

        <AuthInput
          type="password"
          label="密碼"
          value={password}
          placeholder={"請輸入密碼"}
          passwordError={passwordError}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
        {passwordError && <p className="error">{passwordError}</p>}
      </div>
      <button className="btn" onClick={handleClick}>
        登入
      </button>
      <div className="switchSec">
        <Link to="/signup">
          <span className="signupSwitch">註冊</span>
        </Link>
        <span className="dot"></span>
        <Link to="/login_admin">
          <span className="adminSwitch">後台登入</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
