import { db } from "../firebaseConfig";
import {
  collection, addDoc, getDocs, getDoc, doc,
  query, where, serverTimestamp
} from "firebase/firestore";

// ---------- BOUNTy ----------

// POST /api/bounties
export const createBounty = async ({
  repoUrl,
  title,
  description,
  criteria,
  amount,
  currency,
  difficulty,
  deadline,
  language,
  tags,
  createdBy
}) => {
  const ref = collection(db, "bounties");
  const docRef = await addDoc(ref, {
    repoUrl: repoUrl || null,
    title,
    description,
    criteria,
    reward: Number(amount),
    currency,
    difficulty: difficulty || "Medium",
    deadline: deadline || null,
    language: language || null,
    tags: tags || [],
    status: "open",
    createdBy,
    createdAt: serverTimestamp(),
  });
  return { id: docRef.id };
};

// GET /api/bounties (all open)
export const getAllBounties = async () => {
  const ref = collection(db, "bounties");
  const snapshot = await getDocs(ref);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

// GET /api/bounties/:id
export const getBountyById = async (bountyId) => {
  const ref = doc(db, "bounties", bountyId);
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error("Bounty not found");
  return { id: snap.id, ...snap.data() };
};

// ---------- REPORTS ----------

// POST /api/reports
export const submitReport = async ({ bountyId, submittedBy, description, severity }) => {
  const ref = collection(db, "reports");
  const docRef = await addDoc(ref, {
    bountyId,
    submittedBy,
    description,
    severity, // "low" | "medium" | "high"
    status: "pending",
    createdAt: serverTimestamp(),
  });
  return { id: docRef.id };
};

// GET /api/reports?bountyId=xxx (admins only -> we’ll enforce via rules)
export const getReportsByBounty = async (bountyId) => {
  const ref = collection(db, "reports");
  const q = query(ref, where("bountyId", "==", bountyId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};
