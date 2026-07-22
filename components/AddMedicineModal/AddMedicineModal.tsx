"use client"

import { useState } from "react"
import { createProduct } from "@/services/productApi"
import scss from "./AddMedicine.module.scss"

type Props = {
  onClose: () => void
  shopId: string
  onSuccess?: () => void
}

export default function AddMedicineModal({
  onClose,
  shopId,
  onSuccess,
}: Props) {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [brand, setBrand] = useState("")
  const [stock, setStock] = useState("1")
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("name", name)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("brand", brand)
      formData.append("stock", stock)

      if (file) {
        formData.append("image", file)
      }

      await createProduct(shopId, formData)

      onSuccess?.()
      onClose()
    } catch (err) {
      console.error(err)
      alert("Error creating product")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>✕</button>

        <h2>Add medicine</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <div>
            <input
              className={scss.price}
              placeholder="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <span>₴</span>
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            <option value="painkiller">Painkiller</option>
            <option value="antibiotic">Antibiotic</option>
            <option value="vitamins">Vitamins</option>
          </select>

          <input
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />

          <input
            placeholder="Stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Add"}
          </button>
        </form>
      </div>
    </div>
  )
}
