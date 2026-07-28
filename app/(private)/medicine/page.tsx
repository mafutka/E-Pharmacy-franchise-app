"use client"

import { useEffect, useState } from "react"
import { getAllProducts } from "@/services/productApi"
import { Product } from "@/types/shop"

export default function MedicinePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    getAllProducts({ page }).then((data) => {
      setProducts(data.products)
    })
  }, [page])

  return (
    <div>
      <h1>All medicine</h1>

      {products.map((p) => (
        <div key={p._id}>
          <h3>{p.name}</h3>
          <p>{p.price}$</p>
        </div>
      ))}
    </div>
  )
}