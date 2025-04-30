'use client';
import { useEffect, useRef, useState, useCallback, memo } from 'react';
import { GoChevronDown } from 'react-icons/go';

const Dropdown = memo(
  ({
    options = [],
    shadow = false,
    defaultText = 'Select',
    onSelect,
    label,
    width,
    mainClassName,
    readOnly = false,
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const dropdownRef = useRef(null);

    const selectHandler = useCallback(
      option => {
        if (readOnly) return;
        setSelected(option);
        setIsOpen(false);
        onSelect?.(option);
      },
      [readOnly, onSelect]
    );

    const toggleDropdown = useCallback(() => {
      if (!readOnly) {
        setIsOpen(prev => !prev);
      }
    }, [readOnly]);

    const handleClickOutside = useCallback(e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }, []);

    const handleKeyDown = useCallback(e => {
      if (e.key === 'Escape') setIsOpen(false);
    }, []);

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [handleClickOutside, handleKeyDown]);

    useEffect(() => {
      if (defaultText === 'Select Name') {
        setSelected(null);
      }
    }, [defaultText]);

    const buttonClasses = [
      shadow && 'shadow-input',
      readOnly ? 'cursor-not-allowed' : 'border-[#E0E0E9]',
      mainClassName,
      'mt-2 flex h-[56px] w-full items-center justify-between rounded-xl border border-[#66666659] px-4 text-sm text-[#666666] lg:text-base',
    ]
      .filter(Boolean)
      .join(' ');

    const chevronClasses = `transition-all duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`;

    return (
      <div className={`relative ${width || 'w-full'}`} ref={dropdownRef}>
        {label && (
          <label className="text-sm font-medium text-[#666666] lg:text-base">{label}</label>
        )}
        <button
          type="button"
          aria-expanded={isOpen}
          aria-label={`Dropdown for ${label || 'options'}`}
          className={buttonClasses}
          onClick={toggleDropdown}
          disabled={readOnly}
        >
          <span className="text-sm text-[#383838E5] capitalize">
            {selected ? selected.label || selected.option : defaultText}
          </span>
          <div className={chevronClasses}>
            <GoChevronDown fontSize={20} color={readOnly ? '#999999' : '#292D3280'} />
          </div>
        </button>
        {isOpen && !readOnly && (
          <ul className="absolute z-10 mt-1 max-h-[200px] w-full cursor-pointer overflow-y-auto rounded-md bg-[#f7f7f7] shadow-md">
            {options.map(option => (
              <li
                className="rounded-md border-b border-[#d3d3d3] px-4 py-4 text-sm hover:bg-[hsl(208,100%,95%)]"
                key={option.value}
                onClick={() => selectHandler(option)}
              >
                {option.label || option.option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export default Dropdown;
