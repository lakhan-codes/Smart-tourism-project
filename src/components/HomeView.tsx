import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  CalendarCheck, 
  Hotel, 
  Car, 
  Compass, 
  Utensils, 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  CheckCircle,
  Users,
  Award
} from 'lucide-react';
import { DESTINATIONS, ADVENTURES, HOTELS } from '../data/travelData.ts';

interface HomeViewProps {
  onNavigate: (tab: string, meta?: any) => void;
  onBookItem: (bookingData: any) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onBookItem }) => {
  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
        {/* Scenic Background image with gradient overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=1920&q=85')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-slate-950/95" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs sm:text-sm font-semibold mb-6 shadow-lg animate-in fade-in duration-700">
            <Sparkles className="w-4 h-4 text-orange-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Next-Gen Travel AI for Incredible India</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight sm:leading-none text-white drop-shadow-lg mb-6">
            Explore The Beauty Of{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
              Incredible India
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-200 font-normal leading-relaxed mb-10 drop-shadow-md">
            Discover breathtaking Himalayan valleys, pristine coastal beaches, and sacred rivers. 
            Generate custom AI itineraries in seconds and book verified local hotels, vehicles & guides.
          </p>

          {/* Call-to-action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('ai-planner')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-base sm:text-lg shadow-2xl shadow-orange-500/40 hover:shadow-orange-500/60 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3"
            >
              <Sparkles className="w-5 h-5 text-amber-200" />
              <span>Launch AI Trip Planner</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onNavigate('booking')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 font-bold text-base sm:text-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <CalendarCheck className="w-5 h-5 text-amber-400" />
              <span>Book Your Dream Trip</span>
            </button>
          </div>

          {/* Quick Search Strip */}
          <div className="mt-12 max-w-3xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-2xl border border-white/40 flex flex-col sm:flex-row items-center gap-2 text-slate-800">
            <div className="flex-1 flex items-center gap-2.5 px-3 py-2 w-full">
              <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0" />
              <input
                type="text"
                placeholder="Where to? (e.g. Shimla, Manali, Rishikesh, Goa...)"
                className="w-full bg-transparent text-sm font-semibold outline-none text-slate-900 placeholder-slate-400"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onNavigate('ai-planner');
                  }
                }}
              />
            </div>
            <button
              onClick={() => onNavigate('ai-planner')}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Search & Plan
            </button>
          </div>
        </div>
      </section>

      {/* POPULAR DESTINATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest block mb-1">
            Top Travel Spots
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Popular Destinations
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full mt-3 mb-3" />
          <p className="text-slate-600 text-sm sm:text-base">
            From snow-peaked Himalayan ridges to sun-drenched coastal beaches, explore India’s most beloved retreats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DESTINATIONS.slice(0, 6).map((dest) => (
            <div
              key={dest.id}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                  ★ {dest.rating}
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-2xl font-black tracking-tight">{dest.name}</h3>
                  <p className="text-xs text-amber-300 font-medium">{dest.tagline}</p>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {dest.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {dest.popularActivities.map((act, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium"
                    >
                      {act}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Starting at</span>
                    <span className="text-base font-extrabold text-orange-600">
                      ₹{dest.startingPriceINR.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onNavigate('ai-planner', { destination: dest.name })}
                      className="px-3 py-1.5 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" /> Plan AI
                    </button>
                    <button
                      onClick={() =>
                        onBookItem({
                          destination: dest.name,
                          serviceType: 'package',
                          itemName: `${dest.name} Explorer Tour Package`,
                          totalPriceINR: dest.startingPriceINR,
                          guests: 2,
                        })
                      }
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-orange-600 text-white text-xs font-bold transition-colors"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => onNavigate('destinations')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* OUR SERVICES INTERACTIVE GRID */}
      <section className="bg-gradient-to-b from-slate-50 to-orange-50/40 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-widest block mb-1">
              End-to-End Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Our Travel Services
            </h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full mt-3 mb-3" />
            <p className="text-slate-600 text-sm sm:text-base">
              Everything you need for an unforgettable Indian holiday, seamlessly unified.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Service 1: AI Planner */}
            <button
              onClick={() => onNavigate('ai-planner')}
              className="group p-5 bg-white rounded-2xl border border-orange-200 shadow-sm hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center justify-center hover:-translate-y-1.5"
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-md shadow-orange-500/25">
                <Sparkles className="w-7 h-7 text-amber-200" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-orange-600 transition-colors">
                AI Trip Planner
              </h3>
              <p className="text-[11px] text-slate-500 leading-tight">
                Gemini instant plans
              </p>
            </button>

            {/* Service 2: Adventure */}
            <button
              onClick={() => onNavigate('adventures')}
              className="group p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center justify-center hover:-translate-y-1.5"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-md shadow-amber-500/25">
                <Compass className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-amber-600 transition-colors">
                Adventure
              </h3>
              <p className="text-[11px] text-slate-500 leading-tight">
                Rafting, skiing & bungee
              </p>
            </button>

            {/* Service 3: Hotel */}
            <button
              onClick={() => onNavigate('hotels')}
              className="group p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center justify-center hover:-translate-y-1.5"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-md shadow-blue-600/25">
                <Hotel className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">
                Hotel Booking
              </h3>
              <p className="text-[11px] text-slate-500 leading-tight">
                Resorts & mountain views
              </p>
            </button>

            {/* Service 4: Car */}
            <button
              onClick={() => onNavigate('guides')}
              className="group p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center justify-center hover:-translate-y-1.5"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-md shadow-emerald-600/25">
                <Car className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-emerald-600 transition-colors">
                Car Rental
              </h3>
              <p className="text-[11px] text-slate-500 leading-tight">
                Thar, Innova & Dzire
              </p>
            </button>

            {/* Service 5: Tour Guide */}
            <button
              onClick={() => onNavigate('guides')}
              className="group p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center justify-center hover:-translate-y-1.5"
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-md shadow-purple-600/25">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-purple-600 transition-colors">
                Tour Guide
              </h3>
              <p className="text-[11px] text-slate-500 leading-tight">
                Local certified experts
              </p>
            </button>

            {/* Service 6: Food */}
            <button
              onClick={() => onNavigate('food')}
              className="group p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center justify-center hover:-translate-y-1.5"
            >
              <div className="w-14 h-14 rounded-2xl bg-rose-600 text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-md shadow-rose-600/25">
                <Utensils className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-rose-600 transition-colors">
                Local Food
              </h3>
              <p className="text-[11px] text-slate-500 leading-tight">
                Authentic Himachali Dham
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* FEATURED ADVENTURES & HOTELS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-orange-600 uppercase tracking-widest block mb-1">
              Popular Activities
            </span>
            <h2 className="text-3xl font-black text-slate-900">
              Adventures in Rishikesh, Shimla & Manali
            </h2>
          </div>
          <button
            onClick={() => onNavigate('adventures')}
            className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            <span>See all 9 adventures</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ADVENTURES.slice(0, 3).map((adv) => (
            <div
              key={adv.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img src={adv.imageUrl} alt={adv.title} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-bold">
                    📍 {adv.destination}
                  </span>
                  <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-orange-500 text-white text-xs font-bold">
                    ₹{adv.priceINR.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 text-base mb-1">{adv.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2">{adv.description}</p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button
                  onClick={() =>
                    onBookItem({
                      destination: adv.destination,
                      serviceType: 'adventure',
                      itemName: adv.title,
                      totalPriceINR: adv.priceINR,
                      guests: 2,
                    })
                  }
                  className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-colors"
                >
                  Book Activity
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US STATS */}
      <section className="bg-slate-900 text-white rounded-3xl max-w-7xl mx-auto px-6 py-12 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center relative z-10">
          <div>
            <div className="text-3xl sm:text-5xl font-black text-orange-400 mb-1">15,000+</div>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">Happy Travelers</p>
          </div>
          <div>
            <div className="text-3xl sm:text-5xl font-black text-amber-400 mb-1">50+</div>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">Verified Local Guides</p>
          </div>
          <div>
            <div className="text-3xl sm:text-5xl font-black text-yellow-400 mb-1">100%</div>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">Safe Mountain Fleets</p>
          </div>
          <div>
            <div className="text-3xl sm:text-5xl font-black text-emerald-400 mb-1">4.9 / 5</div>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">Average Guest Rating</p>
          </div>
        </div>
      </section>

    </div>
  );
};
