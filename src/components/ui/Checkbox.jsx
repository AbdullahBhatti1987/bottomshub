"use client";

export default function Checkbox({
  label,
  value,
  checked,
  onChange,
  disabled = false,
}) {
  return (
    <label className="inline-flex items-center space-x-2 text-sm text-gray-800">
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.value, e.target.checked)}
        disabled={disabled}
        className="form-checkbox h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
      />
      <span className={disabled ? "opacity-60 cursor-not-allowed" : ""}>
        {label}
      </span>
    </label>
  );
}
