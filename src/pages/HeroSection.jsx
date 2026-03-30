import { ArrowRight, Code, DollarSign, User, Search, Filter, ListFilter } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export const HeroSection = () => {
    // const[ search, setSearch] = useState("");
    const navigate = useNavigate();

    const stats = [
        {label: "Active Bounties", Value: "247" },
        {label: "Total Rewards", value: "5000" },
        {label: "Contributors", value: "1,234" },
        {label: "Success Rate", value: "89%" }
    ];

    const bounties = [
        {
            id: 123,
            repo :"awesome-project/frontend",
            title: "Add TypeScript support to existing React components",
            desc: "Conver 15 React Components from JavaScript to Typescript with proper type definitions and interface declarations.",
            reward: "500 Rupees",
            difficulty: "medium",
            tags : ["TypeScript", "React", "Frontend"],
            author: "johndoe",
            date: "2 days ago",
        },
        {
            id: 456, 
            repo : "data-corp/processor",
            title: "Fix memory leak in data processing pipeline",
            desc: "Identify and resolve memory leak causing perdformance degradation in high-volume data processing. Includes profiling and optimization.",
            reward: "1000 Rupees",
            difficulty: "high", 
            tags: ["python", "Performance", "Memory"],
            author: "jane_smith",
            date: "1 day ago",
        },
    ];

    return (
        <>
        <section className="relative py-20 px-4 overflow-hidden bg-[#1a1c21] text-white min-h-screen -mt-17">
            <div className="absolute inset-0 "/>
            <div className="absolute inset-0 " />

            <div className="container mx-auto text-center relative z-10">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                            Turn Open Source
                            <span className="text-green-600 block">Issues into Income</span>
                        </h1>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Bridge the gap between contributors and maintainers. Post bounties on issues,
                        solve problems, and earn rewards while building amazing open-source software.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                         onClick={() => navigate("/browse")}
                        className="bg-green-600 text-black px-6 py-3 rounded-lg text-lg flex items-center justify-center hover:transition-all duration-200 cursor-pointer">
                            Browse bounties
                            <span className="ml-2"><ArrowRight/></span>
                        </button>
                        <button 
                        onClick={() => navigate("post-bounty")}
                        className="border border-gray-800 text-white px-6 py-3 rounded-lg text-lg bg- hover:bg-green-600 hover:text-black hover:border-transparent hover:transition-colors duration-200 cursor-pointer">
                            Post your Bounty
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
                        <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-[#0d1117] backdrop-blur border border-white/20">
                        <div className="p-3 rounded-full bg-green-500/10 border border-green-800 z-0">
                            <DollarSign className="text-green-600 z=1"/>
                        </div>
                        <h3 className="font-seminold text-white">Earn Real Money</h3>
                        <p className="text-sm text-gray-300 text-center">
                        Get paid for contributing to open-source projects 
                        </p>
                        </div>

                        <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-[#0d1117] backdrop-blur border border-white/20">
                        <div className="p-3 rounded-full bg-green-500/10 border border-green-800">
                            <Code className="text-green-600"/>
                        </div>
                        <h3 className="font-seminold text-white">Quality Solutions</h3>
                        <p className="text-sm text-gray-300 text-center">
                        ncentivize high-quality contributions to your project's critical issues
                        </p>
                        </div>

                        <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-[#0d1117] backdrop-blur border border-white/20">
                        <div className="p-3 rounded-full bg-green-500/10 border border-green-800">
                            <User className="text-green-600"/>
                        </div>
                        <h3 className="font-seminold text-white">Build Community</h3>
                        <p className="text-sm text-gray-300 text-center">
                        Connect talented developers with meaningful open-source work
                        </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>   

        <section className="bg-[#1a1c21] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto ">
<h2 className="text-3xl font-bold mb-2">Active Bounties</h2>
<p className="text-gray-400 mb-8">
    Discover open-source issues with attached bounties. Solve problems and earn rewards.
</p>

<div className="flex flex-col md:flex-row gap-4 mb-8">
    <div className="relative flex-1">
        <Search className="absolute left-3 top-3 text-gray-500" size={18} />
        <input 
        type="text"
        placeholder="Search bounties..."
        className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0d1117] border border-neutral-800 text-sm"/>
    </div>
    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0d1117] border border-neutral-800 text-sm">
        <Filter size={16}/> All Levels
    </button>
    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0d1117] border border-neutral-800 text-sm">
        <ListFilter size={16}/> Newest
    </button>
</div>

<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
    {stats.map((s) => (
        <div
        key={s.label}
        className="bg-[#0d1117] rounded-xl p-6 text-center border border-neutral-800">
            <p className="text-green-400 text-2xl font-bold">{s.label}</p>
            <p className="text-gray-400 text-sm">{s.kabel}</p>
        </div>
    ))}
</div>

<div className="grid md:grid-cols-2 gap-6">
    {bounties.map((b) => (
        <div
        key={b.id}
        className="bg-[#0d1117] rounded-xl p-6 border border-neutral-800">
            <p className="text-sm text-gray-500 mb-2">
                {b.repo} <span className="text-gray-600">#{b.id}</span>
            </p>
            <h3 className="text-lg font-semibold mb-2">{b.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{b.desc}</p>

            <div className="flex flex-wrap gap-2 mb-4">
                {b.tags.map((tag) => (
                    <span
                    key={tag}
                    className="px-3 py-1 text-xs bg-[#0d1117] rounded-full border border-neutral-700"
                    >
                        {tag}
                    </span>
                ))}
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>👤 {b.author}</span>
                  <span>📅 {b.date}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span
                    className={`font-bold ${
                      b.difficulty === "high"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {b.reward}
                  </span>
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-sm font-medium">
                    Claim Bounty
                  </button>
        </div>
        </div>
        
    ))}
</div>
</div>
</section>
        </>
    )
}
