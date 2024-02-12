import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import bcryptjs from "bcryptjs"

export default async function handler(req, res){
    const configuration = {
        providers: [
            CredentialsProvider({
                name: "credentials",
                credentials:{},
                async authorize(credentials, req){
                    console.log("req.body in auth: ", req.body)

                    //check if email registered or not
                    try{
                        const user = await prisma.users.findUnique({where: {email: req.body.email}})
                        if (user === null){
                            console.log("email not in db")
                            throw new Error('No user found')
                        }
                        console.log("email in db")
                        console.log("user: ", user)

                        let matchPassword
                        try{
                            matchPassword = await bcryptjs.compare(req.body.password, user.password)
                        }
                        catch(error){
                            console.log("error in pass compare: ", error)
                        }
                        console.log("matchPassword: ", matchPassword)
                        if(matchPassword){
                            return user
                        }
                        else{
                            console.log("invalid password")
                            throw new Error('invalid password')
                        }
                    }
                    catch(error){

                    }
                }
            })
        ],
        secret: process.env.NEXTAUTH_SECRET
    }
    return NextAuth(req, res, configuration)
}