import { Product } from "@/types/shop"
import scss from "./MedicineCard.module.scss"

type Props = {
  product: Product
  tab: "shop" | "all"
  onDetails?: () => void
  onEdit?: () => void
  onDelete?: () => void
  onAddToShop?: () => void
}

export default function MedicineCard({
  product,
  tab,
  onDetails,
  onEdit,
  onDelete,
  onAddToShop,
}: Props) {
  return (
    <article className={scss.card}>
      <div>
        {product.image && (
          <img
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}${product.image}`}
            alt={product.name}
            width={100}
          />
        )}
        <h4>{product.name}</h4>
        <p>{product.category}</p>
        <strong>{product.price}$</strong>
        {tab === "shop" ? (
          <div className={scss.actions}>
            <button onClick={onEdit}>Edit</button>

            <button onClick={onDelete}>Delete</button>
          </div>
        ) : (
          <div className={scss.actions}>
            <button onClick={onAddToShop}>Add to shop</button>

            <button onClick={onDetails}>Details</button>
          </div>
        )}
      </div>
    </article>
  )
}
