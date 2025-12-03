import { useState, useEffect } from "react";
import { 
    Menu, X, MessageCircle, Mouse, Home, 
    Building2, Briefcase, Key, ClipboardList, Users, Calendar, DollarSign, MapPin, 
    Phone, Instagram, Linkedin, Mail, Handshake
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';


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
    { id: 1, titre: "Transactions immobilières", description: "Achat, vente et location de biens immobiliers avec un accompagnement personnalisé et professionnel.", icon: 'ClipboardList' }, // Icône de Transaction (Similaire au design)
    { id: 2, titre: "Localisation de biens", description: "Trouvez le bien idéal grâce à notre expertise du marché immobilier sénégalais.", icon: 'MapPin' },
    { id: 3, titre: "Gestion de propriétés", description: "Gestion complète de vos biens immobiliers pour maximiser votre investissement.", icon: 'Home' },
    
    // Ligne 2 du design
    { id: 4, titre: "Vente de Terrain", description: "Large sélection de terrains constructibles dans les meilleurs zones.", icon: 'ClipboardList' },
    { id: 5, titre: "Construction", description: "Service de construction clé en main avec des partenaires de confiance certifiés.", icon: 'Users' },
    { id: 6, titre: "Plans architecturaux", description: "Conception et élaboration de plan architecturaux sur mesure par nos experts", icon: 'Briefcase' },
    
    // Services supplémentaires (si vous les voulez)
    { id: 7, titre: "Enregistrement", description: "Assistance complète pour toute vos demarches administratives et legales", icon: 'Key' },
    { id: 8, titre: "Conseil immobiliers", description: "Expertises et conseils stratégique pour vos projets immobiliers d'envergure", icon: 'Briefcase' },
    { id: 9, titre: "Topographie", description: "Services topographiques professionnels pour vos projets de construction.", icon: 'MapPin' },
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

export default function HomePage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            // Déclenche le changement de style après 20 pixels de défilement
            setScrolled(window.scrollY > 20); 
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
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
                        <Link to="/catalogue" className={`text-[15px] font-medium transition-colors ${location.pathname === "/catalogue" ? "text-[#DF7649]" : "text-gray-700 hover:text-[#DF7649]"}`}>Catalogue</Link>
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
                            <Link to="/catalogue" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 px-4 py-2">Catalogue</Link>
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
                    <Link to="/catalogue" className="bg-[#DF7649] text-white px-8 py-3 rounded-lg hover:bg-[#c8653b] transition font-medium text-base flex items-center justify-center gap-2 group">
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
        <a href="https://wa.me/221XXXXXXXXX" target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110">
            <MessageCircle className="w-6 h-6" />
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
<section className="py-16 sm:py-24 bg-white">
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
        <div 
            key={service.id} 
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
            <Link 
                to={`/services/${service.id}`}
                // LIEN NOIR PAR DÉFAUT, ORANGE PAR SURVOL DE LA CARTE (group-hover)
                className="text-gray-900 font-semibold text-sm flex items-center gap-1 
                           group-hover:text-[#DF7649] hover:gap-2 transition-all duration-300"
            >
                Lire la suite 
                <span className="transform group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
        </div>
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

          {/* Properties Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Property 1 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="relative overflow-hidden h-80">
                <img
                  src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80"
                  alt="Appartement moderne"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    À vendre
                  </span>
                  <span className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold">
                    Appartement
                  </span>
                </div>
                {/* Favorite Icon */}
                <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition">
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Appartement moderne - Almadies</h3>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">Almadies, Dakar</span>
                </div>
                {/* Property Details */}
                <div className="flex items-center gap-4 text-gray-600 mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>3</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                    <span>2</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                    <span>120m²</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-orange-500">
                  85 000 000 FCFA
                </div>
              </div>
            </div>

            {/* Property 2 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="relative overflow-hidden h-80">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
                  alt="Immeuble commercial"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    À vendre
                  </span>
                  <span className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold">
                    Commercial
                  </span>
                </div>
                <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition">
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Immeuble commercial - Plateau</h3>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">Almadies, Dakar</span>
                </div>
                <div className="flex items-center gap-4 text-gray-600 mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>3</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                    <span>2</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                    <span>120m²</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-orange-500">
                  450 000 000 FCFA
                </div>
              </div>
            </div>

            {/* Property 3 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="relative overflow-hidden h-80">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
                  alt="Villa moderne"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    À vendre
                  </span>
                  <span className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold">
                    Villa
                  </span>
                </div>
                <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition">
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Immeuble commercial - Plateau</h3>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">Almadies, Dakar</span>
                </div>
                <div className="flex items-center gap-4 text-gray-600 mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>3</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                    <span>2</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                    <span>120m²</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-orange-500">
                  320 000 000 FCFA
                </div>
              </div>
            </div>
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <button className="bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition font-medium text-lg flex items-center gap-2 mx-auto group">
              Voir tout
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative Circle */}
        <div className="absolute left-10 top-1/2 transform -translate-y-1/2 w-32 h-32 bg-orange-200 rounded-full opacity-30 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="bg-white p-8 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="text-orange-500 text-4xl mb-4 font-bold">"</div>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Service exceptionnel ! L'équipe de Global Business Immo m'a aidé à trouver la propriété parfaite pour mon entreprise. Professionnalisme et efficacité.
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Mamadou Diallo</h4>
                  <p className="text-sm text-gray-600">Entrepreneur</p>
                </div>
                <div className="flex gap-1">
                  <svg className="w-5 h-5 text-orange-500 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                  <svg className="w-5 h-5 text-orange-500 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                  <svg className="w-5 h-5 text-orange-500 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                  <svg className="w-5 h-5 text-orange-500 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                  <svg className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="text-orange-500 text-4xl mb-4 font-bold">"</div>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Une expérience remarquable du début à la fin. Ils ont géré tous les aspects de ma transaction avec expertise et transparence.
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Fatou Sarr</h4>
                  <p className="text-sm text-gray-600">Investisseur</p>
                </div>
                <div className="flex gap-1">
                  <svg className="w-5 h-5 text-orange-500 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                  <svg className="w-5 h-5 text-orange-500 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                  <svg className="w-5 h-5 text-orange-500 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                  <svg className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                  <svg className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="text-orange-500 text-4xl mb-4 font-bold">"</div>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Excellente gestion de mon patrimoine immobilier. Je recommande vivement leurs services à tous ceux qui cherchent la qualité.
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Omar Kane</h4>
                  <p className="text-sm text-gray-600">Propriétaire</p>
                </div>
                <div className="flex gap-1">
                  <svg className="w-5 h-5 text-orange-500 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                  <svg className="w-5 h-5 text-orange-500 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                  <svg className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                  <svg className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                  <svg className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
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
      <section className="py-20 bg-orange-400 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute left-0 top-0 w-64 h-64 border-4 border-white/20 rounded-full -translate-x-32 -translate-y-32"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Prêt à concrétiser votre projet immobilier ?
              </h2>
              <div className="w-32 h-1 bg-white mb-8"></div>
              <p className="text-xl mb-8 leading-relaxed">
                Transformez vos idées en réalité avec un accompagnement sur mesure, pensé pour vos besoins et vos ambitions.
              </p>
              
              <div className="text-5xl font-bold mb-8">"</div>
              
              <p className="text-lg leading-relaxed mb-4">
                Chez Global Business Immo, nous croyons qu'un bon projet commence par une bonne écoute.
              </p>
              <p className="text-lg leading-relaxed">
                Que vous soyez acheteur, vendeur, investisseur ou constructeur, notre équipe d'experts vous guide à chaque étape :
              </p>
            </div>

            {/* Right Form */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <form className="space-y-6">
                <div>
                  <label className="block text-white mb-2 font-medium">Nom complet</label>
                  <input
                    type="text"
                    placeholder="Votre nom"
                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 font-medium">Email</label>
                  <input
                    type="email"
                    placeholder="votre@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 font-medium">Téléphone</label>
                  <input
                    type="tel"
                    placeholder="+221 XX XXX XX XX"
                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 font-medium">Message</label>
                  <textarea
                    rows="4"
                    placeholder="Décrivez votre projet ou votre demande..."
                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-orange-500 px-8 py-4 rounded-lg hover:bg-gray-100 transition font-semibold text-lg"
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
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-800">Global Business</span>
              <span className="text-xs text-gray-600">Immobilier</span>
            </div>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Votre partenaire de confiance pour tous vos projets immobiliers au Sénégal.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Liens Rapides</h3>
          <ul className="space-y-3">
            <li><Link to="/" className="text-gray-600 hover:text-orange-500 transition">Accueil</Link></li>
            <li><Link to="/services" className="text-gray-600 hover:text-orange-500 transition">Services</Link></li>
            <li><Link to="/catalogue" className="text-gray-600 hover:text-orange-500 transition">Catalogue</Link></li>
            <li><Link to="/apropos" className="text-gray-600 hover:text-orange-500 transition">À Propos</Link></li>
            <li><Link to="/contact" className="text-gray-600 hover:text-orange-500 transition">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Contact</h3>
          <p className="text-gray-600 mb-2 flex items-center gap-2"><Phone className="w-4 h-4" /> +221 XX XXX XXXX</p>
          <p className="text-gray-600 mb-2 flex items-center gap-2"><MessageCircle className="w-4 h-4" /> contact@globalbusiness.sn</p>
          <p className="text-gray-600 flex items-center gap-2"><Building2 className="w-4 h-4" /> Dakar, Sénégal</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Suivez-nous</h3>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-600 hover:text-orange-500 transition">Facebook</a>
            <a href="#" className="text-gray-600 hover:text-orange-500 transition">Instagram</a>
            <a href="#" className="text-gray-600 hover:text-orange-500 transition">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm border-t border-gray-200 pt-4">
        &copy; {new Date().getFullYear()} Global Business Immobilier. Tous droits réservés.
      </div>
    </div>
  </footer>
</div>

);
}
