"use client"

import { useEffect, useState } from "react"
import { getMyShop } from "@/services/shopApi"
import { Shop } from "@/types/shop"

export default function ShopPage() {
  const [shop, setShop] = useState<Shop | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMyShop()
      .then(setShop)
      .catch(() => setShop(null))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading...</p>

  if (!shop) return <p>No shop found</p>

  return (
    <div>
      <h1>{shop.name}</h1>
      <p>Owner: {shop.owner}</p>
      <p>Phone: {shop.phone}</p>
      <p>Address: {shop.address}</p>

      <button>Edit data</button>
      <button>Add medicine</button>
    </div>
  )
}