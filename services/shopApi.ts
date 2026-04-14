import { api } from "./api";

export const createShop = async (formData: FormData) => {
  const res = await api.post("/shop/create", formData)
  return res.data;
};

