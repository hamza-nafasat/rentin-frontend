const Button = ({ text, width, height, type = 'button', cn, ...rest }) => {
  return (
    <button
      type={type}
      {...rest}
      className={`${cn} bg-primary grid cursor-pointer place-items-center rounded-xl px-4 text-base font-medium text-white lg:text-xl ${
        width ? width : 'w-full'
      } ${height ? height : 'h-[56px]'}`}
    >
      {text}
    </button>
  );
};

export default Button;
