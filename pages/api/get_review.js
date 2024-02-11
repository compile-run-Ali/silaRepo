import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
  try{
    const reviews = await prisma.reviews.findMany({
      take: 10
    })
    res.status(200).json(reviews)
  }
  catch(error){
    console.error("error message:", error.message)
    res.status(500).json({ error });
  }
}
