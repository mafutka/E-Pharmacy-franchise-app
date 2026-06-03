import Image from "next/image";
import clsx from "clsx";
import scss from "./Logo.module.scss"

export default function Logo({variant = "default"}) {
    return (
        <div className={clsx(scss.logoWrapper, scss[variant])}>
            <Image className={scss.logoImg} src="/Logo-img.png" alt="Logo-img" width={40} height={40}/>
            <h3 className={scss.logoText}>E-Pharmacy</h3>
        </div>
    )
}