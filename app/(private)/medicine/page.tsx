"use client"

import { useEffect, useState } from "react"
import { getAllProducts } from "@/services/productApi"
import { Product } from "@/types/shop"
import scss from "./page.module.scss"

export default function MedicinePage() {

  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    getAllProducts({ page }).then((data) => {
      setProducts(data.products)
    })
  }, [page])

  return (
    <div>
      <h1>All medicine</h1>

      {products.map((p: Product) => (
        <div key={p._id}>
          <h3>{p.name}</h3>
          <p>{p.price}$</p>
        </div>
      ))}
    </div>
  )
}
