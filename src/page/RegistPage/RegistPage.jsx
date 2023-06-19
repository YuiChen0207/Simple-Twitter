import AuthInput from "../../component/authInput/AuthInput";
import siteLogo from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/AuthContext";
import "../RegistPage/RegistPage.scss";

const RegistPage = () => {
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { register, isAuthenticated } = useAuth();

  const handleClick = async () => {
    setErrors({});

    const newErrors = {};

    if (account.length === 0) {
      newErrors.account = "帳號不得為空";
    }

    if (name.length === 0) {
      newErrors.name = "名稱不得為空";
    }

    if (email.length === 0) {
      newErrors.email = "Email 不得為空";
    }

    if (password.length === 0) {
      newErrors.password = "密碼不得為空";
    }

    if (checkPassword.length === 0) {
      newErrors.checkPassword = "密碼確認不得為空";
    }

    if (Object.keys(newErrors).length > 0) {
      // 如果有錯誤訊息，設定到 errors 物件中
      setErrors(newErrors);
      return;
    }

    try {
      const success = await register({
        name,
        account,
        password,
        checkPassword,
        email,
      });

      if (success) {
        Swal.fire({
          position: "top",
          title: "註冊成功!",
          timer: 1000,
          icon: "success",
          showConfirmButton: false,
        });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        setErrors((prevErrors) => ({ ...prevErrors, common: errorMessage }));
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.status
      ) {
        const errorMessage = error.response.data.status;
        setErrors((prevErrors) => ({ ...prevErrors, common: errorMessage }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          common: "註冊失敗",
        }));
      }
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className="signupContainer">
      <div>
        <img className="logo" src={siteLogo} alt="logo" />
      </div>
      <h1 className="title">建立你的帳號</h1>
      <div className="inputContainer">
        <AuthInput
          label="帳號"
          placeholder="請輸入帳號"
          value={account}
          onChange={(accountInputValue) => setAccount(accountInputValue)}
        />
        {errors.account && <p className="error">{errors.account}</p>}

        <AuthInput
          label="名稱"
          placeholder="請輸入使用者名稱"
          value={name}
          onChange={(nameInputValue) => setName(nameInputValue)}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <AuthInput
          label="Email"
          placeholder="請輸入Email"
          value={email}
          onChange={(emailInputValue) => setEmail(emailInputValue)}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <AuthInput
          type="password"
          label="密碼"
          placeholder="請設定密碼"
          value={password}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <AuthInput
          type="password"
          label="密碼確認"
          value={checkPassword}
          onChange={(checkedPasswordInputValue) =>
            setCheckPassword(checkedPasswordInputValue)
          }
        />
        {errors.checkPassword && (
          <p className="error">{errors.checkPassword}</p>
        )}
        {errors.common && <p className="error">{errors.common}</p>}
      </div>
      <button className="btn" onClick={handleClick}>
        註冊
      </button>
      <div className="switchSec">
        <Link to="/login">
          <span className="cancelSwitch">取消</span>
        </Link>
      </div>
    </div>
  );
};

export default RegistPage;
