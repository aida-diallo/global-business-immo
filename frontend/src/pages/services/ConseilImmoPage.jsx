import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Shield, Users, Star, Award, Check, MessageCircle, 
  X, Menu 
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 

// Le nom du composant a été changé de RealEstateTransactions à TransactionImmoPage
const ConseilImmoPage = () => {
  // 1. Définition des états et hooks
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation(); 
  const navigate = useNavigate(); 
  const ACCENT_COLOR = "#DF7649";

  // 2. Logique pour la barre de navigation "scrolled"
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); 
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const properties = [
    { type: 'Villas', status: 'À vendre', image: 'villa' },
    { type: 'Terrains', status: 'À vendre', image: 'terrain' },
    { type: 'Bureaux', status: 'À vendre', image: 'bureau' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? "bg-white/90 backdrop-blur-sm shadow-sm" : "bg-white"}`}> 
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <div className="flex justify-between items-center h-20"> 
            <Link to="/" className="flex items-center"> 
              <div className="w-20 h-20 overflow-hidden flex items-center justify-center"> 
                {/* Image Placeholder - Assurez-vous d'avoir un fichier /public/logo.png */}
                <img src="/logo.png" alt="Logo Global Business Immo" className="w-full h-full object-contain" /> 
              </div> 
            </Link>
            <div className="hidden md:flex items-center gap-8 mx-auto">
              {/* Le reste des liens de navigation... */}
              <Link to="/" className={`text-[15px] font-medium transition-colors ${location.pathname === "/" ? "text-[#DF7649]" : "text-gray-700 hover:text-[#DF7649]"}`}>Accueil</Link>
              <Link to="/services" className={`text-[15px] font-medium transition-colors ${location.pathname === "/services" ? "text-[#DF7649]" : "text-gray-700 hover:text-[#DF7649]"}`}>Services</Link>
              <Link to="/proprietes" className={`text-[15px] font-medium transition-colors ${location.pathname.startsWith("/proprietes") ? "text-[#DF7649]" : "text-gray-700 hover:text-[#DF7649]"}`}>Propriétés</Link>
              <Link to="/apropos" className={`text-[15px] font-medium transition-colors ${location.pathname === "/apropos" ? "text-[#DF7649]" : "text-gray-700 hover:text-[#DF7649]"}`}>À Propos</Link>
              <Link to="/contact" className={`text-[15px] font-medium transition-colors ${location.pathname === "/contact" ? "text-[#DF7649]" : "text-gray-700 hover:text-[#DF7649]"}`}>Contact</Link>
            </div>
            <div className="hidden md:flex">
              <Link to="/contact" className="bg-[#DF7649] text-white px-5 py-2 rounded-lg hover:bg-[#c8653b] transition font-medium text-sm">Nous contacter</Link>
            </div>
            {/* Bouton pour Menu Mobile */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          {/* Menu Mobile */}
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
      
      {/* Hero Section */}
      <section className="relative pt-5 pb-32 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <img 
            src="https://images.unsplash.com/photo-1544924736-237190038890?w=1600&h=900&fit=crop" 
            alt="Ville moderne" 
            className="w-full h-full object-cover absolute mix-blend-multiply"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 pt-24">
          {/* Back Button - Correction avec navigate(-1) */}
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center space-x-2 bg-white text-black px-4 py-2 rounded-full shadow-md mb-12 hover:shadow-lg transition-shadow"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Retour</span>
          </button>

          {/* Hero Content */}
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Conseil Immobilier
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed">
              Recevez un accompagnement sur mesure pour orienter <br />
              Vos décisions et optimiser vos investissement immobiliers.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact?service=estimation" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-medium flex items-center space-x-2 transition-colors shadow-lg">
                <span>Demander une estimation gratuite</span>
                <span>→</span>
              </Link>
              <Link to="/contact" className="bg-white text-gray-800 px-8 py-4 rounded-full font-medium flex items-center space-x-2 hover:shadow-lg transition-shadow">
                <MessageCircle className="w-5 h-5" />
                <span>Contactez-nous</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
       <div style={{backgroundColor: ACCENT_COLOR}} className="h-4"></div> 

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-black md:text-5xl font-bold mb-4">
              Pourquoi choisir nos services ?
            </h2>
            <p className="text-gray-600 text-lg">
              Des avantages concrets pour une transaction immobilière réussie
            </p>
          </div>

          <div className="grid md:grid-cols-2 text-black lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'Sécurité totale',
                description: 'Transactions 100% sécurisées avec garanties juridiques'
              },
              {
                icon: Users,
                title: 'Accompagnement personnalisé',
                description: "Un expert dédié du début jusqu'à la signature"
              },
              {
                icon: Star,
                title: 'Réseau qualifié',
                description: 'Accès exclusif à des acheteurs et vendeurs vérifiés'
              },
              {
                icon: Award,
                title: 'Expertise reconnue',
                description: "Plus de 15 ans d'expérience sur le marché sénégalais"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-black md:text-5xl font-bold mb-8">
                Pourquoi nous faire confiance ?
              </h2>
              <p className="text-gray-600 text-lg mb-10">
                Une expertise reconnue au service de votre réussite immobilière
              </p>

              <div className="space-y-4">
                {[
                  'Négociation optimale du prix',
                  'Vérification complète des documents',
                  'Assistance juridique et administrative',
                  'Suivi post-transaction gratuit',
                  'Transparence totale des frais'
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-orange-100 p-1 rounded-full mt-1">
                      <Check className="w-5 h-5 text-orange-600" />
                    </div>
                    <span className="text-lg text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/contact" className="mt-10 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-medium flex items-center space-x-2 transition-colors inline-flex">
                <span>Démarrer mon projet</span>
                <span>→</span>
              </Link>
            </div>

            <div className="space-y-8">
              <div className="text-center p-10 bg-white rounded-3xl shadow-lg">
                <div className="text-6xl font-bold text-orange-500 mb-2">500+</div>
                <div className="text-black font-bold mb-2">Transactions réussies</div>
                <div className="text-gray-600">Au cours des 3 dernières années</div>
              </div>

              <div className="text-center p-10 bg-white rounded-3xl shadow-lg">
                <div className="text-6xl font-bold text-orange-500 mb-2">98%</div>
                <div className="text-black font-bold mb-2">Clients satisfaits</div>
                <div className="text-gray-600">Recommandent nos services</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-black md:text-5xl font-bold mb-4">
            Produits liés à ce service
          </h2>
          <p className="text-gray-600 text-lg mb-12">
            Chaque bien proposé est soigneusement vérifié pour garantir sécurité, transparence et conformité aux exigences du marché immobilier sénégalais
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <Link key={index} to={`/proprietes/${property.type.toLowerCase()}`} className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow block">
                <div className="aspect-[4/3] relative">
                  <img 
                    src={`https://images.unsplash.com/photo-${
                      property.type === 'Villas' ? '1613490493576-7fde63acd811' : 
                      property.type === 'Terrains' ? '1500382017468-9049fed747ef' : 
                      '1497366216548-37526070297c'
                    }?w=600&h=400&fit=crop`}
                    alt={property.type}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition"></div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      {property.status}
                    </span>
                    <span className="bg-white text-gray-800 px-4 py-1 rounded-full text-sm font-medium">
                      {property.type}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <span className="text-xl">♡</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/proprietes" className="text-orange-500 font-medium hover:text-orange-600 transition inline-flex items-center space-x-2">
              <span>Voir toutes les propriétés</span>
              <ArrowLeft className="w-4 h-4 transform rotate-180"/>
            </Link>
          </div>
        </div>
      </section> */}

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-50"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

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
};

export default ConseilImmoPage;