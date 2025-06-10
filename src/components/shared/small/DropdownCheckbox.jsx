'use client';
import { useEffect, useRef, useState, useCallback, memo } from 'react';
import { GoChevronDown } from 'react-icons/go';

const DropdownCheckbox = memo(
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
    const [selectedValues, setSelectedValues] = useState([]);
    const [customValue, setCustomValue] = useState('');
    const [showCustomInput, setShowCustomInput] = useState(false);
    const dropdownRef = useRef(null);
    const idRef = useRef(`dropdown-${Math.random().toString(36).slice(2, 9)}`);
    const customInputRef = useRef(null);

    // Helper to normalize and split input into values
    const normalizeAndSplitValues = str => {
      return str
        .split(',')
        .map(s =>
          s
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '_')
            .replace(/[^a-z0-9_]/g, '')
        )
        .filter(Boolean); // remove empty strings
    };

    const toggleValue = useCallback(
      option => {
        if (readOnly) return;

        if (option.value === 'others') {
          if (!showCustomInput) {
            // Showing input
            setShowCustomInput(true);
            setTimeout(() => customInputRef.current?.focus(), 0);
          } else {
            // Hiding input and clearing values
            const customValues = normalizeAndSplitValues(customValue);
            setSelectedValues(prev => {
              const updated = prev.filter(v => !customValues.includes(v));
              onSelect?.(updated);
              return updated;
            });
            setCustomValue('');
            setShowCustomInput(false);
          }
          return;
        }

        setSelectedValues(prev => {
          const exists = prev.includes(option.value);
          const updated = exists ? prev.filter(v => v !== option.value) : [...prev, option.value];
          onSelect?.(updated);
          return updated;
        });
      },
      [readOnly, onSelect, showCustomInput, customValue]
    );

    const handleCustomInputChange = useCallback(
      e => {
        const value = e.target.value;
        setCustomValue(value);

        const customValues = normalizeAndSplitValues(value);

        setSelectedValues(prev => {
          const filtered = prev.filter(v => !normalizeAndSplitValues(customValue).includes(v));
          const updated = [...filtered, ...customValues];
          onSelect?.(updated);
          return updated;
        });
      },
      [customValue, onSelect]
    );

    const handleCustomInputBlur = useCallback(() => {
      if (!customValue.trim()) {
        setShowCustomInput(false);
      }
    }, [customValue]);

    const toggleDropdown = useCallback(() => {
      if (!readOnly) setIsOpen(open => !open);
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

    const displayText = selectedValues.length
      ? options
          .filter(opt => selectedValues.includes(opt.value))
          .map(opt => opt.label ?? opt.option)
          .concat(selectedValues.filter(v => !options.some(opt => opt.value === v)))
          .join(', ')
      : defaultText;

    const buttonClasses = [
      shadow && 'shadow-input',
      readOnly ? 'cursor-not-allowed' : 'border-[#E0E0E9]',
      mainClassName,
      'mt-2 flex h-[56px] w-full items-center justify-between rounded-xl border border-[#66666659] px-4 text-sm text-[#383838E5] lg:text-base',
    ]
      .filter(Boolean)
      .join(' ');
    const chevronClasses = `transition-all duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`;

    return (
      <div className={`relative ${width || 'w-full'}`} ref={dropdownRef}>
        {label && (
          <label htmlFor={idRef.current} className="mb-1 block text-sm font-medium text-[#666666] lg:text-base">
            {label}
          </label>
        )}
        <button
          id={idRef.current}
          type="button"
          aria-expanded={isOpen}
          aria-label={`Dropdown for ${label || 'options'}`}
          className={buttonClasses}
          onClick={toggleDropdown}
          disabled={readOnly}
        >
          <span className="truncate text-[#383838E5] capitalize">{displayText}</span>
          <div className={chevronClasses}>
            <GoChevronDown fontSize={20} color={readOnly ? '#999999' : '#292D3280'} />
          </div>
        </button>

        {isOpen && !readOnly && (
          <ul className="shadow-card absolute z-10 mt-1 max-h-[200px] w-full overflow-y-auto rounded-lg bg-[#f7f7f7]">
            {label && (
              <li className="border-b border-[#d3d3d3] px-4 py-2 text-sm font-medium text-[#666666]">{label}</li>
            )}
            {options.map(option => {
              const labelText = option.label ?? option.option;
              return (
                <li
                  key={option.value}
                  className="flex items-center space-x-2 border-b border-[#d3d3d3] px-4 py-2 hover:bg-[hsl(208,100%,95%)]"
                >
                  <input
                    type="checkbox"
                    id={`checkbox-${option.value}`}
                    checked={selectedValues.includes(option.value)}
                    onChange={() => toggleValue(option)}
                    className="h-4 w-4 cursor-pointer"
                  />
                  <label
                    htmlFor={`checkbox-${option.value}`}
                    className="cursor-pointer text-sm"
                    onClick={() => toggleValue(option)}
                  >
                    {labelText}
                  </label>
                  {option.value === 'others' && showCustomInput && (
                    <input
                      ref={customInputRef}
                      type="text"
                      value={customValue}
                      onChange={handleCustomInputChange}
                      onBlur={handleCustomInputBlur}
                      placeholder="Enter comma-separated values"
                      className="focus:border-primary ml-2 flex-1 rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none"
                      onClick={e => e.stopPropagation()}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
);

DropdownCheckbox.displayName = 'DropdownCheckbox';
export default DropdownCheckbox;
