import './AuthInput.scss';

const AuthInput = ({
  type,
  label,
  value,
  placeholder,
  onChange,
  accountError,
  passwordError,
}) => {
  return (
    <div
      className={`authContainer ${
        accountError || passwordError ? "error" : ""
      }`}
    >
      <div className="label">{label}</div>
      <input
        className="input"
        type={type || "text"}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange?.(event.target.value)}
      />
    </div>
  );
};

export default AuthInput;
