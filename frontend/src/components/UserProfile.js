import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "../redux/userSlice";
import { FaUserEdit, FaWallet, FaCoins, FaEnvelope } from "react-icons/fa";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  useEffect(() => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });
  }, [user]);

  const handleEdit = () => {
    setEditable(!editable);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData));
    setEditable(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">User Profile</h2>
        <button
          onClick={handleEdit}
          className="bg-blue-500 text-white px-3 py-1 rounded flex items-center"
        >
          <FaUserEdit className="mr-2" />
          {editable ? "Cancel" : "Edit"}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!editable}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <div className="flex items-center">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full p-2 border rounded mt-1 bg-gray-100"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!editable}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        {editable && (
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            Save Changes
          </button>
        )}
      </form>

      <hr className="my-6" />

      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <FaWallet className="text-blue-500 text-2xl mr-2" />
          <p className="text-lg">Wallet Balance: <strong>${user?.wallet || "0.00"}</strong></p>
        </div>

        <div className="flex items-center">
          <FaCoins className="text-yellow-500 text-2xl mr-2" />
          <p className="text-lg">Affiliate Earnings: <strong>${user?.affiliateEarnings || "0.00"}</strong></p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
