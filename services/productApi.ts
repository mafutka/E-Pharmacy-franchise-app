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

export const getOneProduct = async (
  productId: string
): Promise<Product> => {
  const res = await api.get(`/products/${productId}`)
  return res.data
}

export const getShopProducts = async (
  shopId: string,
  params?: {
    page?: number
    category?: string
    search?: string
  }
): Promise<ProductsResponse> => {
  const res = await api.get(`/shop/${shopId}/products`, {
    params,
  })

  return res.data
}

export const createProduct = (
  shopId: string,
  formData: FormData
) => {
  return api.post(`/shop/${shopId}/products`, formData)
}

export const updateProduct = (
  shopId: string,
  productId: string,
  formData: FormData
) => {
  return api.put(
    `/shop/${shopId}/products/${productId}/edit`,
    formData
  )
}

export const deleteProduct = (
  shopId: string,
  productId: string
) => {
  return api.delete(
    `/shop/${shopId}/products/${productId}/delete`
  )
}