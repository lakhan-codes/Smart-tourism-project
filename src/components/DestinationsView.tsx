import React, { useState } from 'react';
import { Sparkles, MapPin, Star, Calendar, ArrowRight, Filter } from 'lucide-react';
import { DESTINATIONS, DestinationItem } from '../data/travelData.ts';

interface DestinationsViewProps {
  onPlanTripWithAI: (destination: string) => void;
  onBookItem: (bookingData: any) => void;
}

export const DestinationsView: React.FC<DestinationsViewProps> = ({
  onPlanTripWithAI,
  onBookItem,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const regions = ['All', 'Himalayas', 'Spiritual', 'Beaches', 'Heritage', 'Backwaters'];

  const filteredDestinations = DESTINATIONS.filter((d) => {
    const matchesRegion = selectedRegion === 'All' || d.region === selectedRegion;
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold text-orange-600 uppercase tracking-widest block mb-2">
          Discover India
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Popular Tourist Destinations
        </h1>
        <p className="mt-3 text-slate-600 text-sm sm:text-base">
          From the snowy valleys of Manali and Shimla to the pristine beaches of Goa and serene backwaters of Kerala, pick your next adventure.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Region tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedRegion === reg
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="w-full md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search destination, state..."
            className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none text-slate-900"
          />
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDestinations.map((dest) => (
          <div
            key={dest.id}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-60 overflow-hidden">
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                
                <span className="absolute top-3.5 left-3.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-extrabold text-slate-800 shadow-sm flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{dest.rating}</span>
                </span>

                <span className="absolute top-3.5 right-3.5 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-amber-300">
                  {dest.region}
                </span>

                <div className="absolute bottom-3.5 left-4 right-4 text-white">
                  <h3 className="text-2xl font-black">{dest.name}</h3>
                  <p className="text-xs text-amber-300 font-semibold">{dest.state} • {dest.tagline}</p>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {dest.description}
                </p>

                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-orange-500" />
                  <span><strong>Best Season:</strong> {dest.bestSeason}</span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Highlights
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {dest.popularActivities.map((act, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-orange-50 text-orange-700 text-[11px] font-medium border border-orange-100"
                      >
                        {act}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">From</span>
                  <span className="text-base font-extrabold text-orange-600">
                    ₹{dest.startingPriceINR.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onPlanTripWithAI(dest.name)}
                    className="px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-md shadow-orange-500/20 transition-all flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Plan with AI</span>
                  </button>
                  <button
                    onClick={() =>
                      onBookItem({
                        destination: dest.name,
                        serviceType: 'package',
                        itemName: `${dest.name} Tour Package`,
                        totalPriceINR: dest.startingPriceINR,
                        guests: 2,
                      })
                    }
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
