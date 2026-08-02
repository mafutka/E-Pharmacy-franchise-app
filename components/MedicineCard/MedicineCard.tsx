import { Product } from "@/types/shop"

type Props = {
  product: Product
  onDetails?: () => void
}

export default function MedicineCard({ product, onDetails }: Props) {
  return (
    <div>
      <h4>{product.name}</h4>
      <p>{product.price}$</p>
    

      {onDetails && (
        <button onClick={onDetails}>Details</button>
      )}
    </div>
  )
}