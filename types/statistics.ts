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

export const stats: StatCard[] = [
  { id: "products", label: "All products", value: "8,430", icon: "products" },
  { id: "suppliers", label: "All suppliers", value: "211", icon: "suppliers" },
  { id: "customers", label: "All customers", value: "140", icon: "customers" },
]

export const customers: Customer[] = [
  { id: 1, name: "Alex Shatov", email: "alexshatov@gmail.com", spent: "2,890.66" },
  { id: 2, name: "Philip Harbach", email: "philip.h@gmail.com", spent: "2,767.04" },
  { id: 3, name: "Mirko Fisuk", email: "mirkofisuk@gmail.com", spent: "2,996.00" },
  { id: 4, name: "Olga Semklo", email: "olga.s@cool.design", spent: "1,220.66" },
  { id: 5, name: "Burak Long", email: "longburak@gmail.com", spent: "1,890.66" },
]

export const transactions: Transaction[] = [
  { id: 1, type: "Expense", description: "Qonto billing", amount: "-49.88" },
  { id: 2, type: "Income", description: "Cruip.com Market Ltd 70 Wilson St London", amount: "+249.88" },
  { id: 3, type: "Income", description: "Notion Labs Inc", amount: "+99.99" },
  { id: 4, type: "Income", description: "Market Cap Ltd", amount: "+1,200.88" },
  { id: 5, type: "Error", description: "App.com Market Ltd 70 Wilson St London", amount: "+99.99" },
  { id: 6, type: "Expense", description: "App.com Market Ltd 70 Wilson St London", amount: "-49.88" },
]