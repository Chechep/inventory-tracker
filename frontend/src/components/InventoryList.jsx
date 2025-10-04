import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import DeleteModal from "./DeleteModal";
import axios from "axios";

export default function InventoryList({ items, fetchItems, setEditItem, setItems }) {
  const [search, setSearch] = useState("");
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      await axios.delete(`http://localhost:5175/inventory/${itemToDelete.id}`);
    } catch {
      console.warn("Server not available, deleting locally only");
    }

    const updated = Array.isArray(items)
      ? items.filter((i) => i.id !== itemToDelete.id)
      : [];

    setItems(updated);
    localStorage.setItem("inventory-items", JSON.stringify(updated));
    setItemToDelete(null);
    fetchItems();
  };

  const filteredItems = Array.isArray(items)
    ? items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()))
    : [];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Inventory List</h2>

      <input
        type="text"
        placeholder="Search by name..."
        className="w-full p-2 mb-4 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredItems.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No items found.</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-2">Name</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Price</th>
              <th className="p-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((i) => (
              <tr key={i.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{i.name}</td>
                <td className="p-2">{i.quantity}</td>
                <td className="p-2">Ksh. {i.price}</td>
                <td className="p-2 text-right space-x-2">
                  <button onClick={() => setEditItem(i)} className="text-yellow-600 hover:text-yellow-800">
                    <FaEdit />
                  </button>
                  <button onClick={() => setItemToDelete(i)} className="text-red-600 hover:text-red-800">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <DeleteModal
        isOpen={!!itemToDelete}
        onCancel={() => setItemToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
