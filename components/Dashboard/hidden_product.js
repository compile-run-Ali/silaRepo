export default function Hidden_product({hidden, handleHide, id}){
    return(
        <div className={`${!hidden && "hidden"} flex flex-row justify-between items-center bg-gray-300 w-full h-8 min-h-8 border border-gray-400 px-3`}>
            <p className="font-figtree text-xs font-semibold">Product is hidden</p>
            <button type="button" onClick={() => {handleHide(id)}} className="hover:text-white hover:bg-gray-900 hover:border-none text-xs font-semibold px-2 py-1 border border-gray-400 font-figtree">Unhide</button>
        </div>
    )
}