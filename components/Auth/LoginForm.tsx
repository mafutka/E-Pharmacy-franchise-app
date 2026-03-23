"use client";

import { useForm } from "react-hook-form";
import Input from "@/components/Input/Input";
import { loginSchema } from "@/validation/authSchemas";
import { LoginFormData } from "@/types/auth";
import { ValidationErrorItem } from "joi";
import { loginUser } from "@/services/authApi";
import { useState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginFormData>();

  const [errors, setErrors] = useState<
    Partial<Record<keyof LoginFormData, string>>
  >({});

  const onSubmit = async (data: LoginFormData) => {
    setErrors({});

    const { error } = loginSchema.validate(data, {
      abortEarly: false,
    });

    if (error) {
      const formattedErrors: Partial<
        Record<keyof LoginFormData, string>
      > = {};

      error.details.forEach((err: ValidationErrorItem) => {
        const field = err.path[0] as keyof LoginFormData;
        formattedErrors[field] = err.message;
      });

      setErrors(formattedErrors);
      return;
    }

    try {
      const res = await loginUser(data);

      console.log(res);

      localStorage.setItem("token", res.token);

      alert("Logged in!");
    } catch (err: unknown) {
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input error={errors.email}>
        <input placeholder="Email address" {...register("email")} />
      </Input>

      <Input error={errors.password}>
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
      </Input>

      <button type="submit">Log in</button>

      <p>
        Don’t have an account? <Link href="/register">Register</Link>
      </p>
    </form>
  );
}