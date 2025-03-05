import { useState } from "react";
import { User, Edit, Save, X, Mail, FileText, Camera, MapPin, Calendar, Link as LinkIcon, AlertCircle } from "lucide-react";

function Profile({ userInfo, setUserInfo }) {
  const [user, setUser] = useState({
    name: "Guest",
    email: "yourmail",
    bio: "Give a Bio",
    location: "City, Country",
    website: "website url if any",
    joinDate: new Date().toISOString().split('T')[0]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  const [errors, setErrors] = useState({});

  // ✅ Handle input changes
  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  // ✅ Validate form
  const validateForm = () => {
    const newErrors = {};
    const fields = ["name", "email", "bio", "location", "website"];
    
    // First validate all required fields
    fields.forEach(field => {
      const value = editedUser[field]?.trim() || '';
      
      // Check for empty fields
      if (!value) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      } else {
        // Validate field formats
        switch (field) {
          case "email":
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
              newErrors[field] = "Please enter a valid email address";
            }
            break;
          case "website":
            if (!/^https?:\/\/[^\s]+\.[^\s]+$/.test(value)) {
              newErrors[field] = "Please enter a valid website URL (starting with http:// or https://)";
            }
            break;
          case "name":
            if (value.length < 2) {
              newErrors[field] = "Name must be at least 2 characters long";
            }
            break;
          case "bio":
            if (value.length < 10) {
              newErrors[field] = "Bio must be at least 10 characters long";
            }
            break;
          case "location":
            if (value.length < 2) {
              newErrors[field] = "Please enter a valid location";
            }
            break;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Save updated profile
  const handleSave = () => {
    const isValid = validateForm();
    if (isValid) {
      setUser(editedUser);
      setUserInfo(editedUser);
      localStorage.setItem("user", JSON.stringify(editedUser));
      setIsEditing(false);
    }
  };

  // ❌ Cancel editing
  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
    setErrors({});
  };

  // Helper function to render input field with error
  const renderInput = (name, label, icon, type = "text", placeholder) => (
    <div className="group">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={editedUser[name]}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-gray-50 border ${
            errors[name] ? 'border-red-300 ring-red-100' : 'border-gray-200'
          } rounded-xl focus:outline-none focus:ring-2 ${
            errors[name] ? 'focus:ring-red-500' : 'focus:ring-blue-500'
          } focus:border-transparent transition-all duration-200`}
          placeholder={placeholder}
        />
        {icon}
        {errors[name] && (
          <div className="absolute right-0 top-full mt-1 text-xs text-red-500 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors[name]}
          </div>
        )}
      </div>
    </div>
  );

  // Modify the Save button to be disabled when there are validation errors
  const renderSaveButton = () => (
    <button
      onClick={handleSave}
      disabled={Object.keys(errors).length > 0}
      className={`flex-1 bg-gradient-to-r ${
        Object.keys(errors).length > 0 
          ? 'from-gray-400 to-gray-500 cursor-not-allowed'
          : 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
      } text-white px-6 py-3 rounded-xl 
        transition-all duration-200 flex items-center justify-center gap-2 
        shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40`}
    >
      <Save className="w-5 h-5" />
      Save Changes
    </button>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Profile Header/Banner */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600">
          <div className="absolute -bottom-16 left-8 p-2 rounded-full bg-white shadow-lg">
            <div className="relative w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-16 h-16 text-white" />
              {!isEditing && (
                <button 
                  className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors duration-200 shadow-lg"
                  title="Change photo"
                >
                  <Camera className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="pt-20 px-8 pb-8">
          {isEditing ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                {renderInput(
                  "name",
                  "Name",
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />,
                  "text",
                  "Enter your name"
                )}
                {renderInput(
                  "email",
                  "Email",
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />,
                  "email",
                  "Enter your email"
                )}
                {renderInput(
                  "location",
                  "Location",
                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />,
                  "text",
                  "City, Country"
                )}
                {renderInput(
                  "website",
                  "Website",
                  <LinkIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />,
                  "url",
                  "https://yourwebsite.com"
                )}
              </div>

              <div className="space-y-6">
                {/* Bio Input */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <div className="relative">
                    <textarea
                      name="bio"
                      value={editedUser.bio}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-50 border ${
                        errors.bio ? 'border-red-300 ring-red-100' : 'border-gray-200'
                      } rounded-xl focus:outline-none focus:ring-2 ${
                        errors.bio ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                      } focus:border-transparent transition-all duration-200 min-h-[200px] resize-none`}
                      placeholder="Tell us about yourself"
                    />
                    <FileText className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                    {errors.bio && (
                      <div className="absolute right-0 top-full mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.bio}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4">
                  {renderSaveButton()}
                  <button
                    onClick={handleCancel}
                    className="flex-1 border border-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 
                      transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                {/* User Info */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{user.name}</h2>
                  <div className="mt-4 space-y-2">
                    <p className="text-gray-500 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {user.email}
                    </p>
                    <p className="text-gray-500 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {user.location}
                    </p>
                    <p className="text-gray-500 flex items-center gap-2">
                      <LinkIcon className="w-4 h-4" />
                      <a href={user.website} className="text-blue-600 hover:underline">{user.website}</a>
                    </p>
                    <p className="text-gray-500 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Joined {new Date(user.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl 
                    hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2
                    shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:scale-[0.99]"
                >
                  <Edit className="w-5 h-5" />
                  Edit Profile
                </button>
              </div>

              {/* Bio Section */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  About Me
                </h3>
                <p className="text-gray-600 leading-relaxed">{user.bio}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
