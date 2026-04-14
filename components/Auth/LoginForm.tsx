"use client";

import { useForm } from "react-hook-form";
import Input from "@/components/Input/Input";
import { loginSchema } from "@/validation/authSchemas";
import { LoginFormData } from "@/types/auth";
import { ValidationErrorItem } from "joi";
import { loginUser } from "@/services/authApi";
import { useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginFormData>();

  const setToken = useAuthStore((s) => s.setToken);
  const router = useRouter();

  const [errors, setErrors] = useState<
    Partial<Record<keyof LoginFormData, string>>
  >({});
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data: LoginFormData) => {
    setErrors({});
    setServerError("");

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

      setToken(res.token);

      router.push("/create-shop"); 
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError("Invalid credentials");
      }
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

      {serverError && <p>{serverError}</p>}

      <p>
        Don’t have an account? <Link href="/register">Register</Link>
      </p>
    </form>
  );
}