import scss from "./SubmitBtn.module.scss"
import clsx from "clsx"

export default function SubmitBtnLight({
  children,
  type = "button",
  className,
  onClick
}: {
  children: React.ReactNode
  type?: "button" | "submit"
  className?: string
  onClick?: () => void
}) {
  return (
    <button
      type={type}
      className={clsx(scss.buttonLight, className)}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
