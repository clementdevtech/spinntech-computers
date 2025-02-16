import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../redux/authSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ name, email }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-4">Profile</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input type="email" value={email} disabled className="w-full p-2 border rounded bg-gray-200" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
};

export default Profile;
