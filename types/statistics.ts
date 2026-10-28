export interface StatisticsResponse {
  totalProducts: number;
  totalSuppliers: number;
  totalCustomers: number;
  customers: Customer[];
  transactions: Transaction[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  spent: number;
}

export interface CustomerMedicine {
  productId: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  total: number;
}

export interface CustomerDetailsResponse {
  customer: {
    id: string;
    name: string;
    email: string;
  };
  medicines: CustomerMedicine[];
  totalSpent: number;
}

export interface Transaction {
  id: string;
  type: "Income" | "Expense" | "Error";
  description: string;
  amount: number;
  createdAt: string;
}