import Logo from "../Logo/Logo"
import scss from "./Footer.module.scss"

export default function Footer() {
    return <footer className={scss.footer}>
        <Logo />
    </footer>
}