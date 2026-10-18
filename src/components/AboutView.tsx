import React from 'react';
import { Globe, Plane, Heart, Shield, CheckCircle, Award, Users } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      {/* Intro */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-orange-600 uppercase tracking-widest block">
          Our Story & Philosophy
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          About Smart Tourism
        </h1>
        <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full mt-2 mb-4" />
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Welcome to <strong className="text-slate-900 font-bold">Smart Tourism</strong>, your trusted travel partner for unforgettable adventures across India. We believe that travelling is not just about visiting places—it's about creating lifelong memories.
        </p>
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
          Our mission is to make travel easy, affordable, and enjoyable for everyone. Whether you are planning a family vacation, honeymoon, solo trip, or group tour, we provide the best travel packages at affordable prices backed by cutting-edge Gemini AI trip planning and verified ground partners.
        </p>
      </div>

      {/* Mission, Vision, Why Choose Us Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Mission */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-2xl mb-6 shadow-sm">
              🌍
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-3">Our Mission</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              To provide memorable travel experiences with comfort, safety, transparent pricing, and excellent customer service for every journey across India.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-orange-600 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4" /> Dedicated to your comfort
          </div>
        </div>

        {/* Vision */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl mb-6 shadow-sm">
              ✈️
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-3">Our Vision</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              To become one of India's most trusted, technology-driven, and customer-friendly travel companies, empowering exploration for millions of travelers.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-amber-600 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4" /> Building trust across India
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl mb-6 shadow-sm">
              💖
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-3">Why Choose Us?</h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span>Affordable Tour Packages</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span>24/7 Dedicated Customer Support</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span>Experienced Local Travel Guides</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span>Secure Online Booking System</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span>Best Hotel & Transport Services</span>
              </li>
            </ul>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4" /> Verified Quality Guarantee
          </div>
        </div>
      </div>

      {/* Safety & Standards Section */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <Award className="w-10 h-10 text-orange-400 mx-auto" />
          <h3 className="text-2xl sm:text-3xl font-black">Himalayan Safety First</h3>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            All our mountain drivers have minimum 5+ years of Himalayan experience. River rafting equipment is ISO/CE certified, and all hotel partnerships are inspected for sanitation and safety.
          </p>
        </div>
      </div>
    </div>
  );
};
