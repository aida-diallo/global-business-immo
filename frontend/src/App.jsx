// src/App.jsx - FICHIER PRINCIPAL AVEC ROUTING (MIS À JOUR)

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from "./hooks/useAuth"; // Importez le hook de sécurité

// --- Composants du Site Public (Existants) ---
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ProprietesPage from './pages/ProprietesPage';
// Vous décommenterez ces lignes quand vous les aurez créées :
// import CataloguePage from './pages/CataloguePage'; 
// import AProposPage from './pages/AProposPage';
// import ContactPage from './pages/ContactPage';

// --- Composants du Dashboard Admin (Nouveaux) ---
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import ProprietesManagement from './pages/admin/ProprietesManagement'; 
import ReservationManagement from './pages/admin/ReservationManagementPage'; 
import PropertyDetailPage from './pages/PropertyDetailPage';
import TransactionImmoPage from './pages/services/TransactionImmoPage';
import LocalisationPage from './pages/services/LocalisationPage';
import GestionBienPage from './pages/services/GestionBienPage';
import VenteTerrainPage from './pages/services/VenteTerrainPage';
import ConstructionPage from './pages/services/ConstructionPage';
import PlansArchitecturauxPage from './pages/services/PlansArchitecturauxPage';
import EnregistrementPage from './pages/services/EnregistrementPage';
import ConseilImmoPage from './pages/services/ConseilImmoPage';
import TopographiePage from './pages/services/TopographiePage';
import UserManagementPage from './pages/admin/UserManagementPage';

// --- Layouts ---
import PublicLayout from './layouts/PublicLayout'; // Pour le site public
import AdminLayout from './layouts/AdminLayout';   // Pour le dashboard sécurisé
// import ConstructionPage from './pages/services/ConstructionPage';


function App() {
    const { token } = useAuth(); // Récupère le token pour vérifier l'état de connexion

    return (
        <Routes>
            {/* -------------------------------------- */}
            {/* 1. ROUTES PUBLIQUES (Site Visiteur) */}
            {/* Ces pages utilisent le PublicLayout (Navbar, Footer du site) */}
            {/* -------------------------------------- */}
            <Route path="/" element={<PublicLayout />}>
                {/* La page d'accueil est la route index de PublicLayout */}
                <Route index element={<HomePage />} /> 
                <Route path="services" element={<ServicesPage />} />
                <Route path="proprietes" element={<ProprietesPage />} />
                <Route path="proprietes/:id" element={<PropertyDetailPage />} />
                <Route path="/services/transactionImmoPage" element={<TransactionImmoPage />} />
                <Route path="/services/localisationPage" element={<LocalisationPage />} />
                <Route path="/services/gestionBienPage" element={<GestionBienPage />} />
                <Route path="/services/venteTerrainPage" element={<VenteTerrainPage />} />
                <Route path="/services/constructionPage" element={<ConstructionPage />} />
                <Route path="/services/PlansArchitecturauxPage" element={<PlansArchitecturauxPage />} />
                <Route path="/services/EnregistrementPage" element={<EnregistrementPage />} />
                <Route path="/services/ConseilImmoPage" element={<ConseilImmoPage />} />
                <Route path="/services/TopographiePage" element={<TopographiePage />} />
                {/* Décommentez les autres routes publiques ici : */}
                {/* <Route path="apropos" element={<AProposPage />} /> */}
                {/* <Route path="contact" element={<ContactPage />} /> */}
            </Route>

            {/* -------------------------------------- */}
            {/* 2. ROUTE DE CONNEXION (Employés) */}
            {/* Si un employé est déjà connecté, on le redirige vers le dashboard */}
            {/* -------------------------------------- */}
            <Route 
                path="/login" 
                element={token ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
            />

            {/* -------------------------------------- */}
            {/* 3. ROUTES SÉCURISÉES (Dashboard Admin) */}
            {/* -------------------------------------- */}
            {token ? (
                // Si l'utilisateur est connecté, il accède aux routes du dashboard
                <Route path="/dashboard" element={<AdminLayout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="proprietes" element={<ProprietesManagement />} />
                    {/* CORRECTION : Remplacement du chemin absolu par un chemin relatif */}
                    <Route path="reservations" element={<ReservationManagement />} />
                    <Route path="users" element={<UserManagementPage />} />
                    {/* Ajoutez ici toutes les autres vues sécurisées (ex: users, reservations) */}
                </Route>
            ) : (
                // Si l'utilisateur n'est PAS connecté et tente d'accéder à /dashboard/*, 
                // on le redirige vers /login
                <Route path="/dashboard/*" element={<Navigate to="/login" replace />} />
            )}

            {/* -------------------------------------- */}
            {/* 4. ROUTE 404 - Page non trouvée */}
            {/* -------------------------------------- */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

// Composant simple pour la page 404 (inchangé)
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