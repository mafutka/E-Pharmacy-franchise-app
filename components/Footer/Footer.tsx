import Logo from "../Logo/Logo"
import scss from "./Footer.module.scss"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Footer() {
  const pathname = usePathname()

  return (
    <footer className={scss.footer}>
      <div className={scss.container}>

        <div className={scss.footerTop}>
          <div className={scss.topFooter}>
            <Logo variant="footer" />

            <p className={scss.footerText}>
              Get the medicine to help you feel better, get back to your
              active life, and enjoy every moment.
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
                Medicines
              </Link>

              <Link
                className={`${scss.navBtn} ${
                  pathname.startsWith("/shop") ? scss.active : ""
                }`}
                href="/shop"
              >
                Shop
              </Link>

              <Link
                className={`${scss.navBtn} ${
                  pathname.startsWith("/statistics") ? scss.active : ""
                }`}
                href="/statistics"
              >
                Statistics
              </Link>
            </div>

            <div className={scss.media}>
              <p>Icons</p>
            </div>
          </div>
        </div>

        <hr className={scss.line} />

        <div className={scss.bottom}>
          <p>© E-Pharmacy 2026. All Rights Reserved</p>

          <span className={scss.devider}>|</span>

          <p>Privacy Policy</p>

          <span className={scss.devider}>|</span>

          <p>Terms & Conditions</p>
        </div>

      </div>
    </footer>
  )
}