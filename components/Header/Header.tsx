"use client"

import { useState } from "react"
import Logo from "../Logo/Logo"
import scss from "./Header.module.scss"

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
          <a>Shop</a>
          <a>Medicines</a>
          <a>Statistics</a>
          <button>Logout</button>
        </nav>
        </>
      )}
    </header>
  )
}
