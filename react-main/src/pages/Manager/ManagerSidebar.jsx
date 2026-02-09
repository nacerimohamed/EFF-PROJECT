import React from "react";
import { Link } from "react-router-dom";
import { 
  FiHome, 
  FiShoppingCart, 
  FiGrid,
  FiLogOut 
} from "react-icons/fi";

const ManagerSidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <div className="w-64 bg-green-700 text-white min-h-screen p-6 flex flex-col">
      {/* Logo/Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Coopérative</h2>
        <p className="text-green-200 text-sm">Espace Gestion</p>
      </div>

      {/* Navigation Menu */}
      <ul className="flex flex-col gap-2 flex-grow">
        <li>
          <Link
            to="/manager/dashboard"
            className="flex items-center gap-3 py-3 px-4 rounded hover:bg-green-600 transition"
          >
            <FiGrid className="text-lg" />
            <span>Tableau de Bord</span>
          </Link>
        </li>
        
        <li>
          <Link
            to="/manager/products"
            className="flex items-center gap-3 py-3 px-4 rounded hover:bg-green-600 transition"
          >
            <FiShoppingCart className="text-lg" />
            <span>Gestion des Produits</span>
          </Link>
        </li>
       
        <li>
          <Link
            to="/"
            className="flex items-center gap-3 py-3 px-4 rounded hover:bg-green-600 transition"
          >
            <FiHome className="text-lg" />
            <span>Accueil Site</span>
          </Link>
        </li>
      </ul>

      {/* User Info & Logout */}
      <div className="mt-auto pt-6 border-t border-green-600">
        <div className="mb-4">
          <p className="text-sm text-green-200">Connecté en tant que</p>
          <p className="font-semibold">
            {JSON.parse(localStorage.getItem('user'))?.name || 'Manager'}
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

export default ManagerSidebar;