import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import scss from "./layout.module.scss"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header isAuth={true} />
      <main className={scss.content}>{children}</main>
      <Footer />
    </>
  )
}
