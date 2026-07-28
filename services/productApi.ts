import { api } from "./api";
import { Product, ProductsResponse } from "@/types/shop";

export const getAllProducts = async (
  params?: {
    page?: number
    category?: string
    search?: string
  }
): Promise<ProductsResponse> => {
  const res = await api.get("/products", { params })
  return res.data
}

export const getOneProduct = async (
  shopId: string,
  productId: string
): Promise<Product> => {
  const res = await api.get(`/shop/${shopId}/products/${productId}`)
  return res.data
}
export const getShopProducts = (shopId: string, page = 1) =>
  api.get(`/products/${shopId}?page=${page}`);

export const createProduct = (shopId: string, formData: FormData) =>
  api.post(`/shop/${shopId}/products`, formData);

export const deleteProduct = (productId: string) =>
  api.delete(`/products/${productId}`);