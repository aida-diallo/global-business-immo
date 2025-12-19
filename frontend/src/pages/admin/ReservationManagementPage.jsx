import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth'; 

// L'URL de base de l'API pour les réservations
const API_URL = 'http://localhost:5000/api/reservations'; 

const ReservationManagementPage = () => {
    const { token, logout } = useAuth(); 
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState({}); // Pour la mise à jour du statut

    // Options de statut (doivent correspondre aux valeurs de la BDD)
    const STATUS_OPTIONS = ['En attente', 'Confirmée', 'Annulée', 'Terminée'];


    // --- Fonction de Chargement des Réservations ---
    const fetchReservations = async () => {
        setLoading(true);
        try {
             const response = await axios.get(API_URL, {
                 headers: { Authorization: `Bearer ${token}` }
             });
             setReservations(response.data); 

             // Mise à jour de selectedStatus après le chargement
             const initialStatus = response.data.reduce((acc, res) => {
                acc[res.id] = res.statut_reservation;
                return acc;
             }, {});
             setSelectedStatus(initialStatus);

             setError(null);
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError("Session expirée (401). Vous allez être déconnecté.");
                if (logout) setTimeout(() => logout(), 2000); 
            } else {
                console.error("Erreur de chargement des réservations:", err);
                setError("Impossible de charger les réservations. Vérifiez la connexion API.");
            }
            setReservations([]);
        } finally {
            setLoading(false);
        }
    };
    
    // --- Fonction de Mise à Jour du Statut ---
    const handleStatusChange = async (reservationId, nouveauStatut) => {
        if (!window.confirm(`Confirmez-vous le changement de statut de la réservation ${reservationId} à "${nouveauStatut}" ?`)) {
            // Rétablir le statut initial si l'utilisateur annule
            const currentDBStatus = reservations.find(r => r.id === reservationId)?.statut_reservation;
            setSelectedStatus(prev => ({ ...prev, [reservationId]: currentDBStatus }));
            return;
        }

        try {
            await axios.put(`${API_URL}/${reservationId}/statut`, 
                { nouveau_statut: nouveauStatut }, 
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            alert(`Statut mis à jour pour la réservation ${reservationId}.`);
            fetchReservations(); // Recharger les données après succès
        } catch (err) {
            console.error("Erreur de mise à jour du statut:", err.response ? err.response.data : err.message);
            alert("Erreur lors de la mise à jour du statut. (Permission Admin requise ?)");
            // En cas d'échec, recharger les données pour restaurer le statut correct
            fetchReservations(); 
        }
    };


    // --- Fonction de Suppression (Admin seulement) ---
    const handleDeleteReservation = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette réservation ?")) return;
        
        try {
            await axios.delete(`${API_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert(`Réservation ${id} supprimée.`);
            fetchReservations(); 
        } catch (err) {
            setError("Erreur lors de la suppression. (Permission Admin requise ?)");
        }
    };


    useEffect(() => {
        if (token) {
            fetchReservations();
        } else if (!loading) {
            setError("Accès refusé. Veuillez vous connecter.");
        }
    }, [token]);


    if (loading) return <h1 style={loadingStyle}>Chargement des réservations...</h1>;
    if (error) return <h1 style={errorStyle}>{error}</h1>;

    return (
        <div style={containerStyle}>
            <h1 style={{ marginBottom: '25px', color: '#3c4f65', fontSize: '30px' }}>
                🗓️ Gestion des Réservations ({reservations.length} demandes)
            </h1>
            
            {/* NOUVEAU: Wrapper pour gérer le débordement horizontal du tableau */}
            <div style={tableWrapperStyle}>
                <table style={tableStyle}>
                    <thead>
                        <tr style={tableHeaderRowStyle}>
                            <th style={tableHeaderCellStyle}>ID</th>
                            <th style={tableHeaderCellStyle}>Propriété ID</th>
                            <th style={tableHeaderCellStyle}>Client (Nom/Email)</th>
                            <th style={tableHeaderCellStyle}>Date Demande</th>
                            <th style={tableHeaderCellStyle}>Statut Actuel</th>
                            <th style={tableHeaderCellStyle}>Nouvelle Action</th>
                            <th style={tableHeaderCellStyle}>Suppression</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map(res => (
                            <tr key={res.id} style={tableRowStyle}>
                                <td style={tableCellStyle}>{res.id}</td>
                                <td style={tableCellStyle}>
                                    <strong style={{ color: '#E06B3A' }}>{res.propriete_id}</strong>
                                </td>
                                <td style={tableCellStyle}>
                                    <strong>{res.client_nom}</strong><br/>
                                    <small style={{ color: '#6c757d' }}>{res.client_email}</small>
                                </td>
                                <td style={tableCellStyle}>
                                    {new Date(res.date_demande).toLocaleDateString()}
                                </td>
                                
                                {/* Colonne du Statut Actuel stylisé (utilise selectedStatus[res.id]) */}
                                <td style={{ ...tableCellStyle, ...statusStyle(selectedStatus[res.id] || res.statut_reservation) }}>
                                    {/* Utilise le statut temporaire ou le statut initial */}
                                    {(selectedStatus[res.id] || res.statut_reservation).toUpperCase()}
                                </td>
                                
                                {/* Colonne de SÉLECTION du Statut */}
                                <td style={tableCellStyle}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <select 
                                            // Utilise le statut sélectionné si défini, sinon le statut initial de la DB
                                            value={selectedStatus[res.id] !== undefined ? selectedStatus[res.id] : res.statut_reservation}
                                            onChange={(e) => setSelectedStatus({ ...selectedStatus, [res.id]: e.target.value })}
                                            style={selectStyle}
                                        >
                                            {STATUS_OPTIONS.map(status => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                        <button 
                                            onClick={() => handleStatusChange(res.id, selectedStatus[res.id] || res.statut_reservation)}
                                            style={actionButtonStyle}
                                            // Désactiver si le statut sélectionné est le même que le statut initial (évite les appels inutiles)
                                            disabled={selectedStatus[res.id] === res.statut_reservation}
                                        >
                                            Appliquer
                                        </button>
                                    </div>
                                </td>

                                {/* Colonne de Suppression */}
                                <td style={tableCellStyle}>
                                    <button 
                                        onClick={() => handleDeleteReservation(res.id)} 
                                        style={deleteButtonStyle}
                                    >
                                        🗑️ Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// -------------------------------------------------------------------
// --- DÉFINITION DES STYLES HARMONISÉS AVEC USER/PROPRIETES ---
// -------------------------------------------------------------------

// Styles de base de la page
const containerStyle = {
    padding: '30px',
    backgroundColor: '#f8f9fa', // Fond gris clair
    minHeight: '100vh', 
    width: '100%',
    // AJOUT: Empêche le conteneur principal de déborder de son parent
    maxWidth: '100%',
    overflowX: 'hidden', 
    boxSizing: 'border-box'
};

const loadingStyle = {
    color: '#3c4f65',
    padding: '30px',
    textAlign: 'center',
};

const errorStyle = {
    color: '#e74c3c',
    padding: '30px',
    textAlign: 'center',
};


// NOUVEAU STYLE: Conteneur du tableau pour gérer le débordement horizontal
const tableWrapperStyle = {
    width: '100%',
    overflowX: 'auto', // Permet le défilement horizontal si le tableau est trop large
    paddingBottom: '10px', // Espace pour la barre de défilement
};


// Styles du Tableau (Harmonisation)
const tableStyle = {
    // Suppression de width: '100%' pour permettre au tableau de s'étendre si nécessaire
    // et laisser le wrapper gérer le débordement.
    minWidth: '900px', // Optionnel: Assure que le tableau a une largeur minimale lisible
    borderCollapse: 'separate',
    borderSpacing: '0 10px', // Espacement entre les lignes
    textAlign: 'left',
};

const tableHeaderRowStyle = {
    backgroundColor: '#E06B3A', // Orange de l'en-tête
    color: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
};

const tableHeaderCellStyle = {
    padding: '15px 20px',
    fontWeight: '600',
    fontSize: '14px',
    textTransform: 'uppercase',
    border: 'none', 
};

const tableRowStyle = {
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)', // Ombre douce
    transition: 'transform 0.2s',
    cursor: 'default',
};

const tableCellStyle = {
    padding: '15px 20px',
    fontSize: '14px',
    color: '#3c4f65',
    border: 'none',
    verticalAlign: 'middle',
};

// Style conditionnel pour le Statut (basé sur le statut de la DB)
const statusStyle = (statut) => {
    let color;
    let bgColor;

    switch (statut) {
        case 'Confirmée':
        case 'Terminée':
            color = 'white';
            bgColor = '#27ae60'; // Vert
            break;
        case 'En attente':
            color = '#3c4f65';
            bgColor = '#f39c12'; // Jaune/Orange
            break;
        case 'Annulée':
            color = 'white';
            bgColor = '#e74c3c'; // Rouge
            break;
        default:
            color = '#3c4f65';
            bgColor = '#ecf0f1'; // Gris clair
            break;
    }
    return { color: color, backgroundColor: bgColor, borderRadius: '5px', padding: '5px 8px', textAlign: 'center', fontWeight: 'bold', whiteSpace: 'nowrap' }; 
};


// Styles des Boutons d'Action et Select
const selectStyle = {
    padding: '8px 10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: 'white',
    color: '#3c4f65',
    fontSize: '14px',
    minWidth: '120px'
};

const actionButtonStyle = { 
    padding: '8px 15px', 
    backgroundColor: '#007bff', // Bleu pour l'action principale
    color: 'white', 
    border: 'none', 
    borderRadius: '5px', 
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontSize: '14px',
    whiteSpace: 'nowrap', // Empêche le texte du bouton de se couper
};

const deleteButtonStyle = { 
    padding: '8px 15px', 
    backgroundColor: '#dc3545', // Rouge pour la suppression
    color: 'white', 
    border: 'none', 
    borderRadius: '5px', 
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontSize: '14px',
    whiteSpace: 'nowrap', // Empêche le texte du bouton de se couper
};

export default ReservationManagementPage;