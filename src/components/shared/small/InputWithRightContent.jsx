import { memo } from 'react';
import PropTypes from 'prop-types';

const InputWithRightContent = ({
  label,
  type = 'text',
  shadow = false,
  value,
  onChange,
  width,
  mainClassName,
  readOnly = false,
  rightContent,
  ...rest
}) => {
  return (
    <div className="relative">
      {label && <label className="text-sm text-[#666666] lg:text-base">{label}</label>}
      <div className="relative mt-2">
        <input
          {...rest}
          type={type}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          className={`h-[56px] w-full rounded-xl border-[0.5px] border-[#66666659] px-4 pr-12 text-sm text-[#666666] outline-none lg:text-base ${
            shadow ? 'shadow-input' : ''
          }`}
        />
        <div className="absolute inset-y-0 right-0 flex items-center space-x-2">
          <div
            className={`relative ${width ? width : 'w-full'} rounded-tr-xl rounded-br-xl border-[0.5px] border-[#66666659] bg-[#E9F2FF] ${
              shadow ? 'shadow-input' : ''
            } ${mainClassName ? mainClassName : ''} flex h-[54px] items-center justify-center px-4`}
          >
            {rightContent}
          </div>
        </div>
      </div>
    </div>
  );
};

InputWithRightContent.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  shadow: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  width: PropTypes.string,
  mainClassName: PropTypes.string,
  readOnly: PropTypes.bool,
  rightContent: PropTypes.node, // Icon or text
};

export default memo(InputWithRightContent);
