import Login_form from "@/components/Login/Login"
import BaseLayout from "@/components/BaseLayout/BaseLayout"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

export default function Login(){
    const router = useRouter()
    const {data: session} = useSession()
    if(session){
        router.push("/dashboard")
    }

    return(
        <BaseLayout title={"Login"}>
            <Login_form />
        </BaseLayout>
    )
}