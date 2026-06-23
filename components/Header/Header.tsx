"use client"

import { useState } from "react"
import Logo from "../Logo/Logo"
import scss from "./Header.module.scss"

export default function Header({ isAuth }: { isAuth: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <header>
      <Logo />
     
      {isAuth && (
        <>
         <button
            className={`${scss.burger} ${isOpen ? scss.open : ""}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        <nav className={scss.nav}>
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
