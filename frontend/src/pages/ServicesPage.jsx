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
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
        <header   className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
         scrolled ? "bg-white/50 backdrop-blur-sm shadow-sm" : "bg-white"}`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center mr-8">
             <div className="w-16 h-16 rounded-lg overflow-hidden flex items-center justify-center">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
           </div>
            </Link>

            {/* Desktop Navigation */}
           <div className="hidden md:flex items-center gap-10 mx-auto">
              <Link to="/"   className={`text-[16px] leading-6 font-normal transition-colors ${
                  location.pathname === "/"? "text-[#DF7649]" : "text-gray-700 hover:text-[#DF7649]"}`}>
                 Accueil
              </Link>
              <Link to="/services"   className={`text-[16px] leading-6 font-normal transition-colors ${
                location.pathname === "/services"  ? "text-[#DF7649]"
                 : "text-gray-700 hover:text-[#DF7649]" }`}>
                Services
              </Link>
              <Link to="/catalogue"   className={`text-[16px] leading-6 font-normal transition-colors ${
                location.pathname === "/catalogue" ? "text-[#DF7649]"
                 : "text-gray-700 hover:text-[#DF7649]" }`}>
                Catalogue
              </Link>
              <Link to="/apropos"   className={`text-[16px] leading-6 font-normal transition-colors ${
                location.pathname === "/apropos" ? "text-[#DF7649]"
                : "text-gray-700 hover:text-[#DF7649]" }`}>
                À Propos
              </Link>
              <Link to="/contact"   className={`text-[16px] leading-6 font-normal transition-colors ${
                 location.pathname === "/contact" ? "text-[#DF7649]"
                 : "text-gray-700 hover:text-[#DF7649]" }`}>
                Contact
              </Link>
 
            </div>
             <div className="hidden md:flex">
               <Link to="/contact"
                  className="bg-[#DF7649] text-white px-5 py-2.5 rounded-lg hover:bg-[#c8653b] transition font-medium">
                Nous contacter
               </Link>
              </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col gap-4">
                <Link to="/" className="text-orange-500 font-medium px-4 py-2">
                  Accueil
                </Link>
                <Link to="/services" className="text-gray-700 px-4 py-2">
                  Services
                </Link>
                <Link to="/catalogue" className="text-gray-700 px-4 py-2">
                  Catalogue
                </Link>
                <Link to="/apropos" className="text-gray-700 px-4 py-2">
                  À Propos
                </Link>
                <Link to="/contact" className="text-gray-700 px-4 py-2">
                  Contact
                </Link>
                <Link to="/contact" className="bg-orange-500 text-white px-6 py-2.5 rounded-lg mx-4">
                  Nous contacter
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 min-h-[60vh] flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
            alt="Services immobiliers"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-800/70 to-slate-700/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Nos services immobiliers
          </h1>
          <div className="w-32 h-1 bg-orange-500 mx-auto mb-8"></div>
          <p className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto">
            Solutions complètes pour tous vos projets au Sénégal
          </p>
          <button className="mt-8 bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition font-medium text-lg flex items-center gap-2 mx-auto group">
            Demander un devis
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Details List */}
                <ul className="space-y-3 mb-6">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button className="text-orange-500 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                  Lire la suite
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-400 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute left-0 top-0 w-64 h-64 border-4 border-white/20 rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute right-0 bottom-0 w-96 h-96 border-4 border-white/20 rounded-full translate-x-48 translate-y-48"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour une consultation gratuite et découvrez comment nous pouvons vous aider.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-500 px-8 py-4 rounded-lg hover:bg-gray-100 transition font-semibold text-lg flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Appelez-nous
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg hover:bg-white/20 transition font-semibold text-lg border-2 border-white/30">
              Demander un devis
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
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
                Un service à juste valeur ! Votre partenaire de confiance pour tous vos projets immobiliers au Sénégal.
              </p>
              {/* Social Media */}
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-white transition"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-white transition"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-white transition"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Liens Rapides */}
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

            {/* Nos Services */}
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

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-orange-500" />
                  </div>
                  <span className="text-gray-600">Dakar, Sénégal</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-orange-500" />
                  </div>
                  <span className="text-gray-600">+221 XX XXX XX XX</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-gray-600 break-all">contact@globalbusinessimmo.sn</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © 2025 Global Business Immo. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-orange-500 transition">Mentions Légales</a>
              <a href="#" className="text-gray-600 hover:text-orange-500 transition">Confidentialité</a>
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