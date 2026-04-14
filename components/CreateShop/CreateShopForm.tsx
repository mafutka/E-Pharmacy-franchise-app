"use client";

import { useState } from "react";
import { createShop } from "../../services/shopApi";
import { useRouter } from "next/navigation";

type FormState = {
  name: string;
  owner: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  password: string;
  hasDelivery: string;
};

export default function CreateShopForm() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    name: "",
    owner: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    password: "",
    hasDelivery: "no",
  });

  const [logo, setLogo] = useState<File | null>(null);
  const [error, setError] = useState("");

  // 🔹 input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setLogo(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (logo) {
        data.append("logo", logo);
      }

      await createShop(data);

      router.push("/shop");

    } catch (err) {
      setError("Failed to create shop");
    }
  };

  return (
    <div className="form">
      <h1>Create your Shop</h1>
      <p>This information will be displayed publicly</p>

      <input name="name" placeholder="Shop Name" onChange={handleChange} />
      <input name="owner" placeholder="Owner Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <input name="address" placeholder="Address" onChange={handleChange} />
      <input name="city" placeholder="City" onChange={handleChange} />
      <input name="zip" placeholder="Zip" onChange={handleChange} />
      <input name="password" type="password" onChange={handleChange} />

      <div>
        <label>
          <input type="radio" name="hasDelivery" value="yes" onChange={handleChange} />
          Yes
        </label>

        <label>
          <input type="radio" name="hasDelivery" value="no" onChange={handleChange} />
          No
        </label>
      </div>

      <input type="file" onChange={handleFile} />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleSubmit}>
        Create Account
      </button>
    </div>
  );
}