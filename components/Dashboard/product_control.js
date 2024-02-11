import axios from "axios"

export default function Product_control({product, toggle_modal, handleDelete, handleHide}){
    return(
        <div className="w-full flex flex-row justify-end space-x-1">
            <button type="button" onClick={() => {toggle_modal(product, 2)}} className="hover:text-white hover:bg-gray-900 hover:border-white text-xs font-semibold px-2 py-1.5 border border-gray-400 font-figtree">Update</button>
            <button type="button" onClick={() => {handleDelete(product)}} className="hover:text-white hover:bg-gray-900 hover:border-white text-xs font-semibold px-2 py-1.5 border border-gray-400 font-figtree">Delete</button>
            <button type="button" onClick={() => {handleHide(product.id)}} className="hover:text-white hover:bg-gray-900 hover:border-white text-xs font-semibold px-2 py-1.5 border border-gray-400 font-figtree">Hide</button>
        </div>
    )
}