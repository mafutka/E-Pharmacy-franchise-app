import Image from "next/image";
import scss from "./Logo.module.scss"

export default function Logo() {
    return (
        <div className={scss.logoWrapper}>
            <Image className={scss.logoImg} src="/Logo-img.png" alt="Logo-img" width={40} height={40}/>
            <h3 className={scss.logoText}>E-Pharmacy</h3>
        </div>
    )
}