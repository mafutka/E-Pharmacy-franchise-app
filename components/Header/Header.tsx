"use client"

import { useState } from "react"
import Logo from "../Logo/Logo"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/authStore"
import Link from "next/link"
import SubmitBtn from "../SubmitBtn/SubmitBtn"
import { usePathname } from "next/navigation"

import scss from "./Header.module.scss"

export default function Header({ isAuth }: { isAuth: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const logout = useAuthStore((s) => s.logout)

  const handleLogout = async () => {
    await logout()
    router.replace("/login")
  }

  return (
    <header className={scss.header}>
      <Logo />

      {isAuth && (
        <>
          <button
            className={scss.burger}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <svg className={scss.burgerIcon} width="32" height="26">
              <use href="/sprite.svg#icon-burger" />
            </svg>
          </button>

          <nav className={`${scss.nav} ${isOpen ? scss.open : ""}`}>
            <button className={scss.closeBtn} onClick={() => setIsOpen(false)}>
              <svg className={scss.icon} width="18" height="18">
                <use href="/sprite.svg#icon-x" />
              </svg>
            </button>
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

            <SubmitBtn className={scss.logoutBtn} onClick={handleLogout}>
              Logout
            </SubmitBtn>
          </nav>
          {isOpen && (
            <div className={scss.overlay} onClick={() => setIsOpen(false)} />
          )}
        </>
      )}
    </header>
  )
}
