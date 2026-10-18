import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!name || !email || !message) {
      setErrorMsg('Please enter your name, email, and message.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });

      if (!res.ok) {
        throw new Error('Failed to send message');
      }

      setSuccessMsg('Your message has been received! Our travel team will contact you within 24 hours.');
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Error sending message. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
      
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-orange-600 uppercase tracking-widest block mb-2">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Contact Us
        </h1>
        <p className="mt-3 text-slate-600 text-sm sm:text-base">
          Have queries about travel permits, customized group bookings, or seasonal weather? We are here to help.
        </p>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl flex flex-col md:flex-row">
        
        {/* Contact Info (Left) */}
        <div className="md:w-5/12 bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950 text-white p-8 sm:p-10 flex flex-col justify-between space-y-8">
          <div>
            <h2 className="text-2xl font-black mb-6 text-white">Contact Information</h2>

            <div className="space-y-6 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-1">Office Address</h4>
                  <p className="leading-relaxed text-xs sm:text-sm">
                    123 Tourism Street, The Mall Road,<br />
                    Shimla, Himachal Pradesh 171001, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-1">Phone Helpline</h4>
                  <p className="text-xs sm:text-sm font-semibold">
                    <a href="tel:+919876543210" className="hover:text-amber-300 transition-colors">
                      +91 98765 43210
                    </a>
                  </p>
                  <p className="text-xs text-slate-400">+91 90000 00001 (WhatsApp)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-1">Email Inquiries</h4>
                  <p className="text-xs sm:text-sm font-medium">
                    <a href="mailto:info@smarttourism.com" className="hover:text-sky-300 transition-colors">
                      info@smarttourism.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-1">Office Hours</h4>
                  <p className="text-xs sm:text-sm">Monday - Saturday</p>
                  <p className="text-xs text-slate-400">9:00 AM - 6:00 PM IST</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 text-xs text-slate-400">
            Emergency on-tour assistance available 24/7 for all booked guests.
          </div>
        </div>

        {/* Contact Form (Right) */}
        <div className="md:w-7/12 p-8 sm:p-10 bg-white">
          <h2 className="text-2xl font-black text-slate-900 mb-2">Send Us a Message</h2>
          <p className="text-xs text-slate-500 mb-6">
            Fill in the form below and our travel consultants will respond promptly.
          </p>

          {successMsg && (
            <div className="mb-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject (e.g. Manali Family Package)"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Message *
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your travel questions, dates, or requests..."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none text-slate-900"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-lg shadow-orange-500/25 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{loading ? 'Sending Message...' : 'Send Message'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
