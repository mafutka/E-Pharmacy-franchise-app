import Link from "next/link"
import Logo from "../../components/Logo/Logo"
import scss from "./layout.module.scss"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={scss.container}>
      <div>
        <Link href="/">
          <Logo />
        </Link>
        <div>
          <h2 className={scss.heading}>
            Your medication,
            <span>
              <img
                src="/white-round-pill.png"
                alt="the pill"
                width={95}
                height={93}
              />
            </span>
            delivered Say goodbye to all{" "}
            <span className={scss.green}>your healthcare </span> worries with us
          </h2>
        </div>
        <div>{children}</div>
      </div>

      {/* <div>
        <img
          src="/auth-image.png"
          alt="auth"
        />
      </div> */}
    </div>
  )
}
