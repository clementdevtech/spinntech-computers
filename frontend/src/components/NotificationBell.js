import { useState } from "react";

const NotificationBell = () => {
  const [notifications] = useState([
    { id: 1, message: "New product added!", time: "2 mins ago" },
    { id: 2, message: "Price drop on your wishlist item!", time: "1 hour ago" },
  ]);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setShowDropdown(!showDropdown)} className="relative">
        🔔
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 bg-white text-black shadow-md rounded w-64 p-3">
          <h3 className="text-lg font-semibold mb-2">Notifications</h3>
          {notifications.length === 0 ? (
            <p className="text-gray-500">No new notifications</p>
          ) : (
            notifications.map((notif) => (
              <div key={notif.id} className="border-b p-2">
                <p>{notif.message}</p>
                <span className="text-gray-500 text-sm">{notif.time}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
