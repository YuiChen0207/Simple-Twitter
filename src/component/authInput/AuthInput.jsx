import './AuthInput.scss';

const AuthInput = ({ type, label, value, placeholder, onChange }) => {
  return (
    <div className="authContainer">
      <div className="label">{label}</div>
      <input
        className="input"
        type={type || 'text'}
        value=""
        placeholder={placeholder}
        onChange=""
      />
    </div>
  );
};

export default AuthInput;
