import React, { useState } from 'react';
import { Phone, Mail, MapPin, Car, Users, ShieldCheck, Check, CalendarCheck } from 'lucide-react';
import { GUIDES } from '../data/travelData.ts';

interface GuidesViewProps {
  onHireGuide: (guideData: any) => void;
}

export const GuidesView: React.FC<GuidesViewProps> = ({ onHireGuide }) => {
  const [selectedCity, setSelectedCity] = useState<string>('All');

  const cities = ['All', 'Rishikesh', 'Manali', 'Shimla'];

  const filteredGuides = GUIDES.filter(
    (g) => selectedCity === 'All' || g.destination.toLowerCase() === selectedCity.toLowerCase()
  );

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold mb-3">
          <Car className="w-3.5 h-3.5" />
          <span>Local Travel Guides & Dedicated Vehicle Fleets</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Travel Guide & Vehicle Hire
        </h1>
        <p className="mt-3 text-slate-600 text-sm sm:text-base">
          Choose a licensed local travel guide for your destination. Each expert provides personalized sightseeing, local folklore, safe mountain driving, and verified vehicles.
        </p>

        {/* City Filter Pills */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCity === city
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {city === 'All' ? 'All Locations' : `📍 ${city}`}
            </button>
          ))}
        </div>
      </div>

      {/* Guide Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuides.map((guide) => (
          <div
            key={guide.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Avatar and Info Header */}
              <div className="text-center pb-4 border-b border-slate-100">
                <div className="relative inline-block mb-3">
                  <img
                    src={guide.avatarUrl}
                    alt={guide.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-orange-100 mx-auto shadow"
                  />
                  <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold border-2 border-white">
                    ✓
                  </div>
                </div>
                <h3 className="text-xl font-black text-slate-900">{guide.name}</h3>
                <p className="text-xs font-bold text-orange-600 mt-0.5">📍 {guide.destination}</p>
                <p className="text-[11px] text-slate-500 mt-1">
                  {guide.experienceYears} Years Experience • {guide.languages.join(', ')}
                </p>
              </div>

              {/* Contact Details */}
              <div className="py-4 space-y-2 text-xs text-slate-600 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <a href={`tel:${guide.phone.replace(/\s+/g, '')}`} className="font-semibold text-slate-800 hover:text-orange-600 transition-colors">
                    {guide.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <span className="truncate">{guide.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <span>{guide.location}</span>
                </div>
              </div>

              {/* Vehicle Box */}
              <div className="mt-4 bg-orange-50/70 border border-orange-200/80 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-orange-700 uppercase tracking-wide flex items-center gap-1.5">
                    <Car className="w-4 h-4" /> Vehicle Included
                  </span>
                  <span className="text-[11px] font-semibold text-slate-600 bg-white px-2 py-0.5 rounded border border-orange-200">
                    {guide.vehicleType}
                  </span>
                </div>

                <div className="text-sm font-bold text-slate-900">{guide.vehicleModel}</div>

                <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-orange-500" />
                    <span>Capacity: {guide.vehicleCapacity} Persons</span>
                  </span>
                  <span className="font-black text-orange-600 text-sm">
                    ₹{guide.pricePerDayINR.toLocaleString('en-IN')}{' '}
                    <span className="text-[11px] font-normal text-slate-500">/ Day</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-2 flex items-center gap-2">
              <a
                href={`tel:${guide.phone.replace(/\s+/g, '')}`}
                className="flex-1 py-2.5 rounded-xl border border-orange-500 text-orange-600 hover:bg-orange-50 font-bold text-xs text-center transition-colors flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Guide</span>
              </a>

              <button
                onClick={() =>
                  onHireGuide({
                    destination: guide.destination,
                    serviceType: 'guide',
                    itemName: `${guide.name} & ${guide.vehicleModel}`,
                    totalPriceINR: guide.pricePerDayINR * 2,
                    guests: guide.vehicleCapacity,
                  })
                }
                className="flex-1 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs text-center shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-1.5"
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>Hire Now</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
