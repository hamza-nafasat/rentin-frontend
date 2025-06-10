// import { useState, useEffect, useRef, useCallback, memo } from 'react';
// import { GoChevronDown } from 'react-icons/go';
// import PropTypes from 'prop-types';

// const InputDropdown = ({
//   label,
//   type = 'text',
//   shadow = false,
//   options = [],
//   defaultText = 'Select',
//   onSelect,
//   onChange,
//   value,
//   width,
//   mainClassName,
//   readOnly = false,
//   dropdownIcon,
//   ...rest
// }) => {
//   const [selected, setSelected] = useState(options[0] || null);
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const selectHandler = useCallback(
//     option => {
//       if (readOnly) return;
//       setSelected(option);
//       setIsOpen(false);
//       if (onSelect) onSelect(option);
//     },
//     [readOnly, onSelect]
//   );

//   const handleInputChange = useCallback(
//     e => {
//       if (onChange) {
//         onChange(e);
//       }
//     },
//     [onChange]
//   );

//   useEffect(() => {
//     if (options.length > 0 && !selected) {
//       setSelected(options[0]);
//       if (onSelect) onSelect(options[0]);
//     }
//   }, [options, selected, onSelect]);

//   useEffect(() => {
//     const handleClickOutside = e => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setIsOpen(false);
//       }
//     };

//     const handleKeyDown = e => {
//       if (e.key === 'Escape') setIsOpen(false);
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     document.addEventListener('keydown', handleKeyDown);

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, []);

//   useEffect(() => {
//     if (defaultText === 'Select Name') {
//       setSelected(null);
//     }
//   }, [defaultText]);

//   return (
//     <div className="relative">
//       {label && <label className="text-sm text-[#666666] lg:text-base">{label}</label>}
//       <div className="relative mt-2">
//         <input
//           {...rest}
//           type={type}
//           value={value}
//           onChange={handleInputChange}
//           className={`h-[56px] w-full rounded-xl border-[0.5px] border-[#66666659] px-4 pr-12 text-sm text-[#666666] outline-none lg:text-base ${
//             shadow ? 'shadow-input' : ''
//           }`}
//         />
//         <div className="absolute inset-y-0 right-0 flex items-center space-x-2">
//           <div
//             className={`relative ${width ? width : 'w-full'} rounded-tr-xl rounded-br-xl border-[0.5px] border-[#66666659] bg-[#E9F2FF]`}
//             ref={dropdownRef}
//           >
//             <button
//               type="button"
//               aria-expanded={isOpen}
//               aria-label={`Dropdown for ${label || 'options'}`}
//               className={`${shadow ? 'shadow-input' : ''} ${readOnly ? 'cursor-not-allowed' : 'border-[#E0E0E9]'} ${
//                 mainClassName ? mainClassName : ''
//               } flex h-[54px] w-full items-center justify-between gap-2 px-2 text-sm text-[#666666] lg:text-base`}
//               onClick={() => !readOnly && setIsOpen(!isOpen)}
//               disabled={readOnly}
//             >
//               {dropdownIcon && <div>{dropdownIcon}</div>}
//               <span className="text-sm text-[#383838E5] capitalize">
//                 {selected ? selected.label || selected.option : defaultText}
//               </span>
//               <div className={`transition-all duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
//                 <GoChevronDown fontSize={20} color={readOnly ? '#999999' : '#292D3280'} />
//               </div>
//             </button>
//             {isOpen && !readOnly && (
//               <ul className="shadow-card absolute z-10 mt-1 w-full cursor-pointer rounded-lg bg-[#f7f7f7]">
//                 {options.map(option => (
//                   <li
//                     className={`rounded-lg border-b border-[#d3d3d3] px-4 py-4 text-sm hover:bg-[hsl(208,100%,95%)] ${
//                       selected?.value === option.value ? 'bg-[hsl(208,100%,95%)]' : ''
//                     }`}
//                     key={option.value}
//                     onClick={() => selectHandler(option)}
//                   >
//                     {option.label || option.option}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// InputDropdown.propTypes = {
//   label: PropTypes.string,
//   type: PropTypes.string,
//   shadow: PropTypes.bool,
//   options: PropTypes.arrayOf(
//     PropTypes.shape({
//       value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//       label: PropTypes.string,
//       option: PropTypes.string,
//     })
//   ),
//   defaultText: PropTypes.string,
//   onSelect: PropTypes.func,
//   onChange: PropTypes.func,
//   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   width: PropTypes.string,
//   mainClassName: PropTypes.string,
//   readOnly: PropTypes.bool,
//   dropdownIcon: PropTypes.node,
// };

