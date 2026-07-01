import scss from "./page.module.scss"

export default function MedicinePage() {
  return (
    <div>
      Medicine Page
      <svg className={scss.icon} width="40" height="40">
        <use href="/sprite.svg#icon-coins" />
      </svg>
    </div>
  )
}
