import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
    console.log("req.body in add_product: ", req.body)
    try{
        const product = await prisma.products.create({
        data: {
            title: req.body.product.title,
            brand: req.body.product.brand,
            main_cat: req.body.product.category,
            price: req.body.product.price,
            description: [req.body.product.description],
            imageURLHighRes: [req.body.product.imageURLHighRes],

            v:0, //               Int      @map("__v")
            also_buy: [""], //        String[]
            also_view: [""], //       String[]
            asin: "", //            String
            // brand: "", //           String
            // category:[ ""], //        String[]
            createdAt: new Date(), //       DateTime @db.Date
            date: "", //            String
            // description:[ ""], //     String[]
            feature: [""], //         String[]
            fit: "", //             String
            imageURL: [""], //        String[]
            // imageURLHighRes:[ ""], // String[]
            // main_cat: "", //        String
            // price: "", //           String
            rank: "", //            String
            similar_item: "", //    String
            tech1: "", //           String
            tech2: "", //           String
            // title: "", //           String
            updatedAt: new Date() //       DateTime @db.Date
        }
        })
        console.log("product added: ", product)
        res.status(200).json(product)
    }
    catch(error){
        console.error("error message:", error.message)
        res.status(500).json({ error });
    }
}
