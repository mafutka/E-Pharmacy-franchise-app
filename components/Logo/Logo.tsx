import clsx from "clsx";
import scss from "./Logo.module.scss"

export default function Logo({variant = "default"}) {
    return (
        <div className={clsx(scss.logoWrapper, scss[variant])}>
            <img className={scss.logoImg} 
            src={variant === "footer" ? "/Logo-img-white.png" : "/Logo-img.png"} 
            alt="Logo-img"
            width={32} 
            height={32}/>
            <h3 className={scss.logoText}>E-Pharmacy</h3>
        </div>
    )
}