// export default memo(InputDropdown);

import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { GoChevronDown } from 'react-icons/go';
import PropTypes from 'prop-types';

const InputDropdown = ({
  label,
  type = 'text',
  shadow = false,
  options = [],
  defaultText = 'Select',
  onSelect,
  onChange,
  width,
  mainClassName,
  readOnly = false,
  dropdownIcon,
  defaultValue = '',
  ...rest
}) => {
  const [inputValue, setInputValue] = useState('');
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle selecting unit
  const selectHandler = useCallback(
    option => {
      if (readOnly) return;
      setSelected(option);
      setIsOpen(false);
      if (onSelect) onSelect(option);
      if (onChange) onChange(`${inputValue} ${option.label || option.option}`);
    },
    [readOnly, onSelect, onChange, inputValue]
  );

  // Handle number input
  const handleInputChange = useCallback(
    e => {
      const val = e.target.value;
      setInputValue(val);
      if (onChange && selected) {
        onChange(`${val} ${selected.label || selected.option}`);
      }
    },
    [onChange, selected]
  );

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = e => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Initialize selected option and default input
  useEffect(() => {
    if (options.length > 0 && !selected) {
      setSelected(options[0]);
    }
  }, [options, selected]);

  useEffect(() => {
    if (defaultValue) {
      const [value, unit] = defaultValue.split(' ');
      setInputValue(value);
      const match = options.find(opt => opt.value === unit);
      if (match) setSelected(match);
    }
  }, [defaultValue, options]);

  return (
    <div className="relative">
      {label && <label className="text-sm text-[#666666] lg:text-base">{label}</label>}
      <div className="relative mt-2">
        <input
          {...rest}
          type={type}
          value={inputValue}
          onChange={handleInputChange}
          className={`h-[56px] w-full rounded-xl border-[0.5px] border-[#66666659] px-4 pr-12 text-sm text-[#666666] outline-none lg:text-base ${
            shadow ? 'shadow-input' : ''
          }`}
        />
        <div className="absolute inset-y-0 right-0 flex items-center space-x-2">
          <div
            className={`relative ${width ? width : 'w-full'} rounded-tr-xl rounded-br-xl border-[0.5px] border-[#66666659] bg-[#E9F2FF]`}
            ref={dropdownRef}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-label={`Dropdown for ${label || 'options'}`}
              className={`${shadow ? 'shadow-input' : ''} ${readOnly ? 'cursor-not-allowed' : 'border-[#E0E0E9]'} ${
                mainClassName ? mainClassName : ''
              } flex h-[54px] w-full items-center justify-between gap-2 px-2 text-sm text-[#666666] lg:text-base`}
              onClick={() => !readOnly && setIsOpen(!isOpen)}
              disabled={readOnly}
            >
              {dropdownIcon && <div>{dropdownIcon}</div>}
              <span className="text-sm text-[#383838E5] capitalize">
                {selected ? selected.label || selected.option : defaultText}
              </span>
              <div className={`transition-all duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                <GoChevronDown fontSize={20} color={readOnly ? '#999999' : '#292D3280'} />
              </div>
            </button>
            {isOpen && !readOnly && (
              <ul className="shadow-card absolute z-10 mt-1 w-full cursor-pointer rounded-lg bg-[#f7f7f7]">
                {options.map(option => (
                  <li
                    className={`rounded-lg border-b border-[#d3d3d3] px-4 py-4 text-sm hover:bg-[hsl(208,100%,95%)] ${
                      selected?.value === option.value ? 'bg-[hsl(208,100%,95%)]' : ''
                    }`}
                    key={option.value}
                    onClick={() => selectHandler(option)}
                  >
                    {option.label || option.option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

InputDropdown.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  shadow: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string,
      option: PropTypes.string,
    })
  ),
  defaultText: PropTypes.string,
  onSelect: PropTypes.func,
  onChange: PropTypes.func, // returns "3 sqft"
  width: PropTypes.string,
  mainClassName: PropTypes.string,
  readOnly: PropTypes.bool,
  dropdownIcon: PropTypes.node,
  defaultValue: PropTypes.string, // e.g. "3 sqft"
};

export default memo(InputDropdown);
