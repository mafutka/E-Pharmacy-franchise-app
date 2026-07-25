export interface Shop {
  _id: string
  name: string
  owner: string
  phone: string
  address: string
  logo?: string
}

export type ShopFormData = Omit<Shop, "_id">