import { api } from "./api"
import { Product, ProductsResponse } from "@/types/shop"

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

// ✅ ВАЖЛИВО: БЕЗ shopId
export const getOneProduct = async (
  productId: string
): Promise<Product> => {
  const res = await api.get(`/products/${productId}`)
  return res.data
}

export const getShopProducts = async (shopId: string) => {
  const res = await api.get(`/products/${shopId}`)
  return res.data
}

export const createProduct = (shopId: string, formData: FormData) =>
  api.post(`/shop/${shopId}/products`, formData)

export const deleteProduct = (productId: string) =>
  api.delete(`/products/${productId}`)