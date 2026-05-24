import css from "./SubmitBtn.module.scss";

export default function SubmitBtn({
    children,
    type="button",
}:
{
children: React.ReactNode;
type?: "button" | "submit";
}) {
    return (
        <button type={type} className={css.button}>
            {children}
        </button>
    )
}