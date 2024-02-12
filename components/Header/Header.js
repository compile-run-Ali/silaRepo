import { Figtree } from "next/font/google";
const figtree = Figtree({ subsets: ["latin"] });
import { useSession } from "next-auth/react";

import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();
  return (
    <header
      className={`sticky flex flex-row shadow-lg justify-between items-center  p-5 ${figtree.className}`}
    >
      <div className="text-sm space-x-2.5">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>
      <h3 className="text-lg font-bold text-center">AI Tech App</h3>
      <div className="text-sm space-x-2.5">
        {!session?.user && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">SignUp</Link>
          </>
        )}
      </div>
    </header>
  );
}
