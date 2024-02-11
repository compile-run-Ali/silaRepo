import Signup_form from "@/components/Signup/Signup"
import BaseLayout from "@/components/BaseLayout/BaseLayout"

export default function Signup(){
    return(
        <BaseLayout title={"SignUp"}>
            <Signup_form />
        </BaseLayout>
    )
}