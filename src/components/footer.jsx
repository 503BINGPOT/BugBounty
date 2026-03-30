import { Bug } from "lucide-react"

export default function Footer() {
    return(
        <footer className="bg-[#0d1117] text-gray-300 py-10 bottom-0">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

                <div >
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Bug className="h-8 w-8 text-green-500"/> Bug Bounty
                    </h2>
                    <p className="mt-3 text-sm texxt-gray-400">
                    Professional bounty platform for open source development and
                    technical problem solving.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-white mb-3">Platform</h3>
                    <ul className="space-y-2 ">
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colours duration-200">Browse Issues</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colours duration-200">Post Bounty</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colours duration-200">Developer Ranking</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-3 text-white">Resources</h3>
                    <ul className="space-y-2">
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">API Documentation</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Contribution Guidelines</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Developer Blog</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-white mb-3">Support</h3>
                    <ul className="space-y-2">
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Help Center</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Services</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
            © 2025 BugBounty. All rights reserved.
            </div>
        </footer>
    )
}