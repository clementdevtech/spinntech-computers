import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const AffiliateDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({ total_referrals: 0, total_earnings: 0 });

  useEffect(() => {
    if (user) {
      axios.get(`/api/affiliate/stats/${user.id}`)
        .then(response => setStats(response.data))
        .catch(error => console.error("Error fetching affiliate stats:", error));
    }
  }, [user]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold">Affiliate Dashboard</h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-blue-500 text-white p-4 rounded">
          <h3 className="text-lg">Total Referrals</h3>
          <p className="text-2xl">{stats.total_referrals}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded">
          <h3 className="text-lg">Total Earnings</h3>
          <p className="text-2xl">${stats.total_earnings}</p>
        </div>
      </div>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Request Withdrawal
      </button>
    </div>
  );
};

export default AffiliateDashboard;
