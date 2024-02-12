import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import bcryptjs from "bcryptjs"

export default async function handler(req, res) {
    console.log("req.body in signup: ", req.body)

    const user = await prisma.users.findUnique({where: {email: req.body.signupData.email}})
    if(user !== null){
        return res.status(400).json(user)
    }
    
    const password = req.body.signupData.password
    const hashedPassword = await bcryptjs.hash(password, 10) //salt = 10
    try{
        const user = await prisma.users.create({
        data: {
            first_name: req.body.signupData.first_name,
            last_name: req.body.signupData.last_name,
            email: req.body.signupData.email,
            password: hashedPassword,
        }
        })
        console.log("user added: ", user)
        res.status(200).json(user)
    }
    catch(error){
        console.error("error message:", error.message)
        res.status(500).json({ error });
    }
}
