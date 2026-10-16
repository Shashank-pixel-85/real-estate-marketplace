import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext(null);

function readStorage(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}

export function AppProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => readStorage("estateora-wishlist", []));
  const [comparison, setComparison] = useState(() => readStorage("estateora-comparison", []));
  const [user, setUser] = useState(() => readStorage("estateora-user", null));

  useEffect(() => localStorage.setItem("estateora-wishlist", JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => localStorage.setItem("estateora-comparison", JSON.stringify(comparison)), [comparison]);
  useEffect(() => localStorage.setItem("estateora-user", JSON.stringify(user)), [user]);

  const toggleWishlist = (id) => setWishlist((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  const toggleComparison = (id) => setComparison((items) => items.includes(id) ? items.filter((item) => item !== id) : items.length < 3 ? [...items, id] : items);
  return <AppContext.Provider value={{ wishlist, comparison, user, setUser, toggleWishlist, toggleComparison }}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
}