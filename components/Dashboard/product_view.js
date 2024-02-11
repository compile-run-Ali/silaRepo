import Product_control from "./product_control"
import Hidden_product from "./hidden_product"

export default function Product_view({product, toggle_modal, handleDelete, handleHide}){
    return(
        <div key={product.id} className={`w-full flex flex-row ${product.hidden ? "" : "border border-gray-300"} font-figtree mb-5`}>
            <Hidden_product 
            hidden={product.hidden} 
            handleHide={handleHide}
            id={product.id}/>

            <div className={`${product.hidden && "hidden"} w-full flex flex-row`}>
                <div className="w-1/6">
                    <img src={product.imageURLHighRes} alt="product-img" className="w-full"/>
                </div>
                <div className="w-5/6 flex border-l border-gray-300 flex-col px-3 py-2">
                    <div className="w-full flex flex-row">
                        <h2 className="w-4/6 mb-1 font-semibold text-lg">{product.title}</h2>
                        <div className="w-2/6">
                            <Product_control 
                            product={product}
                            toggle_modal={toggle_modal}
                            handleDelete={handleDelete}
                            handleHide={handleHide}/>
                        </div>
                    </div>
                    <p className="mb-1 ">Brand: {product.brand}</p>
                    <p className="mb-1 ">Category: {product.main_cat}</p>
                    <h3 className="mb-1 text-xl">{product.price}</h3>
                    <p className="mb-0.5">Description: </p>
                    <p className="text-sm">{product.description}</p>
                </div>
            </div>
        </div>
    )
}