const IconButton = ({ text, width, height, type = 'button', cn = '', leftIcon, rightIcon, ...rest }) => {
  // If a left icon exists, remove the default horizontal padding.
  const paddingClass = leftIcon ? '' : 'px-4';

  return (
    <button
      type={type}
      {...rest}
      className={`${cn} bg-primary grid cursor-pointer place-items-center rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-[#01367f] lg:text-xl`}
    >
      <div className="flex items-center justify-center">
        {leftIcon && <span className="mr-">{leftIcon}</span>}
        {text}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </div>
    </button>
  );
};

export default IconButton;

// export default IconIconButton
