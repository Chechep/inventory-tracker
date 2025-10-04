import { Link } from "react-router-dom";
import OnlineStatus from "./OnlineStatus";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">Inventory Tracker</Link>

      <div className="flex items-center space-x-4">
      <Link to="/" className="hover:text-gray-200">
            Home
          </Link>
        <Link to="/inventory" className="hover:underline">Inventory</Link>
        <OnlineStatus />
      </div>
    </nav>
  );
}
