import { useEffect, useRef, useState } from "react";
import { RiExpandUpDownFill } from "react-icons/ri";

export default function Dropdown({ label, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  const handleSelect = (key, value) => {
    onChange(key, value);
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
    <div className="relative inline-block text-left" key={label}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-white px-4 py-2 rounded-md flex justify-between items-center w-48 capitalize focus:shadow-dropdown shadow-blue-500"
        ref={buttonRef}
      >
        {value || label === "sort_by" ? "sort by" : label}{" "}
        {/* show selected value or fallback label */}
        <span className="ml-2">
          <RiExpandUpDownFill />
        </span>
      </button>

      <div
        className={`
          absolute left-0 mt-2 w-48 bg-gray-900 rounded-xl shadow-lg overflow-hidden
          transition-all duration-300 ease-in-out origin-top
          ${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(label, option.value)}
            className={`w-full text-left px-4 py-2 hover:bg-gray-800 capitalize ${
              value === option ? "text-blue-400" : "text-gray-300"
            }`}
          >
            {option.name}
          </button>
        ))}
      </div>
    </div>
  );
}
