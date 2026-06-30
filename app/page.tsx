import { redirect } from "next/navigation"
import RegiscterPage from "./(auth)/register/page";
export default function Home() {
  const isAuth = false;

  if (isAuth) {
    redirect("/shop")
  }
  return (
    <div>
      <RegiscterPage/>
    </div>
  )
}
