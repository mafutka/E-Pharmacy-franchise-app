import Logo from "@/components/Logo/Logo"
import scss from "./AuthLayout.module.scss"

export default function AuthLayout() {
    return (
        <div className={scss.container}>
            <Logo/>
        </div>
    )
}
