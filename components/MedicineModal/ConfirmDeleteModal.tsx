"use client"

import { Product } from "@/types/shop"
import scss from "./AddMedicine.module.scss"

type Props = {
  product: Product
  onClose: () => void
  onConfirm: () => void
  loading?: boolean
}

export default function ConfirmDeleteModal({
  product,
  onClose,
  onConfirm,
  loading = false,
}: Props) {
  return (
    <div
      className={scss.overlay}
      onClick={onClose}
    >
      <div
        className={scss.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={scss.close}
          onClick={onClose}
          disabled={loading}
        >
          ×
        </button>

        <h2>Confirm deletion</h2>

        <p>
          Are you sure you want to delete this item?
        </p>

        {product.image && (
          <img
            src={`http://localhost:3000${product.image}`}
            alt={product.name}
          />
        )}

        <h3>{product.name}</h3>

        {product.category && (
          <p>{product.category}</p>
        )}

        <div className={scss.actions}>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading
              ? "Deleting..."
              : "Confirm"}
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