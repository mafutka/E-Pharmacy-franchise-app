"use client"

import { useForm } from "react-hook-form"
import Input from "@/components/Input/Input"
import { RegisterFormData } from "@/types/auth"
import { registerSchema } from "@/validation/authSchemas"
import { ValidationError, ValidationErrorItem } from "joi"
import { registerUser } from "@/services/authApi"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/authStore"

export default function RegisterForm() {
  const { register, handleSubmit } = useForm<RegisterFormData>()
  const router = useRouter()

  const setToken = useAuthStore((s) => s.setToken)

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState("")

  const onSubmit = async (data: RegisterFormData) => {
    setErrors({})
    setServerError("")

    const { error } = registerSchema.validate(data, {
      abortEarly: false,
    })

    if (error) {
      const formattedErrors: Record<string, string> = {}

      ;(error as ValidationError).details.forEach(
        (err: ValidationErrorItem) => {
          const field = err.path[0] as string
          formattedErrors[field] = err.message
        },
      )

      setErrors(formattedErrors)
      return
    }

    try {
      const res = await registerUser(data)

      if (res.token) {
        setToken(res.token)
        router.push("/create-shop")
      } else {
        router.push("/login")
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message)
      } else {
        setServerError("Registration failed")
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input error={errors.name}>
        <input placeholder="User Name" {...register("name")} />
      </Input>

      <Input error={errors.email}>
        <input placeholder="Email address" {...register("email")} />
      </Input>

      <Input error={errors.phoneNumber}>
        <input placeholder="Phone number" {...register("phoneNumber")} />
      </Input>

      <Input error={errors.password}>
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
      </Input>

      <button type="submit">Register</button>

      {serverError && <p>{serverError}</p>}

      <p>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </form>
  )
}
