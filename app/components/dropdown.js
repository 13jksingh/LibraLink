'use client'
const Dropdown = ({ options, selectedOption, onOptionChange }) => {
  return (
    <div className="dropdown">
      <select value={selectedOption} onChange={onOptionChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
