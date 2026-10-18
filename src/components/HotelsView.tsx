import React, { useState } from 'react';
import { Hotel, MapPin, Star, Check, Wifi, Coffee, Shield } from 'lucide-react';
import { HOTELS } from '../data/travelData.ts';

interface HotelsViewProps {
  onBookHotel: (hotelData: any) => void;
}

export const HotelsView: React.FC<HotelsViewProps> = ({ onBookHotel }) => {
  const [activeCity, setActiveCity] = useState<string>('All');

  const cities = ['All', 'Shimla', 'Manali', 'Rishikesh'];

  const filteredHotels = HOTELS.filter(
    (h) => activeCity === 'All' || h.destination.toLowerCase() === activeCity.toLowerCase()
  );

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold mb-3">
          <Hotel className="w-3.5 h-3.5" />
          <span>Handpicked Mountain & Riverside Accommodations</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Select Your Stay & Hotel
        </h1>
        <p className="mt-3 text-slate-600 text-sm sm:text-base">
          Choose a comfortable hotel for your destination. Each stay offers scenic vistas, quality hygiene, delicious dining, and warm mountain hospitality.
        </p>

        {/* City Filter Pills */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setActiveCity(city)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeCity === city
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {city === 'All' ? 'All Destinations' : `📍 ${city}`}
            </button>
          ))}
        </div>
      </div>

      {/* Hotel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredHotels.map((hotel) => (
          <div
            key={hotel.id}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-56 overflow-hidden">
                <img
                  src={hotel.imageUrl}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-extrabold text-slate-800 shadow flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{hotel.stars} Star</span>
                </div>
                <div className="absolute bottom-3.5 left-3.5 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-sm text-white text-xs font-semibold">
                  📍 {hotel.destination}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-orange-600 transition-colors">
                    {hotel.name}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                    <span>{hotel.location}</span>
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {hotel.description}
                </p>

                {/* Amenities */}
                <div className="bg-amber-50/60 border border-amber-200/50 rounded-xl p-3 space-y-1.5">
                  <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider block">
                    Key Features
                  </span>
                  <div className="grid grid-cols-1 gap-1">
                    {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700">
                        <Check className="w-3 h-3 text-orange-600 flex-shrink-0" />
                        <span className="truncate">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Price</span>
                  <span className="text-lg font-black text-orange-600">
                    ₹{hotel.pricePerNightINR.toLocaleString('en-IN')}
                    <span className="text-xs font-normal text-slate-500"> / night</span>
                  </span>
                </div>

                <button
                  onClick={() =>
                    onBookHotel({
                      destination: hotel.destination,
                      serviceType: 'hotel',
                      itemName: `${hotel.name} (${hotel.stars}★)`,
                      totalPriceINR: hotel.pricePerNightINR * 2,
                      guests: 2,
                    })
                  }
                  className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-all flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Select Hotel</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
