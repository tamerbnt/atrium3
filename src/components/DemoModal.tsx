import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Calendar,
  Building2,
  Phone,
  User,
  Clock,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Language } from '../content/copy';
import { useLenis } from './SmoothScroll';
import { AtriumBrandLogo } from './AtriumBrandLogo';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export default function DemoModal({ isOpen, onClose, lang }: DemoModalProps) {
  const { stop, start } = useLenis();
  const [businessType, setBusinessType] = useState('memberships');
  const [businessName, setBusinessName] = useState('');
  const [city, setCity] = useState('Algiers');
  const [phone, setPhone] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('asap');
  const [submitted, setSubmitted] = useState(false);

  // Lock and restore smooth scroll
  useEffect(() => {
    if (isOpen) {
      stop();
    } else {
      start();
    }
    return () => {
      start();
    };
  }, [isOpen, stop, start]);

  // Handle ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const isRTL = lang === 'ar';

  const verticals = [
    {
      id: 'memberships',
      label:
        lang === 'ar'
          ? 'الاشتراكات والحصص'
          : lang === 'fr'
          ? 'Abonnements & Séances'
          : 'Memberships & Passes',
      sub:
        lang === 'ar'
          ? 'نوادي وقاعات رياضة'
          : lang === 'fr'
          ? 'Gyms & Clubs'
          : 'Gyms & Academies',
    },
    {
      id: 'appointments',
      label:
        lang === 'ar'
          ? 'المواعيد والعناية'
          : lang === 'fr'
          ? 'Soins & Rendez-vous'
          : 'Appointments & Care',
      sub:
        lang === 'ar'
          ? 'صالونات وعيادات'
          : lang === 'fr'
          ? 'Salons & Spas'
          : 'Salons & Clinics',
    },
    {
      id: 'orders',
      label:
        lang === 'ar'
          ? 'الطلبات والمخزون'
          : lang === 'fr'
          ? 'Commandes & Stock'
          : 'Orders & Inventory',
      sub:
        lang === 'ar'
          ? 'مطاعم ومقاهي ومحلات'
          : lang === 'fr'
          ? 'Food & Retail'
          : 'Food & Boutiques',
    },
    {
      id: 'projects',
      label:
        lang === 'ar'
          ? 'المشاريع والاستوديوهات'
          : lang === 'fr'
          ? 'Projets & Forfaits'
          : 'Projects & Retainers',
      sub:
        lang === 'ar'
          ? 'مكاتب واستشارات'
          : lang === 'fr'
          ? 'Agences & Design'
          : 'Agencies & Studios',
    },
    {
      id: 'rentals',
      label:
        lang === 'ar'
          ? 'المساحات والإيجار'
          : lang === 'fr'
          ? 'Espaces & Réservations'
          : 'Spaces & Assets',
      sub:
        lang === 'ar'
          ? 'قاعات وعتاد مشترك'
          : lang === 'fr'
          ? 'Coworking & Studios'
          : 'Venues & Equipment',
    },
    {
      id: 'education',
      label:
        lang === 'ar'
          ? 'المدارس والتدريب'
          : lang === 'fr'
          ? 'Écoles & Formations'
          : 'Schools & Academies',
      sub:
        lang === 'ar'
          ? 'معاهد ومراكز تعليم'
          : lang === 'fr'
          ? 'Instituts & Ateliers'
          : 'Institutes & Bootcamps',
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      dir={isRTL ? 'rtl' : 'ltr'}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-stone-950/95 border border-white/[0.12] rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.1)] text-stone-200 overflow-hidden">
        {/* Ambient Terracotta Glow anchored to upper corner */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#b85438]/15 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#b85438]/08 rounded-full blur-[80px] pointer-events-none" />

        {/* Modal Top Header Bar */}
        <div className="relative z-10 flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/[0.08] shrink-0">
          <AtriumBrandLogo size={24} showText={true} />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] transition cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="relative z-10 overflow-y-auto custom-scrollbar px-6 py-6 sm:px-8 space-y-6">
          {!submitted ? (
            <div>
              {/* Architectural Eyebrow (No pill box) */}
              <div className="flex items-center gap-2 text-[11px] font-mono text-[#e06b48] tracking-widest uppercase mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b85438] animate-pulse" />
                <span>
                  {lang === 'ar'
                    ? 'جلسة استعراض حي • 15 دقيقة بدون التزام'
                    : lang === 'fr'
                    ? 'Démonstration en direct • 15 min sans engagement'
                    : 'Live Walkthrough • 15 Minutes Direct Engineer Session'}
                </span>
              </div>

              {/* Modal Headline */}
              <h2
                id="modal-headline"
                className="text-2xl sm:text-3xl font-editorial font-extrabold text-stone-100 tracking-tight leading-tight mb-2"
              >
                {lang === 'ar'
                  ? 'شاهد أتريوم مهيأً تماماً لنموذج عملك'
                  : lang === 'fr'
                  ? 'Découvrez Atrium configuré pour votre métier'
                  : 'See Atrium configured for your specific operations.'}
              </h2>

              {/* Subheadline */}
              <p className="text-xs sm:text-sm text-stone-400 font-sans leading-relaxed max-w-xl mb-6">
                {lang === 'ar'
                  ? 'جلسة مباشرة عبر مشاركة الشاشة أو واتساب. سنستعرض معك مزامنة المبيعات الحية، إدارة الطاقم، والصلاحيات الخاصة بقطاعك التجاري.'
                  : lang === 'fr'
                  ? 'Une session personnalisée de 15 minutes en direct. Nous vous montrons la synchronisation caisse, la gestion d’équipe et la clarté multi-succursales adaptées à votre commerce.'
                  : 'A 15-minute live screen share walkthrough tailored to your trade. We demonstrate offline resilience, live register sync, and multi-branch clarity for your exact setup.'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Vertical Category Selector */}
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 mb-2">
                    <span className="font-semibold text-stone-300">
                      {lang === 'ar'
                        ? 'اختر قطاع نشاطك (6 قطاعات أساسية)'
                        : lang === 'fr'
                        ? 'Secteur d’activité (6 catégories)'
                        : 'Select Your Trade (6 Core Categories)'}
                    </span>
                    <span className="text-stone-500">
                      {lang === 'ar' ? 'نموذج مخصص' : lang === 'fr' ? 'Profil dédié' : 'Tailored UI'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {verticals.map((item) => {
                      const isSelected = businessType === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setBusinessType(item.id)}
                          className={`group relative p-3 rounded-xl border text-left rtl:text-right transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-[#b85438]/15 border-[#b85438]/70 text-white shadow-[0_4px_16px_rgba(184,84,56,0.2)]'
                              : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/[0.08] hover:border-white/[0.14] text-stone-400'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full mb-1">
                            <span
                              className={`font-semibold text-xs transition leading-tight ${
                                isSelected ? 'text-white' : 'text-stone-300 group-hover:text-stone-100'
                              }`}
                            >
                              {item.label}
                            </span>
                            <span
                              className={`w-2 h-2 rounded-full transition shrink-0 ${
                                isSelected ? 'bg-[#b85438]' : 'bg-white/10 group-hover:bg-white/20'
                              }`}
                            />
                          </div>
                          <span className="text-[10px] font-mono text-stone-500 group-hover:text-stone-400">
                            {item.sub}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name & Establishment inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-mono text-stone-400 mb-1.5 font-medium">
                      {lang === 'ar' ? 'اسم صاحب العمل / المسؤول' : lang === 'fr' ? 'Votre nom complet' : 'Your Full Name'}
                    </label>
                    <div className="relative flex items-center bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.08] focus-within:border-[#b85438] focus-within:ring-1 focus-within:ring-[#b85438]/40 rounded-xl transition duration-200">
                      <User className="w-4 h-4 text-stone-500 absolute left-3.5 rtl:left-auto rtl:right-3.5 pointer-events-none" />
                      <input
                        type="text"
                        required
                        placeholder={lang === 'ar' ? 'مثال: كريم بن علي' : lang === 'fr' ? 'ex. Karim Benali' : 'e.g. Karim Benali'}
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        className="w-full bg-transparent pl-10 rtl:pl-3.5 rtl:pr-10 pr-3.5 py-2.5 text-xs text-stone-100 placeholder:text-stone-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-stone-400 mb-1.5 font-medium">
                      {lang === 'ar' ? 'اسم المؤسسة / النشاط' : lang === 'fr' ? 'Nom de l’établissement' : 'Business Name'}
                    </label>
                    <div className="relative flex items-center bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.08] focus-within:border-[#b85438] focus-within:ring-1 focus-within:ring-[#b85438]/40 rounded-xl transition duration-200">
                      <Building2 className="w-4 h-4 text-stone-500 absolute left-3.5 rtl:left-auto rtl:right-3.5 pointer-events-none" />
                      <input
                        type="text"
                        required
                        placeholder={lang === 'ar' ? 'مثال: نادي الأطلس الرياضي' : lang === 'fr' ? 'ex. Atlas Fitness Club' : 'e.g. Atlas Performance Club'}
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full bg-transparent pl-10 rtl:pl-3.5 rtl:pr-10 pr-3.5 py-2.5 text-xs text-stone-100 placeholder:text-stone-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Phone & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-mono text-stone-400 mb-1.5 font-medium">
                      {lang === 'ar' ? 'رقم الهاتف / واتساب للتواصل' : lang === 'fr' ? 'Numéro de téléphone / WhatsApp' : 'Phone / WhatsApp'}
                    </label>
                    <div className="relative flex items-center bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.08] focus-within:border-[#b85438] focus-within:ring-1 focus-within:ring-[#b85438]/40 rounded-xl transition duration-200">
                      <Phone className="w-4 h-4 text-stone-500 absolute left-3.5 rtl:left-auto rtl:right-3.5 pointer-events-none" />
                      <input
                        type="tel"
                        required
                        placeholder="0550 00 00 00"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-transparent pl-10 rtl:pl-3.5 rtl:pr-10 pr-3.5 py-2.5 text-xs text-stone-100 placeholder:text-stone-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-stone-400 mb-1.5 font-medium">
                      {lang === 'ar' ? 'المدينة / المنطقة' : lang === 'fr' ? 'Ville d’implantation' : 'City / Location'}
                    </label>
                    <div className="relative flex items-center bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.08] focus-within:border-[#b85438] focus-within:ring-1 focus-within:ring-[#b85438]/40 rounded-xl transition duration-200">
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-transparent px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none cursor-pointer"
                      >
                        <option value="Algiers" className="bg-stone-900 text-stone-100">
                          {lang === 'ar' ? 'الجزائر العاصمة' : 'Algiers (Alger)'}
                        </option>
                        <option value="Oran" className="bg-stone-900 text-stone-100">
                          {lang === 'ar' ? 'وهران' : 'Oran'}
                        </option>
                        <option value="Constantine" className="bg-stone-900 text-stone-100">
                          {lang === 'ar' ? 'قسنطينة' : 'Constantine'}
                        </option>
                        <option value="Sétif" className="bg-stone-900 text-stone-100">
                          {lang === 'ar' ? 'سطيف' : 'Sétif'}
                        </option>
                        <option value="Blida" className="bg-stone-900 text-stone-100">
                          {lang === 'ar' ? 'البليدة' : 'Blida'}
                        </option>
                        <option value="Annaba" className="bg-stone-900 text-stone-100">
                          {lang === 'ar' ? 'عنابة' : 'Annaba'}
                        </option>
                        <option value="Tlemcen" className="bg-stone-900 text-stone-100">
                          {lang === 'ar' ? 'تلمسان' : 'Tlemcen'}
                        </option>
                        <option value="Other" className="bg-stone-900 text-stone-100">
                          {lang === 'ar' ? 'منطقة أخرى / الشرق الأوسط وشمال أفريقيا' : 'Other MENA Location'}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Preferred time slot segmented picker */}
                <div>
                  <label className="block text-[11px] font-mono text-stone-400 mb-1.5 font-medium">
                    {lang === 'ar' ? 'التوقيت المفضل لجلسة الاستعراض' : lang === 'fr' ? 'Créneau souhaité pour la démo' : 'Preferred Walkthrough Window'}
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {[
                      {
                        id: 'asap',
                        label: lang === 'ar' ? 'اليوم (في أقرب وقت)' : lang === 'fr' ? 'Aujourd’hui (au plus vite)' : 'Today (ASAP)',
                      },
                      {
                        id: 'tomorrow',
                        label: lang === 'ar' ? 'غداً صباحاً' : lang === 'fr' ? 'Demain matin' : 'Tomorrow Morning',
                      },
                      {
                        id: 'flexible',
                        label: lang === 'ar' ? 'خلال هذا الأسبوع' : lang === 'fr' ? 'Cette semaine' : 'Later this week',
                      },
                    ].map((slot) => (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setPreferredSlot(slot.id)}
                        className={`py-2 px-2.5 rounded-lg border text-center transition cursor-pointer text-[11px] font-medium ${
                          preferredSlot === slot.id
                            ? 'bg-white/[0.1] border-white/[0.3] text-white'
                            : 'bg-white/[0.02] border-white/[0.06] text-stone-400 hover:text-stone-200 hover:border-white/[0.12]'
                        }`}
                      >
                        {slot.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-full bg-[#b85438] hover:bg-[#a04830] text-white font-medium text-xs tracking-wider uppercase transition-all duration-200 shadow-lg shadow-[#b85438]/25 cursor-pointer flex items-center justify-center gap-2 group"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>
                      {lang === 'ar'
                        ? 'تأكيد حجز الاستعراض (15 دقيقة)'
                        : lang === 'fr'
                        ? 'Confirmer la Démo Live (15 min)'
                        : 'Confirm 15-Minute Walkthrough'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition" />
                  </button>
                </div>

                {/* Assurance footers */}
                <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 pt-1">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#e06b48]" />
                    <span>
                      {lang === 'ar'
                        ? 'بدون بطاقة ائتمانية'
                        : lang === 'fr'
                        ? 'Sans carte bancaire'
                        : 'Zero card required'}
                    </span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-stone-400" />
                    <span>
                      {lang === 'ar'
                        ? 'تأكيد مباشر عبر واتساب'
                        : lang === 'fr'
                        ? 'Confirmation WhatsApp'
                        : 'WhatsApp direct link'}
                    </span>
                  </span>
                </div>
              </form>
            </div>
          ) : (
            /* Pristine Confirmation Screen */
            <div className="py-6 text-center space-y-5">
              <div className="w-14 h-14 bg-[#b85438]/15 border border-[#b85438]/40 text-[#e06b48] rounded-full flex items-center justify-center mx-auto shadow-[0_0_24px_rgba(184,84,56,0.3)]">
                <CheckCircle2 className="w-7 h-7 text-[#e06b48]" />
              </div>

              <div>
                <div className="inline-flex items-center gap-2 text-[11px] font-mono text-[#e06b48] tracking-widest uppercase mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b85438]" />
                  <span>
                    {lang === 'ar' ? 'تم تأكيد موعد الجلسة' : lang === 'fr' ? 'Session confirmée' : 'Walkthrough Confirmed'}
                  </span>
                </div>
                <h3 className="text-2xl font-editorial text-stone-100 font-bold">
                  {lang === 'ar'
                    ? 'شكراً لك، سنلتقي في الموعد المحدد'
                    : lang === 'fr'
                    ? 'Votre session de 15 min est réservée'
                    : 'Your 15-minute walkthrough is confirmed.'}
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] max-w-md mx-auto text-left rtl:text-right text-xs space-y-2 text-stone-300">
                <div className="flex items-center justify-between text-stone-400 text-[11px] font-mono pb-2 border-b border-white/[0.06]">
                  <span>{lang === 'ar' ? 'تفاصيل الحجز' : lang === 'fr' ? 'Récapitulatif' : 'Session Details'}</span>
                  <span className="text-[#e06b48] font-semibold">{businessName || 'Atrium Profile'}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-300">
                  <Clock className="w-3.5 h-3.5 text-[#e06b48] shrink-0" />
                  <span>
                    {lang === 'ar'
                      ? `سيتواصل معك مهندس متخصص عبر واتساب على الرقم (${phone})`
                      : lang === 'fr'
                      ? `Un ingénieur va vous écrire sur WhatsApp au (${phone})`
                      : `A systems engineer will ping you directly on WhatsApp at (${phone})`}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-stone-400">
                  <Building2 className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                  <span>
                    {lang === 'ar'
                      ? `إعداد مساحة العرض الخاصة بقطاع ${verticals.find((v) => v.id === businessType)?.label}`
                      : lang === 'fr'
                      ? `Configuration démo pour le secteur ${verticals.find((v) => v.id === businessType)?.label}`
                      : `Preparing environment for ${verticals.find((v) => v.id === businessType)?.label}`}
                  </span>
                </div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.1] text-stone-200 text-xs font-mono transition cursor-pointer"
                >
                  {lang === 'ar' ? 'العودة للموقع' : lang === 'fr' ? 'Retour au site' : 'Return to Website'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
