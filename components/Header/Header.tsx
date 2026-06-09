import Logo from "../Logo/Logo"
import scss from "./Header.module.scss"

export default function Header() {
    return (
        <header className={scss.header}>
            <Logo></Logo>
        </header>
    )
}