import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Calendar, Sparkles, Building2, Phone, User } from 'lucide-react';
import { Language } from '../content/copy';
import { useLenis } from './SmoothScroll';

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
  const [submitted, setSubmitted] = useState(false);

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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const isRTL = lang === 'ar';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="relative w-full max-w-xl bg-[#12141a] border border-stone-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-stone-200 overflow-hidden">
        {/* Subtle terracotta background glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#e06b48]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-100 hover:bg-stone-800/60 rounded-lg transition cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#e06b48] mb-2 uppercase tracking-wider font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#e06b48]" />
              <span>
                {lang === 'ar'
                  ? 'عرض توضيحي موجز لمدة 15 دقيقة'
                  : lang === 'fr'
                  ? 'Démonstration ciblée de 15 minutes'
                  : 'Concise 15-Minute Screen Walkthrough'}
              </span>
            </div>

            <h3 className="text-2xl font-editorial font-bold text-stone-100 mb-2">
              {lang === 'ar'
                ? 'شاهد أتريوم مهيأً تماماً لنشاطك التجاري'
                : lang === 'fr'
                ? 'Voyez Atrium configuré pour votre établissement'
                : 'See Atrium configured for your specific business'}
            </h3>

            <p className="text-xs text-stone-400 mb-6 leading-relaxed">
              {lang === 'ar'
                ? 'سنعرض لك كيف يستبدل أتريوم فوضى دفاتر الورق ورسائل الواتساب بنظام تشغيل موحد على أرض الواقع.'
                : lang === 'fr'
                ? 'Découvrez comment Atrium unifie vos caisses, rendez-vous et stocks pour votre activité spécifique.'
                : 'No generic slide deck. We will show you the exact daily workflow configured for your industry.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-stone-400 mb-1.5 font-medium">
                  {lang === 'ar' ? 'اختر مجال نشاطك (6 قطاعات)' : lang === 'fr' ? 'Secteur d’activité (6 catégories)' : 'Select Your Category (6 Core Verticals)'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {[
                    {
                      id: 'memberships',
                      label: lang === 'ar' ? 'الاشتراكات والحصص' : lang === 'fr' ? 'Abonnements & Cours' : 'Memberships & Classes',
                      sub: lang === 'ar' ? 'نوادي وقاعات رياضة' : lang === 'fr' ? 'Salles & Gyms' : 'Gyms & Academies',
                    },
                    {
                      id: 'appointments',
                      label: lang === 'ar' ? 'المواعيد والعناية' : lang === 'fr' ? 'Soins & RDV' : 'Appointments & Care',
                      sub: lang === 'ar' ? 'صالونات وعيادات' : lang === 'fr' ? 'Salons & Spas' : 'Salons & Clinics',
                    },
                    {
                      id: 'orders',
                      label: lang === 'ar' ? 'الطلبات والمخزون' : lang === 'fr' ? 'Commandes & Stock' : 'Orders & Stock',
                      sub: lang === 'ar' ? 'مطاعم ومحلات' : lang === 'fr' ? 'Restaurants & Cafés' : 'Food & Retail',
                    },
                    {
                      id: 'projects',
                      label: lang === 'ar' ? 'المشاريع والاستوديوهات' : lang === 'fr' ? 'Projets & Studios' : 'Projects & Studios',
                      sub: lang === 'ar' ? 'مكاتب واستشارات' : lang === 'fr' ? 'Agences & Design' : 'Agencies & Firms',
                    },
                    {
                      id: 'rentals',
                      label: lang === 'ar' ? 'المساحات والإيجار' : lang === 'fr' ? 'Espaces & Locations' : 'Spaces & Rentals',
                      sub: lang === 'ar' ? 'قاعات وعتاد' : lang === 'fr' ? 'Coworking & Salles' : 'Venues & Assets',
                    },
                    {
                      id: 'education',
                      label: lang === 'ar' ? 'المدارس والتدريب' : lang === 'fr' ? 'Écoles & Formations' : 'Schools & Training',
                      sub: lang === 'ar' ? 'معاهد ومراكز تعليم' : lang === 'fr' ? 'Instituts & Écoles' : 'Institutes & Academies',
                    },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setBusinessType(item.id)}
                      className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                        businessType === item.id
                          ? 'bg-[#e06b48]/15 border-[#e06b48] text-white shadow-md shadow-[#e06b48]/10'
                          : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                      }`}
                    >
                      <span className="font-semibold text-[11px] leading-tight block mb-1 text-stone-200">
                        {item.label}
                      </span>
                      <span className="text-[10px] font-mono text-stone-500">
                        {item.sub}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-stone-400 mb-1">
                    {lang === 'ar' ? 'اسم صاحب العمل' : lang === 'fr' ? 'Votre nom' : 'Your Name'}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-500 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder={lang === 'ar' ? 'مثال: كريم ب.' : 'e.g. Karim B.'}
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-stone-900/80 border border-stone-800 rounded-lg text-stone-100 placeholder-stone-600 focus:outline-hidden focus:border-[#e06b48]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-400 mb-1">
                    {lang === 'ar' ? 'اسم المحل / المؤسسة' : lang === 'fr' ? 'Nom de l’établissement' : 'Business Name'}
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-stone-500 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder={lang === 'ar' ? 'مثال: أطلس جيم' : 'e.g. Atlas Gym Club'}
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-stone-900/80 border border-stone-800 rounded-lg text-stone-100 placeholder-stone-600 focus:outline-hidden focus:border-[#e06b48]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-stone-400 mb-1">
                    {lang === 'ar' ? 'المدينة' : lang === 'fr' ? 'Ville' : 'City / Location'}
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-900/80 border border-stone-800 rounded-lg text-stone-200 focus:outline-hidden focus:border-[#e06b48]"
                  >
                    <option value="Algiers">Algiers (الجزائر العاصمة)</option>
                    <option value="Oran">Oran (وهران)</option>
                    <option value="Constantine">Constantine (قسنطينة)</option>
                    <option value="Sétif">Sétif (سطيف)</option>
                    <option value="Blida">Blida (البليدة)</option>
                    <option value="Annaba">Annaba (عنابة)</option>
                    <option value="Other">Other MENA Region</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-400 mb-1">
                    {lang === 'ar' ? 'رقم الهاتف / واتساب' : lang === 'fr' ? 'Téléphone / WhatsApp' : 'Phone / WhatsApp'}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-500 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="tel"
                      required
                      placeholder="0550 00 00 00"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-stone-900/80 border border-stone-800 rounded-lg text-stone-100 placeholder-stone-600 focus:outline-hidden focus:border-[#e06b48]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-lg bg-[#b85438] hover:bg-[#a24830] text-white font-medium text-xs tracking-wider uppercase transition shadow-lg shadow-[#b85438]/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>
                    {lang === 'ar'
                      ? 'تأكيد موعد العرض التوضيحي'
                      : lang === 'fr'
                      ? 'Confirmer le Rendez-vous'
                      : 'Confirm Demo Walkthrough'}
                  </span>
                </button>
              </div>

              <p className="text-[11px] text-stone-500 text-center">
                {lang === 'ar'
                  ? 'بدون بطاقة دفع، لا التزام طويل الأجل. سنتواصل معك لتحديد الوقت الأنسب لك.'
                  : lang === 'fr'
                  ? 'Sans carte bancaire, sans engagement. Nous vous contacterons par WhatsApp.'
                  : 'Zero card required. We will message you on WhatsApp to coordinate your preferred time.'}
              </p>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h4 className="text-xl font-editorial text-stone-100 font-bold">
              {lang === 'ar' ? 'تم استلام طلبك بنجاح' : lang === 'fr' ? 'Demande bien reçue !' : 'Demo Request Confirmed'}
            </h4>

            <p className="text-xs text-stone-400 max-w-sm mx-auto leading-relaxed">
              {lang === 'ar'
                ? `شكراً ${ownerName || 'لك'}. سيتواصل معك أحد مهندسي فروم سكراتش عبر واتساب على الرقم (${phone}) لتنسيق العرض التوضيحي المخصص لـ ${businessName || 'مشروعك'}.`
                : lang === 'fr'
                ? `Merci ${ownerName || ''}. Un ingénieur From Scratch va vous contacter via WhatsApp au (${phone}) pour coordonner la démonstration personnalisée pour ${businessName || 'votre établissement'}.`
                : `Thank you ${ownerName || ''}. A From Scratch engineer will message you directly on WhatsApp at (${phone}) to coordinate the walkthrough for ${businessName || 'your business'}.`}
            </p>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono transition cursor-pointer"
              >
                {lang === 'ar' ? 'إغلاق' : lang === 'fr' ? 'Fermer' : 'Close Window'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
