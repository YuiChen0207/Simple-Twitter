const AuthInput = ({ type, label, value, placeholder, onChange }) => {
  return (
    <div className="">
      <div className="">{label}</div>
      <input
        className=""
        type={type || 'text'}
        value=""
        placeholder={placeholder}
        onChange=""
      />
    </div>
  );
};

export default AuthInput;
