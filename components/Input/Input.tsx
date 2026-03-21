import { InputProps } from "@/types/ui"
import scss from "./Input.module.scss"

export default function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  variant = "input",
  options = [],
  error,
  disabled,
  rows = 4,
  className = "",
}: InputProps) {
  return (
    <div className={scss.input}>
      {label && <label htmlFor="">{label}</label>}
      {variant === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={className}
        />
      ) : variant === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={className}
        >
          <option value="">Select...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={className}
        />
      )}
      {error && (
        <p>Error</p>
      )}
    </div>
  )
}
