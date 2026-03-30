import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebaseConfig";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jwtToken, setJwtToken] = useState(localStorage.getItem("jwtToken") || null);

  const JWT_SECRET = import.meta.env.VITE_JWT_SECRET || "fallback-secret-change-in-production";

  useEffect(() =>
    onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setLoading(false);
    })
  , []);

  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const signin = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signinWithGoogle = () => signInWithPopup(auth, googleProvider);

  const logout = () => {
    signOut(auth);
    clearToken();
  };

  // JWT 
  const generateJWT = async (payload, expiresIn = "24h") => {
    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime(expiresIn)
        .setIssuedAt()
        .sign(secret);
      return token;
    } catch (error) {
      console.error("Error generating JWT:", error);
      return null;
    }
  };

  const verifyJWT = async (token) => {
    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      return payload;
    } catch (error) {
      console.error("Error verifying JWT:", error);
      return null;
    }
  };

  const storeToken = (token) => {
    localStorage.setItem("jwtToken", token);
    setJwtToken(token);
  };

  const clearToken = () => {
    localStorage.removeItem("jwtToken");
    setJwtToken(null);
  };

  // Bcrypt Functions
  const hashPassword = async (password, saltRounds = 12) => {
    try {
      return await bcrypt.hash(password, saltRounds);
    } catch (error) {
      console.error("Error hashing password:", error);
      return null;
    }
  };

  const comparePassword = async (password, hashedPassword) => {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      console.error("Error comparing password:", error);
      return false;
    }
  };

  const value = { user, loading, jwtToken, signup, signin, signinWithGoogle, logout, generateJWT, verifyJWT, storeToken, clearToken, hashPassword, comparePassword };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
