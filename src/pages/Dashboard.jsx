import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

export default function Dashboard() {
  const [tab, setTab] = useState("my");
  const [user, setUser] = useState(null);
  const [bounties, setBounties] = useState([]);
  const [stats, setStats] = useState({ posted: 0, claimed: 0, earned: 0 });
  const [loading, setLoading] = useState(true);

  const db = getFirestore();

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) return;

    setUser(currentUser);
    fetchData(currentUser.uid);
  }, []);

  const fetchData = async (uid) => {
    try {
      setLoading(true);

      const postedQuery = query(collection(db, "bounties"), where("ownerId", "==", uid));
      const postedSnap = await getDocs(postedQuery);

      const posted = postedSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const claimedQuery = query(collection(db, "bounties"), where("claimedBy", "==", uid));
      const claimedSnap = await getDocs(claimedQuery);

      const claimed = claimedSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const totalEarned = claimed.reduce((acc, b) => acc + (b.price || 0), 0);

      setStats({
        posted: posted.length,
        claimed: claimed.length,
        earned: totalEarned,
      });

      setBounties(tab === "my" ? posted : claimed);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchData(user.uid);
  }, [tab]);

  if (!user) {
    return <div className="text-white p-6">Please login</div>;
  }

  return (
    <div className="p-6 text-white bg-[#0b0f14] min-h-screen mt=-20 px-6 -mt-17 py-20">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full border border-green-500 flex items-center justify-center text-green-400 text-xl">
          {user.displayName ? user.displayName[0] : "U"}
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{user.displayName || "User"}</h1>
          <p className="text-gray-400">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard title="Bounties Posted" value={stats.posted} />
        <StatCard title="Bounties Claimed" value={stats.claimed} />
        <StatCard title="Total Earned" value={`$${stats.earned}`} />
      </div>

      <div className="flex gap-4 mb-6">
        <TabButton label="My Bounties" active={tab === "my"} onClick={() => setTab("my")} />
        <TabButton label="Claimed" active={tab === "claimed"} onClick={() => setTab("claimed")} />
      </div>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : bounties.length === 0 ? (
        <p className="text-gray-400">No bounties yet 🚀</p>
      ) : (
        <div className="space-y-4">
          {bounties.map((b) => (
            <BountyCard key={b.id} bounty={b} />
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-[#111827] p-5 rounded-2xl">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-2xl font-semibold mt-2">{value}</h2>
    </div>
  );
}

function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm ${
        active ? "bg-[#1f2937] text-white" : "text-gray-400"
      }`}
    >
      {label}
    </button>
  );
}

function BountyCard({ bounty }) {
  return (
    <div className="bg-[#111827] p-5 rounded-2xl flex justify-between items-center">
      <div>
        <p className="text-gray-400 text-sm">{bounty.repo}</p>
        <h3 className="text-lg">{bounty.title}</h3>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-green-400 font-semibold">${bounty.price}</span>
      </div>
    </div>
  );
}