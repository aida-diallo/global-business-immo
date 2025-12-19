import { useState, useEffect } from "react";
import { 
    Menu, X, Home, Bath, Square, MapPin, Calendar,
    Heart, Share2, ChevronLeft, 
    Phone, MessageCircle
} from 'lucide-react';
// IMPORTANT : J'ai ajouté `useParams` pour simuler la récupération de l'ID de la propriété
import { Link, useParams, useLocation } from 'react-router-dom'; 

const ACCENT_COLOR = "#DF7649";

// --- DONNÉES SIMULÉES (Seront chargées ou remplacées par l'API) ---
// Note: Dans une application réelle, ces données viendraient de votre API
const mockProperty = {
    id: 1,
    titre: "Appartement moderne - Almadies",
    statut: "À vendre",
    type: "Appartement",
    adresse: "Almadies",
    ville: "Dakar",
    prix: 85000000,
    nbChambres: 3,
    nbSallesDeBain: 2,
    surface: 120,
    anneeConstruction: 2022,
    description: "Magnifique appartement moderne situé dans le quartier prisé des Almadies. Cet espace lumineux et spacieux offre une vue imprenable et toutes les commodités nécessaires pour un confort optimal.",
    caracteristiques: [
        "Cuisine équipée moderne", "Grand balcon avec vue mer", "Piscine commune", 
        "Proximité des commerces", "Climatisation dans toutes les pièces", "Place de parking sécurisée", 
        "Gardiennage 24h/24", "Accès direct à la plage"
    ],
    images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200"
    ]
};

