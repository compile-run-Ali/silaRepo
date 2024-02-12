import Dashboard from "@/components/Dashboard/Dashboard"
import BaseLayout from "@/components/BaseLayout/BaseLayout"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

export default function Login(){
    const {data: session} = useSession()
    const router = useRouter()

    if(!session){
        router.push("/login")
    }

    
    return(
        <BaseLayout title={"Dashboard"}>
            <Dashboard />
        </BaseLayout>
    )
}