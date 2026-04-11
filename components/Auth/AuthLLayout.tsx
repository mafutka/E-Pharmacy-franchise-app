import Link from "next/link";
import Logo from "../Logo/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      
      <div>
        <Link href="/">
          <Logo />
        </Link>

        {children}
      </div>

      <div>
        <img
          src="/auth-image.png"
          alt="auth"
        />
      </div>
    </div>
  );
}