import type { Metadata } from "next"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import "../styles/main.scss"

export const metadata: Metadata = {
  title: "Medicine store",
  description: "Medicine store",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="layout">
         <Header isAuth={true}/>
        <div className="container">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
