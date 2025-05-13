import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FiHome, FiSettings, FiMenu } from 'react-icons/fi';
import { FaHouseUser } from 'react-icons/fa';
import { MdOutlineLogin } from 'react-icons/md';
import Sidebar from '../components/Sidebar';

function RestrictedLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { path: '/home', label: 'Home', icon: <FiHome /> },
    { path: '/login', label: 'Login', icon: <MdOutlineLogin /> },
    { path: '/user', label: 'User', icon: <FaHouseUser /> },
    { path: '/settings', label: 'Settings', icon: <FiSettings /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        menuItems={menuItems}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Top Bar */}
        <div className="bg-white shadow p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Área Restrita</h1>
          <button
            onClick={toggleSidebar}
            className="text-blue-600 focus:outline-none md:hidden"
          >
            <FiMenu size={24} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default RestrictedLayout;
