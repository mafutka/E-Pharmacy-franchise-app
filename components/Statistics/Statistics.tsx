"use client"

import { useEffect, useState } from "react"
import type {
  StatisticsResponse,
  CustomerDetailsResponse,
} from "../../types/statistics"
import { api } from "@/services/api"
import scss from "./Statistics.module.scss"

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000"

const formatMoney = (amount: number) =>
  amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

function StatIcon({ type }: { type: "products" | "suppliers" | "customers" }) {
  if (type === "products") {
    return (
      <svg className={scss.icon}>
        <use href="/sprite.svg#icon-coins" />
      </svg>
    )
  }

  return (
  <svg className={scss.icon}>
        <use href="/sprite.svg#icon-chels" />
      </svg>
  )
}

export default function Statistics() {
  const [data, setData] = useState<StatisticsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerDetailsResponse | null>(null)
  const [detailsLoading, setDetailsLoading] = useState(false)
  const [detailsError, setDetailsError] = useState("")

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true)
        setError("")

        const token = localStorage.getItem("token")

        console.log("API URL:", API_URL)
        console.log("Token exists:", Boolean(token))

        const response = await fetch(`${API_URL}/statistics`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const responseText = await response.text()

        console.log("Statistics status:", response.status)
        console.log("Statistics response:", responseText)

        if (!response.ok) {
          throw new Error(
            `Statistics request failed: ${response.status} ${responseText}`,
          )
        }

        const result: StatisticsResponse = JSON.parse(responseText)
        setData(result)
      } catch (err) {
        console.error("Statistics error:", err)

        setError(
          err instanceof Error ? err.message : "Could not load statistics.",
        )
      } finally {
        setLoading(false)
      }
    }

    void fetchStatistics()
  }, [])

  const handleView = async (customerId: string) => {
    try {
      setDetailsLoading(true)
      setDetailsError("")
      setSelectedCustomer(null)

      const token = localStorage.getItem("token")

      const response = await fetch(
        `${API_URL}/api/statistics/${customerId}/goods`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (!response.ok) {
        throw new Error("Failed to load customer purchases")
      }

      const result: CustomerDetailsResponse = await response.json()
      setSelectedCustomer(result)
    } catch {
      setDetailsError("Could not load customer purchases.")
    } finally {
      setDetailsLoading(false)
    }
  }

  if (loading) {
    return <main className={scss.statistics}>Loading statistics...</main>
  }

  if (error || !data) {
    return (
      <main className={scss.statistics}>
        <h1 className={scss.pageTitle}>Statistics</h1>
        <p role="alert">{error || "No statistics available."}</p>
      </main>
    )
  }

  const stats = [
    {
      id: "products",
      label: "All products",
      value: data.totalProducts,
      icon: "products" as const,
    },
    {
      id: "suppliers",
      label: "All suppliers",
      value: data.totalSuppliers,
      icon: "suppliers" as const,
    },
    {
      id: "customers",
      label: "All customers",
      value: data.totalCustomers,
      icon: "customers" as const,
    },
  ]

  return (
    <main className={scss.statistics}>
      <h1 className={scss.pageTitle}>Statistics</h1>

      <section className={scss.statsGrid} aria-label="General statistics">
        {stats.map((stat) => (
          <article key={stat.id} className={scss.statCard}>
            <div className={scss.statLabel}>
              <span className={scss.statIcon}>
                <StatIcon type={stat.icon} />
              </span>
              <span>{stat.label}</span>
            </div>

            <p className={scss.statValue}>
              {stat.value.toLocaleString("en-US")}
            </p>
          </article>
        ))}
      </section>

      <section className={scss.section}>
        <h2 className={scss.sectionTitle}>Recent Customers</h2>

        <div className={scss.tableWrapper}>
          <table className={scss.customersTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Spent</th>
                <th>Medicine</th>
              </tr>
            </thead>

            <tbody>
              {data.customers.length === 0 ? (
                <tr>
                  <td colSpan={4}>No customers yet</td>
                </tr>
              ) : (
                data.customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{formatMoney(customer.spent)}</td>
                    <td>
                      <button
                        className={scss.viewButton}
                        type="button"
                        onClick={() => void handleView(customer.id)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className={scss.section}>
        <h2 className={scss.sectionTitle}>Income/Expenses</h2>

        <div className={scss.transactions}>
          <p className={scss.transactionDate}>Today</p>

          {data.transactions.map((transaction) => (
            <article key={transaction.id} className={scss.transaction}>
              <span
                className={`${scss.transactionBadge} ${
                  transaction.type === "Expense"
                    ? scss.expenseBadge
                    : transaction.type === "Income"
                      ? scss.incomeBadge
                      : scss.errorBadge
                }`}
              >
                {transaction.type}
              </span>

              <p className={scss.transactionDescription}>
                {transaction.description}
              </p>

              <span
                className={`${scss.transactionAmount} ${
                  transaction.type === "Expense"
                    ? scss.expenseAmount
                    : transaction.type === "Income"
                      ? scss.incomeAmount
                      : scss.errorAmount
                }`}
              >
                {transaction.type === "Expense" ? "-" : "+"}
                {formatMoney(transaction.amount)}
              </span>
            </article>
          ))}

          {data.transactions.length === 0 && <p>No transactions for today</p>}
        </div>
      </section>

      {(detailsLoading || detailsError || selectedCustomer) && (
        <div
          className={scss.modalBackdrop}
          onClick={() => {
            setSelectedCustomer(null)
            setDetailsError("")
          }}
        >
          <section
            className={scss.modal}
            role="dialog"
            aria-modal="true"
            aria-label="Customer purchases"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={scss.modalClose}
              onClick={() => {
                setSelectedCustomer(null)
                setDetailsError("")
              }}
              aria-label="Close"
            >
              ×
            </button>

            {detailsLoading && <p>Loading purchases...</p>}

            {detailsError && <p role="alert">{detailsError}</p>}

            {selectedCustomer && (
              <>
                <h2>{selectedCustomer.customer.name}</h2>
                <p>{selectedCustomer.customer.email}</p>

                <h3>Medicines purchased</h3>

                {selectedCustomer.medicines.length === 0 ? (
                  <p>No purchases found.</p>
                ) : (
                  <div className={scss.tableWrapper}>
                    <table className={scss.customersTable}>
                      <thead>
                        <tr>
                          <th>Medicine</th>
                          <th>Price</th>
                          <th>Qty</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedCustomer.medicines.map((medicine) => (
                          <tr key={medicine.productId}>
                            <td>{medicine.name}</td>
                            <td>{formatMoney(medicine.price)}</td>
                            <td>{medicine.quantity}</td>
                            <td>{formatMoney(medicine.total)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <p>
                  <strong>
                    Total spent: {formatMoney(selectedCustomer.totalSpent)}
                  </strong>
                </p>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  )
}
