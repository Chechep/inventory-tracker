import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import InventoryForm from "./components/InventoryForm";
import InventoryList from "./components/InventoryList";

const STORAGE_KEY = "inventory-items";

export default function App() {
  const [items, setItems] = useState(() => {
    const localData = localStorage.getItem(STORAGE_KEY);
    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        if (Array.isArray(parsed)) return parsed;
      } catch {}
    }
    return [];
  });

  const [editItem, setEditItem] = useState(null);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5175/inventory");
      if (Array.isArray(res.data)) {
        setItems(res.data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(res.data));
      }
    } catch {
      console.warn("Server not available, using local storage only");
    }
  };

  // Save to LocalStorage whenever items change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // Auto-sync offline changes when connection is restored
  useEffect(() => {
    const handleOnline = async () => {
      console.log("Connection restored. Syncing local changes to server...");
      const localData = localStorage.getItem(STORAGE_KEY);
      if (!localData) return;

      try {
        const localItems = JSON.parse(localData);
        if (!Array.isArray(localItems)) return;

        // Fetch current server data
        const res = await axios.get("http://localhost:5175/inventory");
        const serverItems = Array.isArray(res.data) ? res.data : [];

        // Find items missing on server (by id)
        const itemsToAdd = localItems.filter(
          (local) => !serverItems.some((s) => s.id === local.id)
        );

        // POST missing items
        for (const item of itemsToAdd) {
          await axios.post("http://localhost:5175/inventory", item);
        }

        // Update server items locally
        fetchItems();
      } catch (err) {
        console.warn("Sync failed:", err);
      }
    };

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="max-w-4xl mx-auto p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/inventory"
            element={
              <>
                <InventoryForm
                  fetchItems={fetchItems}
                  editItem={editItem}
                  setEditItem={setEditItem}
                  setItems={setItems}
                />
                <InventoryList
                  items={items}
                  fetchItems={fetchItems}
                  setEditItem={setEditItem}
                  setItems={setItems}
                />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
