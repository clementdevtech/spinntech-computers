import { useSelector } from "react-redux";

const AffiliateDashboard = () => {
  const { referrals, totalEarnings } = useSelector((state) => state.affiliate);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-4">Affiliate Dashboard</h2>
      <div className="bg-white p-4 shadow-md rounded">
        <p className="text-lg font-semibold">Total Earnings: <span className="text-green-600">${totalEarnings}</span></p>
        <p className="text-lg font-semibold mt-2">Total Referrals: <span className="text-blue-600">{referrals.length}</span></p>

        <h3 className="text-xl font-semibold mt-4">Your Referrals:</h3>
        {referrals.length > 0 ? (
          <ul>
            {referrals.map((ref) => (
              <li key={ref.id} className="border-b py-2">{ref.name} - {ref.status === "subscribed" ? "Active" : "Pending"}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No referrals yet.</p>
        )}
      </div>
    </div>
  );
};

export default AffiliateDashboard;
