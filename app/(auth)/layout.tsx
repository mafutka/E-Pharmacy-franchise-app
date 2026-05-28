import Link from "next/link";
import Logo from "../../components/Logo/Logo";

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
            <span><img src="/white-round-pill.png" alt="the pill" width={95} height={93}/></span> 
            delivered Say goodbye to all your healthcare worries with us
          </h2>
        </div>
        <div >
        {children}
        </div>
      </div>

      {/* <div>
        <img
          src="/auth-image.png"
          alt="auth"
        />
      </div> */}
    </div>
  );
}