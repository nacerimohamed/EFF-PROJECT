import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import emailjs from "emailjs-com";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    emailjs
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "YOUR_PUBLIC_KEY"
      )
      .then(
        () => {
          toast.success("Message envoyé avec succès! Nous vous répondrons bientôt.");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error("EmailJS Error:", error);
          toast.error("Erreur lors de l'envoi. Veuillez réessayer.");
        }
      )
      .finally(() => {
        setSending(false);
      });
  };

  return (
    <>
      <Navbar />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      {/* Hero Section avec dégradé */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-block mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 w-24 h-24 flex items-center justify-center mx-auto">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Contactez-Nous
          </h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto mb-8">
            Une question, un projet ou une collaboration ? Notre équipe est à votre écoute
          </p>
          <div className="w-24 h-1 bg-green-300 mx-auto"></div>
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Contact Form - Carte élégante */}
          <div className="bg-gradient-to-br from-white to-gray-50 p-10 rounded-2xl shadow-2xl border border-gray-100">
            <div className="mb-10">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Envoyez-nous un message
              </h2>
              <p className="text-gray-600 text-lg">
                Remplissez ce formulaire et nous vous répondrons dans les plus brefs délais
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-3 text-lg">
                  Nom complet
                </label>
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                    placeholder="Votre nom complet"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-3 text-lg">
                  Email
                </label>
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-3 text-lg">
                  Message
                </label>
                <div className="relative">
                  <svg className="absolute left-4 top-6 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                  </svg>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 resize-none"
                    placeholder="Décrivez votre projet ou votre question..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {sending ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-6 w-6 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Envoi en cours...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                    Envoyer le message
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Carte d'information principale */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-10 rounded-2xl border border-green-100">
              <h2 className="text-4xl font-bold text-gray-800 mb-10">
                Informations de contact
              </h2>
              
              <div className="space-y-10">
                <div className="flex items-start group">
                  <div className="bg-green-100 text-green-600 p-4 rounded-2xl mr-6 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div className="group-hover:translate-x-2 transition-transform duration-300">
                    <h3 className="font-bold text-gray-800 mb-2 text-xl">Email</h3>
                    <p className="text-gray-600 text-lg">contact@cooperative.ma</p>
                    <p className="text-gray-500 text-sm mt-1">Réponse sous 24h</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="bg-green-100 text-green-600 p-4 rounded-2xl mr-6 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div className="group-hover:translate-x-2 transition-transform duration-300">
                    <h3 className="font-bold text-gray-800 mb-2 text-xl">Téléphone</h3>
                    <p className="text-gray-600 text-lg">+212 5XX-XXXXXX</p>
                    <p className="text-gray-500 text-sm mt-1">Lun-Ven : 9h-18h</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="bg-green-100 text-green-600 p-4 rounded-2xl mr-6 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div className="group-hover:translate-x-2 transition-transform duration-300">
                    <h3 className="font-bold text-gray-800 mb-2 text-xl">Adresse</h3>
                    <p className="text-gray-600 text-lg">
                      123 Rue des Coopératives<br />
                      Casablanca, Maroc
                    </p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="bg-green-100 text-green-600 p-4 rounded-2xl mr-6 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div className="group-hover:translate-x-2 transition-transform duration-300">
                    <h3 className="font-bold text-gray-800 mb-2 text-xl">Horaires</h3>
                    <p className="text-gray-600 text-lg">
                      Lundi - Vendredi: 9h00 - 18h00<br />
                      Samedi: 9h00 - 13h00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Carte réseaux sociaux */}
<div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
  <h3 className="text-3xl font-bold text-gray-800 mb-8">
    Suivez-nous sur les réseaux
  </h3>
  <div className="grid grid-cols-3 gap-4">
    <a
      href="#"
      className="group bg-blue-50 p-6 rounded-xl hover:bg-blue-600 transition-all duration-300 text-center transform hover:-translate-y-2"
    >
      <div className="text-blue-600 group-hover:text-white mb-3">
        <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      </div>
      <span className="font-semibold text-gray-800 group-hover:text-white">Facebook</span>
    </a>
    <a
      href="#"
      className="group bg-pink-50 p-6 rounded-xl hover:bg-pink-600 transition-all duration-300 text-center transform hover:-translate-y-2"
    >
      <div className="text-pink-600 group-hover:text-white mb-3">
        <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v8m0 0v4m0-4h4m-4 0H8m12-4a8 8 0 11-16 0 8 8 0 0116 0z"></path>
        </svg>
      </div>
      <span className="font-semibold text-gray-800 group-hover:text-white">Instagram</span>
    </a>
    <a
      href="#"
      className="group bg-green-50 p-6 rounded-xl hover:bg-green-600 transition-all duration-300 text-center transform hover:-translate-y-2"
    >
      <div className="text-green-600 group-hover:text-white mb-3">
        <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472,14.382c-0.297,0.149-1.758,0.867-2.03,0.967c-0.272,0.099-0.471,0.149-0.671,0.149c-0.421,0-0.512-0.128-0.73-0.447c-0.218-0.318-0.836-1.058-1.188-1.408c-0.395-0.387-0.594-0.446-0.791-0.446c-0.198,0-0.396,0.05-0.594,0.05c-0.198,0-0.521-0.05-0.818-0.198c-0.297-0.149-1.058-0.422-1.997-1.158c-0.74-0.644-1.237-1.436-1.383-1.677c-0.198-0.347-0.025-0.535,0.149-0.694c0.174-0.149,0.396-0.347,0.594-0.521c0.198-0.174,0.272-0.297,0.396-0.446c0.124-0.149,0.062-0.274-0.035-0.372c-0.099-0.099-0.892-1.087-1.188-1.485c-0.31-0.421-0.694-0.446-0.943-0.446c-0.249,0-0.521,0.05-0.818,0.198c-0.297,0.149-1.092,0.545-1.287,1.436c-0.198,0.892,0.198,1.955,0.967,2.873c0.77,0.918,3.045,2.898,5.187,3.67c1.189,0.421,1.632,0.471,2.229,0.421c0.594-0.05,1.908-0.793,2.18-1.558c0.272-0.77,0.272-1.436,0.198-1.558C17.719,14.334,17.596,14.334,17.472,14.382z" />
          <path d="M12,0C5.373,0,0,5.373,0,12c0,6.627,5.373,12,12,12s12-5.373,12-12C24,5.373,18.627,0,12,0z M12,22.5C6.21,22.5,1.5,17.79,1.5,12S6.21,1.5,12,1.5S22.5,6.21,22.5,12S17.79,22.5,12,22.5z" />
        </svg>
      </div>
      <span className="font-semibold text-gray-800 group-hover:text-white">WhatsApp</span>
    </a>
  </div>
</div>

            {/* Carte réponse garantie */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-2xl text-center">
              <div className="mb-4">
                <svg className="w-12 h-12 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h4 className="text-2xl font-bold mb-3">Réponse rapide garantie</h4>
              <p className="text-green-100">
                Nous nous engageons à vous répondre dans les 24 heures ouvrables
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;