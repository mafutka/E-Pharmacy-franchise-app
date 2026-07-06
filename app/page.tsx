import { redirect } from "next/navigation"
export default function Home() {
  const isAuth = false;

  if (isAuth) {
    redirect("/shop");
  } else {
    redirect("/register");
  }

}
