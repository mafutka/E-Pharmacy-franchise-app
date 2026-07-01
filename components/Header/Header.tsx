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
            ☰
          </button>
          <nav className={`${scss.nav} ${isOpen ? scss.open : ""}`}>
            <Link
              className={`${scss.navBtn} ${
                pathname === "/shop" ? scss.active : ""
              }`}
              href="/shop"
            >
              Shop
            </Link>
            <Link className={`${scss.navBtn} ${
                pathname === "/shop" ? scss.active : ""
              }`} href="/medicine">
              Medicines
            </Link>
            <Link className={`${scss.navBtn} ${
                pathname === "/shop" ? scss.active : ""
              }`} href="/statistics">
              Statistics
            </Link>
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
