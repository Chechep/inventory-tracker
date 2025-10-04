import { useEffect, useState } from "react";

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
    <div
      className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
        online ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {online ? "Online (server available)" : "Offline (local storage)"}
    </div>
  );
}
