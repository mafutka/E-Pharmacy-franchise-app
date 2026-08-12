import { Product } from "@/types/shop"

type Props = {
  product: Product
  onDetails?: () => void
}

export default function MedicineCard({ product, onDetails }: Props) {
  return (
    <div>
      {product.image && (
        <img
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}${product.image}`}
          alt={product.name}
          width={100}
        />
      )}
      <h4>{product.name}</h4>
      <p>{product.price}$</p>

      {onDetails && <button onClick={onDetails}>Details</button>}
    </div>
  )
}
