// SingleRadioButton.jsx
function RadioButton({ label, value, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center space-x-1">
      <input
        type="radio"
        name="customRadio"
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="form-radio text-blue-600 focus:ring-blue-500"
      />
      <span className="text-gray-800">{label}</span>
    </label>
  );
}

export default RadioButton;
