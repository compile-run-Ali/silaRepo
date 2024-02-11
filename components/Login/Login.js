import Link from "next/link"
import { useState } from "react"

import { Figtree } from "next/font/google"
const figtree = Figtree({subsets: ['latin']})

export default function Login_form(){
    const [loginData, setLoginData] = useState({email: "", password: ""})
    
    function handleChange(event){
        const {id, value} = event.target
        setLoginData(prevLoginData => {return {...prevLoginData, [id]: value}})
    }

    return(
        <div className="h-full w-full flex flex-col items-center justify-center">
            <h3 className={`w-1/4 text-center bg-gray-900 text-gray-50 py-1.5 font-bold mb-2 ${figtree.className}`}>Account Login</h3>
            <form action="" className="border border-gray-400 w-1/4 pt-4 py-5 px-4">
                <label htmlFor="email" className={`text-sm font-semibold mb-1 block ${figtree.className}`}>Email or Username</label>
                <input onChange={handleChange} value={loginData.email} type="text" name="email" id="email" className="focus:outline-none focus:shadow border border-gray-400 text-sm px-2.5 pt-1.5 pb-1.5 mb-3 w-full" />
                <label htmlFor="password" className={`text-sm font-semibold mb-1 block ${figtree.className}`}>Password</label>
                <input onChange={handleChange} value={loginData.password} type="password" name="password" id="password" className="focus:outline-none focus:shadow border border-gray-400 text-sm px-2.5 pt-1.5 pb-1.5 mb-5 w-full" />
                <div className="w-full flex flex-row space-x-2">
                    <button type="submit" className={`border border-gray-400 w-1/2 py-1.5 text-sm ${figtree.className} font-semibold hover:bg-gray-900 hover:text-gray-50 hover:border-gray-50`}>Login</button>
                    <Link href="/signup" className={`text-center border border-gray-400 w-1/2 py-1.5 text-sm ${figtree.className} font-semibold hover:bg-gray-900 hover:text-gray-50 hover:border-gray-50`}>SignUp</Link>
                </div>
            </form>
        </div>
    )
}