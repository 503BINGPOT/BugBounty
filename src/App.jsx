import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import AuthProvider from "./auth/AuthContext";
import RequireAuth from "./auth/RequireAuth";

import { HeroSection } from "./pages/HeroSection";
import PostBounty from "./pages/postBounty";
import AboutSection from "./pages/about";
import Browse from "./pages/Browse";
import Dashboard from "./pages/Dashboard";

import ScrollToTop from "./components/scrollToTop";
import Footer from "./components/footer";
import Header from "./components/Header";

import Signup from "./pages/signUp";
import Signin from "./pages/Signin";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<HeroSection />} />
          <Route path="/about" element={<AboutSection />} />
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* Protected Routes */}
        <Route element={<Layout />}>
          <Route
            path="/post-bounty"
            element={
              <RequireAuth>
                <PostBounty />
              </RequireAuth>
            }
          />
          <Route
            path="/browse"
            element={
              <RequireAuth>
                <Browse />
              </RequireAuth>
            }
          />

          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
        </Route>



        {/* Default/Fallback → Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;


