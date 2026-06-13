import type { Metadata } from "next"
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
        <div className="container">{children}</div>
      </body>
    </html>
  )
}
