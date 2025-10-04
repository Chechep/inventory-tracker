import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Welcome to Inventory Tracker
      </h1>
      <p className="text-gray-700 max-w-lg mb-6">
        Keep track of your stock items easily add, edit, search and manage
        your inventory in a clean, simple interface.
      </p>
      <Link
        to="/inventory"
        className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
      >
        Go to Inventory
      </Link>
    </div>
  );
}
