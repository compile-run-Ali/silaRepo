import { Figtree } from "next/font/google"
const figtree = Figtree({subsets: ['latin']})


export default function Review_product({product}){
    console.log("product in view: ", product)
    return(
        <div className={`w-full flex flex-row border border-gray-300 ${figtree.className} my-5`}>
            <div className="w-1/6">
                <img src={product.imageURLHighRes} alt="product-img" className="w-full"/>
            </div>
            <div className="w-5/6 flex border-l border-gray-300 flex-col px-3 py-2">
                <h2 className="mb-0.5 font-semibold text-lg">{product.title}</h2>
                <p className="mb-0.5 ">Brand: {product.brand}</p>
                <p className="mb-0.5 ">Category: {product.main_cat} | <span className="text-xs">{product.rank}</span></p>
                {/* <p className="mb-0.5 text-xs">{product.rank}</p> */}
                {/* <h3 className="mb-0.5 ">Price: {product.price}</h3> */}
                <h3 className="mb-0.5 text-xl">{product.price}</h3>
                <p className="mb-0.5 ">Description:</p>
                {/* <p className="">{product.description}</p> */}
            </div>
        </div>
    )
}