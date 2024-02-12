import Signup_form from "@/components/Signup/Signup"
import BaseLayout from "@/components/BaseLayout/BaseLayout"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

export default function Signup(){
    const router = useRouter()
    const {data: session} = useSession()
    if(session){
        router.push("/dashboard")
    }
    return(
        <BaseLayout title={"SignUp"}>
            <Signup_form />
        </BaseLayout>
    )
}