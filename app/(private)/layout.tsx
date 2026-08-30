"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/authStore"
import { getMyShop } from "@/services/shopApi"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"

import scss from "./layout.module.scss"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const { token, isInitialized, initAuth } = useAuthStore()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initAuth()
  }, [initAuth])
  
  useEffect(() => {
    if (!isInitialized) return

    if (!token) {
      router.replace("/login")
      return
    }

    const checkShop = async () => {
      try {
        const shop = await getMyShop()

        if (!shop) {
          router.replace("/create-shop")
        }
      } catch {
        router.push("/create-shop")
      } finally {
        setLoading(false)
      }
    }

    checkShop()
  }, [token, isInitialized, router])

  if (!isInitialized || loading) {
    return <>Loading...</>
  }

  return (
  <div className={scss.privateLayout}>
    <div className={scss.container}> <Header isAuth={true} /></div>
   

    <main className={scss.main}>
       <div className={scss.container}>{children}</div>
      
    </main>

    <Footer />
  </div>
)
}