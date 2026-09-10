import Logo from "../Logo/Logo"
import scss from "./Footer.module.scss"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Footer() {
  const pathname = usePathname()
  return (
    <footer className={scss.footer}>
      <div className={scss.container}>
        <div className={scss.topFooter}>
          <Logo variant="footer" />
          <p className={scss.footerText}>
            Get the medicine to help you feel better, get back to your active
            life, and enjoy every moment.
          </p>
        </div>
        <div className={scss.bottomFooter}>
          <div className={scss.menuGroup}>
            <Link
              className={`${scss.navBtn} ${
                pathname.startsWith("/medicine") ? scss.active : ""
              }`}
              href="/medicine"
            >
              <span>Medicines</span>
            </Link>
            <Link
              className={`${scss.navBtn} ${
                pathname.startsWith("/shop") ? scss.active : ""
              }`}
              href="/shop"
            >
              <span>Shop</span>
            </Link>
            <Link
              className={`${scss.navBtn} ${
                pathname.startsWith("/statistics") ? scss.active : ""
              }`}
              href="/statistics"
            >
              <span>Statistics</span>
            </Link>
          </div>
          <div className={scss.media}>
            <p>Icons</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
