import { api } from "./api";

export const getAllProducts = async (params?: {
  page?: number
  category?: string
  search?: string
}) => {
  const res = await api.get("/products", { params })
  return res.data
}
export const getShopProducts = (shopId: string, page = 1) =>
  api.get(`/products/${shopId}?page=${page}`);

export const createProduct = (shopId: string, formData: FormData) =>
  api.post(`/shop/${shopId}/products`, formData);

export const deleteProduct = (productId: string) =>
  api.delete(`/products/${productId}`);