const fakeSimilarProperties = [
    { id: 2, titre: "Villa 4 Chambres", statut: "À vendre", localisation: "Saly", chambres: 4, bains: 3, surface: 300, prix: "150 000 000 FCFA", image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800' },
    { id: 3, titre: "Terrain Mermoz", statut: "À louer", localisation: "Dakar", chambres: 0, bains: 0, surface: 500, prix: "2 000 000 FCFA/mois", image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800' },
];
// ------------------------------------------------------------------

const ProprieteSimilaire = ({ property }) => (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer">
        <Link to={`/properties/${property.id}`} className="block">
            <div className="relative overflow-hidden h-48">
                <img
                    src={property.image}
                    alt={property.titre}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                    <span style={{ backgroundColor: ACCENT_COLOR }} className="text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {property.statut}
                    </span>
                </div>
            </div>
            <div className="p-4">
                <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                    {property.titre}
                </h4>
                <div style={{ color: ACCENT_COLOR }} className="text-xl font-bold">{property.prix}</div>
            </div>
        </Link>
    </div>
);

export default function PropertyDetailPage() {
    // Dans une application réelle, l'ID serait récupéré depuis l'URL (ex: /proprietes/123)
    // Pour cette démo, on simule l'ID 1
    const { id: propertyId } = useParams(); 
    const location = useLocation();

    // États de la page
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // États de données
    const [property, setProperty] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // États du formulaire
    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        telephone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState(null);


    // --- 1. FONCTION DE RÉCUPÉRATION DE LA PROPRIÉTÉ (Simulation d'API GET) ---
    const fetchPropertyData = async (id) => {
        setLoading(true);
        try {
            // Dans un cas réel, utilisez fetch :
            // const response = await fetch(`/api/properties/${id}`);
            // if (!response.ok) throw new Error("Erreur de chargement des données.");
            // const data = await response.json();
            
            // Simulation
            await new Promise(resolve => setTimeout(resolve, 500));
            setProperty(mockProperty); 
            setError(null);
        } catch (err) {
            console.error("Erreur de récupération de la propriété:", err);
            setError("Impossible de charger les détails de la propriété.");
        } finally {
            setLoading(false);
        }
    };
    
    // --- 2. FONCTION DE SOUMISSION DU FORMULAIRE (Simulation d'API POST) ---
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Validation de base
        if (!formData.nom || !formData.email) {
            setSubmissionMessage("Veuillez remplir les champs obligatoires (Nom et Email).");
            return;
        }

        setIsSubmitting(true);
        setSubmissionMessage(null);

        // 2. Préparation des données pour le backend (inclut les détails de la propriété)
        const inquiryData = {
            ...formData,
            propertyId: property ? property.id : 'ID_INCONNU',
            propertyTitle: property ? property.titre : 'Propriété Inconnue',
            date: new Date().toISOString(),
        };

        try {
            // *** POINT D'ENVOI VERS VOTRE BACKEND ***
            // C'est ici que les données sont envoyées pour être stockées dans votre BD
            // et affichées dans l'administration.

            // fetch('/api/inquiries', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(inquiryData)
            // });

            // Simulation de l'envoi réussi
            await new Promise(resolve => setTimeout(resolve, 1500)); 
            
            setSubmissionMessage("✔️ Votre demande a été envoyée avec succès !");
            setFormData({ nom: '', email: '', telephone: '', message: '' }); // Réinitialiser
            
            // Log pour vérifier les données envoyées
            console.log("DONNÉES ENVOYÉES AU BACKEND :", inquiryData);

        } catch (err) {
            setSubmissionMessage("❌ Une erreur est survenue lors de l'envoi.");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    // --- 3. EFFETS DE BORD ---
    // Charger la propriété au montage ou si l'ID change
    useEffect(() => {
        // Dans une vraie application, on utiliserait `propertyId` de useParams
        fetchPropertyData(propertyId || mockProperty.id); 
    }, [propertyId]); 

    // Gestion du scroll (inchangé)
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    // Utilitaires (inchangé)
    const formatPrice = (price) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price) + ' FCFA';
    };

    const handleNextImage = () => {
        if (property && property.images) {
            setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
        }
    };

    const handlePrevImage = () => {
        if (property && property.images) {
            setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // --- 4. AFFICHAGE DES ÉTATS ---

    if (loading) {
        return (
            <div className="min-h-screen pt-16 flex items-center justify-center bg-gray-50">
                <div style={{ color: ACCENT_COLOR }} className="text-xl font-semibold">Chargement des détails de la propriété...</div>
            </div>
        );
    }

    if (error || !property) {
        return (
            <div className="min-h-screen pt-16 flex items-center justify-center bg-gray-50">
                <div className="text-xl text-red-600">Erreur: {error || "Propriété non trouvée."}</div>
            </div>
        );
    }


    // --- 5. RENDU PRINCIPAL ---
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
           <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? "bg-white/70 backdrop-blur-sm shadow-sm" : "bg-white"}`}> 
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
                    <div className="flex justify-between items-center h-16"> 
                        <Link to="/" className="flex items-center"> 
                            {/* Assurez-vous d'avoir un fichier /public/logo.png */}
                            <div className="w-20 h-20 overflow-hidden flex items-center justify-center"> 
                                <img src="/logo.png" alt="Logo Global Business Immo" className="w-full h-full object-contain" /> 
                            </div> 
                        </Link>
                        <div className="hidden md:flex items-center gap-8 mx-auto">
                            <Link to="/" className={`text-[15px] font-medium transition-colors ${location.pathname === "/" ? "text-[#DF7649]" : "text-gray-700 hover:text-[#DF7649]"}`}>Accueil</Link>
                            <Link to="/services" className={`text-[15px] font-medium transition-colors ${location.pathname === "/services" ? "text-[#DF7649]" : "text-gray-700 hover:text-[#DF7649]"}`}>Services</Link>
                            <Link to="/proprietes" className={`text-[15px] font-medium transition-colors ${location.pathname.startsWith("/proprietes") ? "text-[#DF7649]" : "text-gray-700 hover:text-[#DF7649]"}`}>Propriétés</Link>
                            <Link to="/apropos" className={`text-[15px] font-medium transition-colors ${location.pathname === "/apropos" ? "text-[#DF7649]" : "text-gray-700 hover:text-[#DF7649]"}`}>À Propos</Link>
                            <Link to="/contact" className={`text-[15px] font-medium transition-colors ${location.pathname === "/contact" ? "text-[#DF7649]" : "text-gray-700 hover:text-[#DF7649]"}`}>Contact</Link>
                        </div>
                        <div className="hidden md:flex">
                            <Link to="/contact" className="bg-[#DF7649] text-white px-5 py-2 rounded-lg hover:bg-[#c8653b] transition font-medium text-sm">Nous contacter</Link>
                        </div>
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                    {mobileMenuOpen && (
                        <div className="md:hidden py-4 border-t">
                            <div className="flex flex-col gap-4">
                                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-[#DF7649] font-medium px-4 py-2">Accueil</Link>
                                <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 px-4 py-2">Services</Link>
                                <Link to="/proprietes" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 px-4 py-2">Catalogue</Link>
                                <Link to="/apropos" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 px-4 py-2">À Propos</Link>
                                <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 px-4 py-2">Contact</Link>
                                <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="bg-[#DF7649] text-white px-6 py-2.5 rounded-lg mx-4 text-center">Nous contacter</Link>
                            </div>
                        </div>
                    )}
                </nav>
            </header>

            {/* Contenu Principal */}
            <div className="pt-16">
                {/* Retour aux propriétés */}
                <div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <Link to="/proprietes" className="flex items-center text-gray-600 hover:text-orange-500 transition">
                            <ChevronLeft className="w-5 h-5 mr-1" />
                            <span>Retour aux propriétés</span>
                        </Link>
                    </div>
                </div>

                {/* Section Principale */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Colonne Gauche - Images et Détails */}
                        <div className="lg:col-span-2">
                            {/* Galerie d'images */}
                            <div className="relative mb-6 rounded-2xl overflow-hidden">
                                <img
                                    src={property.images[currentImageIndex]}
                                    alt={`Image ${currentImageIndex + 1}`}
                                    className="w-full h-[500px] object-cover"
                                />
                                
                                {/* Boutons Share et Like (inchangé) */}
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button className="bg-white p-3 rounded-full shadow-md hover:bg-gray-50 transition">
                                        <Share2 className="w-5 h-5 text-gray-700" />
                                    </button>
                                    <button className="bg-white p-3 rounded-full shadow-md hover:bg-gray-50 transition">
                                        <Heart className="w-5 h-5 text-gray-700" />
                                    </button>
                                </div>

                                {/* Compteur (inchangé) */}
                                <div className="absolute bottom-4 right-4 bg-white/90 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold">
                                    {currentImageIndex + 1} / {property.images.length}
                                </div>
                            </div>

                            {/* Miniatures */}
                            <div className="grid grid-cols-4 gap-4 mb-8">
                                {property.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`relative rounded-2xl overflow-hidden h-24 border-4 transition-all ${
                                            currentImageIndex === idx ? 'border-orange-500' : 'border-transparent'
                                        }`}
                                    >
                                        <img src={img} alt={`Miniature ${idx + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>

                            {/* Badges et Prix */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <span style={{ backgroundColor: ACCENT_COLOR }} className="text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                                        {property.statut}
                                    </span>
                                    <span className="bg-gray-100 text-gray-900 px-4 py-1.5 rounded-full text-sm font-semibold">
                                        {property.type}
                                    </span>
                                </div>
                                <div style={{ color: ACCENT_COLOR }} className="text-3xl font-bold">
                                    {formatPrice(property.prix)}
                                </div>
                            </div>

                            {/* Titre et Localisation */}
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {property.titre}
                            </h1>
                            <div className="flex items-center gap-2 text-gray-600 mb-8">
                                <MapPin className="w-5 h-5" />
                                <span className="text-base">{property.adresse}, {property.ville}</span>
                            </div>

                            {/* Caractéristiques Clés */}
                            <div className="flex items-center gap-8 mb-10 pb-8 border-b border-gray-200">
                                <div className="flex items-center gap-2">
                                    <Home className="w-5 h-5 text-gray-600" />
                                    <span className="text-gray-900 font-medium">{property.nbChambres} Chambres</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Bath className="w-5 h-5 text-gray-600" />
                                    <span className="text-gray-900 font-medium">{property.nbSallesDeBain} Salles de bain</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Square className="w-5 h-5 text-gray-600" />
                                    <span className="text-gray-900 font-medium">{property.surface}m²</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-gray-600" />
                                    <span className="text-gray-900 font-medium">{property.anneeConstruction}</span>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                                <p className="text-gray-700 leading-relaxed">{property.description}</p>
                            </div>

                            {/* Caractéristiques */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Caractéristiques</h2>
                                <div className="grid md:grid-cols-2 gap-x-12 gap-y-3">
                                    {property.caracteristiques.map((car, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-gray-700">
                                            <div style={{ backgroundColor: ACCENT_COLOR }} className="w-1.5 h-1.5 rounded-full flex-shrink-0"></div>
                                            <span>{car}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Colonne Droite - Formulaire */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Demander plus d'informations</h3>
                                
                                {/* Message de soumission */}
                                {submissionMessage && (
                                    <div className={`p-3 mb-4 rounded-lg text-sm font-medium ${
                                        submissionMessage.startsWith('✔️') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                        {submissionMessage}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                                    <input 
                                        type="text" name="nom" value={formData.nom} onChange={handleInputChange} 
                                        placeholder="Nom complet *" 
                                        className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition" 
                                        required
                                    />
                                    <input 
                                        type="email" name="email" value={formData.email} onChange={handleInputChange} 
                                        placeholder="Email *" 
                                        className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition" 
                                        required
                                    />
                                    <input 
                                        type="tel" name="telephone" value={formData.telephone} onChange={handleInputChange} 
                                        placeholder="Téléphone" 
                                        className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition" 
                                    />
                                    <textarea
                                        name="message" value={formData.message} onChange={handleInputChange} 
                                        placeholder="Message (optionnel)" rows="4" 
                                        className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none resize-none transition"
                                    ></textarea>
                                    <button 
                                        type="submit"
                                        style={{ backgroundColor: ACCENT_COLOR }} 
                                        className="w-full text-white py-3.5 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Envoi en cours...
                                            </>
                                        ) : 'Envoyer la demande'}
                                    </button>
                                </form>

                                {/* Boutons de contact */}
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <Link to="https://wa.me/XXXXXXXXX" target="_blank" className="flex items-center justify-center gap-2 py-3 text-green-600 rounded-lg hover:bg-gray-50 transition font-medium">
                                        <MessageCircle className="w-5 h-5" />
                                        <span>WhatsApp</span>
                                    </Link>
                                    <a href="tel:+221XXXXXXXXXX" className="flex items-center justify-center gap-2 py-3 text-blue-600 rounded-lg hover:bg-gray-50 transition font-medium">
                                        <Phone className="w-5 h-5" />
                                        <span>Appeler</span>
                                    </a>
                                </div>

                                {/* Réseaux sociaux */}
                                <div className="flex justify-center gap-4 pt-6 border-t border-gray-100">
                                    <a href="#" style={{ color: ACCENT_COLOR }} className="hover:opacity-70 transition" target="_blank">
                                        {/* Instagram SVG */}
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                    </a>
                                    <a href="#" style={{ color: ACCENT_COLOR }} className="hover:opacity-70 transition" target="_blank">
                                        {/* Facebook SVG */}
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                    </a>
                                    <a href="#" style={{ color: ACCENT_COLOR }} className="hover:opacity-70 transition" target="_blank">
                                        {/* TikTok SVG */}
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
                                    </a>
                                    <a href="#" style={{ color: ACCENT_COLOR }} className="hover:opacity-70 transition" target="_blank">
                                        {/* Youtube SVG */}
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                                    </a>
                                    <a href="#" style={{ color: ACCENT_COLOR }} className="hover:opacity-70 transition" target="_blank">
                                        {/* Twitter/X SVG */}
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Propriétés Similaires */}
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Propriétés similaires</h2>
                        {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {fakeSimilarProperties.map((prop) => (
                                <ProprieteSimilaire key={prop.id} property={prop} />
                            ))}
                        </div> */}
                    </div>
                </div>
            </div>
            
            {/* Footer */}
            <footer className="bg-gray-50 pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div>
                            <div className="mb-4">
                                <img src="/logo.png" alt="Global Business Immo Logo" className="h-12 w-auto" />
                            </div>
                            <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                                Un service à juste valeur ! Votre partenaire de confiance pour tous vos projets immobiliers au Sénégal.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Liens Rapides</h3>
                            <ul className="space-y-3">
                                <li><Link to="/" className="text-gray-600 hover:text-orange-500 transition">Accueil</Link></li>
                                <li><Link to="/services" className="text-gray-600 hover:text-orange-500 transition">Services</Link></li>
                                <li><Link to="/proprietes" className="text-gray-600 hover:text-orange-500 transition">Propriétés</Link></li>
                                <li><Link to="/apropos" className="text-gray-600 hover:text-orange-500 transition">À Propos</Link></li>
                                <li><Link to="/contact" className="text-gray-600 hover:text-orange-500 transition">Contact</Link></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Nos Services</h3>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-gray-600 hover:text-orange-500 transition">Transactions</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-orange-500 transition">Gestion Locative</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-orange-500 transition">Construction</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-orange-500 transition">Plans Architecturaux</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-orange-500 transition">Conseil Immobilier</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Contact</h3>
                            <ul className="space-y-3">
                                <li className="text-gray-600 flex items-start gap-3">
                                    <svg className="w-4 h-4 mt-1 text-orange-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    Dakar, Sénégal
                                </li>
                                <li className="text-gray-600 flex items-start gap-3">
                                    <svg className="w-4 h-4 mt-1 text-orange-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    +221 XX XXX XX XX
                                </li>
                                <li className="text-gray-600 flex items-start gap-3">
                                    <svg className="w-4 h-4 mt-1 text-orange-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    contact@globalbusinessimmo.sn
                                </li>
                            </ul>
                        </div>

                    </div>

                    <div className="flex justify-between items-center text-gray-500 text-sm border-t border-gray-200 pt-4 mt-4">
                        <div className="text-left">
                            &copy; {new Date().getFullYear()} Global Business Immo. Tous droits réservés.
                        </div>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-orange-500 transition">Mentions Légales</a>
                            <a href="#" className="hover:text-orange-500 transition">Confidentialité</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}