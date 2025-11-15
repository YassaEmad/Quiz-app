import { useState, useRef, useEffect } from "react";

function StartScreen({ dispatch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    value: "",
    label: "Select Exam",
  });
  const dropdownRef = useRef(null);

  const options = [
    { value: "db1", label: "exam1" },
    { value: "db2", label: "exam2" },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
    dispatch({ type: "changeApi", payload: option.value });
    setIsOpen(false);
  };

  return (
    <div className="start">
      <h2>Welcome to the quiz 💀</h2>

      <div className="custom-dropdown" ref={dropdownRef}>
        <button
          className="dropdown-button"
          onClick={() => setIsOpen(!isOpen)}
          type="button"
        >
          {selectedOption.label}
          <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>▼</span>
        </button>

        {isOpen && (
          <div className="dropdown-menu">
            {options.map((option) => (
              <button
                key={option.value}
                className={`dropdown-item ${
                  selectedOption.value === option.value ? "selected" : ""
                }`}
                onClick={() => handleSelect(option)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        className="btn"
        onClick={() => dispatch({ type: "start" })}
        type="button"
      >
        lets start
      </button>
    </div>
  );
}

export default StartScreen;
