import { StatCard, Customer, Transaction } from "@/types/statistics"
import scss from "./Statistics.module.scss"

 const stats: StatCard[] = [
  { id: "products", label: "All products", value: "8,430", icon: "products" },
  { id: "suppliers", label: "All suppliers", value: "211", icon: "suppliers" },
  { id: "customers", label: "All customers", value: "140", icon: "customers" },
]

 const customers: Customer[] = [
  { id: 1, name: "Alex Shatov", email: "alexshatov@gmail.com", spent: "2,890.66" },
  { id: 2, name: "Philip Harbach", email: "philip.h@gmail.com", spent: "2,767.04" },
  { id: 3, name: "Mirko Fisuk", email: "mirkofisuk@gmail.com", spent: "2,996.00" },
  { id: 4, name: "Olga Semklo", email: "olga.s@cool.design", spent: "1,220.66" },
  { id: 5, name: "Burak Long", email: "longburak@gmail.com", spent: "1,890.66" },
]

 const transactions: Transaction[] = [
  { id: 1, type: "Expense", description: "Qonto billing", amount: "-49.88" },
  { id: 2, type: "Income", description: "Cruip.com Market Ltd 70 Wilson St London", amount: "+249.88" },
  { id: 3, type: "Income", description: "Notion Labs Inc", amount: "+99.99" },
  { id: 4, type: "Income", description: "Market Cap Ltd", amount: "+1,200.88" },
  { id: 5, type: "Error", description: "App.com Market Ltd 70 Wilson St London", amount: "+99.99" },
  { id: 6, type: "Expense", description: "App.com Market Ltd 70 Wilson St London", amount: "-49.88" },
]

function StatIcon({ type }: { type: StatCard["icon"] }) {
  if (type === "products") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <ellipse cx="10" cy="5" rx="7" ry="3" />
        <path d="M3 5v5c0 1.7 3.1 3 7 3" />
        <path d="M17 8v2" />
        <path d="M3 10v5c0 1.7 3.1 3 7 3" />
        <ellipse cx="14" cy="14" rx="7" ry="3" />
        <path d="M7 14v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="10" cy="7" r="4" />
      <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
export default function Statistics() {
     return (
    <main className={scss.statistics}>
      <h1 className={scss.pageTitle}>Statistics</h1>

      <section className={scss.statsGrid} aria-label="General statistics">
        {stats.map((stat, index) => (
          <article
            key={stat.id}
            className={`${scss.statCard} ${
              index === 0 ? scss.statCardActive : ""
            }`}
          >
            <div className={scss.statLabel}>
              <span className={scss.statIcon}>
                <StatIcon type={stat.icon} />
              </span>
              <span>{stat.label}</span>
            </div>

            <p className={scss.statValue}>{stat.value}</p>
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
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.spent}</td>
                  <td>
                    <button
                      className={scss.viewButton}
                      type="button"
                      aria-label={`View medicines for ${customer.name}`}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={scss.section}>
        <h2 className={scss.sectionTitle}>Income/Expenses</h2>

        <div className={scss.transactions}>
          <p className={scss.transactionDate}>Today</p>

          {transactions.map((transaction) => (
            <article
              key={transaction.id}
              className={scss.transaction}
            >
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
                {transaction.type === "Error" && (
                  <span className={scss.strikethrough}>
                    {transaction.amount}
                  </span>
                )}
                {transaction.type !== "Error" && transaction.amount}
              </span>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}