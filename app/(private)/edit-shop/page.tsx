"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getMyShop, updateShop } from "@/services/shopApi"
import { shopSchema } from "../../../validation/shopSchema"
import { ShopFormData } from "@/types/shop"

type FormErrors = Partial<Record<keyof ShopFormData, string>>

export default function EditShopPage() {
  const router = useRouter()

  const [shopId, setShopId] = useState<string | null>(null)

  const [form, setForm] = useState<ShopFormData>({
    name: "",
    owner: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    hasDelivery: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const data = await getMyShop()

        setShopId(data._id) 

        setForm({
          name: data.name || "",
          owner: data.owner || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          city: data.city || "",
          zip: data.zip || "",
          hasDelivery: data.hasDelivery || false,
        })
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    fetchShop()
  }, [])

  // INPUT CHANGE
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // RADIO
  const handleRadio = (value: boolean) => {
    setForm((prev) => ({ ...prev, hasDelivery: value }))
  }

  // SUBMIT
  const handleSubmit = async () => {
    const { error } = shopSchema.validate(form, { abortEarly: false })

    if (error) {
      const newErrors: FormErrors = {}

      error.details.forEach((err) => {
        const key = err.path[0] as keyof ShopFormData
        newErrors[key] = err.message
      })

      setErrors(newErrors)
      return
    }

    if (!shopId) return

    try {
      await updateShop(shopId, form) // ✅ тепер є shopId
      router.push("/shop")
    } catch (e) {
      console.error(e)
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h1>Edit data</h1>

      {/* NAME */}
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Shop Name"
      />
      <p>{errors.name}</p>

      {/* OWNER */}
      <input
        name="owner"
        value={form.owner}
        onChange={handleChange}
        placeholder="Owner Name"
      />
      <p>{errors.owner}</p>

      {/* EMAIL */}
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <p>{errors.email}</p>

      {/* PHONE */}
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone"
      />
      <p>{errors.phone}</p>

      {/* ADDRESS */}
      <input
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Street Address"
      />
      <p>{errors.address}</p>

      {/* CITY */}
      <input
        name="city"
        value={form.city}
        onChange={handleChange}
        placeholder="City"
      />
      <p>{errors.city}</p>

      {/* ZIP */}
      <input
        name="zip"
        value={form.zip}
        onChange={handleChange}
        placeholder="Zip"
      />
      <p>{errors.zip}</p>

      {/* DELIVERY */}
      <div>
        <p>Has Own Delivery System?</p>

        <label>
          <input
            type="radio"
            checked={form.hasDelivery === true}
            onChange={() => handleRadio(true)}
          />
          Yes
        </label>

        <label>
          <input
            type="radio"
            checked={form.hasDelivery === false}
            onChange={() => handleRadio(false)}
          />
          No
        </label>
      </div>

      <button onClick={handleSubmit}>Save</button>
    </div>
  )
}