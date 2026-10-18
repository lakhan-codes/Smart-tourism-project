import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Sparkles, 
  Hotel, 
  Car, 
  Utensils, 
  CalendarCheck, 
  Info, 
  Mail, 
  User, 
  LogOut, 
  Menu, 
  X,
  PhoneCall,
  ShoppingBag
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: { name: string; email: string } | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  bookingsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenAuth,
  onLogout,
  bookingsCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'ai-planner', label: 'AI Trip Planner', icon: Sparkles, highlight: true },
    { id: 'destinations', label: 'Destinations', icon: MapPin },
    { id: 'hotels', label: 'Hotels', icon: Hotel },
    { id: 'adventures', label: 'Adventures', icon: Compass },
    { id: 'guides', label: 'Guides & Cabs', icon: Car },
    { id: 'food', label: 'Local Food', icon: Utensils },
    { id: 'booking', label: 'Book Trip', icon: CalendarCheck },
    { id: 'orders', label: 'Bookings', icon: ShoppingBag, badge: bookingsCount },
    { id: 'about', label: 'About', icon: Info },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl transition-all">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white text-xs font-medium py-1.5 px-4 text-center flex items-center justify-center gap-4">
        <span>🇮🇳 Explore India with Gemini AI Trip Planner • Instant Itineraries, Verified Guides & Stays</span>
        <a 
          href="tel:+919876543210" 
          className="hidden md:inline-flex items-center gap-1.5 font-semibold underline hover:text-amber-200 transition-colors"
        >
          <PhoneCall className="w-3.5 h-3.5" /> 24/7 Helpline: +91 98765 43210
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform">
              <span className="text-xl">🌍</span>
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-amber-100 to-orange-400 bg-clip-text text-transparent">
                Smart Tourism
              </span>
              <span className="hidden sm:block text-[10px] text-amber-400/90 font-medium tracking-wider uppercase">
                India Travel Portal
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? link.highlight
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25'
                        : 'bg-slate-800 text-amber-400 font-semibold'
                      : link.highlight
                      ? 'text-orange-400 hover:text-white hover:bg-orange-600/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${link.highlight && !isActive ? 'text-orange-400 animate-pulse' : ''}`} />
                  <span>{link.label}</span>

                  {/* Notification Badge */}
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="ml-0.5 px-1.5 py-0.2 text-[10px] bg-orange-600 text-white font-bold rounded-full">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Medium Screens (Dropdown / Key Links) */}
          <div className="hidden lg:flex xl:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('ai-planner')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                activeTab === 'ai-planner'
                  ? 'bg-orange-500 text-white'
                  : 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" /> AI Planner
            </button>
            <button
              onClick={() => handleNavClick('destinations')}
              className="text-xs text-slate-300 hover:text-white px-2 py-1"
            >
              Destinations
            </button>
            <button
              onClick={() => handleNavClick('hotels')}
              className="text-xs text-slate-300 hover:text-white px-2 py-1"
            >
              Hotels
            </button>
            <button
              onClick={() => handleNavClick('booking')}
              className="text-xs text-slate-300 hover:text-white px-2 py-1"
            >
              Book
            </button>
            <button
              onClick={() => handleNavClick('orders')}
              className="relative text-xs text-slate-300 hover:text-white px-2 py-1"
            >
              Bookings ({bookingsCount})
            </button>
          </div>

          {/* User Auth Controls */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 rounded-full pl-3 pr-1 py-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-900 font-bold text-xs flex items-center justify-center">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-medium text-slate-200 hidden md:inline truncate max-w-[100px]">
                    {currentUser.name.split(' ')[0]}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  title="Logout"
                  className="p-1.5 text-slate-400 hover:text-red-400 rounded-full hover:bg-slate-700 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
            )}

            {/* Mobile menu toggle button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-1 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pt-2 pb-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-left text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                      : link.highlight
                      ? 'bg-orange-500/15 border border-orange-500/30 text-orange-400'
                      : 'bg-slate-800/80 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{link.label}</span>
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="ml-auto px-1.5 py-0.5 text-[10px] bg-red-600 text-white font-bold rounded-full">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 px-1">
            <span>24/7 Helpline: +91 98765 43210</span>
            <span>Shimla, HP, India</span>
          </div>
        </div>
      )}
    </header>
  );
};
