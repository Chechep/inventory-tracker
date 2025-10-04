import { Link } from "react-router-dom";
import OnlineStatus from "./OnlineStatus";
import { FaHome, FaBoxes } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg flex items-center space-x-2">
        <span>Inventory Tracker</span>
      </Link>

      <div className="flex items-center space-x-6">
        <Link
          to="/"
          className="flex items-center space-x-1 hover:text-gray-200"
        >
          <FaHome />
        </Link>

        <Link
          to="/inventory"
          className="flex items-center space-x-1 hover:text-gray-200"
        >
          <FaBoxes />
          <span>Inventory</span>
        </Link>

        <OnlineStatus />
      </div>
    </nav>
  );
}
