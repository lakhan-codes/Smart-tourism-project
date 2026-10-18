import React, { useState } from 'react';
import { Compass, MapPin, ShieldCheck, Clock, Zap, ArrowRight, Shield } from 'lucide-react';
import { ADVENTURES } from '../data/travelData.ts';

interface AdventuresViewProps {
  onBookAdventure: (advData: any) => void;
}

export const AdventuresView: React.FC<AdventuresViewProps> = ({ onBookAdventure }) => {
  const [selectedCity, setSelectedCity] = useState<string>('All');

  const cities = ['All', 'Rishikesh', 'Shimla', 'Manali'];

  const filteredAdventures = ADVENTURES.filter(
    (adv) => selectedCity === 'All' || adv.destination.toLowerCase() === selectedCity.toLowerCase()
  );

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold mb-3">
          <Zap className="w-3.5 h-3.5" />
          <span>Himalayan High Adrenaline Thrills</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Adventure Activities
        </h1>
        <p className="mt-3 text-slate-600 text-sm sm:text-base">
          Explore exciting adventure activities in Rishikesh, Shimla and Manali. Certified instructors, international safety standards, and unforgettable memories.
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
              {city === 'All' ? 'All Adventures' : `📍 ${city}`}
            </button>
          ))}
        </div>
      </div>

      {/* Grouped by Destination if 'All' is selected or filtered */}
      <div className="space-y-12">
        {['Rishikesh', 'Shimla', 'Manali'].map((city) => {
          if (selectedCity !== 'All' && selectedCity.toLowerCase() !== city.toLowerCase()) {
            return null;
          }

          const cityAdvs = filteredAdventures.filter(
            (a) => a.destination.toLowerCase() === city.toLowerCase()
          );

          if (cityAdvs.length === 0) return null;

          return (
            <div key={city} className="space-y-6">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                    <span className="text-orange-500">📍</span>
                    <span>{city} Adventures</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {city === 'Rishikesh'
                      ? 'Experience thrilling whitewater rapids and cliff jumping beside the holy Ganga.'
                      : city === 'Shimla'
                      ? 'Discover lush cedar mountain trails and exhilarating paragliding over valleys.'
                      : 'Enjoy powdery snow, Solang Valley winter sports, and Beas river waters.'}
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-orange-50 text-orange-700 rounded-lg border border-orange-200">
                  {cityAdvs.length} Activities
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cityAdvs.map((adv) => (
                  <div
                    key={adv.id}
                    className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={adv.imageUrl}
                          alt={adv.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold">
                          📍 {adv.destination}
                        </span>
                        <span className="absolute bottom-3.5 right-3.5 px-3 py-1 rounded-xl bg-orange-500 text-white text-sm font-black shadow-md">
                          ₹{adv.priceINR.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="p-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                            {adv.category} Activity
                          </span>
                          <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                            <Clock className="w-3.5 h-3.5" /> {adv.duration}
                          </span>
                        </div>

                        <h3 className="text-lg font-black text-slate-900 group-hover:text-orange-600 transition-colors">
                          {adv.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {adv.description}
                        </p>

                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs text-slate-500 space-y-1">
                          <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <span>Safety Equipment Included:</span>
                          </div>
                          <p className="text-[11px] text-slate-600 pl-5">{adv.safetyEquipment}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <button
                        onClick={() =>
                          onBookAdventure({
                            destination: adv.destination,
                            serviceType: 'adventure',
                            itemName: adv.title,
                            totalPriceINR: adv.priceINR * 2,
                            guests: 2,
                          })
                        }
                        className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>Book Activity</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
