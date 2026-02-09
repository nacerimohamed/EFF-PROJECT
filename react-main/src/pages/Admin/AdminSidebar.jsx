// src/pages/admin/AdminSidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const AdminSidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <div className="w-64 bg-green-700 text-white min-h-screen p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
      <ul className="flex flex-col gap-4 flex-1">
        <li>
          <Link
            to="/admin/dashboard"
            className="block py-2 px-4 rounded hover:bg-green-600 transition"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/admin/users"
            className="block py-2 px-4 rounded hover:bg-green-600 transition"
          >
            Gérer les utilisateurs
          </Link>
        </li>
        <li>
          <Link
            to="/admin/cooperatives"
            className="block py-2 px-4 rounded hover:bg-green-600 transition"
          >
            Gérer les coopératives
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className="block py-2 px-4 rounded hover:bg-green-600 transition"
          >
            Accueil
          </Link>
        </li>
      </ul>

      {/* User Info & Logout */}
      <div className="pt-6 border-t border-green-600">
        <div className="mb-4">
          <p className="text-sm text-green-200">Connecté en tant que</p>
          <p className="font-semibold">
            {JSON.parse(localStorage.getItem('user'))?.name || 'Administrateur'}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-500 hover:bg-red-600 rounded transition"
        >
          <FiLogOut />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;