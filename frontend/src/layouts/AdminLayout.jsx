import React, { useState, useEffect } from 'react'; // Ajouté pour gérer l'état et l'API
import { Outlet, Link } from 'react-router-dom';
import axios from 'axios'; // Ajouté pour les appels API
import { useAuth } from '../hooks/useAuth';

// L'URL de base pour les API (assurez-vous que c'est la bonne)
const API_BASE_URL = 'http://localhost:5000/api'; 

const AdminLayout = () => {
    const { user, isAdmin, logout, token } = useAuth(); // Récupération du token pour l'API
    
    // ÉTAT : Stocker le nombre de réservations en attente
    const [pendingReservationsCount, setPendingReservationsCount] = useState(0); 
    const [loadingCount, setLoadingCount] = useState(true);

    // --- Fonction de Récupération du Compte ---
    // Cette fonction utilise le point de terminaison général des réservations
    const fetchPendingReservationsCount = async () => {
        if (!token) {
            setLoadingCount(false);
            return 0;
        }

        try {
            // Appeler le même endpoint que votre page de gestion des réservations
            const response = await axios.get(`${API_BASE_URL}/reservations`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            // Logique CLÉ : Filtrer les réservations pour compter celles qui sont 'En attente'
            const allReservations = response.data;
            const pendingCount = allReservations.filter(res => res.statut_reservation === 'En attente').length;
            
            setPendingReservationsCount(pendingCount);
            return pendingCount;
        } catch (error) {
            console.error("Erreur de chargement du compte de réservations en attente:", error);
            // En cas d'erreur, afficher 0
            setPendingReservationsCount(0); 
            return 0;
        } finally {
            setLoadingCount(false);
        }
    };


    // EFFET : Lancer la récupération du compte au chargement
    useEffect(() => {
        fetchPendingReservationsCount();
    }, [token]);


    // Variables de dimensions clés
    const SIDEBAR_WIDTH = 280;
    const HEADER_HEIGHT = 85;
    const HEADER_PADDING_X = '40px';

    return (
        <>
            <style>
                {/* ... (Vos styles CSS inchangés) ... */}
                {`
                * {
                    box-sizing: border-box;
                }

                nav a {
                    color: #a5b3c4;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    padding: 14px 18px;
                    border-radius: 10px;
                    transition: all 0.3s;
                    font-size: 0.95em;
                    font-weight: 500;
                }

                nav a:hover {
                    background-color: rgba(224, 107, 58, 0.15);
                    color: #E06B3A;
                    transform: translateX(5px);
                }

                nav a.active {
                    background-color: rgba(224, 107, 58, 0.2);
                    color: #E06B3A;
                    font-weight: 600;
                }

                nav::-webkit-scrollbar {
                    width: 6px;
                }

                nav::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.2);
                    border-radius: 10px;
                }
                
                /* Style pour la scrollbar du contenu principal */
                .main-content-scroll::-webkit-scrollbar {
                    width: 8px;
                }
                .main-content-scroll::-webkit-scrollbar-thumb {
                    background: #c0c0c0;
                    border-radius: 4px;
                }
                .main-content-scroll::-webkit-scrollbar-track {
                    background: #ecf0f5;
                }
                `}
            </style>

            {/* CONTENEUR GLOBAL */}
            <div
                style={{
                    width: '100vw',
                    height: '100vh',
                    overflow: 'hidden',
                    backgroundColor: '#ecf0f5',
                }}
            >
                {/* SIDEBAR FIXE (inchangée) */}
                <aside
                    style={{
                        width: SIDEBAR_WIDTH,
                        height: '100vh',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        backgroundColor: '#3c4f65',
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        zIndex: 1000,
                        boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
                    }}
                >
                    {/* LOGO */}
                    <div
                        style={{
                            textAlign: 'center',
                            padding: '30px 20px',
                            borderBottom: '1px solid rgba(255,255,255,0.1)',
                        }}
                    >
                        <img src="/logo.png" alt="Logo" style={{ maxWidth: '120px' }} />
                        <h3 style={{ marginTop: 10, fontSize: '1.3em', fontWeight: '600', color: '#fff' }}>Administrateur Immo</h3>
                    </div>

                    {/* USER */}
                    <div
                        style={{
                            padding: '25px 20px',
                            borderBottom: '1px solid rgba(255,255,255,0.1)',
                            display: 'flex',
                            gap: 15,
                            alignItems: 'center',
                        }}
                    >
                        <div
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: '50%',
                                backgroundColor: '#E06B3A',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            {user?.nom?.charAt(0) || 'A'}
                        </div>
                        <div>
                            <strong style={{ color: '#fff' }}>{user?.nom || 'Admin'}</strong>
                            <div style={{ fontSize: 12, color: '#a5b3c4' }}>
                                Bienvenue 👋
                            </div>
                        </div>
                    </div>

                    {/* MENU */}
                    <nav style={{ flex: 1, overflowY: 'auto', padding: '20px 0' }}>
                        <ul style={{ listStyle: 'none', padding: '0 15px', margin: 0 }}>
                            <li style={{ marginBottom: '8px' }}>
                                <Link to="/dashboard">📊 Tableau de Bord</Link>
                            </li>
                            <li style={{ marginBottom: '8px' }}>
                                <Link to="/dashboard/proprietes">🏠 Propriétés</Link>
                            </li>
                            <li style={{ marginBottom: '8px' }}>
                                <Link to="/dashboard/reservations">⏳ Réservations</Link>
                            </li>
                            {isAdmin && (
                                <li style={{ marginBottom: '8px' }}>
                                    <Link to="/dashboard/users">👥 Utilisateurs</Link>
                                </li>
                            )}
                        </ul>
                    </nav>

                    {/* LOGOUT */}
                    <div style={{ padding: 20 }}>
                        <button
                            onClick={logout}
                            style={{
                                width: '100%',
                                padding: 14,
                                backgroundColor: '#e74c3c',
                                border: 'none',
                                borderRadius: 8,
                                color: 'white',
                                cursor: 'pointer',
                                fontWeight: '600',
                                transition: 'background-color 0.3s',
                            }}
                            onMouseOver={(e) => { e.target.style.backgroundColor = '#c0392b'; }}
                            onMouseOut={(e) => { e.target.style.backgroundColor = '#e74c3c'; }}
                        >
                            Déconnexion
                        </button>
                    </div>
                </aside>

                {/* HEADER FIXE */}
                <header
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: SIDEBAR_WIDTH,
                        right: 0,
                        height: HEADER_HEIGHT,
                        backgroundColor: 'white',
                        padding: `20px ${HEADER_PADDING_X}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        zIndex: 900,
                        color: '#3c4f65',
                    }}
                >
                    {/* Input de recherche (inchangé) */}
                    <input
                        placeholder="Search"
                        style={{
                            width: 400,
                            padding: '12px 20px',
                            borderRadius: 10,
                            border: '1px solid #e0e6ed',
                            backgroundColor: '#f8f9fa',
                            outline: 'none',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.border = '1px solid #E06B3A';
                            e.target.style.backgroundColor = '#fff';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.border = '1px solid #e0e6ed';
                            e.target.style.backgroundColor = '#f8f9fa';
                        }}
                        onFocus={(e) => {
                            e.target.style.border = '1px solid #E06B3A';
                            e.target.style.backgroundColor = '#fff';
                        }}
                        onBlur={(e) => {
                            e.target.style.border = '1px solid #e0e6ed';
                            e.target.style.backgroundColor = '#f8f9fa';
                        }}
                    />


                    <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                        
                        {/* 🔔 ICÔNE CLOCHETTE (AFFICHE LE NOMBRE RÉEL) 🔔 */}
                        <Link 
                            to="/dashboard/reservations" 
                            style={{ 
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 45,
                                height: 45,
                                borderRadius: 10,
                                backgroundColor: '#f8f9fa',
                                color: '#3c4f65',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#ecf0f5';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#f8f9fa';
                            }}
                            title={`Voir ${loadingCount ? '...' : pendingReservationsCount} réservations en attente`}
                        >
                            <span style={{ fontSize: '1.2em' }}>🔔</span>
                            
                            {/* Pastille de notification (Affiche la variable d'état) */}
                            {/* Afficher la pastille si le chargement est terminé ET si le compte est supérieur à zéro */}
                            {!loadingCount && pendingReservationsCount > 0 && (
                                <span
                                    style={{
                                        position: 'absolute',
                                        top: -5,
                                        right: -5,
                                        backgroundColor: '#e74c3c',
                                        color: 'white',
                                        borderRadius: '50%',
                                        width: 20,
                                        height: 20,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.7em',
                                        fontWeight: 'bold',
                                        lineHeight: 1,
                                    }}
                                >
                                    {pendingReservationsCount}
                                </span>
                            )}
                        </Link>
                        {/* FIN ICÔNE CLOCHETTE */}
                        
                         {/* Icône Grille (inchangée) */}
                         <div
                            style={{
                                width: 45,
                                height: 45,
                                borderRadius: 10,
                                backgroundColor: '#f8f9fa',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#ecf0f5'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                        >
                            <span style={{ fontSize: '1.1em' }}>▦</span>
                        </div>

                        <span>admin@info.com</span>
                        <div
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                backgroundColor: '#E06B3A',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            {user?.nom?.charAt(0) || 'A'}
                        </div>
                    </div>
                </header>

                {/* CONTENU SCROLLABLE (inchangé) */}
                <div
                    className="main-content-scroll"
                    style={{
                        position: 'absolute',
                        top: HEADER_HEIGHT,
                        left: SIDEBAR_WIDTH,
                        right: 0,
                        bottom: 0,
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        padding: 30,
                    }}
                >
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default AdminLayout;