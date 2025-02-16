import { useSelector } from "react-redux";
import { useState } from "react";

const AffiliateDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [referrals, setReferrals] = useState(5);
  const [earnings, setEarnings] = useState(120);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold">Affiliate Dashboard</h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-blue-500 text-white p-4 rounded">
          <h3 className="text-lg">Total Referrals</h3>
          <p className="text-2xl">{referrals}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded">
          <h3 className="text-lg">Total Earnings</h3>
          <p className="text-2xl">${earnings}</p>
        </div>
      </div>

      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Request Withdrawal
      </button>
    </div>
  );
};

export default AffiliateDashboard;
