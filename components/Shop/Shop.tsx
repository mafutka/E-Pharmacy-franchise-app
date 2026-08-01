"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getMyShop } from "@/services/shopApi"
import { getShopProducts, getAllProducts } from "@/services/productApi"
import { Shop, Product } from "@/types/shop"
import MedicineCard from "../MedicineCard/MedicineCard"
import AddMedicineModal from "@/components/AddMedicineModal/AddMedicineModal"
import SubmitBtn from "@/components/SubmitBtn/SubmitBtn"
import scss from "./Shop.module.scss"

export default function ShopInfo() {
  const [shop, setShop] = useState<Shop | null>(null)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tab, setTab] = useState<"shop" | "all">("shop")
  const [products, setProducts] = useState<Product[]>([])

  const router = useRouter()

  useEffect(() => {
    getMyShop()
      .then(setShop)
      .catch(() => setShop(null))
      .finally(() => setLoading(false))
  }, [])
  useEffect(() => {
    if (!shop) return

    if (tab === "shop") {
      getShopProducts(shop._id).then((data) => {
        setProducts(data.products)
      })
    }

    if (tab === "all") {
      getAllProducts().then((data) => {
        setProducts(data.products)
      })
    }
  }, [tab, shop])

  if (loading) return <p>Loading...</p>

  if (!shop) return <p>No shop found</p>

  return (
    <div className={scss.info}>
      <h3>{shop.name}</h3>`
      <p>
        Owner: <span>{shop.owner}</span>
      </p>
      <div className={scss.contacts}>
        <div>
          <svg className={scss.icon}>
            <use href="/sprite.svg#icon-map-pin" />
          </svg>
          <span>{shop.address}</span>
        </div>
        <div>
          <svg className={scss.icon}>
            <use href="/sprite.svg#icon-phone" />
          </svg>{" "}
          <span>{shop.phone}</span>
        </div>
      </div>
      <SubmitBtn onClick={() => router.push("/edit-shop")}>Edit data</SubmitBtn>
      <SubmitBtn onClick={() => setIsModalOpen(true)}>Add medicine</SubmitBtn>
      {isModalOpen && (
        <AddMedicineModal
          shopId={shop._id}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            // тут потім  refetch продуктів
            console.log("created")
          }}
        />
      )}
      <button onClick={() => setTab("shop")}>Drug store</button>
      <button onClick={() => setTab("all")}>All medicine</button>
      <div>
        {products.map((p) => (
          <MedicineCard
            key={p._id}
            product={p}
            onDetails={() => router.push(`/medicine/${p._id}`)}
          />
        ))}
      </div>
    </div>
  )
}
