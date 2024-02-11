import Link from "next/link"
import { useState } from "react"

import { Figtree } from "next/font/google"
const figtree = Figtree({subsets: ['latin']})

export default function Signup_form(){
    const [signupData, setSignupData] = useState({first_name: "", last_name: "", email: "", password: ""})
    
    function handleChange(event){
        const {id, value} = event.target
        setSignupData(prevSignupData => {return {...prevSignupData, [id]: value}})
    }

    return(
        <div className="h-full w-full flex flex-col items-center justify-center">
            <h3 className={`w-1/4 text-center bg-gray-900 text-gray-50 py-1.5 font-bold mb-2 ${figtree.className}`}>Account SignUp</h3>
            <form action="" className="border border-gray-400 w-1/4 pt-4 py-5 px-4">
                <label htmlFor="first_name" className={`text-sm font-semibold mb-1 block ${figtree.className}`}>First Name</label>
                <input onChange={handleChange} value={signupData.first_name} type="text" name="first_name" id="first_name" className="focus:outline-none focus:shadow border border-gray-400 text-sm px-2.5 pt-1.5 pb-1.5 mb-3 w-full" />
                <label htmlFor="last_name" className={`text-sm font-semibold mb-1 block ${figtree.className}`}>Last Name</label>
                <input onChange={handleChange} value={signupData.last_name} type="text" name="last_name" id="last_name" className="focus:outline-none focus:shadow border border-gray-400 text-sm px-2.5 pt-1.5 pb-1.5 mb-3 w-full" />
                <label htmlFor="email" className={`text-sm font-semibold mb-1 block ${figtree.className}`}>Email</label>
                <input onChange={handleChange} value={signupData.email} type="text" name="email" id="email" className="focus:outline-none focus:shadow border border-gray-400 text-sm px-2.5 pt-1.5 pb-1.5 mb-3 w-full" />
                <label htmlFor="password" className={`text-sm font-semibold mb-1 block ${figtree.className}`}>Password</label>
                <input onChange={handleChange} value={signupData.password} type="password" name="password" id="password" className="focus:outline-none focus:shadow border border-gray-400 text-sm px-2.5 pt-1.5 pb-1.5 mb-5 w-full" />
                <div className="w-full flex flex-row space-x-2">
                    <button type="submit" className={`border border-gray-400 w-1/2 py-1.5 text-sm ${figtree.className} font-semibold hover:bg-gray-900 hover:text-gray-50 hover:border-gray-50`}>SignUp</button>
                    <Link href="/" className={`text-center border border-gray-400 w-1/2 py-1.5 text-sm ${figtree.className} font-semibold hover:bg-gray-900 hover:text-gray-50 hover:border-gray-50`}>Cancel</Link>
                </div>
            </form>
        </div>
    )
}