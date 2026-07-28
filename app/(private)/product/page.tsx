"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Product } from "@/types/shop"
import { getOneProduct } from "@/services/productApi"

export default function ProductPage() {
  const { shopId, productId } = useParams()

  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    if (!shopId || !productId) return

    getOneProduct(shopId as string, productId as string)
      .then(setProduct)
  }, [shopId, productId])

  if (!product) return <p>Loading...</p>

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.price}$</p>
    </div>
  )
}