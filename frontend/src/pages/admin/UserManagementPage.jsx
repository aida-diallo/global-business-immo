// src/pages/UserManagementPage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
// ✅ Chemin d'importation corrigé si votre structure est src/pages/admin/UserManagementPage.jsx
import { useAuth } from '../../hooks/useAuth'; 

// URL de l'API pour récupérer la liste des utilisateurs (protégée par Admin)
const USERS_API_URL = 'http://localhost:5000/api/users'; 

const UserManagementPage = () => {
    const { token, isAdmin, logout } = useAuth(); 
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fonction pour récupérer la liste des utilisateurs
    const fetchUsers = async () => {
        if (!token) {
            setError("Token manquant. Veuillez vous reconnecter.");
            setLoading(false);
            return;
        }
        
        setLoading(true);
        try {
            const response = await axios.get(USERS_API_URL, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            setUsers(response.data); 
            setError(null);
        } catch (err) {
            // Cette erreur (500) est maintenant gérée côté backend, mais on garde le code propre
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                setError("Accès refusé. Seuls les administrateurs peuvent voir cette liste.");
                if (err.response.status === 401 && logout) setTimeout(() => logout(), 2000); 
            } else {
                console.error("Erreur de chargement des utilisateurs:", err);
                setError("Impossible de charger les utilisateurs. Vérifiez la connexion API ou l'état du serveur.");
            }
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };
    
    // Charger les utilisateurs au montage
    useEffect(() => {
        if (token) {
            fetchUsers();
        }
    }, [token]);

    // Rendu en fonction de l'état
    if (!isAdmin && !loading) {
        return <h1 style={errorStyle}>{error || "Vous n'êtes pas autorisé à accéder à cette ressource."}</h1>
    }

    if (loading) return <h1 style={loadingStyle}>Chargement des utilisateurs...</h1>;
    if (error) return <h1 style={errorStyle}>{error}</h1>;

    // Ajout d'une fonction simple pour simuler le statut de connexion (peut être amélioré)
    const getStatus = (user) => user.token ? 'Connecté' : 'Déconnecté';


    return (
        <div style={containerStyle}>
            <h1 style={{ marginBottom: '25px', color: '#3c4f65', fontSize: '30px' }}>
                👥 Gestion des Utilisateurs ({users.length} comptes)
            </h1>
            
            <table style={tableStyle}>
                <thead>
                    <tr style={tableHeaderRowStyle}>
                        <th style={tableHeaderCellStyle}>ID</th>
                        <th style={tableHeaderCellStyle}>Nom</th>
                        <th style={tableHeaderCellStyle}>Email</th>
                        <th style={tableHeaderCellStyle}>Rôle</th>
                        <th style={tableHeaderCellStyle}>Date Création</th>
                        <th style={tableHeaderCellStyle}>Statut</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} style={tableRowStyle}>
                            <td style={tableCellStyle}>{user.id}</td>
                            <td style={tableCellStyle}><strong>{user.nom}</strong></td>
                            <td style={tableCellStyle}>{user.email}</td>
                            <td style={{ ...tableCellStyle, ...roleStyle(user.role) }}>
                                {user.role.toUpperCase()}
                            </td>
                            {/* 🚨 CORRECTION : Utiliser user.created_at (reçu du backend) */}
                            <td style={tableCellStyle}>
                                {new Date(user.created_at).toLocaleDateString()}
                            </td>
                            <td style={tableCellStyle}>
                                {getStatus(user)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// --- Styles pour la page (identiques à votre code) ---

const containerStyle = {
    padding: '30px',
    backgroundColor: '#f8f9fa',
    minHeight: '100%',
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 10px',
    textAlign: 'left',
};

const tableHeaderRowStyle = {
    backgroundColor: '#E06B3A',
    color: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
};

const tableHeaderCellStyle = {
    padding: '15px 20px',
    fontWeight: '600',
    fontSize: '14px',
    textTransform: 'uppercase',
};

const tableRowStyle = {
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s',
    cursor: 'default',
};

const tableCellStyle = {
    padding: '15px 20px',
    fontSize: '14px',
    color: '#3c4f65',
    border: 'none',
};

const roleStyle = (role) => {
    switch (role) {
        case 'admin':
            return { color: 'white', backgroundColor: '#e74c3c', borderRadius: '5px', padding: '5px 8px', textAlign: 'center' };
        case 'agent':
            return { color: '#27ae60', backgroundColor: '#e8f6f1', borderRadius: '5px', padding: '5px 8px', textAlign: 'center' };
        default:
            return {};
    }
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

export default UserManagementPage;