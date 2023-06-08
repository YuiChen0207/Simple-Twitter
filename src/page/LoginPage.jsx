import AuthInput from '../component/authInput/AuthInput';
import siteLogo from '../assets/logo.svg';
import '../styles/LoginPage.scss';

const LoginPage = () => {
  return (
    <div className="loginContainer">
      <div>
        <img className="logo" src={siteLogo} alt="logo" />
      </div>
      <h1 className="title">登入Alphitter</h1>
      <div className="inputContainer">
        <AuthInput label="帳號" placeholder="請輸入帳號" value="" />

        <AuthInput
          type="password"
          label="密碼"
          placeholder="請輸入密碼"
          value=""
        />
      </div>
      <button className="btn">登入</button>
      <div className="switchSec">
        <span className="signupSwitch">註冊</span>
        <span className="dot"></span>
        <span className="adminSwitch">後台登入</span>
      </div>
    </div>
  );
};

export default LoginPage;
