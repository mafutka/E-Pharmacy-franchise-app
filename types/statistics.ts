export type StatCard = {
  id: string
  label: string
  value: string
  icon: "products" | "suppliers" | "customers"
}

export type Customer = {
  id: number
  name: string
  email: string
  spent: string
}

export type Transaction = {
  id: number
  type: "Expense" | "Income" | "Error"
  description: string
  amount: string
}

