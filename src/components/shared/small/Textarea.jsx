const Textarea = ({ label, shadow = false, ...rest }) => {
  return (
    <>
      <label className="text-sm text-[#666666] lg:text-base">{label}</label>
      <textarea
        {...rest}
        className={`mt-2 min-h-[151px] w-full resize-y rounded-xl border-[0.5px] border-[#66666659] px-4 text-sm text-[#666666] outline-none lg:text-base ${
          shadow && 'shadow-input'
        }`}
      />
    </>
  );
};

export default Textarea;
