import axios from "axios"
import { useState, useEffect } from "react"

export default function Add_product_modal({toggle_modal, active, updateProduct, products, setProducts}){
    console.log("active in modal: ", active)
    const [product, setProduct] = useState({title: "", brand: "", category: "", price: "", description: "", imageURLHighRes: ""})
    const [error, setError] = useState({title: "", brand: "", category: "", price: "", description: "", image: ""})
    const [original_img_path, setOriginal_img_path] = useState()


    //for populating the form if in edit mode
    useEffect(() => {
        if (updateProduct && active === 2){
            console.log("in useEffect: [updateProduct]", updateProduct)
            setProduct(updateProduct)
            setOriginal_img_path(updateProduct.imageURLHighRes)
        }
    }, [])

    function handleChange(event){
        const {id, value} = event.target
        setProduct((prevProduct) => {return {...prevProduct, [id]: value}})
    }

    function giveError(fileInput){
        //checking if any field empty, if empty set error for that field
        Object.entries(product).map(([key, value]) => {
            if(value === ""){
                setError((prevError) => {return {...prevError, [key]: `- ${key} is empty -`}})
            }
            else{
                setError((prevError) => {return {...prevError, [key]: ""}})
            }
        })
        // checking if file uploaded or not
        if (active === 1 && fileInput.files.length === 0){
            setError((prevError) => {return {...prevError, ["image"]: "- image not uploaded -"}})
        }
        else{
            setError((prevError) => {return {...prevError, ["image"]: ""}})
        }
    }

    async function image_upload(fileInput){
        console.log("in image_upload function")
        const formData = new FormData()
        formData.append('image', fileInput.files[0])
        try{
            const res = await axios.post("/api/upload_image", formData, {
                headers: {"Content-Type": "multipart/form-data"}
            })
            console.log("res.status from upload image: ", res)
            if(res.status === 200){
                return true
            }
        }
        catch(error){
            console.log("error in uploading image: ")
            console.log(error)
        }
    }

    //setting path of the image of product
    function setImgPath(fileInput){
        let path = "/product_images/" + fileInput.files[0].name
        console.log("path: ", path)
        return {...product, ["imageURLHighRes"]: path}
    }

    async function Add_Product(fileInput, product){
        if(product.title !== "" && 
           product.brand !== "" && 
           product.category !== "" && 
           product.price !== "" &&
           product.description !== "" && 
           fileInput.files.length > 0
        ){
            const complete_product = setImgPath(fileInput)
            try{
                const res = await axios.post("/api/add_product", {product:complete_product})
                if (res.status === 200){
                    const success = await image_upload(fileInput)
                    console.log("success: ", success)
                    if(success){
                        //refresh the current page
                        window.location.reload()
                    }
                    // else{
                    //     setError((prevError) => {return {...prevError, ["image"]: "- error in uploading image -"}})
                    // }
                }
            }
            catch(error){
                setError((prevError) => {return {...prevError, ["image"]: "- error in adding product -"}})
                console.log("error in adding product: ")
                console.log(error)
            }
        }
    }

    function update_filter(product, new_product){
        if(product.id === new_product.id){
            return new_product
        }
        else{
            return product
        }
    }

    async function Update_Product(fileInput, product){
        if(product.title !== "" && 
           product.brand !== "" && 
           product.category !== "" && 
           product.price !== "" &&
           product.description !== ""
        ){
            //if new image uploaded, put new path in attribute or else put original image path
            let complete_product
            if(fileInput.files.length > 0){
                complete_product = setImgPath(fileInput)   
            }
            else{
                complete_product = {...product, ["imageURLHighRes"]: original_img_path}
            }
            try{
                const res = await axios.post("/api/update_product", {product:complete_product})
                console.log("out for image_upload")
                if (fileInput.files.length > 0 && res.status === 200){
                    console.log("in for image_upload")
                    const success = await image_upload(fileInput)
                    // if(!success){
                    //     // //refresh the current page
                    //     // window.location.reload()
                    //     setError((prevError) => {return {...prevError, ["image"]: "- error in uploading image -"}})
                        
                    // }
                }
                // else{
                //     setError((prevError) => {return {...prevError, ["image"]: "- error in updating product -"}})
                // }
                const new_product = res.data
                const updated_all_products = products.map((product) => update_filter(product, new_product))
                setProducts(updated_all_products)
                toggle_modal(null, 0)
                // else if(res.status === 200){
                //     window.location.reload()
                // }
            }
            catch(error){
                setError((prevError) => {return {...prevError, ["image"]: "- error in updating product -"}})
                console.log("error in updating product: ")
                console.log(error)
            }
        }
    }

    async function handleSubmit(event){
        event.preventDefault()
        const fileInput = document.getElementById("image")
        giveError(fileInput)
        
        if(active === 1){
            Add_Product(fileInput, product)
        }
        else{
            Update_Product(fileInput, product)
        }
    }

    return(
        <div className="w-full h-full backdrop-blur bg-black/50 fixed inset-0 flex justify-center items-center">
            <div className="border border-gray-300 w-2/5 bg-white h-fit p-7">
                <h1 className="font-extrabold font-figtree text-3xl text-center mb-5">
                    {active === 2 ? "Update Product" : "Add Product"}
                </h1>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="flex flex-col mb-3">
                        <label htmlFor="title" className="font-figtree font-semibold mb-1">Title</label>
                        <input value={product.title} onChange={handleChange} type="text" id="title" className="focus:outline-none focus:drop-shadow text-sm px-2 py-1 border border-gray-400 font-figtree"/>
                        {error.title !== "" && <p className="text-xs text-orange-700 mt-0.5 font-figtree">{error.title}</p>}
                    </div>
                    <div className="flex flex-row w-full space-x-1.5">
                        <div className="flex flex-col mb-3 w-1/3">
                            <label htmlFor="brand" className="w-full font-figtree font-semibold mb-1">Brand</label>
                            <input value={product.brand} onChange={handleChange} type="text" id="brand" className="w-full focus:outline-none focus:drop-shadow text-sm px-2 py-1 border border-gray-400 font-figtree"/>
                            {error.brand !== "" && <p className="text-xs text-orange-700 mt-0.5 font-figtree">{error.brand}</p>}
                        </div>
                        <div className="flex flex-col mb-3 w-1/3">
                            <label htmlFor="category" className="w-full font-figtree font-semibold mb-1">Category</label>
                            <input value={product.category} onChange={handleChange} type="text" id="category" className="w-full focus:outline-none focus:drop-shadow text-sm px-2 py-1 border border-gray-400 font-figtree"/>
                            {error.category !== "" && <p className="text-xs text-orange-700 mt-0.5 font-figtree">{error.category}</p>}
                        </div>
                        <div className="flex flex-col mb-3 w-1/3">
                            <label htmlFor="price" className="w-full font-figtree font-semibold mb-1">Price</label>
                            <input value={product.price} onChange={handleChange} type="text" id="price" className="w-full focus:outline-none focus:drop-shadow text-sm px-2 py-1 border border-gray-400 font-figtree"/>
                            {error.price !== "" && <p className="text-xs text-orange-700 mt-0.5 font-figtree">{error.price}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="description" className="font-figtree font-semibold mb-1">Description</label>
                        <textarea value={product.description} onChange={handleChange} id="description" rows="2" className="font-figtree resize-none focus:outline-none focus:drop-shadow text-sm px-2 py-1 border border-gray-400"></textarea>
                        {error.description !== "" && <p className="text-xs text-orange-700 mt-0.5 font-figtree">{error.description}</p>}
                    </div>
                    <div className="flex flex-col mb-7">
                        <label htmlFor="image" className="font-figtree font-semibold mb-1">Image</label>
                        <label htmlFor="image" className="font-figtree file_btn text-sm active:outline-none active:drop-shadow border border-gray-400 px-2 py-1 cursor-pointer text-center">Choose File</label>
                        <input type="file" id="image" name="image" accept=".jpg, .png" className="text-sm focus:outline-none focus:drop-shadow hidden" />
                        {error.image !== "" && <p className="text-xs text-orange-700 mt-0.5 font-figtree">{error.image}</p>}                       
                    </div>
                    <div className="w-full flex space-x-2 mb-1">
                        <button type="submit" className={`hover:border-none hover:text-white hover:bg-black w-1/2 text-sm font-semibold px-2 py-1.5 border border-gray-400 font-figtree`}>
                            {active === 2 ? "Update Product" : "Add Product"}
                        </button>
                        <button type="button" onClick={() => {toggle_modal(null, 0)}} className={`hover:border-none hover:text-white hover:bg-black w-1/2 text-sm font-semibold px-2 py-1.5 border border-gray-400 font-figtree`}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}