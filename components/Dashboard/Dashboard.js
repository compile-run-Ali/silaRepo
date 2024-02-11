import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import Product_view from './product_view'
import Topbar from './Topbar'
import Add_product_modal from "./Add_product_modal"

export default function Dashboard(){
    const [products, setProducts] = useState([])
    const [active, setActive] = useState(0) //if active = 1, modal add mode, if active = 2, model edit mode
    const [updateProduct, setUpdateProduct] = useState()

    async function get_products(){
        try{
            const res = await axios.get("/api/get_products")
            console.log(res)
            let db_products = res.data
            //setting the hidden attribute because db doesnt have it
            db_products = db_products.map((product) => {return {...product, ["hidden"]: false}})
            //setting the category attribute because db has main_cat as key
            db_products = db_products.map((product) => {return {...product, ["category"]: product.main_cat}})
            console.log("product res: ", db_products)
            setProducts(db_products)
        }
        catch(error){
            console.log(error)
        }
    }

    async function handleDelete(product){
        console.log("------------------------")
        console.log("in handle delete"+` ${product.id}`)
        try{
            const res = await axios.post("/api/delete_product", {product: product})
            const id = product.id
            const new_products = products.filter((product) => {return product.id !== id})
            console.log("product filter after: ", new_products)
            setProducts(new_products)
        }
        catch(error){
            console.log("error in deleting product: ")
            console.log(error)
        }
    }

    //returns a new array of products, only changing the visibility of the clicked product, that array is use to setProducts
    function toggle_visibility(product, id){
        if(product.id === id){
            product.hidden = !product.hidden
            console.log(`product in toggle_visibility[${product.hidden}]: `, product)
        }
        return product
    }

    function handleHide(id){
        const new_products = products.map((product) => toggle_visibility(product, id))
        setProducts(new_products)
    }

    function toggle_modal(product, activeValue){
        if (activeValue === 2){
            setUpdateProduct(product)
        }
        setActive(activeValue)
    }

    // async function get_reviews(){
    //     try{
    //         const res = await axios.get("/api/get_reviews")
    //         console.log("reviews res: ", res.data)
    //         setProducts(res.data)
    //     }
    //     catch(error){
    //         console.log(error)
    //     }
    // }

    useEffect(() => {
        get_products()
    }, [])

    return(
        <div className='w-full px-10'>
            <Topbar toggle_modal={toggle_modal}/>
            
            {active > 0 && 
            <Add_product_modal 
            toggle_modal={toggle_modal} 
            active={active} 
            updateProduct={updateProduct}
            products={products}
            setProducts={setProducts}
            />}

            {products.length > 0  && 
            products.map((product, index) => {
                return <Product_view 
                        product={product} 
                        toggle_modal={toggle_modal}
                        handleDelete={handleDelete}
                        handleHide={handleHide}/>
            })}
        </div>
    )
}