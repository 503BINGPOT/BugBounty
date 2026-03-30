// src/pages/PostBounty.jsx
import { Bug, DollarSign } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { createBounty } from "../api/bountyapi.jsx"; 
import { useNavigate } from "react-router-dom";

export default function PostBounty() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [bounty, setBounty] = useState({
    repoUrl: "",
    title: "",
    description: "",
    criteria: "",
    amount: 500,
    currency: "USD ($)",
    difficulty: "",
    deadline: "",
    language: "",
    tags: [],
  });

  const [tagInput, setTagInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const addTag = () => {
    const t = tagInput.trim();
    if (t !== "" && !bounty.tags.includes(t)) {
      setBounty({ ...bounty, tags: [...bounty.tags, t] });
      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    setBounty({ ...bounty, tags: bounty.tags.filter((t) => t !== tag) });
  };

  const validate = () => {
    if (!user) {
      setError("You must be signed in to post a bounty.");
      return false;
    }
    if (!bounty.title.trim()) {
      setError("Please add an issue title.");
      return false;
    }
    if (!bounty.description.trim()) {
      setError("Please provide an issue description.");
      return false;
    }
    if (!bounty.criteria.trim()) {
      setError("Please add acceptance criteria.");
      return false;
    }
    const amt = parseFloat(bounty.amount);
    if (isNaN(amt) || amt <= 0) {
      setError("Please provide a valid bounty amount greater than 0.");
      return false;
    }
    return true;
  };

  

  const handleSubmit = async () => {
  setError(null);

  if (!validate()) return;

  setSubmitting(true);

  try {
    const payload = {
      repoUrl: bounty.repoUrl.trim() || null,
      title: bounty.title.trim(),
      description: bounty.description.trim(),
      criteria: bounty.criteria.trim(),
      amount: Number(bounty.amount),
      currency: bounty.currency,
      difficulty: bounty.difficulty || "Medium",
      deadline: bounty.deadline || null,
      language: bounty.language || null,
      tags: bounty.tags,
      createdBy: user.uid,
    };

    console.log("USER UID:", user.uid);
    console.log("PAYLOAD SENT:", payload);

    const newBounty = await createBounty(payload);

    setBounty({
  repoUrl: "",
  title: "",
  description: "",
  criteria: "",
  amount: 500,
  currency: "USD ($)",
  difficulty: "",
  deadline: "",
  language: "",
  tags: [],
});

setTagInput("");
setError(null);

alert("✅ Bounty posted successfully!");

  } catch (err) {
    console.error(err);
    setError(err.message || "Failed to create bounty. Try again.");
  } finally {
    setSubmitting(false);
  }
};
  

  const amt = parseFloat(bounty.amount) || 0;
  const platformFee = Math.round(amt * 0.05); // 5%
  const processing = 15; // fixed sample fee
  const total = Math.round(amt + platformFee + processing);

  return (
    <div className="min-h-screen bg-[#1a1c21] text-white p-25 -mt-17">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Post a Bounty</h1>
            <p className="text-gray-400">
              Incentivize developers to solve your open-source issues
            </p>
          </div>

          <div className="bg-[#0d1117] rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-4 flex gap-3 items-center">
              <Bug className="text-green-500" /> Repository & Issue Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-1">Repository URL</label>
                <input
                  type="url"
                  className="w-full bg-gray-800 p-3 rounded-lg outline-none"
                  placeholder="https://github.com/username/repository"
                  value={bounty.repoUrl}
                  onChange={(e) =>
                    setBounty({ ...bounty, repoUrl: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Issue Title</label>
                <input
                  type="text"
                  className="w-full bg-gray-800 p-3 rounded-lg outline-none"
                  placeholder="Brief, descriptive title"
                  value={bounty.title}
                  onChange={(e) =>
                    setBounty({ ...bounty, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">
                  Issue Description
                </label>
                <textarea
                  className="w-full bg-gray-800 p-3 rounded-lg outline-none"
                  rows="4"
                  placeholder="Detailed description of the problem..."
                  value={bounty.description}
                  onChange={(e) =>
                    setBounty({ ...bounty, description: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">
                  Acceptance Criteria
                </label>
                <textarea
                  className="w-full bg-gray-800 p-3 rounded-lg outline-none"
                  rows="3"
                  placeholder="Clear criteria for what constitutes a successful solution..."
                  value={bounty.criteria}
                  onChange={(e) =>
                    setBounty({ ...bounty, criteria: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="bg-[#0d1117] rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-4 flex gap-2 items-center">
              <DollarSign className="text-green-500" /> Bounty Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-1">Bounty Amount</label>
                <input
                  type="number"
                  className="w-full bg-gray-800 p-3 rounded-lg outline-none"
                  value={bounty.amount}
                  onChange={(e) =>
                    setBounty({ ...bounty, amount: e.target.value })
                  }
                  min="0"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Currency</label>
                <select
                  className="w-full bg-gray-800 p-3 rounded-lg outline-none"
                  value={bounty.currency}
                  onChange={(e) =>
                    setBounty({ ...bounty, currency: e.target.value })
                  }
                >
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>INR (₹)</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Difficulty Level</label>
                <select
                  className="w-full bg-gray-800 p-3 rounded-lg outline-none"
                  value={bounty.difficulty}
                  onChange={(e) =>
                    setBounty({ ...bounty, difficulty: e.target.value })
                  }
                >
                  <option value="">Select difficulty</option>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Deadline</label>
                <input
                  type="date"
                  className="w-full bg-gray-800 p-3 rounded-lg outline-none"
                  value={bounty.deadline}
                  onChange={(e) =>
                    setBounty({ ...bounty, deadline: e.target.value })
                  }
                />
              </div>
              <div className="col-span-2">
                <label className="block text-gray-300 mb-1">Primary Language</label>
                <select
                  className="w-full bg-gray-800 p-3 rounded-lg outline-none"
                  value={bounty.language}
                  onChange={(e) =>
                    setBounty({ ...bounty, language: e.target.value })
                  }
                >
                  <option value="">Select primary language</option>
                  <option>JavaScript</option>
                  <option>Python</option>
                  <option>Java</option>
                  <option>C++</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-gray-300 mb-2">Tags & Technologies</label>
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="text"
                  className="flex-1 bg-gray-800 p-3 rounded-lg outline-none"
                  placeholder="Add tags (React, API, Bug Fix, etc.)"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="bg-green-600 px-4 py-2 rounded-lg font-bold"
                >
                  +
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {bounty.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-700 px-3 py-1 rounded-lg text-sm flex items-center gap-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-red-400 hover:text-red-600"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4">
            {error && <div className="mb-3 text-red-400">{error}</div>}
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className={`w-full ${
                submitting ? "bg-gray-600 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              } transition-colors p-4 rounded-xl text-lg font-bold`}
            >
              {submitting ? "Posting..." : "🚀 Post Bounty"}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#0d1117] rounded-2xl p-6 shadow">
            <h2 className="text-lg font-semibold mb-4">Preview</h2>
            <div className="p-4 bg-gray-800 rounded-xl">
              <h3 className="font-bold">{bounty.title || "Your Bounty Title"}</h3>
              <p className="text-gray-400 text-sm mb-2">
                {bounty.description || "Brief description preview will appear here..."}
              </p>
              <p className="text-green-400 font-bold">
                {bounty.currency} {amt}
              </p>
              <span className="px-3 py-1 text-xs bg-gray-700 rounded-lg">
                {bounty.difficulty || "Medium"}
              </span>

              <div className="flex flex-wrap gap-2 mt-3">
                {bounty.tags.map((tag, i) => (
                  <span key={i} className="bg-gray-700 px-2 py-1 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 text-sm space-y-1">
              <div className="flex justify-between">
                <span>Platform Fee (5%)</span> <span>${platformFee}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Processing</span> <span>${processing}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total Cost</span>
                <span>${total}</span>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-[#0d1117] rounded-2xl p-6 shadow">
            <h2 className="text-lg font-semibold mb-4">Tips for Success</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>✅ Be specific about requirements and acceptance criteria</li>
              <li>✅ Set a fair bounty amount relative to work complexity</li>
              <li>✅ Add relevant tags to help developers find your issue</li>
              <li>✅ Respond promptly to questions and submissions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
