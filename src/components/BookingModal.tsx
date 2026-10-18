import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Mail, Phone, MapPin, Users, Check, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingInitialData {
  destination?: string;
  serviceType?: 'hotel' | 'adventure' | 'guide' | 'package' | 'custom_trip';
  itemName?: string;
  totalPriceINR?: number;
  guests?: number;
  itinerarySummary?: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: BookingInitialData | null;
  onBookingSuccess: (newBooking: any) => void;
  currentUser?: { name: string; email: string; phone?: string } | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onBookingSuccess,
  currentUser,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState('Shimla');
  const [serviceType, setServiceType] = useState<string>('package');
  const [itemName, setItemName] = useState('All-Inclusive Travel Package');
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [totalPriceINR, setTotalPriceINR] = useState(7500);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Set default check-in tomorrow, check-out in 4 days
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const inFourDays = new Date(today);
    inFourDays.setDate(inFourDays.getDate() + 4);

    const formatYMD = (d: Date) => d.toISOString().split('T')[0];
    setCheckIn(formatYMD(tomorrow));
    setCheckOut(formatYMD(inFourDays));
  }, []);

  // Sync initialData when modal opens
  useEffect(() => {
    if (initialData) {
      if (initialData.destination) setDestination(initialData.destination);
      if (initialData.serviceType) setServiceType(initialData.serviceType);
      if (initialData.itemName) setItemName(initialData.itemName);
      if (initialData.totalPriceINR) setTotalPriceINR(initialData.totalPriceINR);
      if (initialData.guests) setGuests(initialData.guests);
    }
    if (currentUser) {
      if (currentUser.name) setCustomerName(currentUser.name);
      if (currentUser.email) setEmail(currentUser.email);
      if (currentUser.phone) setPhone(currentUser.phone);
    }
  }, [initialData, currentUser, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName || !email || !phone || !destination || !checkIn) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          email,
          phone,
          destination,
          serviceType,
          itemName,
          guests: Number(guests),
          checkIn,
          checkOut,
          specialRequests,
          totalPriceINR,
          itinerarySummary: initialData?.itinerarySummary || `${itemName} for ${destination}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to place booking.');
      }

      const result = await response.json();
      setConfirmedBooking(result.booking);
      onBookingSuccess(result.booking);

      // Trigger celebratory confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong while booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setConfirmedBooking(null);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={handleModalClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Confirmation Screen */}
        {confirmedBooking ? (
          <div className="text-center py-6">
            <div className="w-20 h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-4 text-4xl shadow-xl shadow-emerald-500/30">
              ✓
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mb-2">
              Booking Confirmed!
            </h2>
            <p className="text-sm text-slate-600 mb-6 max-w-sm mx-auto">
              Thank you for choosing Smart Tourism. Your booking has been successfully placed in our system.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left mb-6 space-y-2.5">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-xs text-slate-500">Booking Reference</span>
                <span className="text-sm font-mono font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                  {confirmedBooking.bookingRef}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Customer Name</span>
                <span className="font-semibold text-slate-800">{confirmedBooking.customerName}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Destination</span>
                <span className="font-semibold text-slate-800">📍 {confirmedBooking.destination}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Service / Stay</span>
                <span className="font-semibold text-slate-800">{confirmedBooking.itemName}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Travel Date</span>
                <span className="font-semibold text-slate-800">{confirmedBooking.checkIn}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Guests</span>
                <span className="font-semibold text-slate-800">{confirmedBooking.guests} Persons</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <span className="text-xs font-bold text-slate-700">Total Price</span>
                <span className="text-base font-extrabold text-orange-600">
                  ₹{confirmedBooking.totalPriceINR?.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleModalClose}
                className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 transition-all"
              >
                Back to Travel Explorer
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block mb-1">
                Direct Reservation
              </span>
              <h2 className="text-2xl font-black text-slate-900">
                Book Your Dream Trip
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your details to confirm your tour package, hotel, adventure activity, or guide.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Item Info Banner */}
              <div className="bg-orange-50/80 border border-orange-200/60 rounded-xl p-3 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 block">Selected Package/Service:</span>
                  <span className="font-bold text-slate-800">{itemName}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block">Estimated Cost:</span>
                  <span className="font-bold text-orange-600 text-sm">
                    ₹{totalPriceINR?.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rahul@example.com"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone / Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Destination *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none bg-white font-medium"
                    >
                      <option value="Shimla">Shimla</option>
                      <option value="Manali">Manali</option>
                      <option value="Rishikesh">Rishikesh</option>
                      <option value="Haridwar">Haridwar</option>
                      <option value="Spiti Valley">Spiti Valley</option>
                      <option value="Goa">Goa</option>
                      <option value="Kashmir">Kashmir</option>
                      <option value="Jaipur">Jaipur</option>
                      <option value="Kerala">Kerala</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Guests & Dates */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Guests *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value, 10) || 1)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none text-center font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Check In *
                  </label>
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-2 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Check Out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-2 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Special Requests / Pickup Points
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Vegetarian food preferences, high floor room, airport cab pickup..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Confirming Reservation...</span>
                  ) : (
                    <>
                      <span>Confirm & Place Booking</span>
                      <span>(₹{totalPriceINR?.toLocaleString('en-IN')})</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
