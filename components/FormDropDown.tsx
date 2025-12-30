'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type FormDropdownProps = {
  placeholder: string;
  value: string | null;
  options: ReadonlyArray<string>;
  onSelect: (value: string | null) => void;
  hasError?: boolean;
};

export default function FormDropdown({
  placeholder,
  value,
  options,
  onSelect,
  hasError,
}: FormDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const displayValue = value || placeholder;

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        onClick={toggleDropdown}
        className={`flex w-full items-center justify-between gap-2 border bg-white px-4 py-3 text-base text-black transition-colors hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-black ${
          hasError ? 'border-red-500' : 'border-[#DAD8D6]'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span
          className={`truncate ${value ? 'text-black' : 'text-[#999999]'}`}
          title={displayValue}
        >
          {displayValue}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src="/images/arrow-down.svg"
            alt=""
            width={12}
            height={12}
            aria-hidden
          />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={`${placeholder}-menu`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute left-0 top-full z-50 mt-1 w-full overflow-hidden border border-[#DAD8D6] bg-white shadow-[0px_8px_30px_rgba(0,0,0,0.08)]"
          >
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="no-scrollbar max-h-[200px] overflow-y-auto"
            >
              {options.map((option, index) => {
                const isSelected = value === option;
                const bgClass = isSelected ? 'bg-[#FFD231]' : '';

                return (
                  <li key={option}>
                    <button
                      type="button"
                      onClick={() => handleSelect(option)}
                      className={`w-full px-4 py-3 text-left text-base text-black transition-colors hover:bg-[#FFFBF0] ${bgClass} ${
                        index < options.length - 1
                          ? 'border-b border-gray-200'
                          : ''
                      }`}
                    >
                      {option}
                    </button>
                  </li>
                );
              })}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
