'use client';
import { useEffect, useRef, useState, useCallback, memo } from 'react';
import { GoChevronDown } from 'react-icons/go';

/**
 * Multi-select Dropdown component with checkboxes
 *
 * Props:
 * - options: array of { label, value }
 * - shadow: boolean to apply input shadow styling
 * - defaultText: placeholder when nothing is selected
 * - onSelect: callback(selectedValues: array) => void
 * - label: optional label text
 * - width: custom width class
 * - mainClassName: additional classes for button
 * - readOnly: disable interaction
 */
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
    const dropdownRef = useRef(null);
    const idRef = useRef(`dropdown-${Math.random().toString(36).slice(2, 9)}`);

    // Toggle an option's selection
    const toggleValue = useCallback(
      option => {
        if (readOnly) return;
        setSelectedValues(prev => {
          const exists = prev.includes(option.value);
          const updated = exists ? prev.filter(v => v !== option.value) : [...prev, option.value];
          onSelect?.(updated);
          return updated;
        });
      },
      [readOnly, onSelect]
    );

    // Toggle dropdown open/close
    const toggleDropdown = useCallback(() => {
      if (!readOnly) setIsOpen(open => !open);
    }, [readOnly]);

    // Close when clicking outside
    const handleClickOutside = useCallback(e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }, []);

    // Close on Escape key
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

    // Compute display text based on selected values
    const displayText = selectedValues.length
      ? options
          .filter(opt => selectedValues.includes(opt.value))
          .map(opt => opt.label ?? opt.option)
          .join(', ')
      : defaultText;

    // CSS classes for button wrapper
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
          <label
            htmlFor={idRef.current}
            className="mb-1 block text-sm font-medium text-[#666666] lg:text-base"
          >
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
          <ul className="absolute z-10 mt-1 max-h-[200px] w-full overflow-y-auto rounded-md bg-[#f7f7f7] shadow-md">
            {/* Dropdown header inside list */}
            {label && (
              <li className="border-b border-[#d3d3d3] px-4 py-2 text-sm font-medium text-[#666666]">
                {label}
              </li>
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

// export default DropdownCheckbox
