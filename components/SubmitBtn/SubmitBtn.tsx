import scss from "./SubmitBtn.module.scss";
import clsx from "clsx"

export default function SubmitBtn({
    children,
    type="button",
    className,
}:
{
children: React.ReactNode;
type?: "button" | "submit";
className?: string;
}) {
    return (
        <button type={type} className={clsx(scss.button, className)}>
            {children}
        </button>
    )
}