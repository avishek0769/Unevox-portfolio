import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function CustomizePackageModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    industry: [],
    service: [],
    requirements: '',
    formType: "lead"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const industryOptions = [
    'Restaurant / Café',
    'Real Estate',
    'Sports',
    'Events',
    'Retail / E-commerce',
    'Corporate',
    'Personal Brand',
    'Other'
  ];

  const needOptions = [
    'Social Media Management',
    'Digital Marketing',
    'Branding & Design',
    'Video Production & Editing',
    'Photography',
    'PR & Media',
    'Event Management',
    'Sports Marketing',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (category, value) => {
    setFormData((prev) => {
      const currentList = prev[category];
      const newList = currentList.includes(value)
        ? currentList.filter((item) => item !== value)
        : [...currentList, value];
      return { ...prev, [category]: newList };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate checkbox groups
    if (formData.industry.length === 0) {
      alert('Please select at least one Industry / Business Type.');
      return;
    }
    if (formData.service.length === 0) {
      alert('Please select at least one service you need.');
      return;
    }

    setIsSubmitting(true);
    setIsError(false);

    try {
      // Convert arrays to comma-separated strings for the Google Sheet payload
      const payload = {
        ...formData,
        industry: formData.industry.join(', '),
        service: formData.service.join(', ')
      };

      await fetch(
        'https://script.google.com/macros/s/AKfycbw00qiqQIiympVbhhBjTxtxvqvV6-Ef6WyKO9Xh4G6lzpcGyHOLf2blwHtemaFZaMVQ6g/exec',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      );
      // Clear form and show success
      setFormData({
        name: '',
        company: '',
        phone: '',
        email: '',
        industry: [],
        service: [],
        requirements: '',
        formType: 'lead'
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
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-[#e2dbd3] bg-white shadow-2xl transition-all duration-300 max-h-[95vh] flex flex-col"
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
              <h3 className="font-display text-xl font-bold text-black-100 tracking-tight">Customize Your Package</h3>
              <p className="text-xs text-text-secondary">Get a tailored proposal for your business needs</p>
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
              <h4 className="font-display text-2xl font-bold text-secondary mb-2">Request Received!</h4>
              <p className="text-text-secondary max-w-md mb-8">
                Thank you! We have received your customization preferences. Our team will analyze your requirements and reach out within 24 hours with a custom package proposal.
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
              <h4 className="font-display text-2xl font-bold text-secondary mb-2">Something went wrong</h4>
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

              {/* Short Description */}
              <p className="text-sm text-text-secondary leading-relaxed bg-[#f8f5f2] p-4 rounded-2xl border border-[#e2dbd3] mb-2">
                “Tell us what you’re looking for, and our team will create a package tailored to your business needs.”
              </p>

              {/* Basic Details */}
              <div className="space-y-4">
                <h4 className="font-display font-bold text-sm text-[#072541] uppercase tracking-wider border-b border-[#e2dbd3] pb-2">
                  Basic Details
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                      placeholder="e.g. Rahul Das"
                      className="w-full px-4 py-3 rounded-xl border border-slate-border bg-slate-dark text-black-100 placeholder-text-muted focus:outline-none focus:border-volt transition-colors"
                    />
                  </div>

                  {/* Company / Brand Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
                      Company / Brand Name <span className="text-volt">*</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Unevox Agency"
                      className="w-full px-4 py-3 rounded-xl border border-slate-border bg-slate-dark text-black-100 placeholder-text-muted focus:outline-none focus:border-volt transition-colors"
                    />
                  </div>

                  {/* Phone / WhatsApp Number */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
                      Phone / WhatsApp Number <span className="text-volt">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 86172 28753"
                      className="w-full px-4 py-3 rounded-xl border border-slate-border bg-slate-dark text-black-100 placeholder-text-muted focus:outline-none focus:border-volt transition-colors"
                    />
                  </div>

                  {/* Email Address */}
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
                      placeholder="e.g. rahul@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-border bg-slate-dark text-black-100 placeholder-text-muted focus:outline-none focus:border-volt transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Industry / Business Type Checklist */}
              <div className="space-y-3">
                <h4 className="font-display font-bold text-sm text-[#072541] uppercase tracking-wider border-b border-[#e2dbd3] pb-2">
                  Industry / Business Type <span className="text-volt">*</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {industryOptions.map((option) => (
                    <label
                      key={option}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${formData.industry.includes(option)
                        ? 'border-[#e95f0c] bg-[#e95f0c]/5 text-[#e95f0c]'
                        : 'border-[#e2dbd3] hover:border-[#e95f0c]/50 text-text-secondary'
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.industry.includes(option)}
                        onChange={() => handleCheckboxChange('industry', option)}
                        className="accent-[#e95f0c] w-4 h-4 cursor-pointer"
                      />
                      <span className="text-xs font-semibold">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* What do you need checklist */}
              <div className="space-y-3">
                <h4 className="font-display font-bold text-sm text-[#072541] uppercase tracking-wider border-b border-[#e2dbd3] pb-2">
                  What do you need? <span className="text-volt">*</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {needOptions.map((option) => (
                    <label
                      key={option}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${formData.service.includes(option)
                        ? 'border-[#e95f0c] bg-[#e95f0c]/5 text-[#e95f0c]'
                        : 'border-[#e2dbd3] hover:border-[#e95f0c]/50 text-text-secondary'
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.service.includes(option)}
                        onChange={() => handleCheckboxChange('service', option)}
                        className="accent-[#e95f0c] w-4 h-4 cursor-pointer"
                      />
                      <span className="text-xs font-semibold">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Requirement textarea */}
              <div className="space-y-2">
                <h4 className="font-display font-bold text-sm text-[#072541] uppercase tracking-wider border-b border-[#e2dbd3] pb-2">
                  Tell us about your requirement
                </h4>
                <textarea
                  name="requirements"
                  rows="3"
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="Briefly describe what you need, your goals, or any specific requirements."
                  className="w-full px-4 py-3 rounded-xl border border-slate-border bg-slate-dark text-black-100 placeholder-text-muted focus:outline-none focus:border-volt transition-colors resize-none text-sm"
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-4 border-t border-slate-border">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl font-display font-medium text-[#4a5568] hover:text-[#072541] hover:bg-[#f1ede8] transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-xl font-display font-bold text-white bg-primary hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-lg shadow-primary/20 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Request
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
