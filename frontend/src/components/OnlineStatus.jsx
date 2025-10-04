import { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";

export default function OnlineStatus() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-semibold"
      style={{ backgroundColor: online ? "#22c55e" : "#ef4444", color: "white" }}
    >
      <FaCircle className={`w-3 h-3 ${online ? "text-green-200" : "text-red-200"}`} />
      <span>{online ? "Online (server )" : "Offline (local )"}</span>
    </div>
  );
}
