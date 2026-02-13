import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import { toast, ToastContainer } from "react-toastify";
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentMessages, setRecentMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const messagesPerPage = 3;

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data.stats);
      } catch (err) {
        console.error(err);
        alert("Impossible de récupérer les données du dashboard admin");
      }
    };
    
    const fetchRecentMessages = async () => {
      try {
        setLoadingMessages(true);
        const res = await axios.get("http://127.0.0.1:8000/api/admin/contacts/recent", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setRecentMessages(res.data.data);
        }
      } catch (err) {
        console.error("Erreur messages récents:", err);
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchStats();
    fetchRecentMessages();
  }, [token]);

  const handleDeleteMessage = async (messageId) => {
    try {
      setDeletingId(messageId);
      await axios.delete(`http://127.0.0.1:8000/api/admin/contacts/${messageId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setRecentMessages(prev => prev.filter(msg => msg.id !== messageId));
      setShowDeleteConfirm(null);
      
      const newTotalPages = Math.ceil((recentMessages.length - 1) / messagesPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
      
      toast.success('Message supprimé avec succès');
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
      toast.error('Erreur lors de la suppression');
    } finally {
      setDeletingId(null);
    }
  };

  const handleMarkAsRead = async (messageId) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/admin/contacts/${messageId}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setRecentMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, status: 'lu' } : msg
        )
      );
      
      toast.success('Message marqué comme lu');
    } catch (err) {
      console.error("Erreur:", err);
      toast.error('Erreur lors du marquage');
    }
  };

  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = recentMessages.slice(indexOfFirstMessage, indexOfLastMessage);
  const totalPages = Math.ceil(recentMessages.length / messagesPerPage);

  if (!stats) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 to-white">
        <AdminSidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="relative">
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-emerald-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-4 border-emerald-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  const unreadCount = recentMessages.filter(msg => msg.status === 'non lu').length;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 to-white">
      <AdminSidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-emerald-600 text-white rounded-lg shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-10 mt-16 lg:mt-0">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8 lg:mb-10 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl relative overflow-hidden"
        >
          <div className="relative z-10">
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-1 sm:mb-2 flex flex-wrap items-center gap-2 sm:gap-3">
              ⵣ Dashboard Admin
              <span className="text-emerald-200 text-xs sm:text-sm font-light">Ouarzazate</span>
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-300 rounded-full"></span>
              Bienvenue dans votre espace d'administration • تاونات
            </p>
          </div>
        </motion.div>

        {/* Stats Cards - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 lg:mb-10">
          {[
            { 
              label: 'Total Utilisateurs', 
              value: stats.total_users, 
              icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
              from: 'from-emerald-500',
              to: 'to-emerald-700',
              bg: 'bg-gradient-to-br from-emerald-100 to-emerald-200',
              text: 'text-emerald-700',
              border: 'border-emerald-200'
            },
            { 
              label: 'Administrateurs', 
              value: stats.admins, 
              icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
              from: 'from-emerald-500',
              to: 'to-emerald-600',
              bg: 'bg-gradient-to-br from-emerald-100 to-emerald-200',
              text: 'text-emerald-700',
              border: 'border-emerald-200'
            },
            { 
              label: 'Gestionnaires', 
              value: stats.manager, 
              icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
              from: 'from-emerald-400',
              to: 'to-emerald-600',
              bg: 'bg-gradient-to-br from-emerald-100 to-emerald-200',
              text: 'text-emerald-700',
              border: 'border-emerald-200'
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${item.from} ${item.to}`}></div>
              <div className="p-3 sm:p-4 lg:p-6 pl-4 sm:pl-6 lg:pl-8">
                <div className={`${item.bg} w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <svg className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 ${item.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.icon} />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-0.5 sm:mb-1">{item.label}</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-stone-800">{item.value.toLocaleString()}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Messages Section - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl border border-emerald-200 overflow-hidden relative"
        >
          {/* Header - Responsive */}
          <div className="px-3 sm:px-4 lg:px-6 xl:px-8 py-2 sm:py-3 bg-gradient-to-r from-emerald-50 to-white border-b border-emerald-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                <div className="relative">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 bg-gradient-to-br from-emerald-600 to-emerald-400 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 bg-emerald-500 border border-white"></span>
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-stone-800 flex flex-wrap items-center gap-1 sm:gap-2">
                    Messages de contact
                    <span className="text-emerald-600 text-xs sm:text-sm font-normal">• تاونات</span>
                  </h2>
                  <div className="flex items-center gap-2 sm:gap-3 mt-0.5 sm:mt-1">
                    <span className="flex items-center gap-1 text-xs sm:text-sm text-stone-500">
                      <span className="font-semibold text-emerald-600">{recentMessages.length}</span> total
                    </span>
                    <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-emerald-300 rounded-full"></span>
                    <span className="flex items-center gap-1 text-xs sm:text-sm text-stone-500">
                      <span className="font-semibold text-emerald-600">{unreadCount}</span> non lus
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 bg-white/80 backdrop-blur-sm rounded-lg text-xs sm:text-sm font-medium text-emerald-600 border border-emerald-200">
                  Page {currentPage}/{totalPages || 1}
                </span>
              </div>
            </div>
          </div>

          {/* Liste Messages - Responsive */}
          <div className="divide-y divide-emerald-100">
            {loadingMessages ? (
              <div className="px-3 sm:px-4 lg:px-6 xl:px-8 py-8 sm:py-12 lg:py-16 text-center">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-emerald-100"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin"></div>
                </div>
                <p className="text-emerald-600 mt-3 sm:mt-4 text-sm sm:text-base font-medium">Chargement des messages...</p>
              </div>
            ) : currentMessages.length === 0 ? (
              <div className="px-3 sm:px-4 lg:px-6 xl:px-8 py-8 sm:py-12 lg:py-16 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <p className="text-stone-600 text-sm sm:text-base font-medium">Aucun message pour le moment</p>
                <p className="text-xs sm:text-sm text-emerald-500 mt-1">Les nouveaux messages apparaîtront ici</p>
              </div>
            ) : (
              currentMessages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative px-3 sm:px-4 lg:px-6 xl:px-8 py-3 sm:py-4 lg:py-5 xl:py-6 hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-white/50 transition-all duration-300"
                >
                  {message.status === 'non lu' && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-4 sm:h-6 lg:h-8 bg-gradient-to-b from-emerald-500 to-emerald-700 rounded-r-full"></div>
                  )}
                  <div className="flex items-start gap-2 sm:gap-3 lg:gap-4">
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 rounded-lg sm:rounded-xl flex items-center justify-center text-xs sm:text-sm lg:text-base xl:text-lg font-bold shadow-lg flex-shrink-0 ${
                      message.status === 'non lu' 
                        ? 'bg-gradient-to-br from-emerald-500 to-emerald-700 text-white' 
                        : 'bg-gradient-to-br from-stone-400 to-emerald-600 text-white'
                    }`}>
                      {message.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 lg:gap-3 mb-0.5 sm:mb-1 lg:mb-2">
                        <h3 className="text-xs sm:text-sm lg:text-base font-bold text-stone-800">{message.name}</h3>
                        {message.status === 'non lu' && (
                          <span className="px-1.5 sm:px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                            Nouveau
                          </span>
                        )}
                        <span className="text-xs text-emerald-500 ml-auto flex items-center gap-1">
                          <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {new Date(message.created_at).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-600 line-clamp-2">{message.message}</p>
                      <div className="mt-2 sm:mt-3 flex flex-wrap items-center gap-2">
                        {message.status === 'non lu' && (
                          <button 
                            onClick={() => handleMarkAsRead(message.id)}
                            className="text-emerald-600 text-xs font-semibold px-2 py-1 rounded-lg hover:bg-emerald-50 transition"
                          >
                            Marquer comme lu
                          </button>
                        )}
                        <button 
                          onClick={() => setShowDeleteConfirm(message.id)}
                          className="text-red-600 text-xs font-semibold px-2 py-1 rounded-lg hover:bg-red-50 transition"
                        >
                          Supprimer
                        </button>
                      </div>
                      {showDeleteConfirm === message.id && (
                        <div className="mt-2 text-xs sm:text-sm text-stone-700">
                          <span>Confirmer suppression? </span>
                          <button 
                            onClick={() => handleDeleteMessage(message.id)}
                            className="text-red-600 font-semibold px-1 sm:px-2"
                            disabled={deletingId === message.id}
                          >
                            {deletingId === message.id ? 'Suppression...' : 'Oui'}
                          </button>
                          <button 
                            onClick={() => setShowDeleteConfirm(null)}
                            className="text-stone-500 px-1 sm:px-2"
                          >
                            Non
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Pagination - Responsive */}
          {totalPages > 1 && (
            <div className="px-3 sm:px-4 lg:px-6 xl:px-8 py-2 sm:py-3 lg:py-4 flex flex-wrap justify-center sm:justify-end gap-1 sm:gap-2 border-t border-emerald-100">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-2 sm:px-2.5 lg:px-3 py-0.5 sm:py-1 rounded-lg text-xs sm:text-sm font-medium border ${
                    page === currentPage
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white border-emerald-600'
                      : 'bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-50'
                  } transition`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Signature - Responsive */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 sm:mt-5 lg:mt-6 text-center"
        >
          <p className="text-xs sm:text-sm text-emerald-600 flex items-center justify-center gap-1 sm:gap-2">
            <span className="w-4 sm:w-6 lg:w-8 h-px bg-gradient-to-r from-transparent to-emerald-300"></span>
            ⵣ Dashboard Admin • 2026
            <span className="w-4 sm:w-6 lg:w-8 h-px bg-gradient-to-l from-transparent to-emerald-300"></span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;