import { useState } from "react";
import { User, Edit, Save, X } from "lucide-react";

function Profile() {
  const [user, setUser] = useState({
    name: "Prasanth",
    email: "prasanth270627@gmail.com",
    bio: "A passionate Web Developer!",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  // ✅ Handle input changes
  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  // ✅ Save updated profile
  const handleSave = () => {
    setUser(editedUser);
    localStorage.setItem("user", JSON.stringify(editedUser)); // Save to localStorage
    setIsEditing(false);
  };

  // ❌ Cancel editing
  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto mt-16">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
          <User className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          {user.name}
        </h2>
        <p className="text-gray-500">{user.email}</p>
      </div>

      {/* Edit Mode: Show Input Fields */}
      {isEditing ? (
        <div className="bg-gray-100 p-4 rounded-lg">
          <label className="block text-gray-700 font-medium">Name:</label>
          <input
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleChange}
            className="w-full p-2 mt-1 mb-3 border rounded-md"
          />

          <label className="block text-gray-700 font-medium">Email:</label>
          <input
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleChange}
            className="w-full p-2 mt-1 mb-3 border rounded-md"
          />

          <label className="block text-gray-700 font-medium">Bio:</label>
          <textarea
            name="bio"
            value={editedUser.bio}
            onChange={handleChange}
            className="w-full p-2 mt-1 mb-3 border rounded-md"
          />

          <div className="flex justify-between mt-4">
            <button
              onClick={handleSave}
              className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              <Save className="w-4 h-4 mr-2" /> Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
            >
              <X className="w-4 h-4 mr-2" /> Cancel
            </button>
          </div>
        </div>
      ) : (
        // View Mode
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">About Me</h3>
          <p className="text-gray-700">{user.bio}</p>
        </div>
      )}

      {/* Edit Button */}
      {!isEditing && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
          >
            <Edit className="w-4 h-4 mr-2" /> Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
