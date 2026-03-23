"use client";

import { useForm } from "react-hook-form";
import Input from "@/components/Input/Input";
import { registerSchema } from "@/validation/authSchemas";
import { registerUser } from "../../services/authApi";
import { useState } from "react";
import Link from "next/link";

export default function RegisterForm() {
  const { register, handleSubmit } = useForm();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (data: any) => {
    // 🧠 Joi валідація
    const { error } = registerSchema.validate(data, {
      abortEarly: false,
    });

    if (error) {
      const formattedErrors: Record<string, string> = {};

      error.details.forEach((err) => {
        const field = err.path[0] as string;
        formattedErrors[field] = err.message;
      });

      setErrors(formattedErrors);
      return;
    }

    try {
      const res = await registerUser(data);
      console.log(res);

      alert("Registered successfully!");
    } catch (err: any) {
      alert(err.response?.data?.message || "Error");
    }
  };

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
        <input type="password" placeholder="Password" {...register("password")} />
      </Input>

      <button type="submit">Register</button>

      <p>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </form>
  );
}