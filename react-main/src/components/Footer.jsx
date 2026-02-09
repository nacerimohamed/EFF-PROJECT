import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white">
      <div className="container mx-auto px-4 py-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Contact Admin */}
          <div>
            <h3 className="font-bold mb-3 text-green-300">CONTACT ADMIN</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">admin@cooperative.ma</span>
              </div>
              
              <div className="flex items-center">
                <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm">+212 6 12 34 56 78</span>
              </div>
            </div>
          </div>

          {/* Suivez-nous */}
          <div>
            <h3 className="font-bold mb-3 text-green-300">SUIVEZ-NOUS</h3>
            <div className="flex space-x-3">
              <a href="#" className="text-green-300 hover:text-white">
                Facebook
              </a>
              <a href="#" className="text-green-300 hover:text-white">
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-4 pt-4 border-t border-green-800 text-center">
          <p className="text-green-400 text-xs">
            © {new Date().getFullYear()} Coopérative.ma
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;