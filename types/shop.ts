export interface Shop {
  _id: string
  name: string
  owner: string
  phone: string
  address: string
  logo?: string
}

export interface ShopFormData {
  name: string
  owner: string
  email: string
  phone: string
  address: string
  city: string
  zip: string
  hasDelivery: boolean
}