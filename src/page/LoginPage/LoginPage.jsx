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
    if (!account.length && !password.length) {
      setAccountError("Please enter an account");
      setPasswordError("Please enter a password");
      return;
    }
    if (!account.length) {
      setAccountError("Please enter an account");
      setPasswordError("");
      return;
    }
    if (!password.length) {
      setPasswordError("Please enter a password");
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
          title: "Login Successful!",
          timer: 1000,
          icon: "success",
          showConfirmButton: false,
        });
      } else {
        setAccountError("Account or password does not exist");
        setPasswordError("Account or password does not exist");
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
      <h1 className="title">Login to AlphaTwitter</h1>
      <div className="inputContainer">
        <AuthInput
          label="Account"
          value={account}
          placeholder={"Please enter an account"}
          accountError={accountError}
          onChange={(accountInputValue) => setAccount(accountInputValue)}
        />
        {accountError && <p className="error">{accountError}</p>}

        <AuthInput
          type="password"
          label="Password"
          value={password}
          placeholder={"Please enter a password"}
          passwordError={passwordError}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
        {passwordError && <p className="error">{passwordError}</p>}
      </div>
      <button className="btn" onClick={handleClick}>
        Login
      </button>
      <div className="switchSec">
        <Link to="/signup">
          <span className="signupSwitch">Sign Up</span>
        </Link>
        <span className="dot"></span>
        <Link to="/login_admin">
          <span className="adminSwitch">Admin Login</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
