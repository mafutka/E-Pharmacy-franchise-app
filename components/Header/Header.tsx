"use client"

import { useState } from "react"
import Logo from "../Logo/Logo"
import scss from "./Header.module.scss"
import Link from "next/link"

export default function Header({ isAuth }: { isAuth: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <header className={scss.header}>
      <Logo />
     
      {isAuth && (
        <>
         <button
            className={scss.burger}
            onClick={() => setIsOpen(prev => !prev)}
          >
            ☰
          </button>
        <nav className={`${scss.nav} ${isOpen ? scss.open : ""}`}>
          <Link href="/shop">Shop</Link>
          <Link href="/medicine">Medicines</Link>
          <Link href="/statistics">Statistics</Link>
          <button>Logout</button>
        </nav>
        </>
      )}
    </header>
  )
}
