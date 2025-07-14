const Input = ({ cn, label, type = 'text', shadow = false, value, onChange, ...rest }) => {
  // Handle controlled vs uncontrolled input
  const inputProps = {};

  if (value !== undefined) {
    inputProps.value = value || '';
  }

  if (onChange) {
    inputProps.onChange = onChange;
  }

  return (
    <div>
      <label className="text-sm text-[#666666] lg:text-base">{label}</label>
      <input
        {...rest}
        {...inputProps}
        type={type}
        className={`${cn} mt-2 h-[56px] w-full rounded-xl border-[0.5px] border-[#66666659] px-4 text-sm text-[#666666] outline-none lg:text-base ${
          shadow && 'shadow-input'
        }`}
      />
    </div>
  );
};

export default Input;
