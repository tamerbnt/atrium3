export type Language = 'en' | 'fr' | 'ar';

export interface CategoryProofItem {
  id: string;
  label: string;
  examples: string;
  operationalFocus: string;
}

export interface LandingContent {
  nav: {
    tagline: string;
    taglineSub: string;
    proof: string;
    problem: string;
    shift: string;
    howItWorks: string;
    verticals: string;
    whyAtrium: string;
    pricing: string;
    bookDemo: string;
  };
  hero: {
    badge: string;
    brandName: string;
    serviceLine: string;
    subheadline: string;
    ctaButton: string;
    scrollHint: string;
  };
  tryStartButton: string;
  feelingLine: string;
  proofStrip: {
    tag: string;
    headlinePrimary: string;
    headlineAccent: string;
    headline: string;
    subline: string;
    categories: CategoryProofItem[];
  };
  problem: {
    tag: string;
    headlinePrimary: string;
    headlineAccent: string;
    headline: string;
    subline: string;
    points: Array<{
      title: string;
      desc: string;
    }>;
  };
  shift: {
    tag: string;
    headlinePrimary: string;
    headlineAccent: string;
    headline: string;
    subline: string;
    points: Array<{
      title: string;
      desc: string;
    }>;
  };
  howItWorks: {
    tag: string;
    headlinePrimary: string;
    headlineAccent: string;
    headline: string;
    subline: string;
    steps: Array<{
      stepNumber: string;
      title: string;
      caption: string;
      mockType: 'setup' | 'config' | 'operations' | 'branches';
    }>;
  };
  verticals: {
    tag: string;
    headlinePrimary: string;
    headlineAccent: string;
    headline: string;
    subline: string;
    items: Array<{
      id: string;
      name: string;
      featureLine: string;
      metricPreview: string;
      operationalInsight: string;
      sampleKpis: Array<{ label: string; value: string }>;
    }>;
  };
  differentiation: {
    tag: string;
    headlinePrimary: string;
    headlineAccent: string;
    headline: string;
    subline: string;
    pillars: Array<{
      number: string;
      title: string;
      explanation: string;
      proofDetail: string;
    }>;
  };
  dashboard: {
    tag: string;
    headlinePrimary: string;
    headlineAccent: string;
    headline: string;
    subline: string;
    caption: string;
  };
  pricing: {
    tag: string;
    headlinePrimary: string;
    headlineAccent: string;
    headline: string;
    subline: string;
    riskReversal: string;
    billingNote: string;
    tiers: Array<{
      name: string;
      price: string;
      period: string;
      desc: string;
      features: string[];
      highlighted?: boolean;
      ctaText: string;
    }>;
  };
  credibility: {
    tag: string;
    headlinePrimary: string;
    headlineAccent: string;
    headline: string;
    leadSentence: string;
    researchSentence: string;
    conclusionSentence: string;
    locationBadge: string;
  };
  faq: {
    tag: string;
    headlinePrimary: string;
    headlineAccent: string;
    headline: string;
    subline: string;
    items: Array<{
      q: string;
      a: string;
    }>;
    lastItemTransition: string;
    lastItemCtaText: string;
    stillHaveQuestions: string;
    chatOnWhatsApp: string;
    whatsappMessage: string;
    ctaButton: string;
    ctaSubtext: string;
  };
  finalCta: {
    tag: string;
    headlinePrimary: string;
    headlineAccent: string;
    headline: string;
    subline: string;
    ctaButton: string;
  };
  footer: {
    tagline: string;
    byline: string;
    contactHeading: string;
    copyright: string;
    contactEmail: string;
    phone: string;
  };
}

