import { InputProps } from "@/types/ui";
import scss from "./Input.module.scss";

export default function Input({
  label,
  error,
  className = "",
  children,
}: InputProps) {
  return (
    <div className={scss.input}>
      {label && <label className={scss.label}>{label}</label>}

      <div className={`${scss.field} ${error ? scss.errorField : ""}`}>
        {children}
      </div>

      {error && <p className={scss.errorText}>{error}</p>}
    </div>
  );
}