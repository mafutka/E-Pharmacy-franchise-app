import { InputProps } from "@/types/ui";
import scss from "./Input.module.scss";

export default function Input({
  label,
  error,
  variant = "input",
  options = [],
  className = "",
  children,
}: InputProps) {
  return (
    <div className={scss.input}>
      {label && <label className={scss.label}>{label}</label>}

      <div className={`${scss.field} ${error ? scss.errorField : ""}`}>
        {variant === "select" && options.length ? (
          <select className={className}>
            <option value="">Select...</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          children
        )}
      </div>

      {error && <p className={scss.errorText}>{error}</p>}
    </div>
  );
}