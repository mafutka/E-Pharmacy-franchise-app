"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/authStore"
import { getMyShop } from "@/services/shopApi"

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
  }, [token, isInitialized, router])

  if (!isInitialized || loading) {
    return <>Loading...</>
  }

  return <>{children}</>
}