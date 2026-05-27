"use client"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { createShop } from "../../services/shopApi"
import { useRouter } from "next/navigation"
import Input from "../Input/Input"
import SubmitBtn from "../SubmitBtn/SubmitBtn"

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input>
        <input placeholder="Shop Name" {...register("name")} />
      </Input>

      <Input>
        <input placeholder="Owner Name" {...register("owner")} />
      </Input>

      <Input>
        <input placeholder="Email" {...register("email")} />
      </Input>

      <Input>
        <input placeholder="Phone" {...register("phone")} />
      </Input>

      <Input>
        <input placeholder="Address" {...register("address")} />
      </Input>

      <Input>
        <input placeholder="City" {...register("city")} />
      </Input>

      <Input>
        <input placeholder="Zip" {...register("zip")} />
      </Input>

      <Input>
        <input type="password" {...register("password")} />
      </Input>

      <div>
        <label>
          <input type="radio" value="yes" {...register("hasDelivery")} />
          Yes
        </label>

        <label>
          <input type="radio" value="no" {...register("hasDelivery")} />
          No
        </label>
      </div>

      <input type="file" {...register("logo")} />

      {error && <p>{error}</p>}
      <SubmitBtn>
        <button type="submit">Create Account</button>
      </SubmitBtn>
    </form>
  )
}
