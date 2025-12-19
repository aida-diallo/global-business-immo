import { useState, useEffect } from "react";
import axios from 'axios'; 
import { 
    Menu, X, Home, 
    Building2, Search, SlidersHorizontal, ChevronDown, Heart, Bath, Square, MapPin
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const API_URL_BASE = 'http://localhost:5000/api/proprietes/public'; // 🛑 RENOMMÉ pour la clarté
const HERO_BG_IMAGE = '/hero-bg.jpg'; // Assurez-vous que cette image existe

// 🛑 NOUVEAU : Liste des services/filtres basés sur les valeurs de votre DB (colonne `service_immobilier` ou `statut`)
const SERVICE_OPTIONS = [
    'Tous les biens', 
    'Transaction immobilière', 
    'Localisation de biens', 
    'Vente de terrain'
];

const secondaryFilters = [
    "Type de bien", "Prix", "Chambres", "Surface", "Localisation", "Statut"
];

export default function ProprietesPage() {
    
    const ACCENT_COLOR = "#DF7649";
    
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false); 
    const [properties, setProperties] = useState([]); 
    const [loading, setLoading] = useState(true);    
    const [error, setError] = useState(null);        
    const location = useLocation();

    // 🛑 NOUVEAU : État pour le filtre de service sélectionné (par défaut 'Tous les biens')
    const [selectedService, setSelectedService] = useState('Tous les biens'); 

    // 🛑 NOUVEAU : Fonction pour changer le filtre
    const handleServiceChange = (service) => {
        if (service !== selectedService) {
            setSelectedService(service);
            // Remonter au début des propriétés après un changement de filtre
            window.scrollTo({ top: 750, behavior: 'smooth' }); 
        }
    };

    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true);
            setError(null);
            
            // 🛑 MODIFICATION : Construction dynamique de l'URL
            let API_URL = API_URL_BASE;
            if (selectedService !== 'Tous les biens') {
                // Ajout du paramètre de requête 'service'
                API_URL = `${API_URL_BASE}?service=${encodeURIComponent(selectedService)}`;
            }

            try {
                console.log('🔍 Tentative de récupération des propriétés depuis:', API_URL);
                
                const response = await axios.get(API_URL, {
                    timeout: 10000 
                });
                
                console.log('✅ Réponse reçue:', response.data);
                
                if (Array.isArray(response.data)) {
                    console.log(`📊 ${response.data.length} propriété(s) trouvée(s)`);
                    
                    response.data.forEach(prop => {
                        console.log(`Propriété #${prop.id}: ${prop.titre} - Prix: ${prop.prix} (type: ${typeof prop.prix})`);
                    });
                    
                    setProperties(response.data);
                    setError(null);
                } else {
                    console.error("❌ Format de données inattendu:", response.data);
                    setError("Format de données inattendu de l'API.");
                    setProperties([]); 
                }
            } catch (err) {
                console.error("❌ Erreur lors de la récupération des propriétés:", err);
                
                let errorMessage = "Impossible de charger le catalogue. ";
                
                if (err.code === 'ECONNABORTED') {
                    errorMessage += "La requête a expiré. Le serveur est-il démarré ?";
                } else if (err.code === 'ERR_NETWORK' || err.message.includes('Network Error')) {
                    errorMessage += "Erreur réseau. Vérifiez que le serveur Express est démarré sur le port 5000.";
                } else if (err.response) {
                    errorMessage += `Erreur HTTP ${err.response.status}: ${err.response.data?.message || err.response.statusText}`;
                } else {
                    errorMessage += err.message;
                }
                
                setError(errorMessage);
                setProperties([]); 
            } finally {
                setLoading(false);
            }
        };

        // 🛑 MODIFICATION : La fonction fetchProperties est appelée lorsque selectedService change
        fetchProperties();

        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [selectedService]); // 🛑 MODIFICATION : Ajout de selectedService comme dépendance

    // ✅ Fonction pour formater le prix
    const formatPrice = (price) => {
        // Convertir en nombre si c'est une string
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        
        if (numPrice && numPrice > 0) {
            // Format avec espaces pour les milliers
            return new Intl.NumberFormat('fr-FR', {
                style: 'decimal',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(numPrice) + ' FCFA';
        }
        return 'Prix sur demande';
    };

    // ✅ Fonction pour obtenir l'URL de l'image
    const getImageUrl = (imageUrl) => {
        if (!imageUrl) return '/placeholder_image.jpg';
        
        // Si l'URL est déjà complète
        if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
            return imageUrl;
        }
        
        // Sinon, construire l'URL complète
        return `http://localhost:5000${imageUrl}`;
    };

    return (
        <div className="min-h-screen bg-white">
            
            <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? "bg-white/70 backdrop-blur-sm shadow-sm" : "bg-white"}`}> 
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
                    <div className="flex justify-between items-center h-16"> 
                        <Link to="/" className="flex items-center"> 
                            <div className="w-20 h-20 overflow-hidden flex items-center justify-center"> 
                                <img src="/logo.png" alt="Logo Global Business Immo" className="w-full h-full object-contain" /> 
                            </div> 
                        </Link>
                        <div className="hidden md:flex items-center gap-8 mx-auto">
                            <Link to="/" className={`text-[15px] font-medium transition-colors ${location.pathname === "/" ? "text-[#DF7649]" : "text-gray-700 hover:text-[#DF7649]"}`}>Accueil</Link>
                            <Link to="/services" className={`text-[15px] font-medium transition-colors ${location.pathname === "/services" ? "text-[#DF7649]" : "text-gray-700 hover:text-[#DF7649]"}`}>Services</Link>
                            <Link to="/proprietes" className={`text-[15px] font-medium transition-colors ${location.pathname === "/proprietes" ? "text-[#DF7649]" : "text-gray-700 hover:text-[#DF7649]"}`}>Propriétés</Link>
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
            
            <section className="ProprietesHero relative">
                
                <div 
                    className="relative bg-cover bg-center h-[650px] flex items-center" 
                    style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${HERO_BG_IMAGE})`, backgroundColor: '#f3f4f6' }}
                >
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white text-center pt-24"> 
                        <h1 className="text-7xl font-extrabold mb-4 drop-shadow-lg" style={{textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>
                            Nos Propriétés
                        </h1>
                        <p className="text-xl mb-12 drop-shadow-md max-w-3xl mx-auto">
                            Découvrez notre sélection de biens immobiliers d'exception au Sénégal
                        </p>
                        <div className="flex justify-center items-center space-x-4">
                            <div className="flex-1 max-w-3xl bg-white rounded-full shadow-2xl overflow-hidden"> 
                                <label htmlFor="main-search" className="sr-only">Rechercher par ville, quartier ou type de bien...</label>
                                <div className="flex items-center p-1">
                                    <Search className="w-6 h-6 text-gray-400 ml-4" />
                                    <input
                                        id="main-search"
                                        type="text"
                                        placeholder="Rechercher par ville, quartier ou type de bien..."
                                        className="w-full py-4 px-4 text-lg text-gray-800 focus:outline-none placeholder-gray-500 bg-transparent"
                                    />
                                </div>
                            </div>
                            <button style={{backgroundColor: ACCENT_COLOR}} className="hover:opacity-90 p-4 rounded-xl shadow-2xl transition duration-300">
                                <SlidersHorizontal className="w-8 h-8 text-white" />
                            </button>
                        </div>
                    </div>
                </div>

                <div style={{backgroundColor: ACCENT_COLOR}} className="h-4"></div> 
                
                {/* 🛑 NOUVEAU : Barre de filtres de service (en haut, juste sous le héros) */}
                <div className="bg-white border-b border-gray-200 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex justify-center items-center gap-4 flex-wrap">
                            {SERVICE_OPTIONS.map((service) => (
                                <button 
                                    key={service}
                                    onClick={() => handleServiceChange(service)}
                                    className={`
                                        font-medium px-4 py-2 rounded-lg transition-colors duration-200 text-sm
                                        ${selectedService === service 
                                            ? 'bg-[#DF7649] text-white shadow-md' 
                                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                                        }
                                    `}
                                >
                                    {service}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                {/* 🛑 FIN NOUVEAU : Barre de filtres de service */}

                {/* Barre de filtres secondaires originale, laissée inchangée */}
                <div className="bg-white border-b border-gray-200 shadow-sm hidden md:block">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex justify-start items-center gap-4">
                            {secondaryFilters.map((filter, index) => (
                                <div key={index} className="relative group flex-1">
                                    <button 
                                        className="flex items-center justify-between bg-white border border-gray-300 text-gray-800 transition duration-150 px-4 py-2.5 rounded-md w-full hover:border-gray-400 focus:border-gray-500 focus:outline-none text-sm"
                                    >
                                        <span className="font-medium">{filter}</span>
                                        <ChevronDown className="w-4 h-4 ml-2 text-gray-500 flex-shrink-0" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white pt-4 pb-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-medium text-base">
                                {loading ? 'Chargement...' : `${properties.length} propriété(s) trouvée(s)`}
                            </span>
                            <div className="relative group">
                                <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-800 px-4 py-2.5 rounded-md hover:border-gray-400 transition duration-150 text-sm">
                                    <span className="font-medium">Plus récentes</span>
                                    <ChevronDown className="w-4 h-4 text-gray-500" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                {loading && (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#DF7649]"></div>
                        <p className="text-xl text-gray-600 mt-4">Chargement des propriétés...</p>
                    </div>
                )}
                
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <p className="text-xl text-red-600 font-semibold mb-2">Erreur de chargement</p>
                        <p className="text-red-500">{error}</p>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
                        >
                            Réessayer
                        </button>
                    </div>
                )}
                
                {!loading && properties.length === 0 && !error && (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-xl text-gray-600">Aucune propriété disponible pour le moment.</p>
                        <p className="text-gray-500 mt-2">Revenez bientôt pour découvrir nos nouvelles offres !</p>
                    </div>
                )}

                {!loading && properties.length > 0 && (
                    <div className="grid md:grid-cols-3 gap-8">
                        {properties.map((property) => (
                            <Link 
                                key={property.id} 
                                to={`/proprietes/${property.id}`}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="relative overflow-hidden h-80">
                                    <img
                                        src={getImageUrl(property.images_url)}
                                        alt={property.titre || 'Propriété'}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        onError={(e) => {
                                            e.target.src = '/placeholder_image.jpg';
                                        }}
                                    />
                                    
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <span className="bg-[#DF7649] text-white px-4 py-2 rounded-full text-sm font-semibold">
                                            {/* 🛑 UTILISER property.service SI LE BACKEND L'ENVOIE, sinon utiliser statut */}
                                            {property.service || property.statut || 'À vendre'} 
                                        </span>
                                        <span className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold">
                                            {property.type || 'N/A'} 
                                        </span>
                                    </div>
                                    
                                    <button 
                                        onClick={(e) => {e.preventDefault(); e.stopPropagation();}} 
                                        className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-white/90 transition-all duration-300"
                                    >
                                        <Heart className="w-5 h-5 text-gray-600 hover:text-[#DF7649] transition-colors duration-300" />
                                    </button>
                                </div>
                                
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                                        {property.titre || 'Titre non disponible'} 
                                    </h3>
                                    
                                    <div className="flex items-start gap-2 text-gray-600 mb-4">
                                        <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                                        <span className="text-sm line-clamp-1">
                                            {property.adresse && property.ville 
                                                ? `${property.adresse}, ${property.ville}` 
                                                : property.ville || property.adresse || 'Localisation non spécifiée'}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center gap-4 text-gray-600 mb-4 text-sm">
                                        <div className="flex items-center gap-1">
                                            <Home className="w-4 h-4" />
                                            <span>{property.nbChambres || '0'}</span> 
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Bath className="w-4 h-4" />
                                            <span>{property.nbSallesDeBain || '0'}</span> 
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Square className="w-4 h-4" />
                                            <span>{property.surface ? `${property.surface}m²` : '-'}</span> 
                                        </div>
                                    </div>
                                    
                                    <div className="text-2xl font-bold text-[#DF7649]">
                                        {formatPrice(property.prix)}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {!loading && properties.length > 0 && (
                    <div className="flex justify-center items-center gap-2 mt-12">
                        <button className="px-5 py-2.5 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                            Précédent
                        </button>
                        <button className="px-4 py-2.5 bg-[#DF7649] text-white rounded-md font-semibold hover:bg-[#c96639] transition-colors">
                            1
                        </button>
                        <button className="px-4 py-2.5 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                            2
                        </button>
                        <button className="px-4 py-2.5 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                            3
                        </button>
                        <button className="px-5 py-2.5 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                            Suivant
                        </button>
                    </div>
                )}
            </div>
            
            <a 
                href="https://wa.me/221000000000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="fixed bottom-8 right-8 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors z-50"
            >
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
            </a>
            
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