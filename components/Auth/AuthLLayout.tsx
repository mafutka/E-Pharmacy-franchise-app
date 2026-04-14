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
        <div>
          <h2>
            Your medication,
            <span><img src="white round pill.png" alt="the pill" /></span> 
            delivered Say goodbye to all your healthcare worries with us
          </h2>
        </div>

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