const IconButton = ({
  text,
  width,
  height,
  type = 'button',
  cn = '',
  leftIcon,
  rightIcon,
  ...rest
}) => {
  // If a left icon exists, remove the default horizontal padding.
  const paddingClass = leftIcon ? '' : 'px-4';

  return (
    <button
      type={type}
      {...rest}
      className={`${cn} bg-primary grid cursor-pointer place-items-center rounded-sm text-base font-medium text-white lg:text-xl ${width ? width : 'w-full'} ${height ? height : 'h-[56px]'} ${paddingClass}`}
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
