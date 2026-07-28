export interface Shop {
  _id: string
  name: string
    email: string
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

export interface Product {
 _id: string
  name: string
  price: string
}