import { Figtree } from "next/font/google"
const figtree = Figtree({subsets: ['latin']})

import Link from "next/link"

export default function Header(){
    return(
        <header className={`sticky flex flex-row justify-between items-center min-h-10 h-10 pl-3.5 pr-5 ${figtree.className}`}>
            <div className="text-sm space-x-2.5">
                <Link href="/">Home</Link>
                <Link href="/dashboard">Dashboard</Link>
            </div>
            <h3 className="text-lg font-bold text-center">AI Tech App</h3>
            <div className="text-sm space-x-2.5">
                <Link href="">About</Link>
                <Link href="/login">Login</Link>
                <Link href="/signup">SignUp</Link>
            </div>
        </header>
    )
}