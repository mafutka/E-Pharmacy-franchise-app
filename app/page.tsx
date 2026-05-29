import { redirect } from "next/navigation"
export default function Home() {
  const isAuth = false

  if (!isAuth) {
    redirect("/register")
  }
  return (
    <div>
      <p>HomePage</p>
    </div>
  )
}
