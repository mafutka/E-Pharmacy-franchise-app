import { api } from "./api";

export const createShop = async (formData: FormData) => {
  const res = await api.post("/shop/create", formData)
  return res.data;
};

export const getMyShop = async () => {
  const res = await api.get("/shop/my");
  return res.data;
};

