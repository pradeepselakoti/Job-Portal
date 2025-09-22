import { useState } from "react";
import { Building2, Mail, Edit3 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import uploadImage from '../../utils/uploadImage';

import DashboardLayout from "../../components/layout/DashboardLayout";


const EmployerProfilePage = () => {

  const { user, updateUser } = useAuth();

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    companyName: user?.companyName || "",
    comapnyDescription: user?.comapnyDescription || "",
    companyLogo: user?.companyLogo || "",
  })
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...profileData });
  const [uploading, setUploading] = useState({ avatar: false, logo: false });
  const [saving, setSaving] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleImageUpload = async (File, type) => { };

  const handleImageChange = (e, type) => { };

  const handleSave = async () => { };
  const handleCancel = () => {
    setFormData({ ...profileData });
    setEditMode(false);
  };

  if(editMode){
    return(
      <EditProfileDetai;s
    )
  }
  return (
    <DashboardLayout activeMenu='company-profile'>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6 flex justify-between items-center">
              <h1 className="text-xl font-medium text-white">
                Employer Profile
              </h1>
              <button
                onClick={() => setEditMode(true)}
                className="bg-white/10 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>
            {/* Profile-content */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* personal information */}
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Personal Information
                  </h2>
                  {/* Avatar and Name */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={profileData.avatar}
                      alt="Avatar"
                      className="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {profileData.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-800">
                        <Mail className="w-4 h-4 mr-2" />
                        <span>{profileData.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* company Information */}
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Company Information
                  </h2>

                  {/* Company Logo and Name */}
                  <div className="flex items-center space-x-4">
                    <img  
                        src={profileData.companyLogo}
                        alt="company Logo"
                        className="w-20 h-20 rounded-lg object-cover border-4 border-blue-50"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {profileData.companyLogo}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Building2 className="w-4 h-4 mr-2" />
                          <span>Company</span>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
              {/* company description */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-2">
                  <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-lg">
                    {profileData.comapnyDescription}
                  </p>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default EmployerProfilePage