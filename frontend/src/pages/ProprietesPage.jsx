import { useState, useEffect } from "react";
import { 
    Menu, X, Mouse, Home, 
    Building2, Briefcase, Key, ClipboardList, Users, Calendar, DollarSign, MapPin, 
    Phone, Instagram, Linkedin, Mail, Handshake, Search, SlidersHorizontal, ChevronDown, ArrowRight, MessageCircle, Heart, Bath, Square
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const HERO_BG_IMAGE = 'URL_DE_VOTRE_IMAGE_DE_FOND.jpg'; 


const secondaryFilters = [
    "Type de bien", "Prix", "Chambres", "Surface", "Localisation", "Statut"
];

  const properties = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      status: "À vendre",
      type: "Appartement",
      title: "Appartement moderne - Almadies",
      location: "Almadies, Dakar",
      rooms: 3,
      baths: 2,
      surface: "120m²",
      price: "85 000 000 FCFA"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      status: "À vendre",
      type: "Commercial",
      title: "Immeuble commercial - Plateau",
      location: "Almadies, Dakar",
      rooms: 3,
      baths: 2,
      surface: "120m²",
      price: "450 000 000 FCFA"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      status: "À vendre",
      type: "Villa",
      title: "Villa moderne - Almadies",
      location: "Almadies, Dakar",
      rooms: 3,
      baths: 2,
      surface: "120m²",
      price: "320 000 000 FCFA"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      status: "À vendre",
      type: "Appartement",
      title: "Appartement moderne - Almadies",
      location: "Almadies, Dakar",
      rooms: 3,
      baths: 2,
      surface: "120m²",
      price: "85 000 000 FCFA"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      status: "À vendre",
      type: "Commercial",
      title: "Immeuble commercial - Plateau",
      location: "Almadies, Dakar",
      rooms: 3,
      baths: 2,
      surface: "120m²",
      price: "450 000 000 FCFA"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      status: "À vendre",
      type: "Villa",
      title: "Villa moderne - Almadies",
      location: "Almadies, Dakar",
      rooms: 3,
      baths: 2,
      surface: "120m²",
      price: "320 000 000 FCFA"
    }
  ];

export default function ProprietesPage() {
    // Hooks nécessaires
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Effet pour gérer le changement de couleur au scroll
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const ACCENT_COLOR = "#DF7649";

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
                
                {/* ======================================================= */}
                {/* A. SECTION BANNIÈRE (HERO) & FILTRES          */}
                {/* ======================================================= */}
                
             <section className="ProprietesHero relative">
                    
                    {/* Bloc Bannière */}
                    <div 
                        className="relative bg-cover bg-center h-[650px] flex items-center" 
                        style={{ backgroundImage: `url(${HERO_BG_IMAGE})` }}
                    >
                        {/* Overlay très léger, comme dans le design */}
                        <div className="absolute inset-0 bg-black opacity-10"></div> 

                        {/* Contenu du Hero (Texte et Barre de Recherche) */}
                        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white text-center pt-24"> 
                            <h1 className="text-7xl font-extrabold mb-4 drop-shadow-lg" style={{textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>
                                Nos Propriétés
                            </h1>
                            <p className="text-xl mb-12 drop-shadow-md max-w-3xl mx-auto">
                                Découvrez notre sélection de biens immobiliers d'exception au Sénégal
                            </p>

                            {/* Barre de Recherche Principale (CORRECTION 2 : Fond blanc et coins très arrondis) */}
                            <div className="flex justify-center items-center space-x-4">
                                <div className="flex-1 max-w-3xl **bg-white** rounded-full shadow-2xl overflow-hidden"> 
                                    <label htmlFor="main-search" className="sr-only">Rechercher par ville, quartier ou type de bien...</label>
                                    <div className="flex items-center p-1">
                                        <Search className="w-6 h-6 text-gray-400 ml-4" />
                                        <input
                                            id="main-search"
                                            type="text"
                                            placeholder="Rechercher par ville, quartier ou type de bien..."
                                            className="w-full py-4 px-4 text-lg **text-gray-800** focus:outline-none placeholder-gray-500 bg-transparent"
                                        />
                                    </div>
                                </div>
                                {/* Bouton Filtre (Carré Orange) */}
                                <button style={{backgroundColor: ACCENT_COLOR}} className="hover:opacity-90 p-4 rounded-xl shadow-2xl transition duration-300">
                                    <SlidersHorizontal className="w-8 h-8 text-white" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Section de Séparation Orange */}
                    <div style={{backgroundColor: ACCENT_COLOR}} className="h-4"></div> 
                    
                {/* CORRECTION V3 : Barre de Filtres Secondaires (Bordures fines et fond blanc minimaliste) */}
               {/* Barre de Filtres Secondaires */}
<div className="bg-white border-b border-gray-200 shadow-sm">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    <div className="flex justify-start items-center gap-4">
      {/* Filtres */}
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

{/* Ligne des Résultats */}
<div className="bg-white pt-4 pb-8">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center">
      <span className="text-gray-700 font-medium text-base">
        6 propriétés trouvées
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

{/* Grille des Propriétés */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="relative overflow-hidden h-80">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-transparent border border-white text-white group-hover:bg-[#DF7649] group-hover:border-[#DF7649] px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300">
                    {property.status}
                  </span>
                  <span className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold">
                    {property.type}
                  </span>
                </div>
                
                {/* Favorite Icon */}
                <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:bg-transparent transition-all duration-300">
                  <Heart className="w-5 h-5 text-gray-600 group-hover:text-[#DF7649] transition-colors duration-300" />
                </button>
              </div>
              
              <div className="p-6">
                {/* Titre */}
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#DF7649] mb-2 transition-colors duration-300">
                  {property.title}
                </h3>
                
                {/* Localisation */}
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{property.location}</span>
                </div>
                
                {/* Détails de la propriété */}
                <div className="flex items-center gap-4 text-gray-600 mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Home className="w-4 h-4" />
                    <span>{property.rooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4" />
                    <span>{property.baths}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="w-4 h-4" />
                    <span>{property.surface}</span>
                  </div>
                </div>
                
                {/* Prix */}
                <div className="text-3xl font-bold text-[#DF7649] group-hover:text-gray-900 transition-colors duration-300">
                  {property.price}
                </div>
              </div>
            </div>
          ))}
        </div>

    {/* Pagination */}
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
      </div>
      {/* Bouton WhatsApp fixe */}
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
};

