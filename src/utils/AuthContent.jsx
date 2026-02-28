import { createContext, useContext, useEffect, useState } from "react";
import Loading  from '../components/loading.jsx';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     setAuthLoading(false);
  //     return;
  //   }

  //   fetch("http://localhost:8000/me", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then(async (res) => {
  //       console.log("ME STATUS:", res.status);
  //       if (!res.ok) throw new Error("Invalid token");
  //       const data = await res.json();

  //       setUser(data);
  //       setIsAuthenticated(true);
  //     })
  //     .catch(() => {
  //       localStorage.removeItem("token");
  //       setUser(null);
  //       setIsAuthenticated(false);
  //     })
  //     .finally(() => setAuthLoading(false));
  // }, []);

  useEffect(() => {
  const token = localStorage.getItem("token");
  console.log("[Auth] mounted on:", window.location.pathname);
  console.log("[Auth] token exists?", !!token);

  if (!token) {
    setAuthLoading(false);
    return;
  }

  fetch("http://localhost:8000/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(async (res) => {
      console.log("[Auth] /me status:", res.status);

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.log("[Auth] /me error body:", text);
        throw new Error(`ME_FAILED_${res.status}`);
      }

      const data = await res.json();
      setUser(data);
      setIsAuthenticated(true);
    })
    .catch((err) => {
      console.error("[Auth] /me fetch failed:", err);

      // IMPORTANT: don't nuke token for all errors
      // only remove token if it's actually unauthorized
      if (String(err?.message || "").includes("ME_FAILED_401")) {
        localStorage.removeItem("token");
      }

      setUser(null);
      setIsAuthenticated(false);
    })
    .finally(() => setAuthLoading(false));
}, []);

  
  if (authLoading) {
    return <Loading />;
  }
  // console.log("TOKEN:", token);
  console.log("AUTH LOADING:", authLoading);
  console.log("IS AUTH:", isAuthenticated);
  
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);