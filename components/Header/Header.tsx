"use client"

import { useState } from "react"
import Logo from "../Logo/Logo"
import scss from "./Header.module.scss"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header({ isAuth }: { isAuth: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

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
                  pathname === "/shop" ? scss.active : ""
                }`}
                href="/shop"
              >
                <span>Shop</span>
              </Link>
              <Link
                className={`${scss.navBtn} ${
                  pathname === "/shop" ? scss.active : ""
                }`}
                href="/medicine"
              >
                <span>Medicines</span>
              </Link>
              <Link
                className={`${scss.navBtn} ${
                  pathname === "/shop" ? scss.active : ""
                }`}
                href="/statistics"
              >
                <span>Statistics</span>
              </Link>
            </div>
            <button>Logout</button>
          </nav>
          {isOpen && (
            <div className={scss.overlay} onClick={() => setIsOpen(false)} />
          )}
        </>
      )}
    </header>
  )
}
