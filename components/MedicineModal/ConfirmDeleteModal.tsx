import { Product } from "@/types/shop"
import scss from "./AddMedicine.module.scss"

type Props = {
  product: Product
  onClose: () => void
  onConfirm: () => void
}

export default function ConfirmDeleteModal({
  product,
  onClose,
  onConfirm,
}: Props) {
  return (
    <div className={scss.overlay} onClick={onClose}>
      <div
        className={scss.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={scss.close}
          onClick={onClose}
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

        <p>{product.category}</p>

        <div className={scss.actions}>
          <button onClick={onConfirm}>
            Confirm
          </button>

          <button onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}