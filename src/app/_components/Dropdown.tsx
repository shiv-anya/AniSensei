import { useEffect, useRef, useState } from "react";
import { RiExpandUpDownFill } from "react-icons/ri";

export default function Dropdown({ label, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  const handleSelect = (key, value) => {
    if (key === "sort by") {
      onChange("sort_by", value);
    } else onChange(key, value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="max-md:text-sm text-white px-4 py-0 md:py-2 rounded-md flex justify-between items-center w-48 capitalize md:focus:shadow-dropdown shadow-blue-500"
        ref={buttonRef}
      >
        {value || label} {/* show selected value or fallback label */}
        <span className="ml-2">
          <RiExpandUpDownFill />
        </span>
      </button>

      <div
        className={`
          absolute left-0 mt-2 w-48 bg-gray-900 rounded-xl shadow-lg overflow-visible
          transition-all duration-300 ease-in-out origin-top z-20 max-md:text-sm
          ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}
        `}
      >
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(label, option.value)}
            className={`w-full text-left px-4 py-2 hover:bg-gray-800 capitalize ${
              value === option.value ? "text-blue-400" : "text-gray-300"
            }`}
          >
            {option.name}
          </button>
        ))}
      </div>
    </div>
  );
}
