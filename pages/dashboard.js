/* eslint-disable */
import Dashboard from "@/components/Dashboard/Dashboard"
import BaseLayout from "@/components/BaseLayout/BaseLayout"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react" // Import useEffect

export default function Login(){
    const {data: session} = useSession()
    const router = useRouter()

    // Use useEffect to perform side effects after rendering
    useEffect(() => {
        // Redirect if there is no session
        if(!session){
            router.push("/login")
        }
    }, [session, router]) // Add session and router to the dependency array

    // Render the component
    return(
        <BaseLayout title={"Dashboard"}>
            <Dashboard />
        </BaseLayout>
    )
}
