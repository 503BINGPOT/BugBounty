import { Bug, Plus, Search, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    
    return (
       <header className="sticky top-0 z-50 border border-gray-800 bg-transparent backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-6">
                <Link to='/'
                className="flex items-center gap-2">
                    <Bug className="h-8 w-8 text-green-500"/>
                    <span className="text-xl font-bold text-white ">BugBounty</span>
                    <span className="text-xs bg-gray-700 px-2 py-0.5 rounded-full text-white">Beta</span>
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    
                    <Link to="/browse" className="text-white text-sm font-bold hover:bg-green-600 hover:text-gray-900 p-3 rounded-2xl hover:transition-colors duration-200 ">Browse Bounty</Link>
                    <Link to="/about" className=" text-white text-sm font-bold hover:bg-green-600 hover:text-gray-900 p-3 rounded-2xl hover:transition-colors duration-200">About</Link>
                    </nav>
            </div>
            <div className="flex items-center gap-3">
                <button className="p-2 rounded-md hover:bg-gray-800 hover:transition-colors duration-200 cursor-pointer">
                    <Search className="h-4 w-4 text-white"/>
                </button>
                <Link
                to="/post-bounty"
                className="flex items-center bg-green-600 hover:bg-green-700 hover:transition-colors duration-200 text-gray-950 px-3 py-2 rounded-md text-sm">
                    <Plus className="h-4 2-4 mr-1"/> Post Bounty
                </Link>
                <button 
                onClick={() => navigate("/dashboard")}
                className="p-2 rounded-md hover:bg-gray-800 hover:transition-colors duration-200">
                    <User className="h-4 w-4 text-white" />
                </button>
            </div>
        </div>
       </header>
    )
}