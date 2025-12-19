import { useState, useEffect } from "react";
import { 
    Menu, X, MessageCircle, Mouse, Home, 
    Building2, Briefcase, Key, ClipboardList, Users, Calendar, DollarSign, MapPin, 
    Phone, Instagram, Linkedin, Mail, Handshake, Bath, Square, Heart
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios'; 
const API_URL = 'http://localhost:5000/api/proprietes/public';

// --- MOCK DATA pour les statistiques ---
const STATS_MOCK = [
    { id: 1, chiffre: "500+", description: "Biens vendus", icon: Home }, // Home ou un Bien
    { id: 2, chiffre: "15+", description: "Années d'expérience", icon: Briefcase }, // Mallette/Expérience
    { id: 3, chiffre: "1000+", description: "Clients satisfaits", icon: Users }, // Utilisateurs
    { id: 4, chiffre: "50+", description: "Partenaires", icon: Handshake }, // Ajoutez Handshake si non importé
];

// --- MOCK DATA pour les services ---
const SERVICES_MOCK = [
    // Ligne 1 du design
    { id: 1, titre: "Transactions immobilières", description: "Achat, vente et location de biens immobiliers avec un accompagnement personnalisé et professionnel.", icon: 'ClipboardList', path: "/services/transactionImmoPage" }, // Icône de Transaction (Similaire au design)
    { id: 2, titre: "Localisation de biens", description: "Trouvez le bien idéal grâce à notre expertise du marché immobilier sénégalais.", icon: 'MapPin', path: "/services/localisationPage" },
    { id: 3, titre: "Gestion de propriétés", description: "Gestion complète de vos biens immobiliers pour maximiser votre investissement.", icon: 'Home', path: "/services/gestionBienPage" },
    
    // Ligne 2 du design
    { id: 4, titre: "Vente de Terrain", description: "Large sélection de terrains constructibles dans les meilleurs zones.", icon: 'ClipboardList', path: "/services/venteTerrainPage" },
    { id: 5, titre: "Construction", description: "Service de construction clé en main avec des partenaires de confiance certifiés.", icon: 'Users', path: "/services/constructionPage" },
    { id: 6, titre: "Plans architecturaux", description: "Conception et élaboration de plan architecturaux sur mesure par nos experts", icon: 'Briefcase', path: "/services/plansArchitecturauxPage" },
    
    // Services supplémentaires (si vous les voulez)
    { id: 7, titre: "Enregistrement", description: "Assistance complète pour toute vos demarches administratives et legales", icon: 'Key', path: "/services/enregistrementPage" },
    { id: 8, titre: "Conseil immobiliers", description: "Expertises et conseils stratégique pour vos projets immobiliers d'envergure", icon: 'Briefcase', path: "/services/conseilImmoPage" },
    { id: 9, titre: "Topographie", description: "Services topographiques professionnels pour vos projets de construction.", icon: 'MapPin', path: "/services/topographiePage" },
];

// ...

// Mapping des noms de chaînes aux composants Lucide (pour les services)
const IconMap = {
    Home: Home,
    MapPin: MapPin,
    Building2: Building2,
    ClipboardList: ClipboardList, // Utilisé pour les transactions et la vente de terrain
    Key: Key,
    Briefcase: Briefcase,
    Users: Users, // Utilisé pour la construction/partenaires
    DollarSign: DollarSign,
    // Ajoutez les autres icônes Lucide utilisées dans les MOCK DATA (comme Star, Calendar, Handshake, etc.)
};

// Composant pour obtenir l'icône
const DynamicIcon = ({ name, className }) => {
    const IconComponent = IconMap[name];
    if (!IconComponent) return null;
    return <IconComponent className={className} />;
};
// ...

// Importez ou définissez vos fonctions utilitaires
const formatPrice = (price) => {
    // ... votre fonction formatPrice existante
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (numPrice && numPrice > 0) {
        return new Intl.NumberFormat('fr-FR', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(numPrice) + ' FCFA';
    }
    return 'Prix sur demande';
};

const getImageUrl = (imageUrl) => {
    // ... votre fonction getImageUrl existante
    if (!imageUrl) return '/placeholder_image.jpg';
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        return imageUrl;
    }
    return `http://localhost:5000${imageUrl}`;
};

export default function HomePage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const ACCENT_COLOR = "#DF7649";

    useEffect(() => {
        const handleScroll = () => {
            // Déclenche le changement de style après 20 pixels de défilement
            setScrolled(window.scrollY > 20); 
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

   // 1. Récupération des données dans le useEffect
    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true);
            try {
                // Utilise l'URL définie pour l'API publique des propriétés
                const response = await axios.get(API_URL);
                
                const allProperties = Array.isArray(response.data) ? response.data : [];
                
                // Limitez-vous aux 3 premières propriétés pour la section "Biens d'Exception"
                const exceptionProperties = allProperties.slice(0, 3); 
                
                setProperties(exceptionProperties);
            } catch (err) {
                console.error("Erreur lors de la récupération des biens d'exception:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    return ( 
    <div className="min-h-screen bg-white">
        {/* Header / Navigation */}
        <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? "bg-white/70 backdrop-blur-sm shadow-sm" : "bg-white"}`}> 
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
                {/* 4. HAUTEUR DU HEADER : réduite de h-20 à h-16 (par défaut dans Tailwind) */}
                <div className="flex justify-between items-center h-16"> 
                    
                    {/* 3. LOGO : Taille réduite (w-12 h-12) et marge droite ajustée (mr-0) */} 
                    <Link to="/" className="flex items-center"> 
                        <div className="w-20 h-20 overflow-hidden flex items-center justify-center"> 
                            {/* Assurez-vous que '/logo.png' est le chemin correct */}
                            <img src="/logo.png" alt="Logo Global Business Immo" className="w-full h-full object-contain" /> 
                        </div> 
                    </Link>

                    {/* Desktop Navigation */}
                    {/* 5. TEXTE : Taille réduite de text-[16px] à text-[15px] et poids ajusté */}
                    <div className="hidden md:flex items-center gap-8 mx-auto">
                        {/* 2. COULEUR DE SURVOL : On s'assure que c'est bien l'orange et qu'aucune classe bleue ne persiste */}
                        <Link to="/" className={`text-[15px] font-medium transition-colors ${location.pathname === "/" ? "text-[#DF7649]" : "text-gray-700 hover:text-[#DF7649]"}`}>Accueil</Link>
                        <Link to="/services" className={`text-[15px] font-medium transition-colors ${location.pathname === "/services" ? "text-[#DF7649]" : "text-gray-700 hover:text-[#DF7649]"}`}>Services</Link>
                        <Link to="/proprietes" className={`text-[15px] font-medium transition-colors ${location.pathname === "/proprietes" ? "text-[#DF7649]" : "text-gray-700 hover:text-[#DF7649]"}`}>Propriétés</Link>
                        <Link to="/apropos" className={`text-[15px] font-medium transition-colors ${location.pathname === "/apropos" ? "text-[#DF7649]" : "text-gray-700 hover:text-[#DF7649]"}`}>À Propos</Link>
                        <Link to="/contact" className={`text-[15px] font-medium transition-colors ${location.pathname === "/contact" ? "text-[#DF7649]" : "text-gray-700 hover:text-[#DF7649]"}`}>Contact</Link>
                    </div>
                    <div className="hidden md:flex">
                        <Link to="/contact" className="bg-[#DF7649] text-white px-5 py-2 rounded-lg hover:bg-[#c8653b] transition font-medium text-sm">Nous contacter</Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu (similaire) */}
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



<main>
{/* Hero Section */}
    <section className="relative min-h-screen flex items-center justify-center text-center">
        
        {/* Conteneur de l'Image de Fond */}
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80" 
                alt="Luxury villa sur la plage au Sénégal" 
                className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-800/60 to-slate-700/50"></div>
        </div>
        
        {/* Contenu Centré (Texte et Boutons) */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-4xl mx-auto"> 
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                    Votre partenaire
                    <br />
                    <span className="relative inline-block text-[#DF7649]">
                        immobilier
                        <svg className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-48 sm:w-64" height="12" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 10C100 2 200 2 298 10" stroke="#DF7649" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                    </span>
                    <br />
                    au Sénégal
                </h1>
                
                <p className="text-lg sm:text-xl font-light text-gray-200 mb-10 leading-relaxed max-w-2xl mx-auto">
                    Transactions, gestion locative, construction et conseil. Nous transformons vos projets immobiliers en réalité avec expertise et passion.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/proprietes" className="bg-[#DF7649] text-white px-8 py-3 rounded-lg hover:bg-[#c8653b] transition font-medium text-base flex items-center justify-center gap-2 group">
                        Découvrir nos biens
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                    <Link to="/contact" className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-lg hover:bg-white/20 transition font-medium text-base border-2 border-white/30">
                        Nous contacter
                    </Link>
                </div>
            </div>
        </div>
        
        {/* SCROLL INDICATOR */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
            <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white animate-bounce">
                <Mouse className="w-5 h-5" />
            </div>
        </div>

        {/* Bouton WhatsApp Flottant */}
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
    </section>

 {/* Section Statistiques (Bandeau Orange Vif) */}
<section className="bg-[#DF7649] py-8 sm:py-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white text-center">
            {STATS_MOCK.map((stat) => (
                // Conteneur de la statistique avec effet de survol (prend tout l'espace et change en blanc)
                <div 
                    key={stat.id} 
                    className="flex flex-col items-center justify-center p-4 h-full 
                                rounded-lg transition-all duration-300 group 
                                hover:bg-white" 
                >
                    
                    {/* Icône (taille réduite) */}
                    {stat.icon && (
                        <div className="mb-1">
                            {/* Icône plus petite (w-5, h-5) et change en orange au survol */}
                            <stat.icon 
                                className="w-5 h-5 sm:w-6 sm:h-6 text-white 
                                transition-colors duration-300 group-hover:text-[#DF7649]" 
                            />
                        </div>
                    )}

                    {/* Chiffre */}
                    <p className="text-2xl sm:text-3xl font-bold mb-0.5 
                                group-hover:text-[#DF7649] transition-colors duration-300">
                        {stat.chiffre}
                    </p>
                    
                    {/* Description (Texte très compact) */}
                    <p className="text-xs font-medium 
                                text-white/90 group-hover:text-gray-700 transition-colors duration-300">
                        {stat.description}
                    </p>
                </div>
            ))}
        </div>
    </div>
</section>
   
</main>

 {/* Section : Nos Services Premium */}
<section className="py-16 sm:py-24" style={{ backgroundColor: '#F9F4F1' }}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Titre de la Section */}
        <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                Nos Services Premium
            </h2>
            <div className="w-20 h-1 bg-[#DF7649] mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Une gamme complète de services immobiliers conçus pour répondre à tous vos besoins avec excellence et professionnalisme
            </p>
        </div>

       // ... Grille des Services (3 colonnes)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {/* Assurez-vous que SERVICES_MOCK est défini en haut du fichier */}
    {SERVICES_MOCK.map((service) => (
        <Link 
            key={service.id} 
            to={service.path || `/services/${service.id}`}
            // Carte blanche, coins arrondis, et effet de survol
            className="bg-white p-6 sm:p-8 rounded-2xl
                        shadow-sm transition-all duration-300 group relative
                        
                        // Bordure inférieure orange au survol
                        border-b-4 border-transparent hover:border-[#DF7649] 
                        
                        // Ombre légère
                        hover:shadow-xl hover:shadow-[#DF7649]/10"
        >
            
            {/* Conteneur de l'Icône avec HOVER */}
            <div className="w-14 h-14 bg-[#DF7649]/10 rounded-xl flex items-center justify-center mb-5 
                            transition-colors duration-300 group-hover:bg-[#DF7649]">
                {/* L'icône change de couleur au HOVER */}
                <DynamicIcon 
                    name={service.icon} 
                    className="w-7 h-7 text-[#DF7649] 
                               transition-colors duration-300 group-hover:text-white" 
                />
            </div>
            
            {/* Titre */}
            <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.titre}
            </h3>
            
            {/* Description */}
            <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                {service.description}
            </p>
            
            {/* Lien "Lire la suite" */}
            <span 
                to={`/services/${service.id}`}
                // LIEN NOIR PAR DÉFAUT, ORANGE PAR SURVOL DE LA CARTE (group-hover)
                className="text-gray-900 font-semibold text-sm flex items-center gap-1 
                           group-hover:text-[#DF7649] hover:gap-2 transition-all duration-300"
            >
                Lire la suite 
                <span className="transform group-hover:translate-x-0.5 transition-transform">→</span>
            </span>
        </Link>
    ))}
</div>
// ...
    </div>
</section>


 {/* Biens d'Exception Section */}
<section className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Biens d'Exception</h2>
            <div className="w-32 h-1 bg-orange-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez notre sélection exclusive de propriétés haut de gamme au Sénégal
            </p>
        </div>

        {/* Affichage du chargement/erreur (Optionnel) */}
        {/* Assurez-vous que les états `loading` et `properties` sont définis dans votre composant */}
        {loading && <p className="text-center text-gray-600">Chargement des biens...</p>}
        {!loading && properties.length === 0 && (
            <p className="text-center text-gray-600">Aucun bien d'exception trouvé pour le moment.</p>
        )}

        {/* Properties Grid */}
        {!loading && properties.length > 0 && (
            <div className="grid md:grid-cols-3 gap-8">
                {/* 3. Mappage des données réelles sur le composant de carte */}
                {properties.map((property) => (
                    <Link 
                        key={property.id}
                        to={`/proprietes/${property.id}`}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                    >
                        <div className="relative overflow-hidden h-80">
                            <img
                                src={getImageUrl(property.images_url)} // URL réelle
                                alt={property.titre || 'Propriété'}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                onError={(e) => { e.target.src = '/placeholder_image.jpg'; }}
                            />
                            {/* Badges : Utiliser les données réelles */}
                            <div className="absolute top-4 left-4 flex gap-2">
                                <span className={`bg-transparent border border-white text-white group-hover:bg-[#DF7649] group-hover:border-[#DF7649] group-hover:text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300`}>
                                    {property.statut || 'À vendre'}
                                </span>
                                <span className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold">
                                    {property.type || 'N/A'}
                                </span>
                            </div>
                            {/* Favorite Icon (simulé) */}
                            <button onClick={(e) => {e.preventDefault(); e.stopPropagation();}} className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:bg-transparent transition-all duration-300">
                                <Heart className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
                            </button>
                        </div>
                        <div className="p-6">
                            {/* Titre réel */}
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#DF7649] mb-2 transition-colors duration-300 line-clamp-1">
                                {property.titre || 'Titre non disponible'}
                            </h3>
                            {/* Localisation réelle */}
                            <div className="flex items-center gap-2 text-gray-600 mb-4">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm line-clamp-1">
                                    {property.ville || 'Localisation non spécifiée'}
                                </span>
                            </div>
                            {/* Détails réels (Chambres, Salles de bain, Surface) */}
                            <div className="flex items-center gap-4 text-gray-600 mb-4 text-sm">
                                <div className="flex items-center gap-1">
                                    <Home className="w-4 h-4" />
                                    {/* CORRECTION: Utilisation de property.nbChambres */}
                                    <span>{property.nbChambres || '0'}</span> 
                                </div>
                                <div className="flex items-center gap-1">
                                    <Bath className="w-4 h-4" />
                                    {/* CORRECTION: Utilisation de property.nbSallesDeBain */}
                                    <span>{property.nbSallesDeBain || '0'}</span> 
                                </div>
                                <div className="flex items-center gap-1">
                                    <Square className="w-4 h-4" />
                                    <span>{property.surface ? `${property.surface}m²` : 'N/A'}</span>
                                </div>
                            </div>
                            {/* Prix réel */}
                            <div className="text-3xl font-bold text-[#DF7649] group-hover:text-gray-900 transition-colors duration-300">
                                {formatPrice(property.prix)}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        )}


        {/* View All Button */}
        <div className="text-center mt-12">
            <Link 
                to="/proprietes"
                className="inline-flex items-center gap-2 bg-[#DF7649] text-white px-8 py-3.5 rounded-lg hover:bg-[#c96639] transition-all font-semibold text-base group shadow-md hover:shadow-lg"
            >
                Voir tout
                <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
        </div>
    </div>
</section>

{/* Testimonials Section */}
<section className="py-20 bg-white relative overflow-hidden">
  
  {/* Decorative Circle */}
  <div className="absolute left-10 top-1/2 transform -translate-y-1/2 w-48 h-48 bg-orange-200 rounded-full opacity-20 blur-3xl"></div>
  
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="text-center mb-16">
      <h2 className="text-5xl font-bold text-gray-900 mb-4">Ils nous font confiance</h2>
      <div className="w-32 h-1 bg-orange-500 mx-auto mb-6"></div>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Découvrez les expériences de nos clients satisfaits
      </p>
    </div>

    {/* Testimonials Grid */}
    <div className="grid md:grid-cols-3 gap-8">
      
      {/* Testimonial 1 */}
      <div className="bg-white p-8 pt-12 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 relative">
        
        {/* Icône de citation stylisée en ORANGE */}
        <div className="absolute top-0 left-4 text-7xl font-serif font-extrabold text-orange-500 leading-none">
          "
        </div>
        
        <div className="relative z-10">
          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            Service exceptionnel ! L'équipe de Global Business Immo m'a aidé à trouver la propriété parfaite pour mon entreprise. Professionnalisme et efficacité.
          </p>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <h4 className="font-bold text-gray-900 text-lg">Mamadou Diallo</h4>
              <p className="text-sm text-gray-600">Entrepreneur</p>
            </div>
            <div className="flex gap-1">
              <svg className="w-5 h-5 text-orange-500 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              <svg className="w-5 h-5 text-orange-500 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              <svg className="w-5 h-5 text-orange-500 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              <svg className="w-5 h-5 text-orange-500 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              <svg className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial 2 */}
      <div className="bg-white p-8 pt-12 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 relative">
        <div className="absolute top-0 left-4 text-7xl font-serif font-extrabold text-orange-500 leading-none">
          "
        </div>
        <div className="relative z-10">
          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            Une expérience remarquable du début à la fin. Ils ont géré tous les aspects de ma transaction avec expertise et transparence.
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <h4 className="font-bold text-gray-900 text-lg">Fatou Sarr</h4>
              <p className="text-sm text-gray-600">Investisseur</p>
            </div>
            <div className="flex gap-1">
              <svg className="w-5 h-5 text-orange-500 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              <svg className="w-5 h-5 text-orange-500 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              <svg className="w-5 h-5 text-orange-500 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              <svg className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              <svg className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial 3 */}
      <div className="bg-white p-8 pt-12 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 relative">
        <div className="absolute top-0 left-4 text-7xl font-serif font-extrabold text-orange-500 leading-none">
          "
        </div>
        <div className="relative z-10">
          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            Excellente gestion de mon patrimoine immobilier. Je recommande vivement leurs services à tous ceux qui cherchent la qualité.
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <h4 className="font-bold text-gray-900 text-lg">Omar Kane</h4>
              <p className="text-sm text-gray-600">Propriétaire</p>
            </div>
            <div className="flex gap-1">
              <svg className="w-5 h-5 text-orange-500 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              <svg className="w-5 h-5 text-orange-500 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              <svg className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              <svg className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              <svg className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Carousel Dots */}
    <div className="flex justify-center gap-2 mt-12">
      <div className="w-12 h-1 bg-orange-500 rounded-full"></div>
      <div className="w-12 h-1 bg-orange-200 rounded-full"></div>
      <div className="w-12 h-1 bg-orange-200 rounded-full"></div>
    </div>
  </div>
</section>

{/* Contact Section */}
<section className="py-20 bg-[#DF7649] relative overflow-hidden">
  
  {/* Decorative Circle */}
  <div className="absolute left-0 top-0 w-80 h-80 border-4 border-white/20 rounded-full -translate-x-40 -translate-y-40"></div>
  
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      
      {/* Left Content (Texte) */}
      <div className="text-white">
        
        {/* Titre avec ligne décorative (comme sur le design) */}
        <div className="relative mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">
            Prêt à concrétiser votre projet immobilier ?
          </h2>
          {/* Ligne décorative : la ligne principale blanche avec une ligne plus fine en dessous ou un effet de contour si c'est ce que vous voulez simuler */}
          <div className="w-64 h-2 absolute bottom-[-10px] left-0">
            <div className="h-1 bg-white"></div>
            {/* Si l'on veut simuler un double trait, ou une ombre */}
          </div>
        </div>
        
        <p className="text-xl mb-10 leading-relaxed pt-12">
          Transformez vos idées en réalité avec un accompagnement sur mesure, pensé pour vos besoins et vos ambitions.
        </p>
        
        {/* Guillemet stylisé */}
        <div className="text-6xl font-serif font-extrabold text-white/90 mb-4 leading-none">
          "
        </div>
        
        <p className="text-lg leading-relaxed mb-4">
          Chez Global Business Immo, nous croyons qu'un bon projet commence par une bonne écoute.
        </p>
        <p className="text-lg leading-relaxed">
          Que vous soyez acheteur, vendeur, investisseur ou constructeur, notre équipe d'experts vous guide à chaque étape.
        </p>
      </div>

      {/* Right Form - Ajusté pour la transparence et le flou (Backdrop Blur) */}
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/30">
        <form className="space-y-6">
          
          {/* Nom complet */}
          <div>
            <label className="block text-white mb-2 font-semibold">Nom complet</label>
            <input
              type="text"
              placeholder="Votre nom"
              // Les inputs restent blancs pour le contraste
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-white mb-2 font-semibold">Email</label>
            <input
              type="email"
              placeholder="votre@email.com"
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          {/* Téléphone */}
          <div>
            <label className="block text-white mb-2 font-semibold">Téléphone</label>
            <input
              type="tel"
              placeholder="+221 XX XXX XX XX"
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-white mb-2 font-semibold">Message</label>
            <textarea
              rows="4"
              placeholder="Décrivez votre projet ou votre demande..."
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white resize-none"
            ></textarea>
          </div>

          {/* Bouton - Notez qu'il est Blanc avec texte Orange dans le design, mais dans votre capture, il est Blanc avec un léger orange. Je le mets en Blanc pour respecter le contraste. */}
          <button
            type="submit"
            className="w-full bg-white text-[#DF7649] px-8 py-4 rounded-lg hover:bg-gray-100 transition font-semibold text-lg"
          >
            Nous contacter
          </button>
        </form>
      </div>
    </div>
  </div>
</section>


  {/* Footer */}
<footer className="bg-gray-50 pt-16 pb-8">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid md:grid-cols-4 gap-12 mb-12">
      
      {/* Colonne 1: Logo & Description & Réseaux Sociaux */}
      <div>
        {/* Remplacement du bloc d'icônes par l'image du logo */}
        <div className="mb-4">
          <img src="/logo.png" alt="Global Business Immo Logo" className="h-12 w-auto" />
        </div>
        
        <p className="text-gray-600 mb-6 leading-relaxed text-sm">
          Un service à juste valeur ! Votre partenaire de confiance pour tous vos projets immobiliers au Sénégal.
        </p>

        {/* Liens Sociaux (Utilisation d'icônes pour correspondre au design) */}
        <div className="flex items-center gap-4">
          <a href="#" className="text-gray-600 hover:text-orange-500 transition w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full">
            {/* Placeholder pour Icône Instagram */}
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M7.8 2c-2.4 0-4.3 1.9-4.3 4.3v11.4c0 2.4 1.9 4.3 4.3 4.3h8.4c2.4 0 4.3-1.9 4.3-4.3V6.3c0-2.4-1.9-4.3-4.3-4.3H7.8zm1.2 2h6c1.2 0 2.3 1.1 2.3 2.3v6.7c0 1.2-1.1 2.3-2.3 2.3h-6c-1.2 0-2.3-1.1-2.3-2.3V6.3c0-1.2 1.1-2.3 2.3-2.3zm3 3c-1.8 0-3.3 1.5-3.3 3.3s1.5 3.3 3.3 3.3 3.3-1.5 3.3-3.3-1.5-3.3-3.3-3.3zm0 2c.7 0 1.3.6 1.3 1.3s-.6 1.3-1.3 1.3-1.3-.6-1.3-1.3.6-1.3 1.3-1.3zM15 6.3c0 .3.2.5.5.5s.5-.2.5-.5-.2-.5-.5-.5-.5.2-.5.5z"/></svg>
          </a>
          <a href="#" className="text-gray-600 hover:text-orange-500 transition w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full">
            {/* Placeholder pour Icône Facebook */}
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14 11h-3v-2h3v2zm-3-4h3v-2h-3v2zm3-4h-3v-2h3v2zm4 4h-3v-2h3v2zM12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 18c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm-2-12h-3v2h3v-2zm-3 4h3v2h-3v-2z"/></svg>
          </a>
          <a href="#" className="text-gray-600 hover:text-orange-500 transition w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full">
            {/* Placeholder pour Icône LinkedIn */}
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8v-2h-3v2h3zm-3 4h-3v-2h3v2zm3 4h-3v-2h3v2zM12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 18c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm-2-12h-3v2h3v-2zm-3 4h3v2h-3v-2z"/></svg>
          </a>
        </div>
      </div>

      {/* Colonne 2: Liens Rapides */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Liens Rapides</h3>
        <ul className="space-y-3">
          <li><a href="/" className="text-gray-600 hover:text-orange-500 transition">Accueil</a></li>
          <li><a href="/services" className="text-gray-600 hover:text-orange-500 transition">Services</a></li>
          <li><a href="/proprietes" className="text-gray-600 hover:text-orange-500 transition">Propriétés</a></li>
          <li><a href="/apropos" className="text-gray-600 hover:text-orange-500 transition">À Propos</a></li>
          <li><a href="/contact" className="text-gray-600 hover:text-orange-500 transition">Contact</a></li>
        </ul>
      </div>
      
      {/* Colonne 3: Nos Services (Ajoutée pour correspondre au design) */}
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

      {/* Colonne 4: Contact (Mise à jour pour correspondre au design) */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Contact</h3>
        <ul className="space-y-3">
          <li className="text-gray-600 flex items-start gap-3">
            {/* Placeholder pour Icône Location */}
            <svg className="w-4 h-4 mt-1 text-orange-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Dakar, Sénégal
          </li>
          <li className="text-gray-600 flex items-start gap-3">
            {/* Placeholder pour Icône Téléphone */}
            <svg className="w-4 h-4 mt-1 text-orange-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            +221 XX XXX XX XX
          </li>
          <li className="text-gray-600 flex items-start gap-3">
            {/* Placeholder pour Icône Email */}
            <svg className="w-4 h-4 mt-1 text-orange-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            contact@globalbusinessimmo.sn
          </li>
        </ul>
      </div>

    </div>

    {/* Section Copyright et Mentions Légales */}
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
