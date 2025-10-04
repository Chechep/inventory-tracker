import { useState, useEffect } from "react";
import axios from "axios";

export default function InventoryForm({ fetchItems, editItem, setEditItem, setItems }) {
  const [item, setItem] = useState({ name: "", quantity: "", price: "" });

  useEffect(() => {
    if (editItem) {
      setItem({
        name: editItem.name,
        quantity: editItem.quantity,
        price: editItem.price,
      });
    } else {
      setItem({ name: "", quantity: "", price: "" });
    }
  }, [editItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItem = editItem
      ? { ...editItem, ...item }
      : { ...item, id: Date.now() };

    try {
      if (editItem) {
        await axios.put(`http://localhost:5175/inventory/${editItem.id}`, newItem);
      } else {
        await axios.post("http://localhost:5175/inventory", newItem);
      }
    } catch {
      console.warn("Server not available, saving locally only");
    }

    setItems((prev) => {
      const updated = editItem
        ? prev.map((i) => (i.id === editItem.id ? newItem : i))
        : [...prev, newItem];

      localStorage.setItem("inventory-items", JSON.stringify(updated));
      return updated;
    });

    setItem({ name: "", quantity: "", price: "" });
    setEditItem(null);
    fetchItems();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">{editItem ? "Edit Item" : "Add Item"}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Item Name"
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={item.quantity}
          onChange={(e) => setItem({ ...item, quantity: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={item.price}
          onChange={(e) => setItem({ ...item, price: e.target.value })}
          className="p-2 border rounded"
          required
        />
      </div>

      <div className="mt-4 flex justify-end space-x-3">
        {editItem && (
          <button
            type="button"
            onClick={() => setEditItem(null)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        )}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editItem ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
}