export const CONTENT: Record<Language, LandingContent> = {
  en: {
    nav: {
      tagline: 'Atrium as a Service',
      taglineSub: 'Software that works, not just tools that wait',
      proof: 'Categories',
      problem: 'The Reality',
      shift: 'The Shift',
      howItWorks: 'How It Works',
      verticals: 'Built For You',
      whyAtrium: 'Why Atrium',
      pricing: 'Pricing',
      bookDemo: 'Start Free Trial',
    },
    hero: {
      badge: 'FROM SCRATCH • MULTI-LOCATION COMMERCE',
      brandName: 'Atrium',
      serviceLine: 'as a Service',
      subheadline:
        'Software that shoulders the load with you. Unify your front desk, shift coordination, and live revenue into a single source of truth so you can focus on running your business.',
      ctaButton: 'Start Free Trial',
      scrollHint: 'Scroll to see how Atrium organizes daily operations',
    },
    tryStartButton: 'Try & Start for Free',
    feelingLine: 'From scattered to certain.',
    proofStrip: {
      tag: 'Categories',
      headlinePrimary: 'Configure your exact trade',
      headlineAccent: 'on day one.',
      headline: 'Configure your exact trade on day one.',
      subline:
        'No blank forms. Atrium molds to how you deliver, stock, and charge.',
      categories: [
        {
          id: 'memberships',
          label: 'Memberships & Classes',
          examples: 'Gyms, studios, sports academies',
          operationalFocus: '› Automated turnstiles, pass renewal alerts, trainer quotas',
        },
        {
          id: 'appointments',
          label: 'Appointments & Care',
          examples: 'Salons, spas, wellness clinics',
          operationalFocus: '› Chair schedules, automated tip/commission splits, no-show alerts',
        },
        {
          id: 'orders',
          label: 'Orders & Stock',
          examples: 'Cafés, restaurants, retail counters',
          operationalFocus: '› Fast register checkout, live table turnover, real-time depletion',
        },
        {
          id: 'projects',
          label: 'Projects & Studios',
          examples: 'Architecture, creative studios, consultancies',
          operationalFocus: '› Deliverable milestones, sign-offs, billable hours tracking',
        },
        {
          id: 'rentals',
          label: 'Spaces & Rentals',
          examples: 'Coworking, event spaces, equipment rental',
          operationalFocus: '› Hourly/daily reservation grid, deposit logs, conflict prevention',
        },
        {
          id: 'education',
          label: 'Schools & Training',
          examples: 'Private schools, training institutes',
          operationalFocus: '› Batch cohort enrollment, installment schedules, attendance logs',
        },
      ],
    },
    problem: {
      tag: 'Reality',
      headlinePrimary: 'Stop firefighting',
      headlineAccent: 'three fronts at once.',
      headline: 'Stop firefighting three fronts at once.',
      subline: 'Manual mistakes cost you more than business growth.',
      points: [
        {
          title: 'Scattered Records',
          desc: 'Vital records stay trapped in WhatsApp voice notes, paper dockets, and unshared spreadsheets.',
        },
        {
          title: 'Revenue Blind Spots',
          desc: 'Checking actual daily cash requires waiting for midnight calls or driving down to count registers yourself.',
        },
        {
          title: 'Payroll & Till Disputes',
          desc: 'Calculating commissions, overtime, and register discrepancies by hand creates monthly employee friction.',
        },
        {
          title: 'The Branch Bottleneck',
          desc: 'Expanding to another location stalls because daily execution collapses when you leave the floor.',
        },
      ],
    },
    shift: {
      tag: 'Shift',
      headlinePrimary: 'Replace paper ledgers',
      headlineAccent: 'with quiet clarity.',
      headline: 'Replace paper ledgers with quiet clarity.',
      subline: 'Every register, booking, and shift resolves into one clean screen across branches.',
      points: [
        {
          title: 'Unified Operations',
          desc: 'Check-ins, bookings, stock moves, and staff rosters synchronize in one clean workspace.',
        },
        {
          title: 'Real-Time Visibility',
          desc: 'Check net revenue, floor headcount, and till totals on your phone at any hour.',
        },
        {
          title: 'Automated Calculations',
          desc: 'Staff hours, service tips, and practitioner commissions tally automatically with every closed bill.',
        },
        {
          title: 'Multi-Branch Control',
          desc: 'Monitor every branch in real time without driving between sites or guessing night-end cash.',
        },
      ],
    },
    howItWorks: {
      tag: 'Setup',
      headlinePrimary: 'Launch on your hardware',
      headlineAccent: 'before tomorrow’s rush.',
      headline: 'Launch on your hardware before tomorrow’s rush.',
      subline: 'Zero proprietary terminals, zero technician visits, zero setup fees.',
      steps: [
        {
          stepNumber: '01',
          title: 'Pick your vertical.',
          caption: 'Set up memberships, appointments, tables, retainers, or school logic in under two minutes.',
          mockType: 'setup',
        },
        {
          stepNumber: '02',
          title: 'Prune the clutter.',
          caption: 'Only the register options, scheduling tools, and metrics you actually need appear on screen.',
          mockType: 'config',
        },
        {
          stepNumber: '03',
          title: 'Run the floor.',
          caption: 'Check in clients, log payments, and track shifts in single taps.',
          mockType: 'operations',
        },
        {
          stepNumber: '04',
          title: 'Track every branch.',
          caption: 'See synchronized revenue totals, till parity, and inventory alerts on any screen.',
          mockType: 'branches',
        },
      ],
    },
    verticals: {
      tag: 'Workflows',
      headlinePrimary: 'Operate at the pace',
      headlineAccent: 'of your floor.',
      headline: 'Operate at the pace of your floor.',
      subline: 'Pre-configured register rules, staff permissions, and receipt routes from day one.',
      items: [
        {
          id: 'memberships',
          name: 'Memberships & Classes',
          featureLine: 'Automated turnstile check-in matching, instant subscription renewal alerts, and coach session quotas without reception bottlenecks.',
          metricPreview: 'Automated Access & Expiry Management',
          operationalInsight:
            'Observed how club operators lose membership revenue simply because front-desk renewal checks rely on tired staff skimming through loose notebooks or message threads.',
          sampleKpis: [
            { label: 'Sample Active Members', value: '418' },
            { label: 'Sample Renewals', value: '23 Expiring' },
            { label: 'Sample Peak Load', value: '72% Capacity' },
          ],
        },
        {
          id: 'appointments',
          name: 'Appointments & Care',
          featureLine: 'Chair-by-chair schedule management, stylist and practitioner commission calculations, and automated SMS appointment confirmations.',
          metricPreview: 'Transparent Commission Reconciliations',
          operationalInsight:
            'Designed around end-of-day commission disputes, where owners spend hours calculating practitioner splits and tracking tips scribbled on appointment cards.',
          sampleKpis: [
            { label: 'Sample Active Chairs', value: '6 / 8 Booked' },
            { label: 'Sample Split Engine', value: 'Automated' },
            { label: 'Sample Attendance', value: '94% On-Time' },
          ],
        },
        {
          id: 'orders',
          name: 'Orders & Stock',
          featureLine: 'Rapid order entry, live table status indicators, and immediate raw inventory depletion at the point of payment.',
          metricPreview: 'Live Till & Inventory Parity',
          operationalInsight:
            'Developed after studying shift handoff blind spots between floor tickets and cash registers, where missing stock is only discovered weeks later during manual audits.',
          sampleKpis: [
            { label: 'Sample Open Tables', value: '14 / 18 Active' },
            { label: 'Sample Order Speed', value: '11 min Turn' },
            { label: 'Sample Cash Variance', value: '0.00 DZD' },
          ],
        },
        {
          id: 'projects',
          name: 'Projects & Studios',
          featureLine: 'Milestone progression tracking, client deliverable sign-offs, and clear project hour allocation across team members.',
          metricPreview: 'Milestone-Linked Billing Integrity',
          operationalInsight:
            'Created after seeing partner agencies lose track of scope creep and unpaid milestone deliverables until invoices were already weeks overdue.',
          sampleKpis: [
            { label: 'Sample Active Retainers', value: '9 Deliverables' },
            { label: 'Sample Scope Health', value: 'On Schedule' },
            { label: 'Sample Milestone Sign-off', value: '3 Pending' },
          ],
        },
        {
          id: 'rentals',
          name: 'Spaces & Rentals',
          featureLine: 'Visual room and equipment occupancy grids, flexible hourly/daily slot reservations, and automated deposit tracking.',
          metricPreview: 'Slot Conflict & Deposit Control',
          operationalInsight:
            'Informed by managers juggling space bookings across phone calls and paper diaries, resulting in double-booked meeting zones and unreturned security deposits.',
          sampleKpis: [
            { label: 'Sample Zone Booking', value: '12 / 16 Reserved' },
            { label: 'Sample Turnover Lag', value: 'Zero Overlaps' },
            { label: 'Sample Deposits Held', value: 'Logged & Verifiable' },
          ],
        },
        {
          id: 'education',
          name: 'Schools & Training',
          featureLine: 'Cohort-by-cohort batch registration, structured tuition installment schedules, and real-time attendance status.',
          metricPreview: 'Tuition Installment Clarity',
          operationalInsight:
            'Shaped by the administrative bottlenecks of cohort enrollments, where installment tracking across hundreds of students is still managed on disconnected desktop files.',
          sampleKpis: [
            { label: 'Sample Active Students', value: '340 Enrolled' },
            { label: 'Sample Live Cohorts', value: '14 Active' },
            { label: 'Sample Fee Status', value: 'Installments Mapped' },
          ],
        },
      ],
    },
    differentiation: {
      tag: 'Architecture',
      headlinePrimary: 'Run every branch',
      headlineAccent: 'from one screen.',
      headline: 'Run every branch from one screen.',
      subline: 'Why operators leave paper ledgers and fragmented tools behind.',
      pillars: [
        {
          number: '01',
          title: 'Works offline without pause',
          explanation: 'Checkouts, bookings, and logs continue during internet cutouts and sync automatically upon reconnection.',
          proofDetail: 'Local database storage ensures zero lost transactions during network outages.',
        },
        {
          number: '02',
          title: 'One system across every counter',
          explanation: 'Complete operational oversight whether you run one counter or ten locations.',
          proofDetail: 'Inspect any branch register, staff roster, or daily summary in a single view.',
        },
        {
          number: '03',
          title: 'Scales with your footprint',
          explanation: 'Add terminals, branch locations, and staff permissions without migrating platforms or changing software.',
          proofDetail: 'Seamless upgrade path from an independent studio to a regional group.',
        },
        {
          number: '04',
          title: 'Software that works, not just tools that wait',
          explanation:
            'Rather than acting as a blank ledger, Atrium turns daily entries into live operating guidance so you spend less time managing tools.',
          proofDetail:
            'Unified event streams across every desk, built to shoulder repetitive administrative tasks.',
        },
      ],
    },
    dashboard: {
      tag: 'Telemetry',
      headlinePrimary: 'Watch your vital signs',
      headlineAccent: 'update live.',
      headline: 'Watch your vital signs update live.',
      subline: 'Zero complex charts. Just your real revenue, drawer reconciliation, and attendance.',
      caption: 'Illustrative interface preview with sample values. Drag and filter data to match your trade.',
    },
    pricing: {
      tag: 'Pricing',
      headlinePrimary: 'Pay flat rates,',
      headlineAccent: 'keep every dinar.',
      headline: 'Pay flat rates, keep every dinar.',
      subline: 'Fixed monthly plans tied to your locations, not your revenue.',
      riskReversal: '14-day walkthrough trial on your existing hardware. No long-term lock-in. Cancel anytime.',
      billingNote: 'Billed in Algerian Dinars (DZD) or regional currency. Official commercial invoicing and bank transfer supported.',
      tiers: [
        {
          name: 'Starter',
          price: '8,500 DZD',
          period: 'per month',
          desc: 'For independent single-location owners wanting complete day-to-day control.',
          features: [
            '1 physical location',
            'Up to 3 staff logins with custom role permissions',
            'Full offline-first POS & record keeping',
            'Real-time daily cash drawer reconciliation',
            'Automated SMS & WhatsApp client notifications',
            'Priority WhatsApp technical support',
          ],
          ctaText: 'Start for Free (14 Days)',
        },
        {
          name: 'Pro',
          price: '16,000 DZD',
          period: 'per month',
          desc: 'For growing businesses expanding into multiple branches or higher daily volume.',
          features: [
            'Up to 3 branch locations included',
            'Unlimited staff accounts & shift managers',
            'Multi-branch consolidated operational dashboard',
            'Automated payroll, commissions, and shifts tally',
            'Raw inventory batch tracking & supplier balances',
            'Direct phone line & remote setup assistance',
          ],
          highlighted: true,
          ctaText: 'Start for Free (14 Days)',
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          period: 'tailored setup',
          desc: 'For regional chains, franchise operators, and commercial groups.',
          features: [
            'Unlimited branch locations',
            'On-site hardware deployment and staff onboarding',
            'Dedicated database instance with automated offsite backups',
            'Custom hardware integrations (turnstiles, scales, kitchen displays)',
            'Direct SLA with dedicated From Scratch engineer',
          ],
          ctaText: 'Contact for Custom Setup',
        },
      ],
    },
    credibility: {
      tag: 'Origin',
      headlinePrimary: 'Built from operating reality,',
      headlineAccent: 'not a template.',
      headline: 'Built from operating reality, not a template.',
      leadSentence:
        'Atrium began as the custom operating system for a high-volume multi-facility wellness and commercial center in Algiers — running memberships, treatment appointments, and counter sales under one roof without crashing during internet dropouts.',
      researchSentence:
        'We refined that foundation through direct operational research with Algerian service and retail operators, replacing spreadsheets and paper dockets with a resilient, offline-first system structured around regional trade realities.',
      conclusionSentence:
        'The result is an operating system built from firsthand operational truth: resilient, offline-first, and structured around how businesses in our region actually work.',
      locationBadge: 'Engineered in Algiers by From Scratch • Grounded in operational research',
    },
    faq: {
      tag: 'Questions',
      headlinePrimary: 'Still deciding?',
      headlineAccent: "Here's what you need to know.",
      headline: "Still deciding? Here's what you need to know.",
      subline: 'Clear, factual answers to eliminate hesitation before your trial.',
      items: [
        {
          q: 'Do I need special hardware to get started?',
          a: 'No. Atrium runs on standard laptops, desktop PCs, and tablets you already have on your counter. Your existing thermal receipt printers, cash drawers, and USB barcode scanners connect out of the box with zero proprietary terminals or technician visits required before tomorrow’s rush.',
        },
        {
          q: 'What happens if my internet goes down?',
          a: 'Daily operations never pause. Atrium is engineered with an offline-first architecture, so checkouts, pass scans, and shift logs work uninterrupted on your local device. The moment connectivity returns, all records sync automatically to the cloud without duplicates or manual reconciliation.',
        },
        {
          q: 'Can I try it before paying?',
          a: 'Yes. You get 14 days of full access with zero card required. You test Atrium directly on your active registers and daily workflow with no long-term commitment and can cancel anytime.',
        },
        {
          q: "What if my business doesn't fit one category exactly?",
          a: 'The six categories are starting points, not rigid boundaries. If your gym sells protein shakes, or your salon combines booked chairs with retail products, you can combine modules easily. If your workflow has specific edge cases, our engineering team configures the setup with you.',
        },
        {
          q: 'Is my business data safe?',
          a: 'Yes. Your active records are saved locally for instant offline availability and mirrored to a dedicated, encrypted Supabase cloud database with automated offsite backups. Your financial logs, turnover, and client contacts belong strictly to you and are never shared or monetized.',
        },
        {
          q: 'What happens when the trial ends?',
          a: 'There are no surprise charges because we never take payment details upfront. At the end of 14 days, your configured data and history remain saved; you simply select the plan (Starter, Pro, or Enterprise) that fits your locations to continue. If you decide not to continue, you can export your records at any time.',
        },
        {
          q: 'I currently track everything on WhatsApp and Excel — how do I actually switch?',
          a: 'Setup takes under two minutes: you can start fresh immediately by entering your active services, staff logins, and pricing. If you have an existing Excel customer list or inventory sheet, send it to us directly on WhatsApp and our team will format and seed your workspace before your next shift.',
        },
      ],
      lastItemTransition: 'Ready to run your operations with certainty?',
      lastItemCtaText: 'Start 14-Day Free Trial',
      stillHaveQuestions: 'Still have questions not covered here?',
      chatOnWhatsApp: 'Chat directly with an engineer on WhatsApp',
      whatsappMessage: 'Hello Atrium team, I have a question about how Atrium works for my business.',
      ctaButton: 'Start Free Trial',
      ctaSubtext: '14 days of full access • Zero card required • Setup in under 2 minutes',
    },
    finalCta: {
      tag: 'Access',
      headlinePrimary: 'Stop running your business',
      headlineAccent: 'inside WhatsApp chats.',
      headline: 'Stop running your business inside WhatsApp chats.',
      subline: 'Test Atrium on your real register operations with 14 days of full access.',
      ctaButton: 'Start Free Trial',
    },
    footer: {
      tagline: 'The desktop + cloud operating system for modern multi-location commerce.',
      byline: 'Crafted with precision by From Scratch. Algiers, Algeria.',
      contactHeading: 'Direct Contact',
      copyright: '© 2026 Atrium / From Scratch. All rights reserved.',
      contactEmail: 'contact@fromscratch.dz',
      phone: '+213 (0) 550 92 14 08',
    },
  },

  fr: {
    nav: {
      tagline: 'Atrium as a Service',
      taglineSub: 'Un logiciel qui agit, pas seulement des outils passifs',
      proof: 'Catégories',
      problem: 'Le Constat',
      shift: 'La Solution',
      howItWorks: 'Fonctionnement',
      verticals: 'Votre Métier',
      whyAtrium: 'Différence',
      pricing: 'Tarifs',
      bookDemo: 'Essai Gratuit',
    },
    hero: {
      badge: 'FROM SCRATCH • COMMERCE MULTI-SITES',
      brandName: 'Atrium',
      serviceLine: 'as a Service',
      subheadline:
        "Un logiciel qui porte la charge avec vous. Réunissez accueil, planning des équipes et revenus en direct dans une source de vérité unique pour vous concentrer sur votre activité.",
      ctaButton: 'Démarrer l’Essai Gratuit',
      scrollHint: 'Faites défiler pour voir l’organisation des opérations quotidiennes',
    },
    tryStartButton: 'Essayer & Démarrer Gratuitement',
    feelingLine: 'Du désordre à la certitude.',
    proofStrip: {
      tag: 'Catégories',
      headlinePrimary: 'Configurez votre métier',
      headlineAccent: 'dès le premier jour.',
      headline: 'Configurez votre métier dès le premier jour.',
      subline:
        'Aucun formulaire vide. Atrium s’adapte à votre façon de vendre et facturer.',
      categories: [
        {
          id: 'memberships',
          label: 'Memberships & Classes',
          examples: 'Salles de sport, studios, académies',
          operationalFocus: '› Tourniquets automatisés, alertes renouvellement, quotas coachs',
        },
        {
          id: 'appointments',
          label: 'Appointments & Care',
          examples: 'Salons, spas, cliniques de bien-être',
          operationalFocus: '› Plannings fauteuils, calcul pourboires/commissions, rappels no-show',
        },
        {
          id: 'orders',
          label: 'Orders & Stock',
          examples: 'Cafés, restaurants, comptoirs de vente',
          operationalFocus: '› Caisse rapide, rotation des tables, déstockage temps réel',
        },
        {
          id: 'projects',
          label: 'Projects & Studios',
          examples: 'Architecture, studios créatifs, conseil',
          operationalFocus: '› Jalons de livraison, validations clients, suivi des heures',
        },
        {
          id: 'rentals',
          label: 'Spaces & Rentals',
          examples: 'Coworking, espaces événementiels, location matériel',
          operationalFocus: '› Grille des créneaux, registre des cautions, zéro conflit',
        },
        {
          id: 'education',
          label: 'Schools & Training',
          examples: 'Écoles privées, instituts de formation',
          operationalFocus: '› Inscriptions par promotions, échéanciers, feuilles de présence',
        },
      ],
    },
    problem: {
      tag: 'Réalité',
      headlinePrimary: 'Cessez d’éteindre des feux',
      headlineAccent: 'sur trois fronts.',
      headline: 'Cessez d’éteindre des feux sur trois fronts.',
      subline: 'Les erreurs manuelles coûtent plus cher que la croissance de votre activité.',
      points: [
        {
          title: 'Données Éparpillées',
          desc: 'Vos données vitales restent coincées dans des mémos vocaux WhatsApp, des carnets volants et des tableurs non partagés.',
        },
        {
          title: 'Angle Mort sur les Recettes',
          desc: 'Connaître la caisse réelle exige d’attendre les appels de minuit ou de vous déplacer pour compter le tiroir.',
        },
        {
          title: 'Litiges de Salaires et de Caisse',
          desc: 'Calculer commissions, heures et écarts de caisse à la main crée des tensions mensuelles avec les équipes.',
        },
        {
          title: 'Le Goulot du Second Local',
          desc: 'Ouvrir une autre adresse bloque car vos opérations s’arrêtent dès que vous quittez le comptoir.',
        },
      ],
    },
    shift: {
      tag: 'Transition',
      headlinePrimary: 'Remplacez le papier',
      headlineAccent: 'par une clarté totale.',
      headline: 'Remplacez le papier par une clarté totale.',
      subline: 'Chaque caisse, réservation et service converge sur un seul écran synchronisé.',
      points: [
        {
          title: 'Opérations Réunies',
          desc: 'Accès clients, réservations, déstockage et plannings d’équipes se synchronisent dans un espace épuré.',
        },
        {
          title: 'Visibilité en Direct',
          desc: 'Consultez recettes nettes, fréquentation et tiroir-caisse depuis votre smartphone à toute heure.',
        },
        {
          title: 'Calculs Automatisés',
          desc: 'Heures prestées, pourboires et commissions se calculent instantanément à chaque encaissement.',
        },
        {
          title: 'Pilotage Multi-Succursales',
          desc: 'Supervisez chaque succursale en direct sans courir d’un site à l’autre ni deviner les chiffres du soir.',
        },
      ],
    },
    howItWorks: {
      tag: 'Déploiement',
      headlinePrimary: 'Démarrez sur votre matériel',
      headlineAccent: 'avant le rush de demain.',
      headline: 'Démarrez sur votre matériel avant le rush de demain.',
      subline: 'Zéro terminal propriétaire, zéro déplacement de technicien, zéro frais d’installation.',
      steps: [
        {
          stepNumber: '01',
          title: 'Choisissez votre métier.',
          caption: 'Configurez abonnements, rendez-vous, tables, forfaits ou cours en moins de deux minutes.',
          mockType: 'setup',
        },
        {
          stepNumber: '02',
          title: 'Éliminez le superflu.',
          caption: 'Seuls les modules d’encaissement, de planning et de suivi utiles à votre secteur s’affichent.',
          mockType: 'config',
        },
        {
          stepNumber: '03',
          title: 'Gérez le comptoir.',
          caption: 'Enregistrez passages clients, encaissements et shifts d’un simple geste.',
          mockType: 'operations',
        },
        {
          stepNumber: '04',
          title: 'Suivez chaque site.',
          caption: 'Consultez totaux synchronisés, conformité de caisse et alertes de stock en temps réel.',
          mockType: 'branches',
        },
      ],
    },
    verticals: {
      tag: 'Métiers',
      headlinePrimary: 'Opérez au rythme réel',
      headlineAccent: 'de votre terrain.',
      headline: 'Opérez au rythme réel de votre terrain.',
      subline: 'Règles de caisse, droits d’accès et reçus déjà configurés pour votre activité.',
      items: [
        {
          id: 'memberships',
          name: 'Memberships & Classes',
          featureLine: 'Validation automatisée aux tourniquets, rappels d’échéance d’abonnement et suivi des quotas de cours.',
          metricPreview: 'Gestion Fluide des Accès et Échéances',
          operationalInsight:
            'Constat issu de l’observation des clubs qui perdent des revenus d’adhésion faute d’un contrôle automatisé des expirations à l’accueil.',
          sampleKpis: [
            { label: 'Exemple Adhérents Actifs', value: '418' },
            { label: 'Exemple Renouvellements', value: '23 Prévus' },
            { label: 'Exemple Fréquentation', value: '72% Capacité' },
          ],
        },
        {
          id: 'appointments',
          name: 'Appointments & Care',
          featureLine: 'Gestion des créneaux par praticien, calcul des commissions et notifications SMS prévenant les rendez-vous manqués.',
          metricPreview: 'Calcul Transparent des Commissions',
          operationalInsight:
            'Développé pour éliminer les litiges de fin de journée sur les pourcentages praticiens et les notes griffonnées sur cartes de rendez-vous.',
          sampleKpis: [
            { label: 'Exemple Fauteuils Occupés', value: '6 / 8 Actifs' },
            { label: 'Exemple Rapprochement', value: 'Automatisé' },
            { label: 'Exemple Présence', value: '94% Ponctualité' },
          ],
        },
        {
          id: 'orders',
          name: 'Orders & Stock',
          featureLine: 'Encaissement rapide, suivi visuel de l’état des tables et décompte immédiat des stocks au moment du paiement.',
          metricPreview: 'Exactitude des Caisses & Stocks',
          operationalInsight:
            'Créé après avoir analysé les décalages de passage de consignes entre salle et caisse menant à des écarts découverts trop tard.',
          sampleKpis: [
            { label: 'Exemple Tables Ouvertes', value: '14 / 18' },
            { label: 'Exemple Temps de Service', value: '11 min' },
            { label: 'Exemple Écart de Caisse', value: '0,00 DZD' },
          ],
        },
        {
          id: 'projects',
          name: 'Projects & Studios',
          featureLine: 'Suivi de l’avancement des étapes, validation formelle des livrables et répartition des heures par projet.',
          metricPreview: 'Facturation Conforme aux Jalons',
          operationalInsight:
            'Né du constat que les agences perdent la trace des heures supplémentaires et des livrables en attente de signature formelle.',
          sampleKpis: [
            { label: 'Exemple Projets Actifs', value: '9 Missions' },
            { label: 'Exemple Respect Planning', value: 'Dans les Délais' },
            { label: 'Exemple Jalons à Valider', value: '3 en Attente' },
          ],
        },
        {
          id: 'rentals',
          name: 'Spaces & Rentals',
          featureLine: 'Grille d’occupation des salles ou équipements, réservations flexibles à l’heure ou à la journée et suivi des dépôts de garantie.',
          metricPreview: 'Zéro Conflit de Réservation',
          operationalInsight:
            'Inspiré des gestionnaires de lieux confrontés aux doubles réservations et aux dépôts de garantie en espèces non réconciliés.',
          sampleKpis: [
            { label: 'Exemple Espaces Réservés', value: '12 / 16' },
            { label: 'Exemple Chevauchements', value: '0 Conflit' },
            { label: 'Exemple Cautions Suivies', value: 'Traçabilité 100%' },
          ],
        },
        {
          id: 'education',
          name: 'Schools & Training',
          featureLine: 'Inscriptions par promotions, échéanciers de paiement des frais de scolarité et feuilles de présence en temps réel.',
          metricPreview: 'Rapprochement Rigoureux des Scolarités',
          operationalInsight:
            'Conçu face à la lourdeur du suivi des règlements échelonnés de centaines d’élèves sur des fichiers déconnectés.',
          sampleKpis: [
            { label: 'Exemple Apprenants Inscrits', value: '340' },
            { label: 'Exemple Sessions en Cours', value: '14 Promos' },
            { label: 'Exemple Règlements Suivis', value: 'Échéances Claires' },
          ],
        },
      ],
    },
    differentiation: {
      tag: 'Architecture',
      headlinePrimary: 'Pilotez chaque établissement',
      headlineAccent: 'depuis un seul écran.',
      headline: 'Pilotez chaque établissement depuis un seul écran.',
      subline: 'Pourquoi les gestionnaires abandonnent les registres papier et les outils isolés.',
      pillars: [
        {
          number: '01',
          title: 'Fonctionne hors-ligne sans interruption',
          explanation: 'Encaissements, réservations et registres continuent sans internet et se synchronisent au retour de la connexion.',
          proofDetail: 'Stockage local robuste pour zéro transaction perdue en cas de panne réseau.',
        },
        {
          number: '02',
          title: 'Un seul système sur tous les comptoirs',
          explanation: 'Visibilité complète que vous gériez un seul comptoir ou dix succursales.',
          proofDetail: 'Consultez la caisse, les équipes et le bilan de chaque succursale en un coup d’œil.',
        },
        {
          number: '03',
          title: 'Grandit avec votre activité',
          explanation: 'Ajoutez terminaux, succursales et accès collaborateurs sans changer de logiciel.',
          proofDetail: 'Transition fluide d’un établissement indépendant vers un groupe multi-sites.',
        },
        {
          number: '04',
          title: 'Un logiciel qui agit, pas seulement des outils passifs',
          explanation:
            'Plutôt qu’un simple registre passif, Atrium transforme les saisies quotidiennes en repères d’action clairs pour passer moins de temps sur les outils.',
          proofDetail:
            'Flux d’événements unifiés à chaque comptoir, conçus pour automatiser les corvées administratives.',
        },
      ],
    },
    dashboard: {
      tag: 'Télémétrie',
      headlinePrimary: 'Suivez vos indicateurs vitaux',
      headlineAccent: 'en direct.',
      headline: 'Suivez vos indicateurs vitaux en direct.',
      subline: 'Aucun graphique complexe. Juste vos recettes réelles, vos caisses et vos présences.',
      caption: 'Aperçu d’interface avec valeurs illustratives. Personnalisez vos indicateurs selon votre secteur.',
    },
    pricing: {
      tag: 'Tarifs',
      headlinePrimary: 'Payez un forfait fixe,',
      headlineAccent: 'gardez chaque dinar.',
      headline: 'Payez un forfait fixe, gardez chaque dinar.',
      subline: 'Forfaits mensuels fixes indexés sur vos établissements, pas sur votre chiffre d’affaires.',
      riskReversal: 'Essai de démonstration de 14 jours sur votre matériel existant. Sans engagement. Résiliation libre.',
      billingNote: 'Facturation en Dinars Algériens (DZD) ou devise locale. Facture officielle et virement bancaire disponibles.',
      tiers: [
        {
          name: 'Starter',
          price: '8 500 DZD',
          period: 'par mois',
          desc: 'Pour les gérants d’un établissement unique souhaitant un contrôle direct de leurs opérations.',
          features: [
            '1 établissement physique',
            'Jusqu’à 3 accès employés avec permissions modulables',
            'Caisse et gestion de fiches 100% hors-ligne',
            'Clôture et réconciliation de caisse quotidienne',
            'Notifications automatiques clients par SMS / WhatsApp',
            'Assistance technique directe via WhatsApp',
          ],
          ctaText: 'Démarrer Gratuitement (14 jours)',
        },
        {
          name: 'Pro',
          price: '16 000 DZD',
          period: 'par mois',
          desc: 'Pour les structures dynamiques ouvrant de nouveaux points de vente avec un volume soutenu.',
          features: [
            'Jusqu’à 3 succursales incluses',
            'Comptes employés et responsables illimités',
            'Tableau de bord consolidé multi-adresses en direct',
            'Calcul automatisé des plannings, pourboires et commissions',
            'Gestion fine des stocks matières premières & fournisseurs',
            'Ligne téléphonique dédiée et assistance au paramétrage',
          ],
          highlighted: true,
          ctaText: 'Démarrer Gratuitement (14 jours)',
        },
        {
          name: 'Enterprise',
          price: 'Sur Mesure',
          period: 'configuration dédiée',
          desc: 'Pour les enseignes régionales, franchises et réseaux d’hôtellerie-restauration à grande échelle.',
          features: [
            'Succursales illimitées',
            'Déploiement sur site et formation complète des équipes',
            'Serveur de base de données dédié avec sauvegardes cryptées',
            'Intégration matériel sur mesure (tourniquets, balances, écrans cuisine)',
            'Contrat de service direct avec un ingénieur From Scratch',
          ],
          ctaText: 'Contacter pour Étude Personnalisée',
        },
      ],
    },
    credibility: {
      tag: 'Origine',
      headlinePrimary: 'Né de la réalité du terrain,',
      headlineAccent: 'pas d’un modèle.',
      headline: 'Né de la réalité du terrain, pas d’un modèle.',
      leadSentence:
        'Atrium est né comme système sur mesure d’un centre commercial et bien-être pluri-activités à Alger — gérant abonnements sportifs, soins sur rendez-vous et comptoir sans jamais planter lors des coupures internet.',
      researchSentence:
        'Nous avons perfectionné cette base au contact direct des gestionnaires de commerces et services en Algérie, remplaçant tableurs et carnets volants par un système résilient et pensé hors-ligne.',
      conclusionSentence:
        'Le résultat est un système d’exploitation ancré dans la réalité opérationnelle : robuste, autonome et calqué sur la façon dont nos entreprises travaillent.',
      locationBadge: 'Conçu à Alger par From Scratch • Issu de la recherche opérationnelle directe',
    },
    faq: {
      tag: 'Questions',
      headlinePrimary: 'Encore un doute ?',
      headlineAccent: 'Voici ce que vous devez savoir.',
      headline: 'Encore un doute ? Voici ce que vous devez savoir.',
      subline: 'Des réponses concrètes pour lever les dernières hésitations avant votre essai.',
      items: [
        {
          q: 'Ai-je besoin d’un matériel spécifique pour démarrer ?',
          a: 'Non. Atrium fonctionne sur vos ordinateurs, PC portables et tablettes habituels. Vos imprimantes thermiques de caisse, tiroirs et douchettes de codes-barres standards se connectent directement, sans terminal propriétaire ni visite de technicien avant le coup de feu de demain.',
        },
        {
          q: 'Que se passe-t-il en cas de coupure internet ?',
          a: 'Vos opérations continuent sans interruption. Atrium repose sur une architecture pensée d’abord hors-ligne : encaissements, scans d’accès et écritures de caisse restent actifs localement. Dès le rétablissement de la connexion, toutes les données se synchronisent automatiquement sans doublons.',
        },
        {
          q: 'Puis-je tester avant de payer ?',
          a: 'Oui. Vous bénéficiez de 14 jours d’accès complet sans aucune carte bancaire requise. Vous testez Atrium directement sur vos caisses réelles et votre rythme de travail quotidien, sans engagement et annulable à tout moment.',
        },
        {
          q: 'Et si mon activité ne rentre pas exactement dans une seule catégorie ?',
          a: 'Les six catégories sont des bases modulaires, pas des cases rigides. Si votre salle de sport vend des compléments ou si votre salon associe soins sur rendez-vous et vente de produits, vous combinez librement ces fonctions. Pour les cas particuliers, nous paramétrons l’environnement avec vous.',
        },
        {
          q: 'Mes données d’entreprise sont-elles en sécurité ?',
          a: 'Oui. Vos données actives sont conservées localement pour un accès immédiat hors-ligne et répliquées sur une base cloud Supabase chiffrée avec sauvegardes automatisées. Votre chiffre d’affaires, vos fichiers clients et vos plannings vous appartiennent exclusivement et ne sont jamais partagés.',
        },
        {
          q: 'Que se passe-t-il à la fin de l’essai gratuit ?',
          a: 'Aucun prélèvement surprise, car nous ne demandons aucune carte bancaire au départ. Au terme des 14 jours, votre configuration et votre historique restent intacts ; il vous suffit de choisir le forfait adapté (Starter, Pro ou Enterprise) pour continuer. Si vous ne poursuivez pas, vous pouvez exporter vos données librement.',
        },
        {
          q: 'Je gère actuellement tout sur WhatsApp et Excel — comment passer à Atrium ?',
          a: 'La mise en route prend moins de deux minutes : vous pouvez démarrer immédiatement en créant vos prestations, comptes d’équipe et tarifs. Si vous disposez déjà d’un fichier Excel de clients ou de stocks, envoyez-le nous simplement sur WhatsApp et notre équipe prépare votre espace avant votre prochain service.',
        },
      ],
      lastItemTransition: 'Prêt à piloter votre activité avec certitude ?',
      lastItemCtaText: 'Démarrer l’Essai Gratuit de 14 Jours',
      stillHaveQuestions: 'Vous avez encore une question spécifique ?',
      chatOnWhatsApp: 'Discuter avec un ingénieur sur WhatsApp',
      whatsappMessage: 'Bonjour l’équipe Atrium, j’ai une question sur le fonctionnement du logiciel pour mon activité.',
      ctaButton: 'Démarrer l’Essai Gratuit',
      ctaSubtext: '14 jours d’accès complet • Sans carte bancaire • Prêt en moins de 2 minutes',
    },
    finalCta: {
      tag: 'Accès',
      headlinePrimary: 'Cessez de gérer votre activité',
      headlineAccent: 'dans WhatsApp.',
      headline: 'Cessez de gérer votre activité dans WhatsApp.',
      subline: 'Testez Atrium sur vos caisses réelles avec 14 jours d’accès complet.',
      ctaButton: 'Démarrer l’Essai Gratuit',
    },
    footer: {
      tagline: 'Le système d’exploitation moderne pour les entreprises de service et commerce multi-sites.',
      byline: 'Conçu avec rigueur par From Scratch. Alger, Algérie.',
      contactHeading: 'Contact Direct',
      copyright: '© 2026 Atrium / From Scratch. Tous droits réservés.',
      contactEmail: 'contact@fromscratch.dz',
      phone: '+213 (0) 550 92 14 08',
    },
  },

  ar: {
    nav: {
      tagline: 'أتريوم كخدمة ذكية',
      taglineSub: 'برمجيات تؤدي العمل، لا مجرد أدوات تنتظرك',
      proof: 'المجالات الستة',
      problem: 'الواقع الحالي',
      shift: 'الحل الشامل',
      howItWorks: 'طريقة العمل',
      verticals: 'حسب نشاطك',
      whyAtrium: 'لماذا أتريوم',
      pricing: 'الأسعار',
      bookDemo: 'ابدأ مجاناً',
    },
    hero: {
      badge: 'فروم سكراتش • إدارة التجارة متعددة الفروع',
      brandName: 'أتريوم',
      serviceLine: 'كخدمة ذكية',
      subheadline:
        'برمجيات تشاطرك عبء العمل. وحّد الاستقبال، وتنسيق الموظفين، والمداخيل الحية في مصدر حقيقة واحد لتتفرغ لقيادة مشروعك.',
      ctaButton: 'ابدأ التجربة المجانية',
      scrollHint: 'مرر للأسفل لاكتشاف تنظيم العمليات اليومية',
    },
    tryStartButton: 'جرّب وابدأ مجاناً',
    feelingLine: 'من فوضى التشتت إلى رسوخ اليقين.',
    proofStrip: {
      tag: 'القطاعات',
      headlinePrimary: 'هيّئ نشاطك التجاري',
      headlineAccent: 'من أول يوم.',
      headline: 'هيّئ نشاطك التجاري من أول يوم.',
      subline: 'بلا صفحات فارغة. يتشكل أتريوم وفق طريقتك في البيع والفوترة.',
      categories: [
        {
          id: 'memberships',
          label: 'الاشتراكات والحصص',
          examples: 'قاعات الرياضة، الاستوديوهات، الأكاديميات',
          operationalFocus: '› بوابات ذكية، تنبيهات التجديد، حصص المدربين',
        },
        {
          id: 'appointments',
          label: 'المواعيد والعناية',
          examples: 'الصالونات، السبا، مراكز العناية',
          operationalFocus: '› جدول المقاعد، تقسيم العمولات، تنبيهات التغيب',
        },
        {
          id: 'orders',
          label: 'الطلبات والمخزون',
          examples: 'المقاهي، المطاعم، نقاط البيع',
          operationalFocus: '› كاشير سريع، دوران الطاولات، جرد لحظي للمواد',
        },
        {
          id: 'projects',
          label: 'المشاريع والاستوديوهات',
          examples: 'العمارة، التصميم، الاستشارات',
          operationalFocus: '› مراحل التسليم، اعتماد المخرجات، تتبع الساعات',
        },
        {
          id: 'rentals',
          label: 'المساحات والتأجير',
          examples: 'مساحات العمل، القاعات، تأجير العتاد',
          operationalFocus: '› مصفوفة الحجز الساعي/اليومي، سجل التأمينات، منع التضارب',
        },
        {
          id: 'education',
          label: 'التعليم والتدريب',
          examples: 'المدارس الخاصة، معاهد التدريب',
          operationalFocus: '› تسجيل الدفعات، جداول الأقساط، كشوف الحضور',
        },
      ],
    },
    problem: {
      tag: 'الواقع',
      headlinePrimary: 'أوقف استنزاف وقتك',
      headlineAccent: 'في ثلاث جبهات.',
      headline: 'أوقف استنزاف وقتك في ثلاث جبهات.',
      subline: 'الأخطاء اليدوية تكلفك أكثر من نمو نشاطك التجاري.',
      points: [
        {
          title: 'سجلات مشتتة',
          desc: 'تبقى سجلاتك حبيسة رسائل واتساب الصوتية، الدفاتر الورقية، وجداول إكسل المنعزلة.',
        },
        {
          title: 'انعدام الرؤية في المداخيل',
          desc: 'معرفة رصيد الصندوق تتطلب اتصالات منتصف الليل أو الحضور شخصياً لجرد الدرج.',
        },
        {
          title: 'نزاعات الرواتب والصندوق',
          desc: 'حساب العمولات، الساعات الإضافية، ونواقص الصندوق يدوياً يولد توتراً شهرياً مع العمال.',
        },
        {
          title: 'عقدة التوسع لفروع أخرى',
          desc: 'يتعطل فتح فرع جديد لأن العمليات اليومية تنهار فور مغادرتك للمحل.',
        },
      ],
    },
    shift: {
      tag: 'التحول',
      headlinePrimary: 'استبدل الدفاتر الورقية',
      headlineAccent: 'بوضوح تشغيلي هادئ.',
      headline: 'استبدل الدفاتر الورقية بوضوح تشغيلي هادئ.',
      subline: 'كل نقطة بيع، حجز، ووردية عمل تلتقي في شاشة واحدة موحدة.',
      points: [
        {
          title: 'عمليات موحدة',
          desc: 'تسجيل الزبائن، الحجوزات، حركة السلع، ومناوبات الفريق تتزامن في مساحة عمل واحدة.',
        },
        {
          title: 'رؤية لحظية ومباشرة',
          desc: 'راقب صافي المداخيل، إشغال القاعة، ورصيد الصندوق من هاتفك في أي لحظة.',
        },
        {
          title: 'حسابات مؤتمتة',
          desc: 'ساعات العمل، الإكراميات، وعمولات المختصين تُحسب آلياً مع كل إغلاق حساب.',
        },
        {
          title: 'إدارة الفروع بلا عناء',
          desc: 'أشرف على كل فرع لحظياً دون الحاجة للتنقل بين المواقع أو تخمين أرقام المساء.',
        },
      ],
    },
    howItWorks: {
      tag: 'التشغيل',
      headlinePrimary: 'انطلق بأجهزتك الحالية',
      headlineAccent: 'قبل زحام الغد.',
      headline: 'انطلق بأجهزتك الحالية قبل زحام الغد.',
      subline: 'بلا أجهزة مخصصة، بلا زيارات فنيين، وبلا رسوم تثبيت.',
      steps: [
        {
          stepNumber: '01',
          title: 'اختر مجالك.',
          caption: 'هيئ الاشتراكات، المواعيد، الطاولات، العقود، أو الدروس في أقل من دقيقتين.',
          mockType: 'setup',
        },
        {
          stepNumber: '02',
          title: 'احذف الزوائد.',
          caption: 'تظهر فقط خيارات الكاشير، الجدولة، والتقارير التي تحتاجها فعلاً في نشاطك.',
          mockType: 'config',
        },
        {
          stepNumber: '03',
          title: 'أدر قاعة العمل.',
          caption: 'سجّل دخول الزبائن، اقبض المدفوعات، وتابع الورديات بنقرات سريعة.',
          mockType: 'operations',
        },
        {
          stepNumber: '04',
          title: 'تابع كل فروعك.',
          caption: 'شاهد إجمالي المداخيل المتزامنة، تطابق الصناديق، وتنبيهات النواقص لحظياً.',
          mockType: 'branches',
        },
      ],
    },
    verticals: {
      tag: 'الأنشطة',
      headlinePrimary: 'أدِر منشأتك بسرعة',
      headlineAccent: 'حركتها الميدانية.',
      headline: 'أدِر منشأتك بسرعة حركتها الميدانية.',
      subline: 'قواعد صناديق، صلاحيات طواقم، وإيصالات مهيأة لمجالك من اليوم الأول.',
      items: [
        {
          id: 'memberships',
          name: 'الاشتراكات والحصص',
          featureLine: 'تسجيل دخول متزامن بالبوابات، تنبيهات بانتهاء الاشتراكات، ومتابعة حصص المدربين دون طوابير عند الاستقبال.',
          metricPreview: 'انضباط الحضور وتجديد الاشتراكات',
          operationalInsight:
            'مستمد من معاينة القاعات التي تفقد اشتراكات متكررة بسبب غياب التحقق الآلي من تاريخ الانتهاء عند الاستقبال.',
          sampleKpis: [
            { label: 'نموذج المشتركين النشطين', value: '418 مشترك' },
            { label: 'نموذج الاشتراكات المنتهية', value: '23 هذا الأسبوع' },
            { label: 'نموذج ذروة الإشغال', value: '72% القاعة' },
          ],
        },
        {
          id: 'appointments',
          name: 'المواعيد والعناية',
          featureLine: 'تنظيم المواعيد حسب كل كرسي، تقسيم نسب وأجور المصففين والمختصين تلقائياً، ورسائل تذكير للزبائن.',
          metricPreview: 'تسوية العمولات بشفافية تامة',
          operationalInsight:
            'صُمم لإنهاء خلافات نهاية الدوام حول نسب المختصين والإكراميات المدونة على قصاصات ورقية متفرقة.',
          sampleKpis: [
            { label: 'نموذج إشغال المقاعد', value: '6 / 8 نشط' },
            { label: 'نموذج حساب النسب', value: 'مؤتمت بالكامل' },
            { label: 'نموذج الانضباط', value: '94% بالموعد' },
          ],
        },
        {
          id: 'orders',
          name: 'الطلبات والمخزون',
          featureLine: 'إدخال سريع للطلبيات، مؤشرات حية لحالة الطاولات، وجرد مباشر للمخزون فور تأكيد الفاتورة.',
          metricPreview: 'تطابق تام بين الصندوق والمخزون',
          operationalInsight:
            'مبني لحل فجوات تسليم الورديات بين الصالة ونقاط البيع التي تتسبب في اكتشاف فوارق متأخرة.',
          sampleKpis: [
            { label: 'نموذج الطاولات النشطة', value: '14 / 18 مفتوحة' },
            { label: 'نموذج سرعة الخدمة', value: '11 دقيقة' },
            { label: 'نموذج فارق الصندوق', value: '0.00 دج' },
          ],
        },
        {
          id: 'projects',
          name: 'المشاريع والاستوديوهات',
          featureLine: 'متابعة مراحل التسليم، اعتماد المخرجات مع العملاء، وتوزيع ساعات العمل بدقة على ميزانية المشروع.',
          metricPreview: 'ربط الفوترة بإنجاز المراحل',
          operationalInsight:
            'نتاج ملاحظة فقدان المكاتب الاستشارية لحقها في ساعات العمل الإضافية وتأخر توقيع مراحل التسليم.',
          sampleKpis: [
            { label: 'نموذج المشاريع النشطة', value: '9 عقود' },
            { label: 'نموذج سلامة الخطة', value: 'حسب الجدول' },
            { label: 'نموذج مراحل قيد التوقيع', value: '3 معلقة' },
          ],
        },
        {
          id: 'rentals',
          name: 'المساحات والتأجير',
          featureLine: 'مصفوفة مرئية لإشغال القاعات والمعدات، حجوزات مرنة بالساعة أو باليوم، ومتابعة ودائع الضمان.',
          metricPreview: 'منع تضارب الحجوزات وضبط التأمين',
          operationalInsight:
            'مستلهم من معاناة مديري الأماكن مع تكرار حجز نفس القاعة وفقدان تتبع مبالغ التأمين النقدي المستردة.',
          sampleKpis: [
            { label: 'نموذج المساحات المحجوزة', value: '12 / 16' },
            { label: 'نموذج التداخلات', value: 'صفر تضارب' },
            { label: 'نموذج مبالغ التأمين', value: 'مسجلة وموثقة' },
          ],
        },
        {
          id: 'education',
          name: 'التعليم والتدريب',
          featureLine: 'تسجيل دفعات الطلاب، جدولة مواعيد الأقساط الدراسية، ومتابعة سجلات الحضور في الوقت الفعلي.',
          metricPreview: 'وضوح شامل لتحصيل الأقساط',
          operationalInsight:
            'موجّه لحل ثقل تتبع دفعات مئات الطلاب على ملفات غير متزامنة يصعب مطابقتها محاسبياً.',
          sampleKpis: [
            { label: 'نموذج الطلاب المسجلين', value: '340 طالباً' },
            { label: 'نموذج الأفواج النشطة', value: '14 فوجاً' },
            { label: 'نموذج تسوية الرسوم', value: 'أقساط مجدولة' },
          ],
        },
      ],
    },
    differentiation: {
      tag: 'البنية',
      headlinePrimary: 'أدِر كل الفروع',
      headlineAccent: 'من شاشة واحدة.',
      headline: 'أدِر كل الفروع من شاشة واحدة.',
      subline: 'لماذا يتخلى أصحاب الأعمال عن الدفاتر والبرامج المشتتة.',
      pillars: [
        {
          number: '01',
          title: 'يعمل دون إنترنت دون أي توقف',
          explanation: 'تستمر عمليات البيع والحجوزات أثناء انقطاع الشبكة وتتزامن فور عودة الاتصال.',
          proofDetail: 'تخزين محلي متين لضمان عدم ضياع أي معاملة مالية.',
        },
        {
          number: '02',
          title: 'نظام واحد عبر كل نقاط البيع',
          explanation: 'إشراف كامل سواء كنت تدير نقطة بيع واحدة أو عشرة فروع.',
          proofDetail: 'اطلع على كاشير، طاقم عمل، وحصيلة كل فرع في نافذة واحدة.',
        },
        {
          number: '03',
          title: 'ينمو بسلاسة مع نشاطك',
          explanation: 'أضف أجهزة كاشير، فروعاً جديدة، وصلاحيات للموظفين دون تغيير البرنامج.',
          proofDetail: 'مسار ترقية سلس من متجر مستقل إلى شبكة فروع إقليمية.',
        },
        {
          number: '04',
          title: 'برمجيات تؤدي العمل، لا مجرد أدوات تنتظرك',
          explanation:
            'بدل أن يكون مجرد سجل صامت، يحول أتريوم البيانات اليومية إلى مؤشرات توجيه عملية لتقضي وقتاً أقل على الشاشات.',
          proofDetail:
            'تدفق أحداث موحد عبر كل مكتب، مهيأ لتحمل الأعباء الإدارية الروتينية.',
        },
      ],
    },
    dashboard: {
      tag: 'المؤشرات',
      headlinePrimary: 'راقب نبض عملياتك',
      headlineAccent: 'لحظة بلحظة.',
      headline: 'راقب نبض عملياتك لحظة بلحظة.',
      subline: 'بلا مخططات معقدة. فقط إيراداتك الحقيقية، مطابقة صناديقك، وسجلات حضورك.',
      caption: 'معاينة توضيحية للواجهة بقيم نموذجية. رتب مؤشراتك حسب أولويات عملك.',
    },
    pricing: {
      tag: 'الأسعار',
      headlinePrimary: 'سدد اشتراكاً ثابتاً،',
      headlineAccent: 'واحتفظ بكل دينار.',
      headline: 'سدد اشتراكاً ثابتاً، واحتفظ بكل دينار.',
      subline: 'اشتراكات شهرية ثابتة مرتبطة بعدد فروعك، لا بنسبة أرباحك.',
      riskReversal: 'جلسة تجربة استعراضية لمدة 14 يوماً على أجهزتك الحالية. لا التزام طويل الأمد. يمكنك الإلغاء في أي وقت.',
      billingNote: 'الدفع بالدينار الجزائري (دج) مع توفير فواتير تجارية رسمية ودعم التحويل البنكي أو الدفع نقداً.',
      tiers: [
        {
          name: 'ستارتر (Starter)',
          price: '8,500 دج',
          period: 'شهرياً',
          desc: 'للأنشطة المستقلة في فرع واحد الراغبة في تنظيم محكم لعملياتها اليومية.',
          features: [
            'فرع وموقع تجاري واحد',
            'حتى 3 حسابات للموظفين مع صلاحيات محددة',
            'نظام كاشير وسجلات يعمل 100% بدون إنترنت',
            'جرد وتصفية يومية دقيقة لحسابات الصندوق',
            'تنبيهات تلقائية للزبائن عبر رسائل SMS وواتساب',
            'دعم فني مباشر وسريع عبر واتساب',
          ],
          ctaText: 'ابدأ مجاناً (14 يوماً)',
        },
        {
          name: 'برو (Pro)',
          price: '16,000 دج',
          period: 'شهرياً',
          desc: 'للأنشطة المتنامية التي تدير فروعاً متعددة أو حجماً كبيراً من المعاملات اليومية.',
          features: [
            'يشمل حتى 3 فروع تجارية',
            'حسابات موظفين ومدراء غير محدودة',
            'لوحة عمليات موحدة عبر الفروع لحظياً',
            'حساب آلي للأجور، الإكراميات، ومناوبات العمل',
            'إدارة متقدمة للمخزون ودفعات حسابات الموردين',
            'خط هاتف مباشر ومساعدة في التجهيز الميداني',
          ],
          highlighted: true,
          ctaText: 'ابدأ مجاناً (14 يوماً)',
        },
        {
          name: 'إنتربرايز (Enterprise)',
          price: 'مخصص',
          period: 'حسب المتطلبات',
          desc: 'للشبكات التجارية الكبرى، وسلاسل الخدمات والمجموعات متعددة الأنشطة.',
          features: [
            'عدد فروع تجارية غير محدود',
            'تثبيت ميداني وتدريب كامل لطاقم العمل على الأرض',
            'قاعدة بيانات مخصصة مع نسخ احتياطي سحابي مشفر',
            'ربط مخصص مع بوابات الدخول، الموازين وشاشات المطابخ',
            'اتفاقية دعم فني ممتازة مع مهندس مخصص من فروم سكراتش',
          ],
          ctaText: 'تواصل معنا لعرض مخصص',
        },
      ],
    },
    credibility: {
      tag: 'النشأة',
      headlinePrimary: 'مبني من صميم الميدان،',
      headlineAccent: 'وليس قالباً جاهزاً.',
      headline: 'مبني من صميم الميدان، وليس قالباً جاهزاً.',
      leadSentence:
        'انطلق أتريوم كنظام تشغيل مخصص لمركز تجاري وترفيهي متعدد الأنشطة في الجزائر — يدير الاشتراكات، المواعيد، ومبيعات الكاشير تحت سقف واحد دون توقف عند انقطاع الإنترنت.',
      researchSentence:
        'صقلنا هذا الأساس عبر المعايشة الميدانية المباشرة لمديري المتاجر والخدمات في الجزائر، مستبدلين الجداول والدفاتر بنظام متين يعمل دون اتصال.',
      conclusionSentence:
        'والنتيجة هي نظام تشغيل تجاري مستمد من الحقيقة الميدانية: فائق المرونة، مصمم ليعمل دون إنترنت، ومبني تماماً وفق الكيفية التي تدير بها مؤسساتنا أعمالها في الواقع.',
      locationBadge: 'صنع في الجزائر من طرف فروم سكراتش • صُقل بالبحث الميداني المباشر',
    },
    faq: {
      tag: 'الأسئلة الشائعة',
      headlinePrimary: 'ما زلت تفكر؟',
      headlineAccent: 'إليك كل ما تحتاج معرفته.',
      headline: 'ما زلت تفكر؟ إليك كل ما تحتاج معرفته.',
      subline: 'إجابات مباشرة وميدانية لإزالة أي تردد قبل بدء تجربتك المجانية.',
      items: [
        {
          q: 'هل أحتاج إلى أجهزة أو عتاد خاص للبدء؟',
          a: 'لا. يعمل أتريوم مباشرة على أجهزة الكمبيوتر، الحواسيب المحمولة والألواح الذكية المتوفرة لديك بالفعل على مكتب الاستقبال. طابعات الإيصالات الحرارية، أدراج الكاشير وقارئات الباركود القياسية تتصل بسلاسة دون الحاجة لشراء صناديق مقفلة أو انتظار فنيين لتركيبها قبل زحمة الغد.',
        },
        {
          q: 'ماذا يحدث إذا انقطع الاتصال بالإنترنت؟',
          a: 'عملياتك اليومية لا تتوقف أبداً. صُمم أتريوم بهندسة تعمل دون اتصال بالإنترنت أولاً؛ حيث تستمر عمليات البيع، مسح بطاقات الدخول وتدوين السجلات محلياً على جهازك. وبمجرد عودة الاتصال، تُزامن كافة العمليات تلقائياً مع السحابة دون تكرار أو تدقيق يدوي.',
        },
        {
          q: 'هل يمكنني تجربة النظام قبل الدفع؟',
          a: 'نعم. ستحصل على 14 يوماً من الوصول الكامل دون طلب أي بطاقة ائتمانية. يمكنك تجربة أتريوم مباشرة على مبيعاتك الحقيقية وسير عملك اليومي دون أي التزام مسبق مع إمكانية الإلغاء في أي وقت.',
        },
        {
          q: 'ماذا لو كان نشاطي لا يندرج بدقة تحت فئة واحدة؟',
          a: 'المجالات الستة هي نقاط انطلاق مرنة وليست قوالب مغلقة. إذا كانت قاعتك الرياضية تبيع مشروبات ومكملات، أو كان صالونك يجمع بين حجز المواعيد وبيع منتجات التجميل، يمكنك دمج الوحدات بسهولة. وإذا كانت لديك خصوصية معقدة، سنساعدك في ضبط التهيئة معاً.',
        },
        {
          q: 'هل بيانات عملي ومعاملاتي في أمان؟',
          a: 'نعم. تُحفظ بياناتك محلياً على جهازك لتكون متاحة فوراً حتى دون إنترنت، وتُنسخ باستمرار في قاعدة بيانات سحابية مشفرة (Supabase) مع نسخ احتياطي دوري. أرقام مبيعاتك، قوائم زبائنك وسجلات موظفيك ملكك وحدك ولا تتم مشاركتها أو استغلالها إطلاقاً.',
        },
        {
          q: 'ما الذي يحدث عند انتهاء فترة التجربة المجانية؟',
          a: 'لن تواجه أي اقتطاع مفاجئ لأننا لا نطلب بيانات بنكية مسبقاً. عند اكتمال الـ 14 يوماً، تبقى إعداداتك وسجلاتك محفوظة بالكامل؛ وكل ما عليك هو اختيار الخطة المناسبة (ستارتر، برو، أو إنتربرايز) لمتابعة العمل. وإذا قررت عدم المتابعة، يمكنك تصدير بياناتك في أي وقت.',
        },
        {
          q: 'أدير كل شيء حالياً عبر واتساب وإكسل — كيف أنتقل عملياً إلى أتريوم؟',
          a: 'الإعداد يستغرق أقل من دقيقتين: يمكنك البدء فوراً بإدخال خدماتك، حسابات فريقك وأسعارك. وإذا كان لديك جدول إكسل بقوائم الزبائن أو المخزون، يمكنك إرساله لنا مباشرة عبر واتساب وسيقوم فريقنا بتهيئته وإدراجه في حسابك قبل بداية الوردية التالية.',
        },
      ],
      lastItemTransition: 'مستعد لإدارة نشاطك التجاري بكل وضوح وثقة؟',
      lastItemCtaText: 'ابدأ تجربتك المجانية لمدة 14 يوماً',
      stillHaveQuestions: 'هل لديك سؤال آخر غير مذكور هنا؟',
      chatOnWhatsApp: 'تحدث مباشرة مع مهندس عبر واتساب',
      whatsappMessage: 'مرحباً فريق أتريوم، لدي استفسار بخصوص عمل النظام مع نشاطي التجاري.',
      ctaButton: 'ابدأ التجربة المجانية',
      ctaSubtext: '14 يوماً وصول كامل • بدون بطاقة ائتمانية • إعداد في أقل من دقيقتين',
    },
    finalCta: {
      tag: 'البدء',
      headlinePrimary: 'أوقف إدارة عملك',
      headlineAccent: 'عبر محادثات واتساب.',
      headline: 'أوقف إدارة عملك عبر محادثات واتساب.',
      subline: 'جرّب أتريوم على صناديق مبيعاتك الحقيقية مع وصول كامل لمدة 14 يوماً.',
      ctaButton: 'ابدأ التجربة المجانية',
    },
    footer: {
      tagline: 'النظام الشامل لإدارة الأنشطة التجارية والخدمية العصرية متعددة الفروع.',
      byline: 'صنع بإتقان من طرف فروم سكراتش. الجزائر العاصمة، الجزائر.',
      contactHeading: 'تواصل مباشر',
      copyright: '© 2026 أتريوم / فروم سكراتش. جميع الحقوق محفوظة.',
      contactEmail: 'contact@fromscratch.dz',
      phone: '+213 (0) 550 92 14 08',
    },
  },
};
