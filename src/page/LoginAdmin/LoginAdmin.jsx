import AuthInput from "../../component/authInput/AuthInput";
import siteLogo from "../../assets/logo.svg";
import "../LoginAdmin/LoginAdmin.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/AuthContext";

const LoginAdmin = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [accountError, setAccountError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const { adminLogin, isAuthenticated, currentMember } = useAuth();

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
    const { success, error } = await adminLogin({
      account,
      password,
    });

    console.log(error);

    if (success) {
      Swal.fire({
        position: "top",
        title: "Login successful!",
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
      });
    } else {
      setAccountError("Account or password does not exist");
      setPasswordError("Account or password does not exist");
    }
  };

  useEffect(() => {
    if (isAuthenticated && currentMember.role === "admin") {
      navigate("/admin_main");
    }
  }, [navigate, isAuthenticated, currentMember]);

  return (
    <div className="loginAdminContainer">
      <div>
        <img className="logo" src={siteLogo} alt="logo" />
      </div>
      <h1 className="title">Admin Login</h1>
      <div className="inputContainer">
        <AuthInput
          label="Account"
          placeholder="Please enter your account"
          accountError={accountError}
          value={account}
          onChange={(nameInputValue) => setAccount(nameInputValue)}
        />
        {accountError && <p className="error">{accountError}</p>}

        <AuthInput
          type="password"
          label="Password"
          placeholder="Please enter your password"
          passwordError={passwordError}
          value={password}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
        {passwordError && <p className="error">{passwordError}</p>}
      </div>
      <button className="btn" onClick={handleClick}>
        Login
      </button>
      <div className="switchSec">
        <Link to="/login">
          <span className="adminSwitch">User Login</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginAdmin;
