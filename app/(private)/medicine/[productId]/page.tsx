"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getOneProduct } from "@/services/productApi"
import { Product } from "@/types/shop"

export default function ProductDetailsPage() {
  const { productId } = useParams()

  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    if (!productId) return

    getOneProduct(productId as string).then(setProduct)
  }, [productId])

  if (!product) return <p>Loading...</p>

  return (
    <div>
      <h1>{product.name}</h1>

      {product.image && (
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${product.image}`}
          alt={product.name}
          width={200}
        />
      )}

      <p>Price: {product.price}$</p>
      <p>Brand: {product.brand}</p>
      <p>Stock: {product.stock}</p>

      {/* поки нема description */}
      <p>Description: No description yet</p>

      {/* поки нема reviews */}
      <p>Reviews: No reviews yet</p>
    </div>
  )
}