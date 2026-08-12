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
  const [category, setCategory] = useState("")
  const [search, setSearch] = useState("")
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

  const loadProducts = async () => {
    try {
      if (tab === "shop") {
        const data = await getShopProducts(shop._id, {
          category,
          search,
        })

        setProducts(data.products)
      }

      if (tab === "all") {
        const data = await getAllProducts({
          category,
          search,
        })

        setProducts(data.products)
      }
    } catch (error) {
      console.error(error)
    }
  }

  loadProducts()
}, [tab, shop, category, search])

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
      <div className={scss.filters}>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Product category</option>
          <option value="Painkillers">Painkillers</option>
          <option value="Antibiotics">Antibiotics</option>
          <option value="Vitamins">Vitamins</option>
        </select>

        <input
          type="text"
          placeholder="Search medicine"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="button">Filter</button>
      </div>
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
