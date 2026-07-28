"use client"

import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getMyShop, updateShop } from "@/services/shopApi"
import { FormState } from "@/types/ui"
import { AxiosError } from "axios"
import Input from "../Input/Input"
import SubmitBtn from "../SubmitBtn/SubmitBtn"
import scss from "./CreateShop.module.scss"

export default function EditShopForm() {
  const { register, handleSubmit, reset } = useForm<FormState>()
  const router = useRouter()

  const [shopId, setShopId] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const data = await getMyShop()

        setShopId(data._id)

    
        reset({
          name: data.name,
          owner: data.owner,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          zip: data.zip,
          hasDelivery: data.hasDelivery ? "true" : "false", 
        })
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchShop()
  }, [reset])

  const onSubmit = async (data: FormState) => {
    if (!shopId) return

    try {
      const formData = new FormData()

      Object.entries(data).forEach(([key, value]) => {
        if (key === "logo") return
        formData.append(key, value as string)
      })

      if (data.logo?.[0]) {
        formData.append("logo", data.logo[0])
      }

      await updateShop(shopId, formData)

      router.push("/shop")
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "Failed to update shop")
      } else {
        setError("Unexpected error")
      }
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className={scss.container}>
      <div className={scss.top}>
        <h3>Edit your Shop</h3>
        <p>
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>

      <form className={scss.createForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={scss.middle}>
          <label htmlFor="name">Shop Name</label>
          <Input>
            <input id="name" {...register("name")} />
          </Input>

          <label htmlFor="owner">Shop Owner Name</label>
          <Input>
            <input id="owner" {...register("owner")} />
          </Input>

          <label htmlFor="email">Email address</label>
          <Input>
            <input id="email" {...register("email")} />
          </Input>

          <label htmlFor="phone">Phone Number</label>
          <Input>
            <input id="phone" {...register("phone")} />
          </Input>

          <label htmlFor="address">Street address</label>
          <Input>
            <input id="address" {...register("address")} />
          </Input>

          <label htmlFor="city">City</label>
          <Input>
            <input id="city" {...register("city")} />
          </Input>

          <label htmlFor="zip">Zip / Postal</label>
          <Input>
            <input id="zip" {...register("zip")} />
          </Input>
        </div>

        <div className={scss.bottom}>
          <div className={scss.radioGroup}>
            <h4>Has own Delivery System?</h4>

            <div className={scss.radioButtons}>
              <label className={scss.radioLabel}>
                <input
                  type="radio"
                  value="true"
                  {...register("hasDelivery")}
                />
                <span className={scss.customRadio}></span>
                <span className={scss.text}>Yes</span>
              </label>

              <label className={scss.radioLabel}>
                <input
                  type="radio"
                  value="false"
                  {...register("hasDelivery")}
                />
                <span className={scss.customRadio}></span>
                <span className={scss.text}>No</span>
              </label>
            </div>
          </div>

          {error && <p>{error}</p>}

          <SubmitBtn className={scss.createBtn} type="submit">
            Save Changes
          </SubmitBtn>
        </div>
      </form>
    </div>
  )
}