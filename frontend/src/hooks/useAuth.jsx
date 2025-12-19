// src/hooks/useAuth.js

import React, { useState, createContext, useContext } from 'react';
import axios from 'axios';

// 1. Définition du Contexte d'Authentification
const AuthContext = createContext(null);

// L'URL de base de votre Backend Node.js
const API_URL = 'http://localhost:5000/api/users'; 

// 2. Le Fournisseur d'Authentification
export const AuthProvider = ({ children }) => {
    // Tente de charger l'utilisateur et le token depuis le stockage local au démarrage
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user'))
    );
    const [token, setToken] = useState(
        localStorage.getItem('token')
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fonction de connexion qui appelle le Backend
    const login = async (email, mot_de_passe) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_URL}/login`, { 
                email, 
                mot_de_passe 
            });

            const { token: receivedToken, user: userData } = response.data;
            
            // Stockage dans le navigateur et mise à jour de l'état
            localStorage.setItem('token', receivedToken);
            localStorage.setItem('user', JSON.stringify(userData));
            
            setToken(receivedToken);
            setUser(userData);
            
            // Retourne le rôle pour la logique de redirection
            return userData.role; 

        } catch (err) {
            // Gestion des erreurs de l'API (ex: mauvais mot de passe)
            const errorMessage = err.response?.data?.message || "Erreur de connexion inconnue. Vérifiez le serveur.";
            setError(errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Fonction de déconnexion
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    // Les valeurs exposées à tous les composants
    const value = {
        user,
        token,
        loading,
        error,
        login,
        logout,
        // Helper pour la gestion des rôles dans le Frontend
        isAdmin: user?.role === 'admin' 
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Hook personnalisé pour l'utilisation dans les composants
export const useAuth = () => useContext(AuthContext);