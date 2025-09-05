import React from 'react'
import { useNavigate } from "react-router-dom";
import { Briefcase } from "lucide-react"; // Fixed import

const Header = () => {
  const isAuthenticated = true;
  const user = { fullName: "Alex", role: "employer" };
  const navigate = useNavigate();

  return (
    <header className="bg-white">
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center space-x-3'>
            <div className='w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center'>
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className='text-xl font-bold text-gray-900'>JobPortal</span>
          </div>

          <nav className='flex items-center space-x-6'>
            <button
              onClick={() => navigate("/find-jobs")}
              className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200'
            >
              Find Jobs
            </button>
            <button
              onClick={() => {
                navigate(
                  isAuthenticated && user?.role === "employer"
                    ? "/employer-dashboard"
                    : "/login"
                );
              }}
              className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200'
            >
              For Employer
            </button>
          </nav>

          <div className='flex items-center space-x-4'>
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className='text-gray-700'>Welcome, {user?.fullName}</span>
                <button
                  onClick={() => navigate(
                    user?.role === "employer"
                      ? "/employer-dashboard"
                      : "/find-jobs"
                  )}
                  className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow-md'
                >
                  Dashboard
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate('/login')}
                  className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200'
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200'
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;