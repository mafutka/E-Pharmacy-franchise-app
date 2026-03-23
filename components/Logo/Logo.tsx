import scss from "./Logo.module.scss"
export default function Logo() {
    return (
        <div className={scss.logoWrapper}>
            <img src="Logo-img.png" alt="Logo-img" />
            <h3 className={scss.logoText}>E-Pharmacy</h3>
        </div>
    )
}