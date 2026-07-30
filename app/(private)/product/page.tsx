"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getOneProduct } from "@/services/productApi"
import { Product } from "@/types/shop"

export default function ProductPage() {
  const { productId } = useParams()

  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    if (!productId) return

    getOneProduct(productId as string).then((data) => {
      setProduct(data)
    })
  }, [productId])

  if (!product) return <p>Loading...</p>

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.price}$</p>
    </div>
  )
}