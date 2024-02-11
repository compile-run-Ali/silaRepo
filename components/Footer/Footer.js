export default function Footer(){
    return(
        <footer className="text-sm flex flex-row justify-between items-center min-h-10 h-10 pl-3.5 pr-5">
            <p className="text-xs w-1/3">Copyright - AI Tech App - 2024 All rights Unreserved</p>
            <div className="space-x-2.5 w-1/3 flex flex-row justify-end items-center">
                <a href="/">Home</a>
                <a href="/dashboard">Dashboard</a>
                <a href="">About</a>
            </div>
        </footer>
    )
}