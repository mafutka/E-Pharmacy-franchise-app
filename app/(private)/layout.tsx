import scss from "./layout.module.scss"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={scss.layout}>
        <main className={scss.content}>{children}</main>
      </body>
    </html>
  )
}
