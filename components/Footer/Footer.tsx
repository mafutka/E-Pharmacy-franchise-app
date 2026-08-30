import Logo from "../Logo/Logo"
import scss from "./Footer.module.scss"

export default function Footer() {
  return (
    <footer className={scss.footer}>
      <div className={scss.container}>
        <Logo variant="footer" />

        {/* тут потім navigation */}
      </div>
    </footer>
  )
}