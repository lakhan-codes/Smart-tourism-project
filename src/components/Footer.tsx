import React from 'react';
import { Compass, Mail, Phone, MapPin, Heart, Shield, Award, Clock } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-300">
      {/* Trust Badges Bar */}
      <div className="border-b border-slate-800/80 bg-slate-900/50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <Shield className="w-6 h-6 text-orange-400 mb-2" />
            <h4 className="font-bold text-white text-sm">100% Verified Bookings</h4>
            <p className="text-xs text-slate-400 mt-1">Vetted hotels, licensed guides & safe fleets</p>
          </div>
          <div className="flex flex-col items-center">
            <Award className="w-6 h-6 text-amber-400 mb-2" />
            <h4 className="font-bold text-white text-sm">Best Price Guarantee</h4>
            <p className="text-xs text-slate-400 mt-1">Direct local operator rates without hidden markups</p>
          </div>
          <div className="flex flex-col items-center">
            <Clock className="w-6 h-6 text-sky-400 mb-2" />
            <h4 className="font-bold text-white text-sm">24/7 Dedicated Support</h4>
            <p className="text-xs text-slate-400 mt-1">Himalayan & PAN-India ground assistance</p>
          </div>
          <div className="flex flex-col items-center">
            <Compass className="w-6 h-6 text-emerald-400 mb-2" />
            <h4 className="font-bold text-white text-sm">Gemini AI Intelligence</h4>
            <p className="text-xs text-slate-400 mt-1">Hyper-customized itineraries in seconds</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌍</span>
              <span className="text-xl font-bold text-white">Smart Tourism</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Your premier India travel companion. We bring together modern AI trip planning, verified local travel guides, comfortable vehicle hire, handpicked mountain stays, and authentic Himalayan adventures.
            </p>
            <div className="space-y-2 text-sm text-slate-400 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span>123 Tourism Street, The Mall Road, Shimla, Himachal Pradesh 171001, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-amber-400 transition-colors">+91 98765 43210 / +91 90000 00001</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <a href="mailto:info@smarttourism.com" className="hover:text-sky-400 transition-colors">info@smarttourism.com</a>
              </div>
            </div>
          </div>

          {/* Quick Services */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-orange-500 pl-2">
              Core Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('ai-planner')} className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-orange-400">✨</span> AI Trip Planner
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('destinations')} className="text-slate-400 hover:text-white transition-colors">
                  Popular Destinations
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('hotels')} className="text-slate-400 hover:text-white transition-colors">
                  Hotel & Resort Stays
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('adventures')} className="text-slate-400 hover:text-white transition-colors">
                  Adventure Activities
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('guides')} className="text-slate-400 hover:text-white transition-colors">
                  Guides & Cabs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('food')} className="text-slate-400 hover:text-white transition-colors">
                  Local Food & Delicacies
                </button>
              </li>
            </ul>
          </div>

          {/* Top Destinations */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
              Top Places
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><button onClick={() => onNavigate('destinations')} className="hover:text-white transition-colors">Shimla Hill Station</button></li>
              <li><button onClick={() => onNavigate('destinations')} className="hover:text-white transition-colors">Manali & Solang Valley</button></li>
              <li><button onClick={() => onNavigate('destinations')} className="hover:text-white transition-colors">Rishikesh Ganga Ghats</button></li>
              <li><button onClick={() => onNavigate('destinations')} className="hover:text-white transition-colors">Spiti Valley Cold Desert</button></li>
              <li><button onClick={() => onNavigate('destinations')} className="hover:text-white transition-colors">Goa Beaches & Nightlife</button></li>
              <li><button onClick={() => onNavigate('destinations')} className="hover:text-white transition-colors">Kashmir & Gulmarg</button></li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-sky-500 pl-2">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">About Us</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">Contact Support</button></li>
              <li><button onClick={() => onNavigate('orders')} className="hover:text-white transition-colors">Booking Tracking</button></li>
              <li><button onClick={() => onNavigate('booking')} className="hover:text-white transition-colors">Custom Trip Request</button></li>
              <li className="pt-2 text-xs text-slate-500">
                Office Hours:<br />Mon - Sat: 9:00 AM - 6:00 PM IST
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Smart Tourism India. All Rights Reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for travellers worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
