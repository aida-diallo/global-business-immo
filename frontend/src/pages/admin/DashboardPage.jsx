import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth'; 

const DashboardPage = () => {
    const { token, user } = useAuth();
    const [kpis, setKpis] = useState({ totalProprietes: 0, reservationsEnAttente: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchKpis = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/proprietes/stats/kpis', {
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                });
                setKpis(response.data); 
            } catch (error) {
                console.error("Erreur lors du chargement des KPIs:", error);
                setKpis({ totalProprietes: 'N/A', reservationsEnAttente: 'N/A' });
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchKpis();
        }
    }, [token]);

    return (
        <>
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }

                    .kpi-card {
                        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    }

                    .kpi-card:hover {
                        transform: translateY(-8px) scale(1.02);
                        box-shadow: 0 15px 35px rgba(0,0,0,0.2) !important;
                    }
                `}
            </style>

            {/* CORRECTION DU SCROLL : Supprimer 'height: 100%' et 'overflow: hidden' */}
            <div style={dashboardContainerStyle}>
                
                {/* EN-TÊTE DU DASHBOARD */}
                <div style={headerSectionStyle}>
                    <div>
                        <h1 style={titleStyle}>Tableau de Bord Principal</h1>
                        <h2 style={welcomeStyle}>Bienvenue, {user?.nom} ({user?.role}) 👋</h2>
                        <p style={descriptionStyle}>Ceci est l'espace sécurisé réservé au personnel de l'entreprise.</p>
                    </div>
                </div>

                {/* SECTION DES KPI MODERNES */}
                <div style={kpiGridStyle}>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '40px', gridColumn: '1 / -1' }}>
                            <div style={loaderStyle}></div>
                            <p style={{ color: '#7f8c8d', marginTop: '15px' }}>Chargement des données...</p>
                        </div>
                    ) : (
                        <>
                            {/* KPI 1 : Total Propriétés */}
                            <div className="kpi-card" style={{...kpiCardStyle, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                                <div style={kpiIconContainerStyle}>
                                    <span style={kpiIconStyle}>🏠</span>
                                </div>
                                <div style={kpiContentStyle}>
                                    <h3 style={kpiLabelStyle}>Total Propriétés</h3>
                                    <p style={kpiValueStyle}>{kpis.totalProprietes}</p>
                                </div>
                            </div>
                            
                            {/* KPI 2 : Réservations en Attente */}
                            <div className="kpi-card" style={{...kpiCardStyle, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
                                <div style={kpiIconContainerStyle}>
                                    <span style={kpiIconStyle}>⏳</span>
                                </div>
                                <div style={kpiContentStyle}>
                                    <h3 style={kpiLabelStyle}>Réservations en Attente</h3>
                                    <p style={kpiValueStyle}>{kpis.reservationsEnAttente}</p> 
                                </div>
                            </div>

                            {/* KPI 3 : Exemple supplémentaire */}
                            <div className="kpi-card" style={{...kpiCardStyle, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>
                                <div style={kpiIconContainerStyle}>
                                    <span style={kpiIconStyle}>✅</span>
                                </div>
                                <div style={kpiContentStyle}>
                                    <h3 style={kpiLabelStyle}>Réservations Confirmées</h3>
                                    <p style={kpiValueStyle}>--</p>
                                </div>
                            </div>

                            {/* KPI 4 : Exemple supplémentaire */}
                            <div className="kpi-card" style={{...kpiCardStyle, background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'}}>
                                <div style={kpiIconContainerStyle}>
                                    <span style={kpiIconStyle}>📊</span>
                                </div>
                                <div style={kpiContentStyle}>
                                    <h3 style={kpiLabelStyle}>Revenus du Mois</h3>
                                    <p style={kpiValueStyle}>--</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* SECTION ACTIVITÉS RÉCENTES */}
                <div style={activitySectionStyle}>
                    <h3 style={sectionTitleStyle}>Activités Récentes</h3>
                    <div style={activityCardStyle}>
                        <p style={{ color: '#7f8c8d', textAlign: 'center', padding: '40px' }}>
                            Ajouter ici la liste des 5 dernières actions (réservations, propriétés ajoutées...).
                        </p>
                    </div>
                </div>

                {/* Ajout de contenu de remplissage pour forcer le défilement à des fins de test */}
                <div style={{ marginTop: '50px', padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <h3 style={{ color: '#2c3e50' }}>Contenu de Test Long</h3>
                    <div style={{ height: '500px', backgroundColor: '#ecf0f5', border: '1px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <p style={{ color: '#7f8c8d' }}>Ce bloc est là pour forcer le contenu à dépasser la hauteur de la fenêtre et tester le défilement.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

// ----------------------------------------
// STYLES CSS DU DASHBOARD (Corrigés)
// ----------------------------------------

const dashboardContainerStyle = {
    padding: '40px',
    boxSizing: 'border-box',
    width: '100%',
    backgroundColor: '#ecf0f5',
    // height et overflow retirés pour laisser le parent gérer le scroll
};


const headerSectionStyle = {
    marginBottom: '35px',
};

const titleStyle = {
    color: '#2c3e50', 
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '8px',
    margin: 0,
};

const welcomeStyle = {
    color: '#34495e',
    fontSize: '22px',
    fontWeight: '600',
    marginBottom: '8px',
    marginTop: '8px',
};

const descriptionStyle = {
    color: '#7f8c8d',
    fontSize: '15px',
    marginBottom: '0',
    marginTop: '5px',
};

const kpiGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
    gap: '25px',
    marginBottom: '40px',
};

const kpiCardStyle = {
    padding: '0',
    borderRadius: '16px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.12)', 
    cursor: 'pointer',
    overflow: 'hidden',
    position: 'relative',
    minHeight: '160px',
};

const kpiIconContainerStyle = {
    position: 'absolute',
    top: '20px',
    left: '25px',
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)',
};

const kpiIconStyle = {
    fontSize: '2em',
};

const kpiContentStyle = {
    padding: '25px',
    paddingTop: '105px',
    color: 'white',
};

const kpiLabelStyle = {
    fontSize: '1em',
    fontWeight: '500',
    marginBottom: '10px',
    margin: 0,
    opacity: 0.95,
};

const kpiValueStyle = {
    fontSize: '2.8em', 
    margin: '5px 0 0 0',
    fontWeight: 'bold',
    textShadow: '0 2px 10px rgba(0,0,0,0.2)',
};

const activitySectionStyle = {
    marginTop: '45px',
};

const sectionTitleStyle = {
    color: '#2c3e50',
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '20px',
};

const activityCardStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    minHeight: '200px',
};

const loaderStyle = {
    width: '50px',
    height: '50px',
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #E06B3A',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto',
};

export default DashboardPage;