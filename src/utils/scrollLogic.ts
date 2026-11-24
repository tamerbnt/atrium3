export interface HeroSnapInput {
  scrollY: number;
  prevScrollY: number;
  delta: number;
  direction: number;
  windowH: number;
  isSnapping: boolean;
  isTransitioning: boolean;
}

export type HeroSnapAction = 'none' | 'to-proof-strip' | 'to-hero';

/**
 * Evaluates whether a manual scroll inside the Hero <-> Section 1.5 stage should
 * glide cleanly to Section 1.5 or back to Hero, without hijacking programmatic
 * navbar/CTA jumps or trapping the user mid-page.
 */
export function evaluateHeroCurtainSnap({
  scrollY,
  prevScrollY,
  delta,
  direction,
  windowH,
  isSnapping,
  isTransitioning,
}: HeroSnapInput): HeroSnapAction {
  if (isSnapping || isTransitioning || windowH <= 0) {
    return 'none';
  }

  // Downward glide from Hero when user initiates a downward scroll
  if (
    prevScrollY < 120 &&
    scrollY > 0 &&
    scrollY < windowH * 0.75 &&
    (delta > 0.5 || direction === 1)
  ) {
    return 'to-proof-strip';
  }

  // Upward glide from the top edge of Section 1.5 back to Hero
  if (
    prevScrollY >= 40 &&
    prevScrollY <= windowH + 40 &&
    scrollY < prevScrollY &&
    (delta < -0.5 || (direction === -1 && scrollY < windowH))
  ) {
    return 'to-hero';
  }

  return 'none';
}

export interface SectionOffset {
  id: string;
  top: number;
}

/**
 * Resolves the active section ID from pre-cached section offsets without
 * querying the DOM or forcing layout inside scroll listeners.
 */
export function findActiveSectionId(
  scrollPos: number,
  offsets: SectionOffset[],
  fallbackId = 'section-hero'
): string {
  for (let i = offsets.length - 1; i >= 0; i--) {
    if (scrollPos >= offsets[i].top) {
      return offsets[i].id;
    }
  }
  return fallbackId;
}

/**
 * Computes eased counter progress (cubic ease-out) for AnimatedCounter.
 */
export function computeCounterValue(
  end: number,
  elapsedMs: number,
  durationMs: number
): number {
  if (durationMs <= 0 || elapsedMs >= durationMs) {
    return end;
  }
  if (elapsedMs <= 0) {
    return 0;
  }
  const progress = Math.min(elapsedMs / durationMs, 1);
  const easeProgress = 1 - Math.pow(1 - progress, 3);
  return end * easeProgress;
}

/**
 * Clamps BeforeAfterSlider split percentage cleanly inside [5, 95].
 */
export function clampSliderPercent(clientX: number, rectLeft: number, rectWidth: number): number {
  if (rectWidth <= 0) return 50;
  const pct = ((clientX - rectLeft) / rectWidth) * 100;
  return Math.max(5, Math.min(95, pct));
}

/**
 * Steps BeforeAfterSlider percentage via keyboard arrows / Home / End.
 */
export function stepSliderPercent(current: number, key: string, step = 5): number | null {
  if (key === 'ArrowLeft') return Math.max(5, current - step);
  if (key === 'ArrowRight') return Math.min(95, current + step);
  if (key === 'Home') return 5;
  if (key === 'End') return 95;
  return null;
}

export type KpiFilterMode = 'all' | 'sales' | 'staff';
export type KpiMetricCategory = 'sales' | 'staff';

/**
 * Evaluates whether a dashboard KPI card matches the active filter tab.
 */
export function isDashboardMetricVisible(
  activeFilter: KpiFilterMode,
  category: KpiMetricCategory
): boolean {
  return activeFilter === 'all' || activeFilter === category;
}

export interface DemoWhatsAppPayload {
  lang: 'en' | 'fr' | 'ar';
  ownerName: string;
  businessName: string;
  businessTypeLabel: string;
  city: string;
  phone: string;
  slotLabel: string;
}

/**
 * Builds a pre-filled WhatsApp booking confirmation URL from DemoModal inputs.
 */
export function buildDemoWhatsAppUrl(
  targetPhone: string,
  payload: DemoWhatsAppPayload
): string {
  const cleanDigits = targetPhone.replace(/[^0-9]/g, '') || '213550921408';
  const lines =
    payload.lang === 'ar'
      ? [
          'مرحباً فريق أتريوم، أود تأكيد جلسة استعراض مباشر (15 دقيقة):',
          `• الاسم: ${payload.ownerName}`,
          `• النشاط: ${payload.businessName}`,
          `• القطاع: ${payload.businessTypeLabel}`,
          `• المدينة: ${payload.city}`,
          `• الهاتف: ${payload.phone}`,
          `• التوقيت المفضل: ${payload.slotLabel}`,
        ]
      : payload.lang === 'fr'
      ? [
          'Bonjour l’équipe Atrium, je souhaite confirmer ma démo en direct (15 min) :',
          `• Nom : ${payload.ownerName}`,
          `• Établissement : ${payload.businessName}`,
          `• Secteur : ${payload.businessTypeLabel}`,
          `• Ville : ${payload.city}`,
          `• Téléphone : ${payload.phone}`,
          `• Créneau : ${payload.slotLabel}`,
        ]
      : [
          'Hello Atrium team, I would like to confirm my 15-minute live walkthrough:',
          `• Name: ${payload.ownerName}`,
          `• Business: ${payload.businessName}`,
          `• Trade: ${payload.businessTypeLabel}`,
          `• City: ${payload.city}`,
          `• Phone: ${payload.phone}`,
          `• Preferred Slot: ${payload.slotLabel}`,
        ];

  return `https://wa.me/${cleanDigits}?text=${encodeURIComponent(lines.join('\n'))}`;
}

