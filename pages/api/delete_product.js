import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
    console.log("in delete_product: ", req.body)
    try{
        const product = await prisma.products.delete({
        where: {id: req.body.product.id}
        })
        console.log("deleted product: ", product)
        res.status(200).json(product)
    }
    catch(error){
        console.error("error message:", error.message)
        res.status(500).json({ error });
    }
}
