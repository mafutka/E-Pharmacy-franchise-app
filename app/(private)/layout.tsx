"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import { useAuthStore } from "@/store/authStore"
import { getMyShop } from "@/services/shopApi"
import scss from "./layout.module.scss"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const token = useAuthStore((s) => s.token)


  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      router.push("/login")
      return
    }

    const checkShop = async () => {
      try {
        const shop = await getMyShop()

        if (!shop) {
          router.push("/create-shop")
        }
      } catch {
        router.push("/create-shop")
      } finally {
        setLoading(false)
      }
    }

    checkShop()
  }, [token, router])

  if (loading) return <p>Loading...</p>

  return (
    <>
      <Header isAuth={!!token} />
      <main className={scss.content}>{children}</main>
      <Footer />
    </>
  )
}