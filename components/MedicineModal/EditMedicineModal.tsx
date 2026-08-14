"use client"

import { useEffect, useState } from "react"
import { updateProduct } from "@/services/productApi"
import { Product } from "@/types/shop"
import scss from "./AddMedicine.module.scss"

type Props = {
  product: Product
  shopId: string
  onClose: () => void
  onSuccess?: () => void
}

export default function EditMedicineModal({
  product,
  shopId,
  onClose,
  onSuccess,
}: Props) {
  const [name, setName] = useState(product.name)
  const [price, setPrice] = useState(String(product.price))
  const [description, setDescription] = useState(
    product.description || ""
  )
  const [category, setCategory] = useState(
    product.category || ""
  )
  const [brand, setBrand] = useState(product.brand)
  const [stock, setStock] = useState(
    String(product.stock)
  )

  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setName(product.name)
    setPrice(String(product.price))
    setDescription(product.description || "")
    setCategory(product.category || "")
    setBrand(product.brand)
    setStock(String(product.stock))
    setFile(null)
  }, [product])

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    try {
      setLoading(true)

      const formData = new FormData()

      formData.append("name", name)
      formData.append("price", price)
      formData.append("description", description)
      formData.append("category", category)
      formData.append("brand", brand)
      formData.append("stock", stock)

      if (file) {
        formData.append("image", file)
      }

      await updateProduct(
        shopId,
        product._id,
        formData
      )

      onSuccess?.()
      onClose()
    } catch (error) {
      console.error(error)
      alert("Error updating product")
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
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={scss.close}
          onClick={onClose}
        >
          ×
        </button>

        <h2>Edit medicine</h2>

        {product.image && (
          <img
            src={`http://localhost:3000${product.image}`}
            alt={product.name}
          />
        )}

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Medicine Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />

          <div>
            <input
              className={scss.price}
              placeholder="Price"
              type="number"
              min="0"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
              required
            />

            <span>₴</span>
          </div>

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option value="">
              Select category
            </option>

            <option value="painkiller">
              Painkiller
            </option>

            <option value="antibiotic">
              Antibiotic
            </option>

            <option value="vitamins">
              Vitamins
            </option>
          </select>

          <input
            placeholder="Brand"
            value={brand}
            onChange={(e) =>
              setBrand(e.target.value)
            }
            required
          />

          <input
            placeholder="Stock"
            type="number"
            min="0"
            value={stock}
            onChange={(e) =>
              setStock(e.target.value)
            }
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFile(
                e.target.files?.[0] || null
              )
            }
          />

          <div className={scss.actions}>
            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : "Save medicine"}
            </button>

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}