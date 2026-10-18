import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { HomeView } from './components/HomeView.tsx';
import { AiTripPlanner } from './components/AiTripPlanner.tsx';
import { DestinationsView } from './components/DestinationsView.tsx';
import { HotelsView } from './components/HotelsView.tsx';
import { AdventuresView } from './components/AdventuresView.tsx';
import { GuidesView } from './components/GuidesView.tsx';
import { FoodView } from './components/FoodView.tsx';
import { AboutView } from './components/AboutView.tsx';
import { ContactView } from './components/ContactView.tsx';
import { OrdersSummary } from './components/OrdersSummary.tsx';
import { BookingModal } from './components/BookingModal.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { TravelAssistantChat } from './components/TravelAssistantChat.tsx';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [plannerDestination, setPlannerDestination] = useState<string>('Shimla');
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; phone?: string } | null>(null);

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingInitialData, setBookingInitialData] = useState<any | null>(null);
  const [bookingsCount, setBookingsCount] = useState<number>(2);

  // Restore user session from localStorage if exists
  useEffect(() => {
    const savedUser = localStorage.getItem('smart_tourism_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        // ignore
      }
    }

    // Fetch initial bookings count
    fetch('/api/bookings')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data)) {
          setBookingsCount(data.length);
        }
      })
      .catch(() => {});
  }, []);

  const handleLoginSuccess = (user: { name: string; email: string; phone?: string }) => {
    setCurrentUser(user);
    localStorage.setItem('smart_tourism_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('smart_tourism_user');
  };

  // When user clicks "Plan with AI" from any card or hero
  const handlePlanWithAI = (destination: string) => {
    setPlannerDestination(destination);
    setActiveTab('ai-planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When user clicks "Book" on any specific hotel, adventure, guide or tour package
  const handleOpenBooking = (itemData: any) => {
    setBookingInitialData(itemData);
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = (_newBooking: any) => {
    setBookingsCount((prev) => prev + 1);
  };

  const handleNavigate = (tab: string, meta?: any) => {
    if (meta?.destination) {
      setPlannerDestination(meta.destination);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Global Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        bookingsCount={bookingsCount}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onBookItem={handleOpenBooking}
          />
        )}

        {activeTab === 'ai-planner' && (
          <AiTripPlanner
            initialDestination={plannerDestination}
            onBookItem={handleOpenBooking}
          />
        )}

        {activeTab === 'destinations' && (
          <DestinationsView
            onPlanTripWithAI={handlePlanWithAI}
            onBookItem={handleOpenBooking}
          />
        )}

        {activeTab === 'hotels' && (
          <HotelsView onBookHotel={handleOpenBooking} />
        )}

        {activeTab === 'adventures' && (
          <AdventuresView onBookAdventure={handleOpenBooking} />
        )}

        {activeTab === 'guides' && (
          <GuidesView onHireGuide={handleOpenBooking} />
        )}

        {activeTab === 'food' && (
          <FoodView onSelectFood={handleOpenBooking} />
        )}

        {activeTab === 'booking' && (
          <div className="py-12 px-4 max-w-xl mx-auto">
            <div className="text-center mb-6">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-widest block mb-1">
                Direct Reservation
              </span>
              <h1 className="text-3xl font-black text-slate-900">Book Your Dream Trip</h1>
              <p className="text-xs text-slate-500 mt-1">
                Customize your holiday across Shimla, Manali, Rishikesh, Goa & more.
              </p>
            </div>
            <button
              onClick={() => {
                setBookingInitialData({
                  destination: 'Shimla',
                  serviceType: 'package',
                  itemName: 'All-Inclusive Explorer Tour Package',
                  totalPriceINR: 9999,
                  guests: 2,
                });
                setIsBookingOpen(true);
              }}
              className="w-full py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-black text-base shadow-xl shadow-orange-500/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Open Online Booking Form</span>
            </button>
          </div>
        )}

        {activeTab === 'orders' && (
          <OrdersSummary
            onNewBookingClick={() => {
              setBookingInitialData(null);
              setIsBookingOpen(true);
            }}
          />
        )}

        {activeTab === 'about' && <AboutView />}

        {activeTab === 'contact' && <ContactView />}
      </main>

      {/* Floating Gemini AI Travel Assistant Concierge */}
      <TravelAssistantChat currentDestination={plannerDestination} />

      {/* Universal Booking Reservation Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialData={bookingInitialData}
        onBookingSuccess={handleBookingSuccess}
        currentUser={currentUser}
      />

      {/* Auth Modal (Login / Register) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
