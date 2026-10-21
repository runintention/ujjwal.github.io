import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Building2, 
  Instagram, 
  Globe 
} from 'lucide-react';
import { ProjectInquiryData } from '../types';

interface BookingSystemProps {
  initialEmail?: string;
}

export const BookingSystem: React.FC<BookingSystemProps> = ({ initialEmail = '' }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Form details matching ProjectInquiryData
  const [formData, setFormData] = useState<ProjectInquiryData>({
    fullName: '',
    phoneNumber: '',
    email: initialEmail,
    city: '',
    businessCategory: 'Aesthetics & MedSpa',
    instagramHandle: '',
    website: '',
  } as unknown as ProjectInquiryData & { phoneNumber?: string; phone: string });

  // Sync initialEmail if it changes
  useEffect(() => {
    if (initialEmail) {
      setFormData(prev => ({ ...prev, email: initialEmail }));
    }
  }, [initialEmail]);

  // Listen for custom trigger to open audit modal from any button on page
  useEffect(() => {
    const handleTrigger = () => setIsModalOpen(true);
    window.addEventListener('open-audit-modal', handleTrigger);
    return () => window.removeEventListener('open-audit-modal', handleTrigger);
  }, []);

  // Close on Escape key and freeze background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate brief request processing
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  const handleResetModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSubmitted(false);
    }, 300);
  };

  return (
    <>
      {/* Target element: section#booking matching cliniquegrowth.ca */}
      <section id="booking" className="py-20 lg:pt-32 lg:pb-3 px-6 md:px-12 bg-transparent anchor-section">
        <div className="max-w-4xl mx-auto md:max-w-3xl lg:max-w-4xl text-center pointer-events-auto scroll-reveal">
          <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-12 text-slate-900 tracking-tighter uppercase text-center heading-serif">
            Ready to Start?
          </h2>

          <div className="reflection-container glass-light p-8 sm:p-14 rounded-[2rem] sm:rounded-[3rem] mb-12 md:mx-6 lg:mx-0 flex flex-col items-center justify-center">
            <p className="text-emerald-900 font-black text-base lg:text-lg mb-8 text-center max-w-xl">
              We take on 3 new clients per month for absolute quality.
            </p>

            {/* Only keep Claim Your Audit button as requested */}
            <div className="flex justify-center w-full">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 sm:px-14 py-4 sm:py-5 rounded-2xl font-black text-base sm:text-lg transition-all btn-pop shadow-xl hover:shadow-emerald-500/25 flex items-center justify-center gap-3 cursor-pointer group hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Claim Your Audit</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Small modal window blurring rest of website with glass effect */}
      {isModalOpen && (
        <div 
          id="audit-modal" 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          {/* 1st child: Backdrop blurring the rest of the website */}
          <div 
            className="absolute inset-0 bg-slate-950/45 backdrop-blur-xl transition-opacity animate-in fade-in duration-300" 
            onClick={handleResetModal}
          />

          {/* 2nd child: Glass modal container matching CSS selector: div#audit-modal > div:nth-of-type(2) */}
          <div className="relative glass-light bg-white/95 backdrop-blur-2xl max-w-xl w-full p-6 sm:p-8 lg:p-10 rounded-[2.5rem] shadow-2xl border border-white/80 z-10 animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
            {/* Close Button */}
            <button
              type="button"
              onClick={handleResetModal}
              className="absolute top-5 right-5 w-10 h-10 bg-slate-900/90 rounded-full flex items-center justify-center text-white hover:bg-emerald-600 transition-all shadow-xl z-50 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div>
                {/* Modal Header */}
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="w-12 h-12 bg-emerald-500/15 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 border border-emerald-500/25">
                    <Sparkles className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase heading-serif">
                      Claim Your Audit
                    </h3>
                    <p className="text-xs font-semibold text-slate-500">
                      Tailored growth roadmap & positioning breakdown
                    </p>
                  </div>
                </div>

                {/* Audit Form with exact requested fields */}
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  {/* Full Name & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Full Name *</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        placeholder="Dr. Julian Vance"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300/80 bg-white/90 text-xs font-semibold text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Phone Number *</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+1 (613) 555-0199"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300/80 bg-white/90 text-xs font-semibold text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* Email Address & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Email Address *</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="doctor@vanceclinic.ca"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300/80 bg-white/90 text-xs font-semibold text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        <span>City *</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        placeholder="e.g. Toronto, ON"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300/80 bg-white/90 text-xs font-semibold text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* Business Category & Instagram Handle */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Business Category *</span>
                      </label>
                      <select
                        name="businessCategory"
                        value={formData.businessCategory}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300/80 bg-white/90 text-xs font-semibold text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-sm transition-all"
                      >
                        <option value="Aesthetics & MedSpa">Aesthetics & MedSpa</option>
                        <option value="Cosmetic & Implant Dentistry">Cosmetic & Implant Dentistry</option>
                        <option value="Plastic & Facial Surgery">Plastic & Facial Surgery</option>
                        <option value="Dermatology">Dermatology</option>
                        <option value="Hair Restoration">Hair Restoration</option>
                        <option value="Wellness & Longevity">Wellness & Longevity</option>
                        <option value="Other High-Ticket Practice">Other High-Ticket Practice</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <Instagram className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Instagram Handle *</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">
                          @
                        </span>
                        <input
                          type="text"
                          name="instagramHandle"
                          required
                          placeholder="vanceclinic"
                          value={formData.instagramHandle.replace(/^@/, '')}
                          onChange={(e) => {
                            const val = e.target.value.replace(/^@/, '');
                            setFormData(prev => ({ ...prev, instagramHandle: val ? `@${val}` : '' }));
                          }}
                          className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300/80 bg-white/90 text-xs font-semibold text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-sm transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Website (Optional) */}
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Website <span className="text-slate-400 font-normal lowercase">(optional)</span></span>
                    </label>
                    <input
                      type="text"
                      name="website"
                      placeholder="https://vanceclinic.ca"
                      value={formData.website || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300/80 bg-white/90 text-xs font-semibold text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-sm transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-6 rounded-2xl font-black text-sm uppercase tracking-wider transition-all btn-pop shadow-lg shadow-emerald-600/25 cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-60"
                    >
                      {submitting ? (
                        <span>Submitting Audit Request...</span>
                      ) : (
                        <>
                          <span>Submit Audit Request</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-semibold text-center pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>100% confidential. No obligation. Strictly 3 clinics/month.</span>
                  </div>
                </form>
              </div>
            ) : (
              /* Success confirmation state - clean, without pre-opened draft emails */
              <div className="py-8 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4 text-emerald-600 shadow-md shadow-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase heading-serif mb-2">
                  Audit Request Received
                </h3>
                <p className="text-slate-600 text-sm font-semibold max-w-sm mx-auto mb-6 leading-relaxed">
                  Thank you, <strong className="text-slate-900">{formData.fullName || 'Doctor'}</strong>. Harry and our senior growth team have received your inquiry for <strong className="text-slate-900">{formData.city || 'your clinic'}</strong> ({formData.instagramHandle || 'Instagram'}). We will review your digital positioning and reach out within 4 hours.
                </p>

                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={handleResetModal}
                    className="bg-slate-900 hover:bg-slate-800 text-white px-10 py-3 rounded-xl font-bold text-xs uppercase tracking-wider btn-pop cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
