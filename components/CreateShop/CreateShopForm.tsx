"use client"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { createShop } from "../../services/shopApi"
import { useRouter } from "next/navigation"
import Input from "../Input/Input"
import SubmitBtn from "../SubmitBtn/SubmitBtn"
import scss from "./CreateShop.module.scss"

type FormState = {
  name: string
  owner: string
  email: string
  phone: string
  address: string
  city: string
  zip: string
  password: string
  hasDelivery: string
  logo: FileList
}

export default function CreateShopForm() {
  const { register, handleSubmit } = useForm<FormState>()
  const router = useRouter()
  const [error, setError] = useState("")

  const onSubmit = async (data: FormState) => {
    try {
      const formData = new FormData()

      Object.entries(data).forEach(([key, value]) => {
        if (key === "logo") return
        formData.append(key, value as string)
      })

      if (data.logo?.[0]) {
        formData.append("logo", data.logo[0])
      }

      await createShop(formData)
      router.push("/shop")
    } catch {
      setError("Failed to create shop")
    }
  }

  return (
    <>
      <h3>Create your Shop</h3>
      <p>
        This information will be displayed publicly so be careful what you
        share.
      </p>
      <form className={scss.createForm} onSubmit={handleSubmit(onSubmit)}>
        <Input>
          <label htmlFor="name">Shop Name</label>
          <input id="name" placeholder="Enter text" {...register("name")} />
        </Input>

        <Input>
          <label htmlFor="owner">Shop Owner Name</label>
          <input id="owner" placeholder="Enter text" {...register("owner")} />
        </Input>

        <Input>
          <label htmlFor="email">Email address</label>
          <input id="email" placeholder="Enter text" {...register("email")} />
        </Input>

        <Input>
          <label htmlFor="phone">Phone Number</label>
          <input id="phone" placeholder="Enter text" {...register("phone")} />
        </Input>

        <Input>
          <label htmlFor="address">Street address</label>
          <input
            id="address"
            placeholder="Enter text"
            {...register("address")}
          />
        </Input>

        <Input>
          <label htmlFor="city">City</label>
          <input id="city" placeholder="Enter text" {...register("city")} />
        </Input>

        <Input>
          <label htmlFor="zip">Zip / Postal</label>
          <input id="zip" placeholder="Enter text" {...register("zip")} />
        </Input>

        <div>
          <h4>Has own Delivery System?</h4>

          <label>
            <input type="radio" value="yes" {...register("hasDelivery")} />
            Yes
          </label>

          <label>
            <input type="radio" value="no" {...register("hasDelivery")} />
            No
          </label>
        </div>

        {error && <p>{error}</p>}
        <SubmitBtn type="submit">Create Account</SubmitBtn>
      </form>
    </>
  )
}
