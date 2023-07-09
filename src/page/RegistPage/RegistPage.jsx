import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import AuthInput from "../../component/authInput/AuthInput";
import siteLogo from "../../assets/logo.svg";
import Swal from "sweetalert2";
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

    if (!account.length) {
      newErrors.account = "Please enter an account";
    } else if (account.length < 6) {
      newErrors.account = "Account length must be at least 6 characters";
    } else if (!/^[a-zA-Z0-9]+$/.test(account)) {
      newErrors.account = "Account can only contain letters and numbers";
    }

    if (!name.length) {
      newErrors.name = "Please enter a name";
    } else if (name.length > 50) {
      newErrors.name = "Name cannot exceed 50 characters";
    } else if (!/^[a-zA-Z0-9\s]+$/.test(name)) {
      newErrors.name = "Name can only contain letters, numbers, and spaces";
    }

    if (!email.length) {
      newErrors.email = "Please enter an email";
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password.length) {
      newErrors.password = "Please enter a password";
    } else if (password.length < 8) {
      newErrors.password = "Password length must be at least 8 characters";
    } else if (!/(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/.test(password)) {
      newErrors.password =
        "Password must contain letters, numbers, and special characters";
    }

    if (!checkPassword.length) {
      newErrors.checkPassword = "Please enter the password again";
    } else if (checkPassword !== password) {
      newErrors.checkPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
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
          title: "Registration Successful!",
          timer: 1000,
          icon: "success",
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("[Registration]:", error);
      if (error === "Account already registered!") {
        setErrors({ account: "This account is already registered" });
      }
      if (error === "Name too long") {
        setErrors({ name: "Name cannot exceed 50 characters" });
      }
      if (error === "Email already exists!") {
        setErrors({ email: "This email is already registered" });
      }
      if (error === "Password do not match") {
        setErrors({ checkPassword: "Passwords do not match" });
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className="signUpContainer">
      <div>
        <img className="logo" src={siteLogo} alt="logo" />
      </div>
      <h1 className="title">Create Your Account</h1>
      <div className="inputContainer">
        <AuthInput
          label="Account"
          placeholder="Please enter an account"
          name="account"
          value={account}
          error={errors.account}
          onChange={(accountInputValue) => setAccount(accountInputValue)}
        />
        {errors.account && <p className="error">{errors.account}</p>}

        <AuthInput
          label="Name"
          placeholder="Please enter a username"
          name="name"
          value={name}
          error={errors.name}
          onChange={(nameInputValue) => setName(nameInputValue)}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <AuthInput
          label="Email"
          placeholder="Please enter an email"
          name="email"
          value={email}
          error={errors.email}
          onChange={(emailInputValue) => setEmail(emailInputValue)}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <AuthInput
          type="password"
          label="Password"
          placeholder="Please set a password"
          name="password"
          value={password}
          error={errors.password}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <AuthInput
          type="password"
          label="Confirm Password"
          placeholder="Please enter the password again"
          name="checkPassword"
          value={checkPassword}
          error={errors.checkPassword}
          onChange={(checkPasswordInputValue) =>
            setCheckPassword(checkPasswordInputValue)
          }
        />
        {errors.checkPassword && (
          <p className="error">{errors.checkPassword}</p>
        )}
      </div>
      <button className="btn" onClick={handleClick}>
        Register
      </button>
      <div className="switchSec">
        <Link to="/login">
          <span className="cancelSwitch">Cancel</span>
        </Link>
      </div>
    </div>
  );
};

export default RegistPage;
