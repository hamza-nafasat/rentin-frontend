// const Button = ({ text, width, height, type = 'button', cn, ...rest }) => {
//   return (
//     <button
//       type={type}
//       {...rest}
//       className={`${cn} bg-primary grid cursor-pointer place-items-center rounded-lg px-3 py-2 text-base font-medium text-white lg:text-xl ${
//         width ? width : 'w-full'
//       } ${height ? height : 'h-[56px]'}`}
//     >
//       {text}
//     </button>
//   );
// };

// export default Button;

const Button = ({ text, type = 'button', cn = '', ...rest }) => {
  return (
    <button
      type={type}
      {...rest}
      className={`bg-primary cursor-pointer place-items-center rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-[#01367f] ${cn}`}
    >
      {text}
    </button>
  );
};

export default Button;
