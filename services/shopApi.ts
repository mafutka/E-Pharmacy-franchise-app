import { api } from "./api";
import { Shop, ShopFormData } from "@/types/shop"

export const createShop = async (formData: FormData) => {
  const res = await api.post("/shop/create", formData)
  return res.data;
};

export const getMyShop = async () => {
  const res = await api.get("/shop/my");
  return res.data;
};

export const updateShop = async (
  data: ShopFormData
): Promise<Shop> => {
  const res = await api.put<Shop>("/shop", data)
  return res.data
}