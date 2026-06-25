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
    <div className={scss.container}>
      <div className={scss.top}>
        <h3>Create your Shop</h3>
        <p>
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>
      <form className={scss.createForm} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Shop Name</label>
        <Input>
          <input id="name" placeholder="Enter text" {...register("name")} />
        </Input>

        <label htmlFor="owner">Shop Owner Name</label>
        <Input>
          <input id="owner" placeholder="Enter text" {...register("owner")} />
        </Input>

        <label htmlFor="email">Email address</label>
        <Input>
          <input id="email" placeholder="Enter text" {...register("email")} />
        </Input>

        <label htmlFor="phone">Phone Number</label>
        <Input>
          <input id="phone" placeholder="Enter text" {...register("phone")} />
        </Input>

        <label htmlFor="address">Street address</label>
        <Input>
          <input
            id="address"
            placeholder="Enter text"
            {...register("address")}
          />
        </Input>

        <label htmlFor="city">City</label>
        <Input>
          <input id="city" placeholder="Enter text" {...register("city")} />
        </Input>

        <label htmlFor="zip">Zip / Postal</label>
        <Input>
          <input id="zip" placeholder="Enter text" {...register("zip")} />
        </Input>

        <div className={scss.radioGroup}>
          <h4>Has own Delivery System?</h4>
          <div className={scss.radioButtons}>

          <label className={scss.radioLabel}>
            <input
              className={scss.radio}
              type="radio"
              value="yes"
              {...register("hasDelivery")}
            />
            <span className={scss.customRadio}></span>
            <span className={scss.text}>Yes</span>
            
          </label>
          <label className={scss.radioLabel}>
            <input
              className={scss.radio}
              type="radio"
              value="no"
              {...register("hasDelivery")}
            />
            <span className={scss.customRadio}></span>
           <span className={scss.text}>No</span> 
          </label>
          </div>
        </div>

        {error && <p>{error}</p>}
        <SubmitBtn className={scss.createBtn} type="submit">
          Create Account
        </SubmitBtn>
      </form>
    </div>
  )
}
