import Logo from "../Logo/Logo"
import scss from "./Footer.module.scss"

export default function Footer() {
  return (
    <footer className={scss.footer}>
      <div className={scss.container}>
        <Logo variant="footer" />
<p>Get the medicine to help you feel better, get back to your active life, and enjoy every moment.</p>
        {/* тут потім navigation */}
      </div>
    </footer>
  )
}