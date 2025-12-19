import { useState, useEffect } from "react";
import { 
  Home, 
  Building2, 
  MapPin, 
  FileText, 
  Hammer, 
  PenTool, 
  CheckCircle, 
  Users, 
  Compass,
  Menu,
  X,
  MessageCircle,
  Phone,
  ArrowRight,
  ClipboardList,
  Key,
  Briefcase,
  DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
const ACCENT_COLOR = "#DF7649";

export default function ServicesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Données des services
  const services = [
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Transactions immobilières",
      description: "Achat, vente et location de biens immobiliers avec un accompagnement personnalisé et professionnel.",
      details: [
        "Accompagnement complet dans vos projets d'achat",
        "Estimation précise de vos biens",
        "Négociation optimale des prix",
        "Gestion administrative complète"
      ]
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Localisation de biens",
      description: "Trouvez le bien idéal grâce à notre expertise du marché immobilier sénégalais.",
      details: [
        "Recherche personnalisée selon vos critères",
        "Accès à notre réseau exclusif de propriétés",
        "Visites organisées et accompagnées",
        "Conseils sur les meilleurs quartiers"
      ]
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Gestion de propriétés",
      description: "Gestion complète de vos biens immobiliers pour maximiser votre investissement.",
      details: [
        "Gestion locative professionnelle",
        "Entretien et maintenance réguliers",
        "Suivi des paiements et charges",
        "Rapports mensuels détaillés"
      ]
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Vente de terrains",
      description: "Large sélection de terrains constructibles dans les meilleures zones.",
      details: [
        "Terrains viabilisés et titrés",
        "Localisation stratégique",
        "Documentation complète",
        "Assistance juridique"
      ]
    },
    {
      icon: <Hammer className="w-8 h-8" />,
      title: "Construction",
      description: "Services de construction clé en main avec des partenaires de confiance certifiés.",
      details: [
        "Gestion complète de projet",
        "Partenaires certifiés et expérimentés",
        "Respect des délais et budgets",
        "Garantie décennale"
      ]
    },
    {
      icon: <PenTool className="w-8 h-8" />,
      title: "Plans architecturaux",
      description: "Conception et élaboration de plans architecturaux sur mesure par nos experts.",
      details: [
        "Design moderne et fonctionnel",
        "Plans 2D et 3D détaillés",
        "Conformité aux normes",
        "Révisions illimitées jusqu'à satisfaction"
      ]
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Enregistrement",
      description: "Assistance complète pour toutes vos démarches administratives et légales.",
      details: [
        "Enregistrement aux impôts et domaines",
        "Suivi des dossiers administratifs",
        "Conseils juridiques",
        "Obtention de documents officiels"
      ]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Conseil immobilier",
      description: "Expertise et conseils stratégiques pour vos projets immobiliers d'envergure.",
      details: [
        "Étude de marché approfondie",
        "Stratégie d'investissement personnalisée",
        "Analyse de rentabilité",
        "Accompagnement à long terme"
      ]
    },
    {
      icon: <Compass className="w-8 h-8" />,
      title: "Topographie",
      description: "Services topographiques professionnels pour vos projets de construction.",
      details: [
        "Relevés topographiques précis",
        "Bornage de terrains",
        "Plans de masse",
        "Certificats de conformité"
      ]
    }
  ];

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

{/* Hero Section - Page Services */}
<section className="relative pt-20 min-h-[70vh] flex items-center overflow-hidden">
  
  {/* Background Image with Overlay */}
  <div className="absolute inset-0 z-0">
    <img
      // J'ai remis un placeholder d'image pour illustrer l'intégration
      src="https://images.unsplash.com/photo-1582268611958-abde2e2440c9?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Vue angulaire d'un bâtiment moderne, Services immobiliers"
      className="w-full h-full object-cover"
    />
    
    {/* Overlay pour assombrir et faire ressortir le texte */}
    <div className="absolute inset-0 bg-gray-900/40"></div> 
    
    {/* Dégradé léger en bas pour adoucir la transition avec la prochaine section */}
    {/* <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-50/10 to-transparent"></div>
  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#DF7649] to-transparent"></div> */}
  
  </div>

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
    
    {/* Conteneur pour le Titre et la Ligne */}
    <div className="inline-block relative mb-8">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-lg">
          Nos services immobiliers
        </h1>
        {/* Ligne décorative orange (conforme au design) */}
        <div className="w-1/3 h-1 bg-[#DF7649] mx-auto mt-2"></div>
    </div>
    
    <p className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto mb-8 drop-shadow-md">
      Solutions complètes pour tous vos projets au Sénégal
    </p>
    
    {/* Bouton avec la couleur #DF7649 */}
    <button className="bg-[#DF7649] text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition duration-300 font-semibold text-lg drop-shadow-lg">
      Demander un devis
    </button>
  </div>
