"use client"

import { useState } from "react"
import { Product } from "@/types/shop"
import { addProductToShop } from "@/services/productApi"
import { isAxiosError } from "axios"
import scss from "./AddMedicine.module.scss"

type Props = {
  product: Product
  shopId: string
  onClose: () => void
  onSuccess?: () => void
}

export default function AddToShopModal({
  product,
  shopId,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
  try {
    setLoading(true)

    await addProductToShop(
      shopId,
      product._id
    )

    onSuccess?.()
    onClose()
  } catch (error: unknown) {
    console.error(error)

    if (isAxiosError(error)) {
      alert(
        error.response?.data?.message ||
          "Error adding medicine to shop"
      )
    } else {
      alert("Error adding medicine to shop")
    }
  } finally {
    setLoading(false)
  }
}

  return (
    <div
      className={scss.overlay}
      onClick={onClose}
    >
      <div
        className={scss.modal}
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <button
          className={scss.close}
          onClick={onClose}
          type="button"
        >
          ×
        </button>

        <h2>Add medicine to shop</h2>

        {product.image && (
          <img
            src={`http://localhost:3000${product.image}`}
            alt={product.name}
          />
        )}

        <h3>{product.name}</h3>

        <p>
          Brand: {product.brand}
        </p>

        <p>
          Price: {product.price} ₴
        </p>

        <p>
          Category: {product.category}
        </p>

        <div className={scss.actions}>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading
              ? "Adding..."
              : "Add to shop"}
          </button>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}