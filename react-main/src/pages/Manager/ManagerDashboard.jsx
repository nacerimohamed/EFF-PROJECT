import React, { useEffect, useState } from "react";
import axios from "axios";
import ManagerSidebar from "./ManagerSidebar";

const ManagerDashboard = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    axios
      .get("http://127.0.0.1:8000/api/manager/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data.user))
      .catch(() =>
        alert("Erreur lors du chargement du dashboard")
      );
  }, [token]);

  if (!user) return <div className="p-10">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <ManagerSidebar />

      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-green-700 mb-8">
          Manager Dashboard
        </h1>

        <div className="w-full bg-white rounded-xl shadow-lg p-10">
          <h2 className="text-xl font-semibold mb-6">
            Vos informations
          </h2>

          <div className="space-y-4 text-gray-700">
            <p><b>Nom :</b> {user.name}</p>
            <p><b>Email :</b> {user.email}</p>
            <p><b>Adresse :</b> {user.address || "Non définie"}</p>
            <p>
              <b>Rôle :</b>{" "}
              <span className="bg-green-600 text-white px-3 py-1 rounded">
                Manager
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;