import { Product } from "@/types/shop"
import scss from "./MedicineCard.module.scss"
import SubmitBtn from "../SubmitBtn/SubmitBtn"
import SubmitBtnLight from "../SubmitBtn/SubmitBtnLight"

type Props = {
   product: Product
  tab: "shop" | "all"
  onDetails: () => void
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
      <div className={scss.medicineCard}>
        <div className={scss.imgCard}>
        {product.image && (
        
          <img
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}${product.image}`}
            alt={product.name}
            width={100}
          />
        )}
        </div>
        <div className={scss.productInfo}>
        <div className={scss.product}>
        <h4>{product.name}</h4>
         <strong>{product.price}$</strong>
         </div>
        <p className={scss.category}>{product.category}</p>
       
        {tab === "shop" ? (
  <div className={scss.cardButtons}>
    <SubmitBtn
    className={scss.cardBtn}
      type="button"
      onClick={onEdit}
    >
      Edit
    </SubmitBtn>

    <SubmitBtnLight
    className={scss.cardBtn}
      type="button"
      onClick={onDelete}
    >
      Delete
    </SubmitBtnLight>
  </div>
) : (
  <>
    <button
      type="button"
      onClick={onAddToShop}
    >
      Add to shop
    </button>

    <button
      type="button"
      onClick={onDetails}
    >
      Details
    </button>
  </>
)}
      </div>
      </div>
    </article>
  )
}
