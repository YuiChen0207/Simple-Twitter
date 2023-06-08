
import { AuthInput } from '../component';

const RegistPage = () => {
  return (
    <div>
      <div>
        <image src="" />
      </div>
      <h1>建立你的帳號</h1>
      <div>
        <AuthInput label="帳號" placeholder="請輸入帳號" value="" />
      </div>

      <div>
        <AuthInput label="名稱" placeholder="請輸入使用者名稱" value="" />
      </div>

      <div>
        <AuthInput label="Email" placeholder="請輸入Email" value="" />
      </div>

      <div>
        <AuthInput
          type="password"
          label="密碼"
          placeholder="請設定密碼"
          value=""
        />
      </div>

      <div>
        <AuthInput
          type="password"
          label="密碼確認"
          placeholder="請再次輸入密碼"
          value=""
        />
      </div>
      <button>註冊</button>
      <div>取消</div>
    </div>
  );
};

export default RegistPage;
