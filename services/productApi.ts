import { api } from "./api";

export const getShopProducts = (shopId: string, page = 1) =>
  api.get(`/products/${shopId}?page=${page}`);

export const createProduct = (shopId: string, formData: FormData) =>
  api.post(`/products/${shopId}`, formData);

export const deleteProduct = (productId: string) =>
  api.delete(`/products/${productId}`);