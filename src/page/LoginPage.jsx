import { AuthInput } from '../cpmponent';

const LoginPage = () => {
  return (
    <div>
      <div>
        <image src="" />
      </div>
      <h1>登入Alphitter</h1>
      <div>
        <AuthInput label="帳號" placeholder="請輸入帳號" value="" />
      </div>

      <div>
        <AuthInput
          type="password"
          label="密碼"
          placeholder="請輸入密碼"
          value=""
        />
      </div>
      <button>登入</button>
      <div>註冊</div>
      <div>後台登入</div>
    </div>
  );
};

export default LoginPage;
