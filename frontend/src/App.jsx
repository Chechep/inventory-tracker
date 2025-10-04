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
    // Initialize from LocalStorage safely
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
    // Try server first
    try {
      const res = await axios.get("http://localhost:5175/inventory");
      if (Array.isArray(res.data)) {
        setItems(res.data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(res.data));
      }
    } catch (err) {
      console.warn("Server not available, using local storage only");
    }
  };

  // Whenever items change, sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

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
