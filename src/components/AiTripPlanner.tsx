import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  Compass, 
  CheckCircle2, 
  Utensils, 
  ShieldCheck, 
  Hotel, 
  Printer, 
  Check, 
  Sun, 
  Moon, 
  Clock, 
  Info,
  ArrowRight,
  RefreshCw,
  Luggage
} from 'lucide-react';

interface AiTripPlannerProps {
  initialDestination?: string;
  onBookItem: (bookingData: {
    destination: string;
    serviceType: 'hotel' | 'adventure' | 'guide' | 'package' | 'custom_trip';
    itemName: string;
    totalPriceINR: number;
    guests: number;
    itinerarySummary?: string;
  }) => void;
}

export const AiTripPlanner: React.FC<AiTripPlannerProps> = ({
  initialDestination = 'Shimla',
  onBookItem,
}) => {
  // Form State
  const [destination, setDestination] = useState(initialDestination);
  const [durationDays, setDurationDays] = useState(3);
  const [budget, setBudget] = useState<'Budget' | 'Moderate' | 'Luxury'>('Moderate');
  const [travelStyle, setTravelStyle] = useState('Adventure & Sightseeing');
  const [travelersCount, setTravelersCount] = useState(2);
  const [startingCity, setStartingCity] = useState('Delhi');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Trekking',
    'Sightseeing',
    'Local Food',
    'Photography',
  ]);
  const [foodPreference, setFoodPreference] = useState('Himachali Traditional & North Indian');

  // Request State
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState('Initializing Gemini AI...');
  const [itineraryResult, setItineraryResult] = useState<any | null>(null);
  const [activeDayTab, setActiveDayTab] = useState(1);
  const [checkedPacking, setCheckedPacking] = useState<{ [key: number]: boolean }>({});

  const popularDestinations = [
    'Shimla',
    'Manali',
    'Rishikesh',
    'Haridwar',
    'Spiti Valley',
    'Goa',
    'Kashmir',
    'Jaipur',
    'Kerala',
  ];

  const travelStyles = [
    'Adventure & Sightseeing',
    'Family Vacation',
    'Romantic & Honeymoon',
    'Solo Backpacker',
    'Spiritual & Heritage',
    'Relaxation & Nature',
  ];

  const availableInterests = [
    'Trekking',
    'River Rafting',
    'Snow Sports',
    'Paragliding',
    'Temples & Ghats',
    'Photography',
    'Riverside Camping',
    'Local Cafes',
    'Heritage Architecture',
    'Stargazing',
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleGeneratePlan = async () => {
    if (!destination.trim()) return;

    setLoading(true);
    setLoadingStage('Connecting to Google Gemini API...');

    const stages = [
      'Analyzing seasonal weather patterns & topography...',
      'Structuring optimal day-wise travel timeline...',
      'Evaluating authentic mountain stays and local guides...',
      'Calculating comprehensive budget estimates...',
      'Finalizing your customized Smart Tourism itinerary...',
    ];

    let stageIdx = 0;
    const interval = setInterval(() => {
      if (stageIdx < stages.length) {
        setLoadingStage(stages[stageIdx]);
        stageIdx++;
      }
    }, 1200);

    try {
      const response = await fetch('/api/plan-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          durationDays,
          budget,
          travelStyle,
          travelersCount,
          startingCity,
          interests: selectedInterests,
          foodPreference,
        }),
      });

      clearInterval(interval);

      if (!response.ok) {
        throw new Error('Failed to generate trip plan');
      }

      const data = await response.json();
      setItineraryResult(data);
      setActiveDayTab(1);

      // Scroll smoothly down to the result
      setTimeout(() => {
        const resultEl = document.getElementById('ai-itinerary-output');
        if (resultEl) {
          resultEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    } catch (err) {
      clearInterval(interval);
      console.error(err);
      alert('Could not generate plan right now. Please check connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const togglePackingItem = (idx: number) => {
    setCheckedPacking((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/30 text-orange-400 text-xs sm:text-sm font-semibold mb-4">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span>Powered by Gemini 3.8 Flash AI</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          AI Trip Planner & Itinerary Builder
        </h1>
        <p className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
          Tell our travel AI where you want to go. Within seconds, get a personalized, hour-by-hour itinerary with real local guides, authentic cuisine, stays, and budget estimates.
        </p>
      </div>

      {/* Interactive Form Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 sm:p-8 mb-12 transition-all">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 1. Destination */}
          <div className="lg:col-span-3">
            <label className="block text-sm font-bold text-slate-800 mb-2">
              Where do you want to explore?
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {popularDestinations.map((place) => (
                <button
                  key={place}
                  type="button"
                  onClick={() => setDestination(place)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    destination.toLowerCase() === place.toLowerCase()
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  📍 {place}
                </button>
              ))}
            </div>
            <div className="relative">
              <MapPin className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Or type any Indian destination (e.g. Kasol, Dharamshala, Leh...)"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-900 font-medium placeholder-slate-400 outline-none transition-all"
              />
            </div>
          </div>

          {/* 2. Duration */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center justify-between">
              <span>Trip Duration</span>
              <span className="text-orange-600 font-extrabold text-base">{durationDays} Days</span>
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min={1}
                max={10}
                value={durationDays}
                onChange={(e) => setDurationDays(parseInt(e.target.value, 10))}
                className="w-full accent-orange-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>1 Day</span>
                <span>3 Days</span>
                <span>5 Days</span>
                <span>7 Days</span>
                <span>10 Days</span>
              </div>
            </div>
          </div>

          {/* 3. Budget Tier */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              Budget Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Budget', 'Moderate', 'Luxury'] as const).map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setBudget(tier)}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                    budget === tier
                      ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-sm'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div>{tier === 'Budget' ? '₹ Eco' : tier === 'Moderate' ? '₹₹ Comfort' : '₹₹₹ Luxury'}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Number of Travelers */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              Travelers Count
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setTravelersCount(Math.max(1, travelersCount - 1))}
                className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-lg flex items-center justify-center transition-colors"
              >
                -
              </button>
              <div className="flex-1 py-2.5 text-center bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 text-base flex items-center justify-center gap-2">
                <Users className="w-4 h-4 text-orange-500" />
                <span>{travelersCount} {travelersCount === 1 ? 'Person' : 'Persons'}</span>
              </div>
              <button
                type="button"
                onClick={() => setTravelersCount(Math.min(20, travelersCount + 1))}
                className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-lg flex items-center justify-center transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* 5. Travel Style */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-bold text-slate-800 mb-2">
              Travel Style & Vibe
            </label>
            <div className="flex flex-wrap gap-2">
              {travelStyles.map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => setTravelStyle(style)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    travelStyle === style
                      ? 'border-orange-500 bg-orange-500 text-white shadow-sm'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* 6. Starting City */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              Starting From
            </label>
            <input
              type="text"
              value={startingCity}
              onChange={(e) => setStartingCity(e.target.value)}
              placeholder="e.g. Delhi, Chandigarh, Mumbai..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-900 font-medium text-sm outline-none"
            />
          </div>

          {/* 7. Specific Interests */}
          <div className="lg:col-span-3">
            <label className="block text-sm font-bold text-slate-800 mb-2">
              Travel Interests & Preferred Activities (Select any)
            </label>
            <div className="flex flex-wrap gap-2">
              {availableInterests.map((interest) => {
                const selected = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                      selected
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {selected ? <Check className="w-3.5 h-3.5" /> : null}
                    <span>{interest}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 8. Food Preference */}
          <div className="lg:col-span-3">
            <label className="block text-sm font-bold text-slate-800 mb-2">
              Food & Culinary Preference
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                'Himachali Traditional & North Indian',
                'Pure Vegetarian / Sattvic',
                'Mountain Street Food & Cafes',
                'Non-Vegetarian Specialties',
                'Any Local Authentic Cuisines',
              ].map((food) => (
                <button
                  key={food}
                  type="button"
                  onClick={() => setFoodPreference(food)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    foodPreference === food
                      ? 'border-orange-500 bg-orange-50 text-orange-700 font-semibold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  🍲 {food}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Action Button */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Real-time generation • Includes local guide contacts & stay estimates</span>
          </div>
          <button
            type="button"
            onClick={handleGeneratePlan}
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-base shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>{loadingStage}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate AI Itinerary</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Loading Skeleton Indicator */}
      {loading && (
        <div className="bg-white rounded-2xl p-8 border border-orange-200 shadow-xl text-center mb-12 animate-pulse">
          <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 animate-spin" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Designing Your Dream Tour</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">{loadingStage}</p>
        </div>
      )}

      {/* ITINERARY RESULT DISPLAY */}
      {itineraryResult && !loading && (
        <div id="ai-itinerary-output" className="space-y-8 animate-in fade-in duration-500">
          
          {/* Main Plan Overview Header */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-orange-950 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500 text-white">
                    {itineraryResult.durationDays || durationDays} Days Itinerary
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-200">
                    📍 {itineraryResult.destination || destination}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" /> Print / Save PDF
                  </button>
                  <button
                    onClick={handleGeneratePlan}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-xs font-medium transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Re-plan
                  </button>
                </div>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
                {itineraryResult.title}
              </h2>
              <p className="text-amber-300 font-medium text-base sm:text-lg mb-4">
                {itineraryResult.tagline}
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-4xl mb-6">
                {itineraryResult.summary}
              </p>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3.5 border border-white/5">
                  <span className="text-xs text-slate-400 block mb-1">Est. Total Trip Cost</span>
                  <span className="text-xl sm:text-2xl font-black text-amber-400">
                    ₹{itineraryResult.estimatedTotalCostINR?.toLocaleString('en-IN') || '12,500'}
                  </span>
                  <span className="text-[11px] text-slate-400 block">for {travelersCount} travelers ({budget})</span>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3.5 border border-white/5">
                  <span className="text-xs text-slate-400 block mb-1">Best Season to Visit</span>
                  <span className="text-sm font-semibold text-slate-100 block">
                    {itineraryResult.bestTimeToVisit || 'October through June'}
                  </span>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3.5 border border-white/5">
                  <span className="text-xs text-slate-400 block mb-1">Weather & Layers</span>
                  <span className="text-xs font-medium text-slate-200 block line-clamp-2">
                    {itineraryResult.weatherAdvice || 'Cool mountain weather, carry warm layers for evening.'}
                  </span>
                </div>
              </div>

              {/* CTA Booking Button */}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  onClick={() =>
                    onBookItem({
                      destination: itineraryResult.destination || destination,
                      serviceType: 'package',
                      itemName: `${itineraryResult.title} (${durationDays} Days Package)`,
                      totalPriceINR: itineraryResult.estimatedTotalCostINR || 12000,
                      guests: travelersCount,
                      itinerarySummary: `${itineraryResult.title} for ${travelersCount} guests starting from ${startingCity}`,
                    })
                  }
                  className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-orange-500/40 flex items-center gap-2 transition-all"
                >
                  <span>Book This Complete AI Tour Package</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Budget Breakdown Card */}
          {itineraryResult.budgetBreakdown && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md">
              <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-orange-500" />
                <span>Estimated Budget Breakdown (INR)</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60">
                  <span className="text-xs text-amber-800 font-medium block">Stay / Hotel</span>
                  <span className="text-base font-extrabold text-amber-950">
                    ₹{itineraryResult.budgetBreakdown.accommodationINR?.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200/60">
                  <span className="text-xs text-blue-800 font-medium block">Vehicle & Travel</span>
                  <span className="text-base font-extrabold text-blue-950">
                    ₹{itineraryResult.budgetBreakdown.transportINR?.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/60">
                  <span className="text-xs text-emerald-800 font-medium block">Food & Dining</span>
                  <span className="text-base font-extrabold text-emerald-950">
                    ₹{itineraryResult.budgetBreakdown.foodINR?.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-200/60">
                  <span className="text-xs text-purple-800 font-medium block">Adventures & Entry</span>
                  <span className="text-base font-extrabold text-purple-950">
                    ₹{itineraryResult.budgetBreakdown.activitiesINR?.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-3 bg-slate-100 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-700 font-medium block">Buffer / Emergency</span>
                  <span className="text-base font-extrabold text-slate-900">
                    ₹{itineraryResult.budgetBreakdown.bufferINR?.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Day-by-Day Itinerary Tabs */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-8">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-orange-500" />
                  <span>Day-by-Day Detailed Schedule</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Click through each day to view morning, afternoon, evening and night activities</p>
              </div>

              {/* Day selection tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                {itineraryResult.itinerary?.map((dayObj: any) => (
                  <button
                    key={dayObj.day}
                    onClick={() => setActiveDayTab(dayObj.day)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      activeDayTab === dayObj.day
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Day {dayObj.day}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Day Content */}
            {itineraryResult.itinerary?.map((dayObj: any) => {
              if (dayObj.day !== activeDayTab) return null;

              return (
                <div key={dayObj.day} className="space-y-6 animate-in fade-in duration-300">
                  <div className="bg-orange-50 border border-orange-200/80 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Day {dayObj.day}</span>
                      <h4 className="text-lg font-bold text-slate-900">{dayObj.title}</h4>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-white rounded-lg text-slate-700 border border-orange-200">
                      Full Day Plan
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Morning */}
                    <div className="p-4 rounded-xl border border-amber-200/80 bg-gradient-to-b from-amber-50/50 to-white shadow-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                          <Sun className="w-3.5 h-3.5 text-amber-600" /> Morning ({dayObj.morning?.time})
                        </span>
                        <span className="text-xs font-medium text-slate-500">📍 {dayObj.morning?.location}</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-800">{dayObj.morning?.activity}</p>
                      {dayObj.morning?.tips && (
                        <p className="text-xs text-amber-700 bg-amber-50/90 p-2 rounded-lg border border-amber-100">
                          💡 <strong>Tip:</strong> {dayObj.morning?.tips}
                        </p>
                      )}
                    </div>

                    {/* Afternoon */}
                    <div className="p-4 rounded-xl border border-orange-200/80 bg-gradient-to-b from-orange-50/50 to-white shadow-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-800 bg-orange-100 px-2.5 py-0.5 rounded-full">
                          <Clock className="w-3.5 h-3.5 text-orange-600" /> Afternoon ({dayObj.afternoon?.time})
                        </span>
                        <span className="text-xs font-medium text-slate-500">📍 {dayObj.afternoon?.location}</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-800">{dayObj.afternoon?.activity}</p>
                      {dayObj.afternoon?.mealRecommendation && (
                        <p className="text-xs text-orange-800 bg-orange-50/90 p-2 rounded-lg border border-orange-100 flex items-center gap-1">
                          <Utensils className="w-3 h-3 flex-shrink-0" />
                          <span><strong>Lunch recommendation:</strong> {dayObj.afternoon?.mealRecommendation}</span>
                        </p>
                      )}
                    </div>

                    {/* Evening */}
                    <div className="p-4 rounded-xl border border-sky-200/80 bg-gradient-to-b from-sky-50/50 to-white shadow-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-full">
                          <Compass className="w-3.5 h-3.5 text-sky-600" /> Evening ({dayObj.evening?.time})
                        </span>
                        <span className="text-xs font-medium text-slate-500">📍 {dayObj.evening?.location}</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-800">{dayObj.evening?.activity}</p>
                      {dayObj.evening?.sunsetSpot && (
                        <p className="text-xs text-sky-800 bg-sky-50/90 p-2 rounded-lg border border-sky-100">
                          🌅 <strong>Sunset vantage:</strong> {dayObj.evening?.sunsetSpot}
                        </p>
                      )}
                    </div>

                    {/* Night */}
                    <div className="p-4 rounded-xl border border-indigo-200/80 bg-gradient-to-b from-indigo-50/50 to-white shadow-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-800 bg-indigo-100 px-2.5 py-0.5 rounded-full">
                          <Moon className="w-3.5 h-3.5 text-indigo-600" /> Night ({dayObj.night?.time})
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-slate-800">{dayObj.night?.activity}</p>
                      {dayObj.night?.stayRecommendation && (
                        <p className="text-xs text-indigo-800 bg-indigo-50/90 p-2 rounded-lg border border-indigo-100 flex items-center gap-1">
                          <Hotel className="w-3.5 h-3.5 flex-shrink-0" />
                          <span><strong>Rest spot:</strong> {dayObj.night?.stayRecommendation}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recommended Hotels from Plan */}
          {itineraryResult.recommendedHotels?.length > 0 && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Hotel className="w-5 h-5 text-orange-500" />
                <span>Recommended Accommodations for this Itinerary</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {itineraryResult.recommendedHotels.map((h: any, i: number) => (
                  <div key={i} className="border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-orange-600">{h.category || 'Hotel'}</span>
                        <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                          ★ {h.rating || 4.5}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-base">{h.name}</h4>
                      <p className="text-xs text-slate-500 mb-2">📍 {h.location || destination}</p>
                      <p className="text-xs text-slate-600 mb-4">{h.highlight}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-slate-400 block">From</span>
                        <span className="font-extrabold text-slate-900 text-sm">
                          ₹{h.pricePerNightINR?.toLocaleString('en-IN') || 2500}
                          <span className="text-xs font-normal text-slate-500">/night</span>
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          onBookItem({
                            destination: itineraryResult.destination || destination,
                            serviceType: 'hotel',
                            itemName: `${h.name} (${h.category})`,
                            totalPriceINR: (h.pricePerNightINR || 2500) * durationDays,
                            guests: travelersCount,
                          })
                        }
                        className="px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs transition-colors"
                      >
                        Book Stay
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Adventures & Local Delicacies Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Adventures */}
            {itineraryResult.recommendedAdventures?.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-orange-500" />
                  <span>Featured Adventure Activities</span>
                </h3>
                <div className="space-y-3">
                  {itineraryResult.recommendedAdventures.map((adv: any, idx: number) => (
                    <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{adv.name}</h4>
                        <p className="text-xs text-slate-500">📍 {adv.location} • Difficulty: {adv.difficulty || 'Moderate'}</p>
                        {adv.highlights && <p className="text-xs text-slate-600 mt-1">{adv.highlights}</p>}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-xs text-slate-400 block">Approx</span>
                        <span className="font-extrabold text-slate-900 text-sm">
                          ₹{adv.approxPriceINR?.toLocaleString('en-IN') || '1,500'}
                        </span>
                        <button
                          onClick={() =>
                            onBookItem({
                              destination: itineraryResult.destination || destination,
                              serviceType: 'adventure',
                              itemName: adv.name,
                              totalPriceINR: adv.approxPriceINR || 1500,
                              guests: travelersCount,
                            })
                          }
                          className="block mt-1 text-[11px] font-bold text-orange-600 hover:text-orange-700"
                        >
                          Book Activity →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Must-Try Food */}
            {itineraryResult.mustTryFood?.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-orange-500" />
                  <span>Must-Try Local Delicacies</span>
                </h3>
                <div className="space-y-3">
                  {itineraryResult.mustTryFood.map((food: any, idx: number) => (
                    <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{food.dish}</h4>
                        <p className="text-xs text-slate-600 mt-0.5">{food.description}</p>
                        {food.whereToTry && (
                          <p className="text-[11px] text-orange-600 font-medium mt-1">
                            Recommended spot: {food.whereToTry}
                          </p>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="font-extrabold text-slate-800 text-sm">
                          ₹{food.approxPriceINR || 150}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Guide Advice & Packing Checklist */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Guide Advice */}
            {itineraryResult.localGuideAdvice?.length > 0 && (
              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 shadow-sm">
                <h3 className="text-base font-bold text-amber-950 mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5 text-amber-700" />
                  <span>Insider Travel Tips from Local Guides</span>
                </h3>
                <ul className="space-y-2.5">
                  {itineraryResult.localGuideAdvice.map((tip: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-amber-900 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Interactive Packing Checklist */}
            {itineraryResult.packingList?.length > 0 && (
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Luggage className="w-5 h-5 text-orange-500" />
                  <span>Interactive Packing Checklist</span>
                </h3>
                <ul className="space-y-2">
                  {itineraryResult.packingList.map((item: string, idx: number) => {
                    const isChecked = !!checkedPacking[idx];
                    return (
                      <li
                        key={idx}
                        onClick={() => togglePackingItem(idx)}
                        className={`flex items-center gap-2.5 p-2 rounded-lg cursor-pointer transition-colors text-xs sm:text-sm ${
                          isChecked ? 'bg-emerald-50 text-emerald-800 line-through' : 'bg-white text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center ${
                            isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span>{item}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
};
