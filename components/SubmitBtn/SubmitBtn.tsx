import scss from "./SubmitBtn.module.scss"
import clsx from "clsx"

export default function SubmitBtn({
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
      className={clsx(scss.button, className)}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
