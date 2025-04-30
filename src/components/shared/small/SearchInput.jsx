import { IoSearchOutline } from 'react-icons/io5';

const SearchInput = ({ cn, ...rest }) => {
  return (
    <div
      className={`flex h-[40px] w-full items-center gap-2 rounded-sm border border-[#DCDCDC4D] px-4 ${cn}`}
      style={{ boxShadow: '0px 2px 12px 0px #3582E70F' }}
    >
      <IoSearchOutline className="text-xl text-[#969696]" />
      <input
        type="search"
        {...rest}
        className="w-full bg-transparent text-sm text-[#969696e0] outline-none"
      />
    </div>
  );
};

export default SearchInput;
