import scss from "./layout.module.scss"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
     return (
    <html lang="en">
      <body className={scss.layout}>
        <div >{children}</div>
      </body>
    </html>
  )
}