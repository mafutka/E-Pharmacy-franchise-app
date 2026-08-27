"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { getMyShop } from "@/services/shopApi"

import {
  getShopProducts,
  getAllProducts,
  deleteProduct,
} from "@/services/productApi"

import { Shop, Product } from "@/types/shop"

import MedicineCard from "../MedicineCard/MedicineCard"
import AddMedicineModal from "@/components/MedicineModal/AddMedicineModal"
import EditMedicineModal from "../MedicineModal/EditMedicineModal"
import ConfirmDeleteModal from "../MedicineModal/ConfirmDeleteModal"
import AddToShopModal from "../MedicineModal/AddToShopModal"
import SubmitBtn from "@/components/SubmitBtn/SubmitBtn"

import scss from "./Shop.module.scss"
import SubmitBtnLight from "../SubmitBtn/SubmitBtnLight"

export default function ShopInfo() {
  const router = useRouter()

  const [shop, setShop] = useState<Shop | null>(null)

  const [products, setProducts] = useState<Product[]>([])

  const [loading, setLoading] = useState(true)

  const [productsLoading, setProductsLoading] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)

  const [deleteLoading, setDeleteLoading] = useState(false)

  const [tab, setTab] = useState<"shop" | "all">("shop")

  // Те, що зараз вибрано/введено
  const [category, setCategory] = useState("")

  const [search, setSearch] = useState("")

  // Те, що реально застосовано
  const [appliedCategory, setAppliedCategory] = useState("")

  const [appliedSearch, setAppliedSearch] = useState("")

  const [page, setPage] = useState(1)

  const [totalPages, setTotalPages] = useState(1)

  const [addingProduct, setAddingProduct] = useState<Product | null>(null)

  // =========================
  // GET SHOP
  // =========================

  useEffect(() => {
    getMyShop()
      .then(setShop)
      .catch(() => setShop(null))
      .finally(() => setLoading(false))
  }, [])

  // =========================
  // LOAD PRODUCTS
  // =========================

  const loadProducts = useCallback(async () => {
    if (!shop) return

    try {
      setProductsLoading(true)

      if (tab === "shop") {
        const data = await getShopProducts(shop._id, {
          page,
        })

        setProducts(data.products)
        setTotalPages(data.totalPages)
      } else {
        const data = await getAllProducts({
          page,
          category: appliedCategory || undefined,
          search: appliedSearch || undefined,
        })

        setProducts(data.products)
        setTotalPages(data.totalPages)
      }
    } catch (error) {
      console.error("Error loading products:", error)
    } finally {
      setProductsLoading(false)
    }
  }, [shop, tab, page, appliedCategory, appliedSearch])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  // =========================
  // CHANGE TAB
  // =========================

  const handleTabChange = (newTab: "shop" | "all") => {
    setTab(newTab)
    setPage(1)

    if (newTab === "shop") {
      setCategory("")
      setSearch("")
      setAppliedCategory("")
      setAppliedSearch("")
    }
  }

  // =========================
  // FILTER
  // =========================

  const handleFilter = () => {
    setAppliedCategory(category)
    setAppliedSearch(search)
    setPage(1)
  }

  // =========================
  // DELETE
  // =========================

  const handleDelete = async () => {
    if (!deletingProduct || !shop) {
      return
    }

    try {
      setDeleteLoading(true)

      await deleteProduct(shop._id, deletingProduct._id)

      setDeletingProduct(null)

      await loadProducts()
    } catch (error) {
      console.error(error)
      alert("Error deleting product")
    } finally {
      setDeleteLoading(false)
    }
  }

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return <p>Loading...</p>
  }

  if (!shop) {
    return <p>No shop found</p>
  }

  // =========================
  // RENDER
  // =========================

  return (
    <div className={scss.shop}>
      <h2>{shop.name}</h2>
<div className={scss.shopInfo}>
  <div className={scss.info}>
      <p>
         <span className={scss.graySpan}>Owner: </span>{shop.owner}
      </p>

      <div className={scss.contacts}>
        <div className={scss.contact}>
          <svg className={scss.icon}>
            <use href="/sprite.svg#icon-map-pin" />
          </svg>

          <span className={scss.graySpan}>{shop.address}</span>
        </div>

        <div className={scss.contact}>
          <svg className={scss.icon}>
            <use href="/sprite.svg#icon-phone" />
          </svg>

          <span className={scss.graySpan}>{shop.phone}</span>
        </div>
      </div>
      </div>
<div className={scss.keyButtons}>
      <SubmitBtnLight className={scss.keyBtn} onClick={() => router.push("/edit-shop")}>Edit data</SubmitBtnLight>

      <SubmitBtn className={scss.keyBtn} onClick={() => setIsModalOpen(true)}>Add medicine</SubmitBtn>
</div>

</div>
      {/* ADD */}
<div className={scss.store}>
      {isModalOpen && (
        <AddMedicineModal
          shopId={shop._id}
          onClose={() => setIsModalOpen(false)}
          onSuccess={loadProducts}
        />
      )}

      {/* TABS */}

      <div className={scss.tabs}>
        <button
          type="button"
          onClick={() => handleTabChange("shop")}
          className={tab === "shop" ? scss.activeTab : ""}
        >
          Drug store
        </button>

        <button
          type="button"
          onClick={() => handleTabChange("all")}
          className={tab === "all" ? scss.activeTab : ""}
        >
          All medicine
        </button>
      </div>

      {/* FILTERS ONLY FOR ALL MEDICINE */}

      {tab === "all" && (
        <div className={scss.filters}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Product category</option>

            <option value="painkiller">Painkiller</option>

            <option value="antibiotic">Antibiotic</option>

            <option value="vitamins">Vitamins</option>
          </select>

          <input
            type="text"
            placeholder="Search medicine"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <SubmitBtn className={scss.filterBtn} type="button" onClick={handleFilter}>
            Filter
          </SubmitBtn>
        </div>
      )}

      {/* PRODUCTS */}

      {productsLoading ? (
        <p>Loading products...</p>
      ) : (
        <div>
          {products.length === 0 ? (
            <p>No products found</p>
          ) : (
            products.map((product) => (
              <MedicineCard
                key={product._id}
                product={product}
                tab={tab}
                onDetails={() => router.push(`/medicine/${product._id}`)}
                onEdit={
                  tab === "shop" ? () => setEditingProduct(product) : undefined
                }
                onDelete={
                  tab === "shop" ? () => setDeletingProduct(product) : undefined
                }
                onAddToShop={
                  tab === "all" ? () => setAddingProduct(product) : undefined
                }
              />
            ))
          )}
        </div>
      )}

      {/* PAGINATION */}

      {totalPages > 1 && (
        <div className={scss.pagination}>
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          >
            Previous
          </button>

          <span>
            {page} / {totalPages}
          </span>

          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          >
            Next
          </button>
        </div>
      )}

      {/* EDIT */}

      {editingProduct && (
        <EditMedicineModal
          product={editingProduct}
          shopId={shop._id}
          onClose={() => setEditingProduct(null)}
          onSuccess={async () => {
            setEditingProduct(null)
            await loadProducts()
          }}
        />
      )}

      {/* DELETE */}

      {deletingProduct && (
        <ConfirmDeleteModal
          product={deletingProduct}
          onClose={() => setDeletingProduct(null)}
          onConfirm={handleDelete}
          loading={deleteLoading}
        />
      )}

      {addingProduct && (
  <AddToShopModal
    product={addingProduct}
    shopId={shop._id}
    onClose={() =>
      setAddingProduct(null)
    }
    onSuccess={async () => {
      setAddingProduct(null)

      // якщо зараз All medicine — просто
      // перезавантажуємо список
      await loadProducts()
    }}
  />
)}
</div>
    </div>
  )
}
