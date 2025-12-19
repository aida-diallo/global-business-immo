// src/layouts/PublicLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
// Vous devrez importer ici vos composants de NavBar et de Footer existants
// import Header from '../components/Header'; 
// import Footer from '../components/Footer';

const PublicLayout = () => {
    return (
        <div className="public-layout-container">
            {/* 1. Header/Navigation du Site Public */}
            {/* Si votre Navbar est un composant séparé, importez-le ici */}
            <header style={{ padding: '20px 0', backgroundColor: '#fff', borderBottom: '1px solid #eee' }}>
                {/* Ceci représente votre barre de navigation visible sur la capture d'écran */}
                <nav>
                    {/* Liens : Accueil, Services, Catalogue, À Propos, Contact */}
                    {/* Vous pouvez ajouter ici la barre de recherche et le bouton "Nous contacter" */}
                    <p style={{textAlign: 'center', fontWeight: 'bold'}}>NAVBAR - (Site Public)</p>
                </nav>
            </header>

            {/* 2. Contenu de la Page Spécifique */}
            <main style={{ minHeight: '80vh' }}>
                {/* L'Outlet affiche HomePage, ProprietesPage, ServicesPage, etc. */}
                <Outlet /> 
            </main>

            {/* 3. Footer du Site Public */}
            {/* <footer style={{ padding: '40px 0', backgroundColor: '#333', color: 'white' }}>
                <p style={{textAlign: 'center'}}>FOOTER - (Informations de contact et liens rapides)</p>
            </footer> */}
        </div>
    );
};

export default PublicLayout;