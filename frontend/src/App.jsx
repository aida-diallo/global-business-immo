import React, { useState } from 'react';
import { Home, Building2, Briefcase, Phone, Menu, X, MessageCircle } from 'lucide-react';

export default function GlobalBusinessImmo() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header / Navigation */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-800">Global Business</span>
                  <span className="text-xs text-gray-600">Immobilier</span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#accueil" className="text-orange-500 font-medium hover:text-orange-600 transition">
                Accueil
              </a>
              <a href="#services" className="text-gray-700 hover:text-orange-500 transition">
                Services
              </a>
              <a href="#catalogue" className="text-gray-700 hover:text-orange-500 transition">
                Catalogue
              </a>
              <a href="#apropos" className="text-gray-700 hover:text-orange-500 transition">
                À Propos
              </a>
              <a href="#contact" className="text-gray-700 hover:text-orange-500 transition">
                Contact
              </a>
              <button className="bg-orange-500 text-white px-6 py-2.5 rounded-lg hover:bg-orange-600 transition font-medium">
                Nous contacter
              </button>
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
                <a href="#accueil" className="text-orange-500 font-medium px-4 py-2">
                  Accueil
                </a>
                <a href="#services" className="text-gray-700 px-4 py-2">
                  Services
                </a>
                <a href="#catalogue" className="text-gray-700 px-4 py-2">
                  Catalogue
                </a>
                <a href="#apropos" className="text-gray-700 px-4 py-2">
                  À Propos
                </a>
                <a href="#contact" className="text-gray-700 px-4 py-2">
                  Contact
                </a>
                <button className="bg-orange-500 text-white px-6 py-2.5 rounded-lg mx-4">
                  Nous contacter
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 min-h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
            alt="Luxury villa"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-800/60 to-slate-700/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Votre partenaire{' '}
              <span className="text-orange-500">immobilier</span>
              <br />
              <span className="relative inline-block">
                au Sénégal
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="12"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10C100 2 200 2 298 10"
                    stroke="#F97316"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="text-xl text-gray-200 mb-10 leading-relaxed">
              Transactions, gestion locative, construction et conseil. Nous transformons vos projets immobiliers en réalité avec expertise et passion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition font-medium text-lg flex items-center justify-center gap-2 group">
                Découvrir nos biens
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg hover:bg-white/20 transition font-medium text-lg border-2 border-white/30">
                Nous contacter
              </button>
            </div>
          </div>
        </div>

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/221XXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </a>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2 text-white animate-bounce">
            <span className="text-sm">Défiler</span>
            <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-orange-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Stat 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="text-5xl font-bold text-white mb-2">500+</div>
              <div className="text-white text-lg">Biens vendus</div>
            </div>

            {/* Stat 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div className="text-5xl font-bold text-white mb-2">15+</div>
              <div className="text-white text-lg">Années d'expérience</div>
            </div>

            {/* Stat 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div className="text-5xl font-bold text-white mb-2">1000+</div>
              <div className="text-white text-lg">Clients satisfaits</div>
            </div>

            {/* Stat 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="text-5xl font-bold text-white mb-2">50+</div>
              <div className="text-white text-lg">Partenaires</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Nos Services Premium</h2>
            <div className="w-32 h-1 bg-orange-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une gamme complète de services immobiliers conçus pour répondre à tous vos besoins avec excellence et professionnalisme
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-orange-50/50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
                <svg className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Transactions immobilières</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Achat, vente et location de biens immobiliers avec un accompagnement personnalisé et professionnel.
              </p>
              <button className="text-orange-500 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                Lire la suite
                <span>→</span>
              </button>
            </div>

            {/* Service 2 */}
            <div className="bg-orange-50/50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
                <svg className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Localisation de biens</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Trouvez le bien idéal grâce à notre expertise du marché immobilier sénégalais.
              </p>
              <button className="text-orange-500 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                Lire la suite
                <span>→</span>
              </button>
            </div>

            {/* Service 3 */}
            <div className="bg-orange-50/50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
                <svg className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Gestion de propriétés</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Gestion complète de vos biens immobiliers pour maximiser votre investissement.
              </p>
              <button className="text-orange-500 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                Lire la suite
                <span>→</span>
              </button>
            </div>

            {/* Service 4 */}
            <div className="bg-orange-50/50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
                <svg className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Vente de terrains</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Large sélection de terrains constructibles dans les meilleures zones.
              </p>
              <button className="text-orange-500 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                Lire la suite
                <span>→</span>
              </button>
            </div>

            {/* Service 5 */}
            <div className="bg-orange-50/50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
                <svg className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Construction</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Services de construction clé en main avec des partenaires de confiance certifiés.
              </p>
              <button className="text-orange-500 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                Lire la suite
                <span>→</span>
              </button>
            </div>

            {/* Service 6 */}
            <div className="bg-orange-50/50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
                <svg className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Plans architecturaux</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Conception et élaboration de plans architecturaux sur mesure par nos experts.
              </p>
              <button className="text-orange-500 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                Lire la suite
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Additional Services Row */}
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {/* Service 7 */}
            <div className="bg-orange-50/50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
                <svg className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Enregistrement</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Assistance complète pour toutes vos démarches administratives et légales.
              </p>
              <button className="text-orange-500 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                Lire la suite
                <span>→</span>
              </button>
            </div>

            {/* Service 8 */}
            <div className="bg-orange-50/50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
                <svg className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Conseil immobilier</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Expertise et conseils stratégiques pour vos projets immobiliers d'envergure.
              </p>
              <button className="text-orange-500 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                Lire la suite
                <span>→</span>
              </button>
            </div>

            {/* Service 9 */}
            <div className="bg-orange-50/50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
                <svg className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Topographie</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Services topographiques professionnels pour vos projets de construction.
              </p>
              <button className="text-orange-500 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                Lire la suite
                <span>→</span>
              </button>
            </div>
          </div>
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
                <li><a href="#accueil" className="text-gray-600 hover:text-orange-500 transition">Accueil</a></li>
                <li><a href="#services" className="text-gray-600 hover:text-orange-500 transition">Services</a></li>
                <li><a href="#catalogue" className="text-gray-600 hover:text-orange-500 transition">Catalogue</a></li>
                <li><a href="#apropos" className="text-gray-600 hover:text-orange-500 transition">À Propos</a></li>
                <li><a href="#contact" className="text-gray-600 hover:text-orange-500 transition">Contact</a></li>
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
                    <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
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
    </div>
  );
}