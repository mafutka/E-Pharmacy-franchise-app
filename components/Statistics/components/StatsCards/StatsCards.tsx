import type { StatisticsResponse } from "../../../../types/statistics"
import scss from "../../Statistics.module.scss"

type StatsCardsProps = {
  data: Pick<
    StatisticsResponse,
    "totalProducts" | "totalSuppliers" | "totalCustomers"
  >
}

function StatIcon({
  type,
}: {
  type: "products" | "suppliers" | "customers"
}) {
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

export default function StatsCards({ data }: StatsCardsProps) {
  const stats = [
    {
      id: "products",
      label: "All products",
      value: data.totalProducts,
      icon: "products",
    },
    {
      id: "suppliers",
      label: "All suppliers",
      value: data.totalSuppliers,
      icon: "suppliers",
    },
    {
      id: "customers",
      label: "All customers",
      value: data.totalCustomers,
      icon: "customers",
    },
  ] as const

  return (
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
  )
}