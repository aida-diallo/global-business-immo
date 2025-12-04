// App.js - FICHIER PRINCIPAL AVEC ROUTING
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importez vos pages
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ProprietesPage from './pages/ProprietesPage';
// Vous créerez ces pages plus tard
// import CataloguePage from './pages/CataloguePage';
// import AProposPage from './pages/AProposPage';
// import ContactPage from './pages/ContactPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route pour la page d'accueil */}
        <Route path="/" element={<HomePage />} />
        
        {/* Route pour la page services */}
        <Route path="/services" element={<ServicesPage />} />
        
        {/* Décommentez ces routes quand vous aurez créé les pages */}
        <Route path="/proprietes" element={<ProprietesPage />} />
        {/* <Route path="/apropos" element={<AProposPage />} /> */}
        {/* <Route path="/contact" element={<ContactPage />} /> */}
        
        {/* Route 404 - Page non trouvée */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

// Composant simple pour la page 404
function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-orange-500 mb-4">404</h1>
        <p className="text-2xl text-gray-700 mb-8">Page non trouvée</p>
        <a 
          href="/" 
          className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition inline-block"
        >
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}

export default App;