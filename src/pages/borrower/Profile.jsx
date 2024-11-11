import React, { useState, useEffect } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { borrowerService, profileService } from "../../services/api";
import { motion } from "framer-motion";
import { FaUser, FaFileAlt, FaBriefcase, FaAddressCard } from "react-icons/fa";
import Swal from "sweetalert2";
import Loader from "../../components/Loader/Loader";
import BorrowerProfile from "../../components/lender/BorrowerProfile";

const Profile = () => {
  const { userInfo } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const { data } = await borrowerService.getBorrowerProfile();
        setProfileData(data);
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to load profile data", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleUpdateProfile = async (sectionData) => {
    try {
      setLoading(true);
      const { data } = await borrowerService.updateBorrowerProfile({
        ...profileData,
        ...sectionData,
      });
      setProfileData(data);
      Swal.fire("Success", "Profile updated successfully", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update profile", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  const renderProfileOverview = () => <BorrowerProfile data={profileData} />;

  const renderPersonalInfo = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={profileData?.firstName || ""}
            onChange={(e) => handleUpdateProfile({ firstName: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={profileData?.lastName || ""}
            onChange={(e) => handleUpdateProfile({ lastName: e.target.value })}
          />
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 flex items-center space-x-2 ${
            activeSection === "overview" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveSection("overview")}
        >
          <FaUser />
          <span>Overview</span>
        </button>
        <button
          className={`py-2 px-4 flex items-center space-x-2 ${
            activeSection === "personal" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveSection("personal")}
        >
          <FaAddressCard />
          <span>Personal Info</span>
        </button>
      </div>

      <div className="space-y-6">
        {activeSection === "overview" && renderProfileOverview()}
        {activeSection === "personal" && renderPersonalInfo()}
      </div>
    </motion.div>
  );
};

export default Profile;