</section>
<div style={{backgroundColor: ACCENT_COLOR}} className="h-4"></div> 

      {/* Services Grid Section */}
      <section className="py-20 bg-[#FAF6F3] relative overflow-hidden">
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
      </section>

{/* Section: Pourquoi Global Business Immo ? */}
<section className="py-20 bg-[#FAF6F3]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Titre de la Section */}
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
        Pourquoi Global Business Immo ?
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Une expertise reconnue au service de vos projets
      </p>
    </div>

    {/* Grille des Statistiques */}
    <div className="grid md:grid-cols-3 gap-8">
      
      {/* Carte 1: Années d'expérience */}
      <div className="group bg-white p-8 rounded-2xl transition-all duration-300 border border-gray-100 
                    hover:border-b-4 hover:border-[#DF7649] hover:shadow-xl">
        
        {/* Icône/Statistique - Le cercle passe à l'orange au survol */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-orange-100 flex items-center justify-center 
                        transition-colors duration-300 group-hover:bg-[#DF7649]">
          <span className="text-3xl font-bold text-[#DF7649] transition-colors duration-300 group-hover:text-white">
            10+
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
          Années d'expérience
        </h3>
        <p className="text-gray-600 text-center">
          Sur le marché sénégalais
        </p>
      </div>

      {/* Carte 2: Projets réalisés (CORRIGÉ : 50+) */}
      <div className="group bg-white p-8 rounded-2xl transition-all duration-300 border border-gray-100 
                    hover:border-b-4 hover:border-[#DF7649] hover:shadow-xl">
        
        {/* Icône/Statistique - Le cercle passe à l'orange au survol */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-orange-100 flex items-center justify-center 
                        transition-colors duration-300 group-hover:bg-[#DF7649]">
          <span className="text-3xl font-bold text-[#DF7649] transition-colors duration-300 group-hover:text-white">
            50+
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
          Projets réalisés
        </h3>
        <p className="text-gray-600 text-center">
          Sur le marché sénégalais
        </p>
      </div>

      {/* Carte 3: Support disponible (Texte corrigé pour être 'Assistance disponible' comme dans une de vos captures d'écran) */}
      <div className="group bg-white p-8 rounded-2xl transition-all duration-300 border border-gray-100 
                    hover:border-b-4 hover:border-[#DF7649] hover:shadow-xl">
        
        {/* Icône/Statistique - Le cercle passe à l'orange au survol */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-orange-100 flex items-center justify-center 
                        transition-colors duration-300 group-hover:bg-[#DF7649]">
          <span className="text-3xl font-bold text-[#DF7649] transition-colors duration-300 group-hover:text-white">
            2/3
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
          Assistance disponible
        </h3>
        <p className="text-gray-600 text-center">
          À votre écoute
        </p>
      </div>
      
    </div>
  </div>
</section>

<section style={{ backgroundColor: '#DF7649' }} className="bg-orange-600 py-20 text-white relative overflow-hidden">
  
  {/* Motifs décoratifs (comme dans votre capture d'écran) */}
  {/* Vous pouvez ignorer ces div si vous ne voulez pas les motifs visuels */}
  <div className="absolute inset-0 z-0 opacity-20">
      <div className="absolute w-20 h-20 border-2 border-white transform rotate-45 top-1/4 left-1/4"></div>
      <div className="absolute w-12 h-12 border-2 border-white transform rotate-45 bottom-1/3 right-1/4"></div>
      <div className="absolute w-40 h-40 border-2 border-white rounded-full top-1/2 left-10"></div>
  </div>

  <div className="container mx-auto px-4 text-center relative z-10">
    <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
      Prêt à démarrer votre projet ?
    </h2>
    <p className="text-xl mb-10">
      Contactez-nous pour un devis gratuit et personnalisé
    </p>

    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
      
      {/* 1. Bouton "Demander un devis" (Orange principal avec icône de flèche) */}
      <a 
        href="#devis" 
        className="inline-flex items-center justify-center 
                   bg-white text-orange-600 font-bold py-3 px-8 
                   rounded-lg shadow-lg 
                   transition duration-300 ease-in-out 
                   hover:bg-gray-100 hover:shadow-xl"
      >
        Demander un devis
        {/* Vous pouvez ajouter une icône ici, par exemple un `FaArrowRight` si vous utilisez `react-icons` */}
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      </a>

      {/* 2. Bouton WhatsApp (Vert avec l'effet de survol demandé) */}
      {/* Classes initiales: bg-green-500, texte blanc */}
      {/* Classes au survol: hover:bg-white, hover:text-green-500 (Texte et icône deviennent verts) */}
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

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/221XXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
}