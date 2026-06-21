import Logo from "../Logo/Logo"
import scss from "./Header.module.scss"

export default function Header({ isAuth }: { isAuth: boolean }) {
  return (  
    <header>
      <Logo />

      {isAuth && (
        <nav  className={scss.nav}>
          <a>Shop</a>
          <a>Medicines</a>
          <a>Statistics</a>
          <button>Logout</button>
        </nav>
      )}
    </header>
  )
}