"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getAllProducts } from "@/services/productApi"
import { Product } from "@/types/shop"
import MedicineCard from "@/components/MedicineCard/MedicineCard"
import scss from "./page.module.scss"

export default function MedicinePage() {

  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1)
  const router = useRouter()

  useEffect(() => {
    getAllProducts({ page }).then((data) => {
      setProducts(data.products)
    })
  }, [page])

  return (
    <div>
      <h1>All medicine</h1>

     {products.map((p) => (
  <MedicineCard
    key={p._id}
    product={p}
    onDetails={() => router.push(`/medicine/${p._id}`)}
  />
))}
    </div>
  )
}
