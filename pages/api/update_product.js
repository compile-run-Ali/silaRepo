import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
    console.log("req.body in update_product: ", req.body)
    try{
        const product = await prisma.products.update({
            where:{
                id: req.body.product.id
            },
            data: {
                title: req.body.product.title,
                brand: req.body.product.brand,
                main_cat: req.body.product.category,
                price: req.body.product.price,
                description: {
                    set: req.body.product.description
                },
                imageURLHighRes: {
                    set: req.body.product.imageURLHighRes
                }
            }
        })
        console.log("product updated: ", product)
        res.status(200).json(product)
    }
    catch(error){
        console.error("error message:", error.message)
        res.status(500).json({ error });
    }
}
