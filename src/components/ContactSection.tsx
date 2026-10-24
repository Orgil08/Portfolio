/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Mail,
  Send,
  User,
  MessageSquare,
  FileText,
  MapPin,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Phone,
  HelpCircle,
  Clock,
  X,
  CheckCircle2,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import {
  ContactFormState,
  validateContactForm,
  validateContactField,
  ValidationResult,
  CONTACT_AVAILABILITY,
} from '../utils/portfolio.ts';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [touched, setTouched] = useState<Record<keyof ContactFormState, boolean>>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const [validation, setValidation] = useState<ValidationResult>({
    isValid: true,
    errors: {},
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsAvailabilityOpen(false);
      }
    };
    if (isAvailabilityOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAvailabilityOpen]);

  const handleBlur = (field: keyof ContactFormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateContactField(field, formData[field]);
    setValidation((prev) => ({
      ...prev,
      errors: {
        ...prev.errors,
        [field]: error || undefined,
      },
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof ContactFormState;
    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    // If the field was already touched or currently has an error, validate live
    if (touched[fieldName] || validation.errors[fieldName]) {
      const error = validateContactField(fieldName, value);
      setValidation((prev) => ({
        ...prev,
        errors: {
          ...prev.errors,
          [fieldName]: error || undefined,
        },
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttemptedSubmit(true);
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    const result = validateContactForm(formData);
    setValidation(result);

    if (!result.isValid) {
      return;
    }

    setIsSubmitting(true);

    // Simulate async submission workflow with instant feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccessfully(true);
      setAttemptedSubmit(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setTouched({
        name: false,
        email: false,
        subject: false,
        message: false,
      });
    }, 600);
  };

  return (
    <section id="contact" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/20 text-purple-300 text-xs font-mono uppercase tracking-wider mb-3">
            <span>Хамтран ажиллах</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Холбоо барих
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Шинэ веб төсөл, дижитал систем бүтээх, UI/UX дизайн болон хамтын ажиллагааны талаар санал хүсэлтээ илгээнэ үү.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contacts & Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0c0e1a] border border-purple-500/20 shadow-xl space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Надтай холбогдох</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Та доорх сувгуудаар шууд холбогдож эсвэл хажуугийн маягтыг бөглөн зурвас илгээх боломжтой.
                </p>
              </div>

              <div className="space-y-4">
                {/* Email */}
                <a
                  href={`mailto:${PERSONAL_INFO.contacts.email}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-purple-900/40 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono uppercase text-slate-400 block">
                      И-мэйл хаяг
                    </span>
                    <span className="text-sm font-semibold text-slate-100 group-hover:text-purple-300 transition-colors break-all">
                      {PERSONAL_INFO.contacts.email}
                    </span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="w-11 h-11 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-slate-400 block">
                      Байршил
                    </span>
                    <span className="text-sm font-semibold text-slate-100">
                      {PERSONAL_INFO.contacts.location}
                    </span>
                  </div>
                </div>

                {/* Status / Availability with interactive Help Tooltip */}
                <div
                  ref={tooltipRef}
                  className="relative p-3.5 rounded-2xl bg-purple-950/30 border border-purple-500/20 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                    <span className="text-xs text-purple-200 truncate">
                      Хамтын ажиллагааны саналуудад нээлттэй.
                    </span>
                  </div>

                  {/* Small Help Tooltip Trigger */}
                  <div className="relative shrink-0 group/avail">
                    <button
                      type="button"
                      onClick={() => setIsAvailabilityOpen((prev) => !prev)}
                      aria-label="Холбогдох цагийн хуваарийн мэдээлэл харах"
                      aria-expanded={isAvailabilityOpen}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-900/40 hover:bg-purple-800/60 border border-purple-500/30 text-purple-300 hover:text-white transition-all text-[11px] group focus:outline-none focus:ring-1 focus:ring-purple-400"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-purple-400 group-hover:text-cyan-300 transition-colors" />
                      <span className="font-medium text-[11px]">Хуваарь</span>
                    </button>

                    {/* Popover Tooltip explaining preferred contact hours in Mongolian */}
                    <div
                      role="tooltip"
                      className={`absolute right-0 bottom-full mb-2.5 w-72 sm:w-80 p-4 rounded-2xl bg-[#0f1122] border border-purple-500/40 shadow-2xl shadow-purple-950/90 z-40 backdrop-blur-xl text-left transition-all duration-200 ${
                        isAvailabilityOpen
                          ? 'opacity-100 scale-100 pointer-events-auto visible'
                          : 'opacity-0 scale-95 pointer-events-none invisible group-hover/avail:opacity-100 group-hover/avail:scale-100 group-hover/avail:pointer-events-auto group-hover/avail:visible'
                      }`}
                    >
                        {/* Tooltip Header */}
                        <div className="flex items-center justify-between pb-2 mb-3 border-b border-purple-500/20">
                          <div className="flex items-center gap-1.5 text-purple-200 font-semibold text-xs font-heading">
                            <Clock className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Холбогдох тааламжтай цаг</span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsAvailabilityOpen(false);
                            }}
                            className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-white/5 transition-colors"
                            aria-label="Хаах"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Availability Content */}
                        <div className="space-y-2.5 text-xs">
                          <div>
                            <span className="text-slate-400 block text-[11px]">Ажлын өдрүүдэд:</span>
                            <span className="font-semibold text-slate-100 block">
                              {CONTACT_AVAILABILITY.workDays}: {CONTACT_AVAILABILITY.hours}
                            </span>
                            <span className="text-[11px] text-purple-300 block">
                              ({CONTACT_AVAILABILITY.timezone})
                            </span>
                          </div>

                          <div className="pt-2 border-t border-white/5">
                            <span className="text-slate-400 block text-[11px]">Хариу өгөх хугацаа:</span>
                            <span className="text-slate-200 block">
                              {CONTACT_AVAILABILITY.responseTime}
                            </span>
                          </div>

                          <div className="pt-2 border-t border-white/5">
                            <span className="text-slate-400 block text-[11px]">Шуурхай холбоо:</span>
                            <span className="text-slate-200 block">
                              Яаралтай төсөл, саналаар {CONTACT_AVAILABILITY.urgentChannel}-аар шууд хандах боломжтой.
                            </span>
                          </div>
                        </div>

                        {/* Caret arrow */}
                        <div className="absolute right-5 -bottom-1.5 w-3 h-3 bg-[#0f1122] border-r border-b border-purple-500/40 rotate-45 pointer-events-none" />
                      </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-purple-500/15">
                <span className="text-xs font-mono uppercase text-slate-400 block mb-3">
                  Сошиал & Хөгжүүлэгчийн сувгууд
                </span>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={PERSONAL_INFO.contacts.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-medium rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                  <a
                    href={PERSONAL_INFO.contacts.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-medium rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <span>Telegram</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                  <a
                    href={PERSONAL_INFO.contacts.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-medium rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0c0e1a] border border-purple-500/20 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-2">Зурвас илгээх</h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6">
                Маягтыг бөглөн илгээснээр таны хүсэлт миний хувийн мэйл хаягт шууд хүргэгдэх болно.
              </p>

              {submittedSuccessfully ? (
                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-3 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white font-heading">Амжилттай илгээгдлээ!</h4>
                  <p className="text-xs sm:text-sm text-emerald-200 max-w-md mx-auto leading-relaxed">
                    Баярлалаа. Таны зурвас амжилттай хүлээн авагдлаа. Би тантай тун удахгүй холбогдох болно.
                  </p>
                  <button
                    onClick={() => {
                      setSubmittedSuccessfully(false);
                      setAttemptedSubmit(false);
                    }}
                    className="mt-2 px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors shadow-sm"
                  >
                    Өөр зурвас илгээх
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Top Validation Alert if submit attempted with errors */}
                  {attemptedSubmit && !validation.isValid && (
                    <div
                      role="alert"
                      className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2.5 animate-in fade-in"
                    >
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>
                        Маягтын зарим талбар дутуу эсвэл буруу бөглөгдсөн байна. Улаанаар тэмдэглэгдсэн хэсгүүдийг шалгана уу.
                      </span>
                    </div>
                  )}

                  {/* Name Field */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold text-slate-300"
                      >
                        Нэр <span className="text-purple-400">*</span>
                      </label>
                      {touched.name && !validation.errors.name && formData.name.trim() && (
                        <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Зөв</span>
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={() => handleBlur('name')}
                        aria-invalid={!!(touched.name && validation.errors.name)}
                        aria-describedby={
                          validation.errors.name ? 'contact-name-error' : undefined
                        }
                        placeholder="Таны нэр"
                        className={`w-full px-4 py-3 text-sm rounded-xl border text-white placeholder-slate-500 focus:outline-none transition-all ${
                          touched.name && validation.errors.name
                            ? 'bg-rose-950/15 border-rose-500/70 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/40'
                            : touched.name && formData.name.trim()
                            ? 'bg-white/5 border-emerald-500/40 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/40'
                            : 'bg-white/5 border-white/10 focus:border-purple-400 focus:ring-1 focus:ring-purple-400'
                        }`}
                      />
                    </div>
                    {touched.name && validation.errors.name && (
                      <p
                        id="contact-name-error"
                        role="alert"
                        className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5 font-medium animate-in fade-in"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{validation.errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold text-slate-300"
                      >
                        И-мэйл <span className="text-purple-400">*</span>
                      </label>
                      {touched.email && !validation.errors.email && formData.email.trim() && (
                        <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Зөв формат</span>
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={() => handleBlur('email')}
                        aria-invalid={!!(touched.email && validation.errors.email)}
                        aria-describedby={
                          validation.errors.email ? 'contact-email-error' : undefined
                        }
                        placeholder="жишээ: yourname@example.com"
                        className={`w-full px-4 py-3 text-sm rounded-xl border text-white placeholder-slate-500 focus:outline-none transition-all ${
                          touched.email && validation.errors.email
                            ? 'bg-rose-950/15 border-rose-500/70 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/40'
                            : touched.email && formData.email.trim()
                            ? 'bg-white/5 border-emerald-500/40 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/40'
                            : 'bg-white/5 border-white/10 focus:border-purple-400 focus:ring-1 focus:ring-purple-400'
                        }`}
                      />
                    </div>
                    {touched.email && validation.errors.email && (
                      <p
                        id="contact-email-error"
                        role="alert"
                        className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5 font-medium animate-in fade-in"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{validation.errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Subject Field */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="contact-subject"
                        className="block text-xs font-semibold text-slate-300"
                      >
                        Гарчиг <span className="text-purple-400">*</span>
                      </label>
                      {touched.subject && !validation.errors.subject && formData.subject.trim() && (
                        <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Зөв</span>
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        id="contact-subject"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={() => handleBlur('subject')}
                        aria-invalid={!!(touched.subject && validation.errors.subject)}
                        aria-describedby={
                          validation.errors.subject ? 'contact-subject-error' : undefined
                        }
                        placeholder="Зурвасын гарчиг"
                        className={`w-full px-4 py-3 text-sm rounded-xl border text-white placeholder-slate-500 focus:outline-none transition-all ${
                          touched.subject && validation.errors.subject
                            ? 'bg-rose-950/15 border-rose-500/70 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/40'
                            : touched.subject && formData.subject.trim()
                            ? 'bg-white/5 border-emerald-500/40 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/40'
                            : 'bg-white/5 border-white/10 focus:border-purple-400 focus:ring-1 focus:ring-purple-400'
                        }`}
                      />
                    </div>
                    {touched.subject && validation.errors.subject && (
                      <p
                        id="contact-subject-error"
                        role="alert"
                        className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5 font-medium animate-in fade-in"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{validation.errors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-semibold text-slate-300"
                      >
                        Зурвас <span className="text-purple-400">*</span>
                      </label>
                      <span
                        className={`text-[11px] font-mono ${
                          formData.message.trim().length >= 10
                            ? 'text-emerald-400'
                            : 'text-slate-400'
                        }`}
                      >
                        {formData.message.trim().length} / 10+ тэмдэгт
                      </span>
                    </div>
                    <div className="relative">
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={() => handleBlur('message')}
                        aria-invalid={!!(touched.message && validation.errors.message)}
                        aria-describedby={
                          validation.errors.message ? 'contact-message-error' : undefined
                        }
                        placeholder="Таны санал, асуулт эсвэл төслийн дэлгэрэнгүй..."
                        className={`w-full px-4 py-3 text-sm rounded-xl border text-white placeholder-slate-500 focus:outline-none transition-all ${
                          touched.message && validation.errors.message
                            ? 'bg-rose-950/15 border-rose-500/70 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/40'
                            : touched.message && formData.message.trim().length >= 10
                            ? 'bg-white/5 border-emerald-500/40 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/40'
                            : 'bg-white/5 border-white/10 focus:border-purple-400 focus:ring-1 focus:ring-purple-400'
                        }`}
                      />
                    </div>
                    {touched.message && validation.errors.message && (
                      <p
                        id="contact-message-error"
                        role="alert"
                        className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5 font-medium animate-in fade-in"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{validation.errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  >
                    <Send className={`w-4 h-4 ${isSubmitting ? 'animate-spin' : ''}`} />
                    <span>{isSubmitting ? 'Илгээж байна...' : 'Илгээх'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
