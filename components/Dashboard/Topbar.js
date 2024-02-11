export default function Topbar({toggle_modal}){
    return(
        <div className="flex flex-row justify-end mb-4 w-full mt-10">
            <button type="button" onClick={() => {toggle_modal(null, 1)}} className={`hover:text-white hover:bg-gray-900 hover:border-white text-sm font-semibold px-2 py-1.5 border border-gray-500 font-figtree`}>Add Product</button>
        </div>
    )
}