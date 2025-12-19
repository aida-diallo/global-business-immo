import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth'; 

// L'URL de base de l'API 
const API_URL = 'http://localhost:5000/api/proprietes'; 

// --- Composant Modale du Formulaire (Gère Ajout et Modification) ---
const AddPropertyModal = ({ onClose, onSave, initialData }) => {
    
    // Initialisation des données du formulaire
    const [formData, setFormData] = useState(() => {
        if (initialData) {
            return {
                titre: initialData.titre || '', 
                description: initialData.description || '', 
                prix: initialData.prix || '', 
                surface: initialData.surface || '', 
                adresse: initialData.adresse || '', 
                ville: initialData.ville || '', 
                codePostal: initialData.codePostal || '', 
                nbChambres: initialData.nbChambres || '', 
                nbSallesDeBain: initialData.nbSallesDeBain || '', 
                type: initialData.type || 'Appartement', 
                statut: initialData.statut || 'À Vendre', 
                service_immobilier: initialData.service_immobilier || 'Transaction immobilière',
                existing_image_url: initialData.images_url || '', 
                imageFile: null 
            };
        }
        return {
            titre: '', description: '', prix: '', surface: '', 
            adresse: '', ville: '', codePostal: '', 
            nbChambres: '', nbSallesDeBain: '', 
            type: 'Appartement', statut: 'À Vendre', 
            service_immobilier: 'Transaction immobilière',
            existing_image_url: '', 
            imageFile: null
        };
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        if (e.target.name === 'imageFile') {
            setFormData({ ...formData, imageFile: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.titre || !formData.prix || !formData.statut || !formData.adresse || !formData.ville || !formData.type || !formData.service_immobilier) {
            alert('Veuillez remplir tous les champs obligatoires (*).');
            setLoading(false);
            return;
        }

        const dataToSend = new FormData();
        
        // Ajout des champs de données
        dataToSend.append('titre', formData.titre);
        dataToSend.append('description', formData.description);
        dataToSend.append('statut', formData.statut);
        dataToSend.append('type', formData.type);
        dataToSend.append('adresse', formData.adresse);
        dataToSend.append('ville', formData.ville);
        dataToSend.append('codePostal', formData.codePostal || ''); 
        dataToSend.append('prix', parseFloat(formData.prix) || 0);
        dataToSend.append('surface', parseFloat(formData.surface) || '');
        dataToSend.append('nbChambres', parseInt(formData.nbChambres) || '');
        dataToSend.append('nbSallesDeBain', parseInt(formData.nbSallesDeBain) || '');
        dataToSend.append('service_immobilier', formData.service_immobilier); 

        // AJOUT de existing_image_url pour le backend lors d'un UPDATE
        if (initialData) {
            dataToSend.append('existing_image_url', formData.existing_image_url);
        }

        // Ajout du fichier image (s'il y en a un)
        if (formData.imageFile) {
            dataToSend.append('image', formData.imageFile); 
        } 

        try {
            await onSave(dataToSend);
            // La fermeture est maintenant gérée par la fonction onSave après succès
        } catch (error) {
            console.error("Erreur lors de la sauvegarde (AddPropertyModal):", error.response ? error.response.data : error.message);
            // L'alerte est déjà dans le composant parent
        } finally {
            setLoading(false);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    

    return (
        <div style={modalOverlayStyle} onClick={handleOverlayClick}>
            
            {/* Styles injectés pour les inputs de la modale */}
            <style>{`
                .glass-modal input[type="text"], 
                .glass-modal input[type="number"], 
                .glass-modal textarea, 
                .glass-modal select,
                .glass-modal input[type="file"] {
                    background-color: rgba(255, 255, 255, 0.9); 
                    color: #333; 
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    transition: border-color 0.3s, box-shadow 0.3s;
                }
                .glass-modal input:focus, 
                .glass-modal textarea:focus, 
                .glass-modal select:focus {
                    border-color: #E06B3A; 
                    box-shadow: 0 0 5px rgba(224, 107, 58, 0.7);
                    outline: none;
                }
            `}</style>

            <div style={modalContentStyle} className="glass-modal">
                <h2>{initialData ? 'Modifier la Propriété' : 'Ajouter une Nouvelle Propriété'}</h2>
                <form onSubmit={handleSubmit}>
                    
                    <label style={labelStyle} htmlFor="titre">Titre *</label>
                    <input type="text" id="titre" name="titre" value={formData.titre} onChange={handleChange} style={inputStyle} required />

                    <label style={labelStyle} htmlFor="description">Description</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} style={{ ...inputStyle, height: '80px' }}></textarea>

                    <label style={labelStyle} htmlFor="prix">Prix (FCFA) *</label>
                    <input type="number" id="prix" name="prix" value={formData.prix} onChange={handleChange} style={inputStyle} required />
                    
                    <label style={labelStyle} htmlFor="adresse">Adresse *</label>
                    <input type="text" id="adresse" name="adresse" value={formData.adresse} onChange={handleChange} style={inputStyle} required />
                    
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div style={{ flex: 2 }}>
                            <label style={labelStyle} htmlFor="ville">Ville *</label>
                            <input type="text" id="ville" name="ville" value={formData.ville} onChange={handleChange} style={inputStyle} required />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={labelStyle} htmlFor="codePostal">Code Postal</label>
                            <input type="text" id="codePostal" name="codePostal" value={formData.codePostal} onChange={handleChange} style={inputStyle} />
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={labelStyle} htmlFor="surface">Surface ($m^2$)</label>
                            <input type="number" id="surface" name="surface" value={formData.surface} onChange={handleChange} style={inputStyle} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={labelStyle} htmlFor="type">Type *</label>
                            <select id="type" name="type" value={formData.type} onChange={handleChange} style={inputStyle} required>
                                <option value="Appartement">Appartement</option>
                                <option value="Villa">Villa</option>
                                <option value="Terrain">Terrain</option>
                                <option value="Bureau">Bureau</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={labelStyle} htmlFor="nbChambres">Nb Chambres</label>
                            <input type="number" id="nbChambres" name="nbChambres" value={formData.nbChambres} onChange={handleChange} style={inputStyle} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={labelStyle} htmlFor="nbSallesDeBain">Nb SDB</label>
                            <input type="number" id="nbSallesDeBain" name="nbSallesDeBain" value={formData.nbSallesDeBain} onChange={handleChange} style={inputStyle} />
                        </div>
                    </div>
                    
                    {/* NOUVEAU SELECT POUR service_immobilier */}
                    <label style={labelStyle} htmlFor="service_immobilier">Service Immobilier *</label>
                    <select id="service_immobilier" name="service_immobilier" value={formData.service_immobilier} onChange={handleChange} style={inputStyle} required>
                        <option value="Transaction immobilière">Transaction immobilière</option>
                        <option value="Location de biens">Location de biens</option>
                        <option value="Vente de terrain">Vente de terrain</option>
                        <option value="Prestation de conseil">Prestation de conseil</option> 
                    </select>

                    <label style={labelStyle} htmlFor="statut">Statut *</label>
                    <select id="statut" name="statut" value={formData.statut} onChange={handleChange} style={inputStyle}>
                        <option value="À Vendre">À Vendre</option>
                        <option value="À Louer">À Louer</option>
                        <option value="Vendue">Vendue</option>
                        <option value="Louée">Louée</option>
                    </select>

                    {/* INPUT DE TYPE FICHIER */}
                    <label style={labelStyle} htmlFor="imageFile">Télécharger Image Principale</label>
                    {/* Affichage de l'image actuelle en mode édition */}
                    {initialData && formData.existing_image_url && (
                        <p style={{color: '#eee', fontSize: '0.9em', margin: '5px 0'}}>
                            Image actuelle: <a href={formData.existing_image_url} target="_blank" rel="noopener noreferrer" style={{color: '#E06B3A'}}>(Lien)</a>
                        </p>
                    )}
                    <input 
                        type="file" 
                        id="imageFile" 
                        name="imageFile" 
                        onChange={handleChange} 
                        style={inputStyle} 
                        accept="image/*"
                    />

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                        <button type="button" onClick={onClose} style={cancelButtonStyle} disabled={loading}>Annuler</button>
                        <button type="submit" style={saveButtonStyle} disabled={loading}>
                            {loading ? (initialData ? 'Mise à jour...' : 'Ajout en cours...') : (initialData ? 'Sauvegarder les Modifications' : 'Ajouter')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// --- Composant Principal de Gestion des Propriétés ---
const ProprietesManagement = () => {
    const { token, logout } = useAuth(); 
    const [proprietes, setProprietes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [isAdding, setIsAdding] = useState(false); 
    const [isEditing, setIsEditing] = useState(false); 
    const [propertyToEdit, setPropertyToEdit] = useState(null); 

    const fetchProprietes = async () => {
        setLoading(true);
        try {
             const response = await axios.get(API_URL, {
                 headers: { Authorization: `Bearer ${token}` }
             });
             setProprietes(response.data); 
             setError(null);
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError("Session expirée (401). Vous allez être déconnecté.");
                if (logout) { 
                    setTimeout(() => {
                        logout(); 
                    }, 2000); 
                }
            } else {
                 console.error("Erreur de chargement des propriétés:", err);
                 setError("Impossible de charger les propriétés. Vérifiez la connexion API et le token.");
            }
            setProprietes([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveNewProperty = async (formDataToSend) => { 
        try {
            await axios.post(API_URL, formDataToSend, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                }
            });
            setIsAdding(false); 
            fetchProprietes(); 
            alert("Propriété ajoutée avec succès.");
        } catch (err) {
            console.error("Erreur lors de l'ajout:", err.response ? err.response.data : err.message);
            alert("Erreur lors de l'ajout de la propriété. Vérifiez les logs.");
            throw err; 
        }
    };

    const handleUpdateProperty = async (formDataToSend) => { 
        const id = propertyToEdit.id; 
        try {
            await axios.put(`${API_URL}/${id}`, formDataToSend, { 
                headers: { 
                    Authorization: `Bearer ${token}`,
                }
            });
            setIsEditing(false); 
            setPropertyToEdit(null);
            fetchProprietes(); 
            alert(`Propriété ${id} mise à jour avec succès.`); 
        } catch (err) {
            console.error("Erreur lors de la mise à jour:", err.response ? err.response.data : err.message);
            alert("Erreur lors de la mise à jour de la propriété.");
            throw err;
        }
    };

    const handleEditClick = (property) => {
        setPropertyToEdit(property);
        setIsEditing(true);
    };
    
    const handleDelete = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette propriété ? (Ceci supprimera aussi l'image sur le serveur)")) return;
        
        try {
            await axios.delete(`${API_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchProprietes(); 
        } catch (err) {
            setError("Erreur lors de la suppression. Vous n'avez peut-être pas les permissions.");
        }
    };

    useEffect(() => {
        if (token) {
            fetchProprietes();
        } else if (!loading) {
            setError("Accès refusé. Veuillez vous connecter.");
        }
    }, [token]);

    // Affichage des messages de chargement et d'erreur
    if (loading) return <h1 style={loadingStyle}>Chargement des propriétés...</h1>;
    if (error) return <h1 style={errorStyle}>{error}</h1>;

    return (
        <div style={containerStyle}> 
            <div className="proprietes-management">
                
                {/* TITRE PRINCIPAL */}
                <h1 style={{ marginBottom: '25px', color: '#3c4f65', fontSize: '30px' }}>
                    🏠 Gestion des Propriétés ({proprietes.length} biens)
                </h1>
                
                <button 
                    onClick={() => setIsAdding(true)} 
                    style={addButtonStyles}
                >
                    + Ajouter une Nouvelle Propriété
                </button>

                {/* Tableau des propriétés */}
                <table style={tableStyle}>
                    <thead>
                        <tr style={tableHeaderRowStyle}>
                            <th style={tableHeaderCellStyle}>Image</th> 
                            <th style={tableHeaderCellStyle}>ID</th>
                            <th style={tableHeaderCellStyle}>Titre</th> 
                            <th style={tableHeaderCellStyle}>Adresse</th> 
                            <th style={tableHeaderCellStyle}>Prix</th>
                            <th style={tableHeaderCellStyle}>Statut</th>
                            <th style={tableHeaderCellStyle}>Service</th>
                            <th style={tableHeaderCellStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proprietes.map(prop => (
                            <tr key={prop.id} style={tableRowStyle}>
                                
                                <td style={tableCellStyle}>
                                    {prop.images_url ? (
                                        <img 
                                            src={prop.images_url} 
                                            alt={prop.titre} 
                                            style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                                        />
                                    ) : (
                                        <span style={{ color: '#aaa', fontSize: '0.8em' }}>N/A</span>
                                    )}
                                </td>

                                <td style={tableCellStyle}>{prop.id}</td>
                                <td style={tableCellStyle}><strong>{prop.titre || "N/A"}</strong></td> 
                                <td style={tableCellStyle}>{prop.ville || "N/A"}</td> 
                                <td style={tableCellStyle}>{prop.prix ? prop.prix.toLocaleString('fr-FR') + ' FCFA' : 'N/A'}</td>
                                
                                {/* Style conditionnel pour le Statut (similaire au Rôle) */}
                                <td style={{ ...tableCellStyle, ...statusStyle(prop.statut) }}>
                                    {prop.statut.toUpperCase()}
                                </td>
                                
                                <td style={tableCellStyle}>{prop.service_immobilier || 'N/A'}</td> 
                                
                                <td style={tableCellStyle}>
                                    <button 
                                        onClick={() => handleEditClick(prop)}
                                        style={{ ...actionButtonStyle, marginRight: '10px' }}>
                                        ✏️ Éditer
                                    </button> 
                                    <button onClick={() => handleDelete(prop.id)} style={deleteButtonStyle}>🗑️ Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODALES */}
            {(isAdding || isEditing) && (
                <AddPropertyModal 
                    onClose={() => {setIsAdding(false); setIsEditing(false); setPropertyToEdit(null);}} 
                    onSave={isAdding ? handleSaveNewProperty : handleUpdateProperty} 
                    initialData={propertyToEdit} 
                />
            )}
        </div>
    );
};


// -------------------------------------------------------------------
// --- DÉFINITION DES STYLES HARMONISÉS AVEC USERMANAGEMENTPAGE ---
// -------------------------------------------------------------------

// Styles de base de la page
const containerStyle = {
    padding: '30px',
    backgroundColor: '#f8f9fa', // Correspond au fond gris clair
    minHeight: '100%',
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


// Styles du Tableau (Harmonisation)
const tableStyle = {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 10px', // Espacement entre les lignes
    textAlign: 'left',
};

const tableHeaderRowStyle = {
    backgroundColor: '#E06B3A', // Orange de l'en-tête utilisateur
    color: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
};

const tableHeaderCellStyle = {
    padding: '15px 20px',
    fontWeight: '600',
    fontSize: '14px',
    textTransform: 'uppercase',
    border: 'none', // Pas de bordure visible
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
};

// Style conditionnel pour le Statut (similaire à roleStyle)
const statusStyle = (statut) => {
    switch (statut) {
        case 'À Vendre':
        case 'À Louer':
            return { color: 'white', backgroundColor: '#27ae60', borderRadius: '5px', padding: '5px 8px', textAlign: 'center' }; // Vert
        case 'Vendue':
        case 'Louée':
            return { color: 'white', backgroundColor: '#e74c3c', borderRadius: '5px', padding: '5px 8px', textAlign: 'center' }; // Rouge
        default:
            return { color: '#3c4f65' };
    }
};

// Styles des Boutons d'Action
const addButtonStyles = { 
    padding: '10px 20px', 
    backgroundColor: '#28a745', // Bouton vert d'ajout
    color: 'white', 
    border: 'none', 
    borderRadius: '5px', 
    cursor: 'pointer',
    fontWeight: 'bold',
    marginBottom: '20px',
    transition: 'background-color 0.3s'
};
const actionButtonStyle = { 
    padding: '8px 15px', // Taille légèrement ajustée pour les icônes
    backgroundColor: '#007bff', 
    color: 'white', 
    border: 'none', 
    borderRadius: '5px', 
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontSize: '14px'
};
const deleteButtonStyle = { 
    padding: '8px 15px', 
    backgroundColor: '#dc3545', 
    color: 'white', 
    border: 'none', 
    borderRadius: '5px', 
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontSize: '14px'
};


// Styles pour le Modale (Glassmorphism - inchangés)
const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(5px)', 
};

const modalContentStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.15)', 
    padding: '30px',
    borderRadius: '15px',
    width: '450px', 
    maxHeight: '90vh',
    overflowY: 'auto',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)',
    color: '#333'
};

const labelStyle = {
    display: 'block',
    fontWeight: 'bold',
    marginTop: '10px',
    color: '#eee', 
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '8px 0 15px 0',
    display: 'inline-block',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    color: '#333',
};


const saveButtonStyle = {
    padding: '10px 15px',
    backgroundColor: '#E06B3A', 
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s'
};

const cancelButtonStyle = {
    padding: '10px 15px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
};

export default ProprietesManagement;