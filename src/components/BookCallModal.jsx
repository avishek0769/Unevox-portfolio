import React, { useState } from 'react';
import { X, Calendar, Clock, Sparkles, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function BookCallModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    time: '',
    message: '',
    formType: "call"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const servicesList = [
    'Social Media Management',
    'Sports Media Production',
    'Digital Marketing',
    'Business Development',
    'Festival Promotions',
    'Event Promotions',
    'Photography',
    'Reel Production',
    'Video Production',
    'Creative Graphics',
    'Brand Promotion'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);

    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycbw00qiqQIiympVbhhBjTxtxvqvV6-Ef6WyKO9Xh4G6lzpcGyHOLf2blwHtemaFZaMVQ6g/exec',
        {
          method: 'POST',
          body: JSON.stringify(formData),
        }
      );
      // Clear form and show success
      setFormData({
        name: '',
        company: '',
        phone: '',
        email: '',
        service: '',
        date: '',
        time: '',
        message: '',
        formType: 'call'
      });
      setIsSuccess(true);
    } catch (_err) {
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#072541]/70 backdrop-blur-md">
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-[#e2dbd3] bg-white shadow-2xl transition-all duration-300 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Neon accent top border */}
        <div className="h-1.5 w-full bg-gradient-to-r from-volt via-electric-cyan to-electric-purple" />

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-volt/10 text-volt">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-black-100 tracking-tight">Book a Free Call</h3>
              <p className="text-xs text-text-secondary">Take your brand to the next league</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-text-secondary hover:text-white hover:bg-slate-border transition-colors duration-200"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Container */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-volt/20 blur-xl animate-pulse" />
                <CheckCircle className="w-20 h-20 text-volt relative z-10" />
              </div>
              <h4 className="font-display text-2xl font-bold text-[#072541] mb-2">Booking Requested!</h4>
              <p className="text-text-secondary max-w-md mb-8">
                Thank you for choosing Unevox. Our team will review your request and get in touch via email and phone within 24 hours.
              </p>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                }}
                className="px-8 py-3.5 rounded-full font-display font-bold text-white bg-primary hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                Close Window
              </button>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-red-100 blur-xl animate-pulse" />
                <AlertCircle className="w-20 h-20 text-red-500 relative z-10" />
              </div>
              <h4 className="font-display text-2xl font-bold text-[#072541] mb-2">Something went wrong</h4>
              <p className="text-text-secondary max-w-md mb-8">
                We couldn't send your request right now. Please try again, or reach us directly on WhatsApp.
              </p>
              <button
                onClick={() => setIsError(false)}
                className="px-8 py-3.5 rounded-full font-display font-bold text-white bg-primary hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                Try Again
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
                    Full Name <span className="text-volt">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Rahul Das"
                    className="w-full px-4 py-3 rounded-xl border border-slate-border bg-slate-dark text-black-100 placeholder-text-muted focus:outline-none focus:border-volt transition-colors"
                  />
                </div>
 
                {/* Company Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Farmigo Corp"
                    className="w-full px-4 py-3 rounded-xl border border-slate-border bg-slate-dark text-black-100 placeholder-text-muted focus:outline-none focus:border-volt transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
                    Email Address <span className="text-volt">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="rahul@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-border bg-slate-dark text-black-100 placeholder-text-muted focus:outline-none focus:border-volt transition-colors"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
                    Phone Number <span className="text-volt">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-3 rounded-xl border border-slate-border bg-slate-dark text-black-100 placeholder-text-muted focus:outline-none focus:border-volt transition-colors"
                  />
                </div>

                {/* Service Interested In */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
                    Service Interested In <span className="text-volt">*</span>
                  </label>
                  <select
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-border bg-slate-dark text-black-100 focus:outline-none focus:border-volt transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="text-text-muted">Select a service</option>
                    {servicesList.map((service, index) => (
                      <option key={index} value={service} className="bg-slate-dark text-black-100">
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Date */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-volt" /> Preferred Date <span className="text-volt">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-border bg-slate-dark text-black-100 focus:outline-none focus:border-volt transition-colors cursor-pointer"
                  />
                </div>
 
                {/* Preferred Time */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-volt" /> Preferred Time <span className="text-volt">*</span>
                  </label>
                  <input
                    type="time"
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-border bg-slate-dark text-black-100 focus:outline-none focus:border-volt transition-colors cursor-pointer"
                  />
                </div>

                {/* Message */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
                    Message / Project Brief
                  </label>
                  <textarea
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us briefly about your goals..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-border bg-slate-dark text-black-100 placeholder-text-muted focus:outline-none focus:border-volt transition-colors resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-4 pt-4 border-t border-slate-border">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl font-display font-medium text-black-300 hover:text-white hover:bg-slate-border transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-xl font-display font-bold text-obsidian bg-volt hover:bg-volt-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-lg shadow-volt/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-obsidian border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Book Now
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
