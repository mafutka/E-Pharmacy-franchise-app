import CreateShopForm from "@/components/CreateShop/CreateShopForm"
import Footer from "@/components/Footer/Footer"
import scss from "./page.module.scss"

export default function CreateShopPage() {
  return (
    <>
      <main className={scss.content}>
        <CreateShopForm />
      </main>
      <Footer />
    </>
  )
}
