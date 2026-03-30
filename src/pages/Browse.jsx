import { useState, useEffect } from "react";
import { Search, Grid, List } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function BrowseBounties() {
  const [view, setView] = useState("grid");
  const [bounties, setBounties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bounties from Firestore
  useEffect(() => {
    const fetchBounties = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "bounties"));
        const bountiesData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "Untitled Bounty",
            description: data.description || "No description available",
            amount: data.reward || 0,
            currency: data.currency || "USD",
            repo: data.repoUrl || "unknown-repo",
            issue: data.issue || "",
            tags: data.tags || [],
            difficulty: data.difficulty || "easy",
            author: data.authorName || "anon",
            createdAt: data.createdAt?.toDate
              ? data.createdAt.toDate()
              : new Date(),
            deadline: data.deadline || null,
            primaryLanguage: data.primaryLanguage || "N/A",
          };
        });
        setBounties(bountiesData);
      } catch (error) {
        console.error("Error fetching bounties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBounties();
  }, []);

  const stats = [
    { label: "Active Bounties", value: bounties.length },
    {
      label: "Total Rewards",
      value: `$${bounties.reduce((sum, b) => sum + (b.amount || 0), 0)}`,
    },
    { label: "Contributors", value: "1,234" }, // static for now
    { label: "Success Rate", value: "89%" }, // static
  ];

  return (
    <div className="min-h-screen bg-[#1a1c21] text-white py-20 px-6 -mt-17">
      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Browse Bounties</h1>
        <p className="text-gray-400 mt-2">
          Discover open-source issues with attached bounties. Find projects that
          match your skills and earn rewards by contributing to the community.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-[#0d1117] rounded-xl text-center py-6 shadow"
          >
            <p className="text-green-500 text-2xl font-bold">{stat.value}</p>
            <p className="text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* SEARCH + FILTERS */}
      <div className="bg-[#0d1117] rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center bg-gray-800 px-3 py-2 rounded-lg flex-1">
          <Search className="text-gray-400 mr-2" size={18} />
          <input
            type="text"
            placeholder="Search bounties by title, description, or tags..."
            className="bg-transparent outline-none flex-1"
          />
        </div>
        <div className="flex gap-3">
          <button
            className={`p-2 rounded-lg ${
              view === "grid" ? "bg-green-600" : "bg-[#0d1117]"
            }`}
            onClick={() => setView("grid")}
          >
            <Grid size={18} />
          </button>
          <button
            className={`p-2 rounded-lg ${
              view === "list" ? "bg-green-600" : "bg-[#0d1117]"
            }`}
            onClick={() => setView("list")}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* BOUNTY CARDS */}
      {loading ? (
        <p className="text-center text-gray-400">Loading bounties...</p>
      ) : bounties.length === 0 ? (
        <p className="text-center text-gray-400">No bounties found</p>
      ) : (
        <div
          className={`grid gap-6 ${
            view === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
          }`}
        >
          {bounties.map((bounty) => (
            <div
              key={bounty.id}
              className="bg-[#0d1117] rounded-xl p-6 shadow flex flex-col justify-between"
            >
              <div>
                <a
  href={bounty.repo}
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-400 text-sm mb-1 hover:underline block"
>
  {bounty.repoUrl}
</a>
                <h3 className="font-bold text-lg mb-2">{bounty.title}</h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {bounty.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {bounty.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-gray-900 px-3 py-1 text-xs rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-3 flex justify-between items-center">
                <p className="text-green-400 font-bold">
                  {bounty.currency} {bounty.amount}
                </p>
                <span
                  className={`px-3 py-1 text-xs rounded-lg ${
                    bounty.difficulty === "high"
                      ? "bg-red-500/20 text-red-400"
                      : bounty.difficulty === "medium"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {bounty.difficulty}
                </span>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-400">
                  @{bounty.author} • {bounty.createdAt.toLocaleDateString()}
                </div>
                <button className="bg-green-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-500">
                  Claim Bounty
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
