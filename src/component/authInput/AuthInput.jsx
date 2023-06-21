import "./AuthInput.scss";

const AuthInput = ({
  type,
  label,
  name,
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
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default AuthInput;
