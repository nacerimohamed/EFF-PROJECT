import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "manager",
    address: "",
    image: null
  });
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    role: "manager",
    address: "",
    image: null
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [editPreviewImage, setEditPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Configuration axios pour debug
  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  const fetchUsers = async () => {
    try {
      console.log("Fetching users...");
      const res = await api.get("/admin/users");
      console.log("Users fetched:", res.data);
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      console.error("Error response:", err.response);
      alert("Impossible de récupérer les utilisateurs: " + (err.response?.data?.message || err.message));
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file
    });
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleEditFileChange = (e) => {
    const file = e.target.files[0];
    setEditFormData({
      ...editFormData,
      image: file
    });
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setEditPreviewImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('password', formData.password);
      data.append('role', formData.role);
      data.append('address', formData.address);
      if (formData.image) {
        data.append('image', formData.image);
      }

      console.log("Creating user...");
      await axios.post("http://127.0.0.1:8000/api/admin/users", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });

      alert("Utilisateur créé avec succès !");
      setShowModal(false);
      resetForm();
      fetchUsers();
    } catch (err) {
      console.error("Error creating user:", err);
      console.error("Error response:", err.response?.data);
      alert("Erreur lors de la création de l'utilisateur: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (user) => {
    try {
      console.log("Editing user ID:", user.id);
      setCurrentUser(user);
      
      // Pré-remplir le formulaire avec les données actuelles
      setEditFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address || "",
        image: null
      });
      
      // Afficher l'image actuelle si elle existe
      if (user.image) {
        const imageUrl = `http://127.0.0.1:8000/storage/${user.image}`;
        console.log("Current image URL:", imageUrl);
        setEditPreviewImage(imageUrl);
      } else {
        setEditPreviewImage(null);
      }
      
      setShowEditModal(true);
    } catch (err) {
      console.error("Error preparing edit:", err);
      alert("Erreur lors du chargement des données utilisateur");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!currentUser) {
      alert("Aucun utilisateur sélectionné");
      return;
    }

    try {
      console.log("Updating user ID:", currentUser.id);
      
      const data = new FormData();
      data.append('name', editFormData.name);
      data.append('email', editFormData.email);
      data.append('role', editFormData.role);
      data.append('address', editFormData.address);
      
      // Ajouter _method pour Laravel si besoin
      data.append('_method', 'PUT');
      
      if (editFormData.image) {
        console.log("New image to upload");
        data.append('image', editFormData.image);
      }

      console.log("FormData to send:");
      for (let [key, value] of data.entries()) {
        console.log(key, value);
      }

      const response = await axios.post(
        `http://127.0.0.1:8000/api/admin/users/${currentUser.id}`, 
        data, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log("Update response:", response.data);
      
      alert("Utilisateur modifié avec succès !");
      setShowEditModal(false);
      fetchUsers();
    } catch (err) {
      console.error("Error updating user:", err);
      console.error("Error response:", err.response?.data);
      
      let errorMessage = "Erreur lors de la modification de l'utilisateur";
      if (err.response?.data?.errors) {
        errorMessage += "\n" + Object.values(err.response.data.errors).flat().join("\n");
      } else if (err.response?.data?.message) {
        errorMessage += ": " + err.response.data.message;
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;
    
    try {
      console.log("Deleting user ID:", id);
      await axios.delete(`http://127.0.0.1:8000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setUsers(users.filter(u => u.id !== id));
      alert("Utilisateur supprimé avec succès !");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Impossible de supprimer l'utilisateur: " + (err.response?.data?.message || err.message));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "manager",
      address: "",
      image: null
    });
    setPreviewImage(null);
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-700">Gestion des utilisateurs</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Chargement...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Ajouter un utilisateur
              </>
            )}
          </button>
        </div>



        {/* Tableau des utilisateurs */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {users.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Aucun utilisateur trouvé.
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Nom</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Rôle</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-b hover:bg-gray-100">
                    <td className="p-3">{u.id}</td>
                    <td className="p-3 font-medium">{u.name}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs ${u.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(u)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          disabled={loading}
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => handleDelete(u.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          disabled={loading}
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal d'ajout */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-md">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold">Nouvel utilisateur</h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="block mb-1">Nom *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Mot de passe *</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Rôle *</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value="manager">Manager</option>
                      <option value="admin">Administrateur</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1">Adresse</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full border rounded px-3 py-2"
                    />
                    {previewImage && (
                      <img src={previewImage} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded" />
                    )}
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="px-4 py-2 border rounded"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    disabled={loading}
                  >
                    {loading ? "Création..." : "Créer"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal de modification */}
        {showEditModal && currentUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-md">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold">Modifier {currentUser.name}</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleUpdate} className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="block mb-1">Nom *</label>
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleEditInputChange}
                      required
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditInputChange}
                      required
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Rôle *</label>
                    <select
                      name="role"
                      value={editFormData.role}
                      onChange={handleEditInputChange}
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value="manager">managerérateur</option>
                      <option value="admin">Administrateur</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1">Adresse</label>
                    <input
                      type="text"
                      name="address"
                      value={editFormData.address}
                      onChange={handleEditInputChange}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleEditFileChange}
                      className="w-full border rounded px-3 py-2"
                    />
                    {editPreviewImage && (
                      <img 
                        src={editPreviewImage} 
                        alt="Preview" 
                        className="mt-2 w-20 h-20 object-cover rounded border"
                        onError={(e) => {
                          console.error("Image load error");
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 border rounded"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    disabled={loading}
                  >
                    {loading ? "Sauvegarde..." : "Sauvegarder"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;