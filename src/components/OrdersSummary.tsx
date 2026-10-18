import React, { useEffect, useState } from 'react';
import { ShoppingBag, Calendar, MapPin, Users, Printer, CheckCircle, RefreshCw, Plus } from 'lucide-react';

interface Booking {
  id: string;
  bookingRef: string;
  customerName: string;
  email: string;
  phone: string;
  destination: string;
  serviceType: string;
  itemName?: string;
  guests: number;
  checkIn: string;
  checkOut?: string;
  totalPriceINR: number;
  status: 'Confirmed' | 'Pending';
  createdAt: string;
}

interface OrdersSummaryProps {
  onNewBookingClick: () => void;
}

export const OrdersSummary: React.FC<OrdersSummaryProps> = ({ onNewBookingClick }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/bookings');
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest block mb-1">
            Trip Management
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <ShoppingBag className="w-8 h-8 text-orange-500" />
            <span>Order Summary & Bookings</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review confirmed reservations, generate vouchers, and track travel statuses.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchBookings}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={onNewBookingClick}
            className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Booking</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-orange-500" />
          <p className="text-sm">Loading your bookings...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4 text-2xl">
            ✈️
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">No Bookings Placed Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
            Ready to explore? Book a tour package, select a mountain hotel, or hire a local travel guide.
          </p>
          <button
            onClick={onNewBookingClick}
            className="px-6 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-xs"
          >
            Book Your First Trip
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-orange-700 bg-orange-100 px-2.5 py-1 rounded-md border border-orange-200">
                    Ref: {booking.bookingRef}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>{booking.status}</span>
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    Placed: {new Date(booking.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    {booking.itemName || 'Tour Package'}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mt-1">
                    <span className="flex items-center gap-1 font-semibold text-slate-800">
                      <MapPin className="w-3.5 h-3.5 text-orange-500" /> {booking.destination}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" /> {booking.guests} Guests
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> Date: {booking.checkIn} {booking.checkOut ? `to ${booking.checkOut}` : ''}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-500">
                  <span>Guest: <strong>{booking.customerName}</strong> ({booking.phone})</span>
                </div>
              </div>

              {/* Price and Print */}
              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 pt-4 md:pt-0 border-slate-100 gap-3">
                <div className="text-left md:text-right">
                  <span className="text-[10px] text-slate-400 uppercase block">Amount Paid/Confirmed</span>
                  <span className="text-xl font-black text-slate-900">
                    ₹{booking.totalPriceINR?.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
