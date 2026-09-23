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
  proofStrip: {
    tag: string;
    headline: string;
    subline: string;
    categories: CategoryProofItem[];
  };
  problem: {
    tag: string;
    headline: string;
    subline: string;
    points: Array<{
      title: string;
      desc: string;
    }>;
  };
  shift: {
    tag: string;
    headline: string;
    subline: string;
    points: Array<{
      title: string;
      desc: string;
    }>;
  };
  howItWorks: {
    tag: string;
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
    headline: string;
    subline: string;
    caption: string;
  };
  pricing: {
    tag: string;
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
    headline: string;
    leadSentence: string;
    researchSentence: string;
    conclusionSentence: string;
    locationBadge: string;
  };
  finalCta: {
    headline: string;
    subline: string;
    ctaButton: string;
  };
  footer: {
    tagline: string;
    byline: string;
    linksHeading: string;
    legalHeading: string;
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
      bookDemo: 'Book a Walkthrough',
    },
    hero: {
      badge: 'STOA STUDIO • MULTI-LOCATION COMMERCE',
      brandName: 'Atrium',
      serviceLine: 'as a Service',
      subheadline:
        "Most business software gives you blank forms and waits for you to do all the clerical work. We're building Atrium to shoulder the load with you — uniting your front desk, staff coordination, and live revenue visibility into a single source of truth, so you can spend less time managing tools and more time running your business.",
      ctaButton: 'Book a 15-Minute Walkthrough',
      scrollHint: 'Scroll to see how Atrium unites scattered operations into one clear rhythm',
    },
    proofStrip: {
      tag: 'PURPOSE-BUILT ACROSS 6 COMMERCE CATEGORIES',
      headline: 'Configured for your exact trade from day one.',
      subline:
        'No generic software stretched thin. Atrium adapts its workflows to the exact rhythm of how your business operates, delivers service, and charges.',
      categories: [
        {
          id: 'memberships',
          label: 'Memberships & Classes',
          examples: 'Gyms, fitness studios, sports academies, yoga & martial arts studios',
          operationalFocus: 'Automated turnstile access, expiry alerts & trainer session quotas',
        },
        {
          id: 'appointments',
          label: 'Appointments & Care',
          examples: 'Salons, spas, barbershops, wellness clinics',
          operationalFocus: 'Chair scheduling, practitioner commission splits & no-show prevention',
        },
        {
          id: 'orders',
          label: 'Orders & Stock',
          examples: 'Restaurants, cafés, specialty retail stores',
          operationalFocus: 'Fast register flow, live table turnover & real-time inventory depletion',
        },
        {
          id: 'projects',
          label: 'Projects & Studios',
          examples: 'Architecture firms, design agencies, consultancies',
          operationalFocus: 'Milestone tracking, deliverable sign-offs & budget hour allocation',
        },
        {
          id: 'rentals',
          label: 'Spaces & Rentals',
          examples: 'Coworking spaces, event venues, equipment rental',
          operationalFocus: 'Slot reservation grids, deposit tracking & capacity management',
        },
        {
          id: 'education',
          label: 'Schools & Training',
          examples: 'Private schools, language institutes, vocational training centers',
          operationalFocus: 'Cohort registration, tuition installment schedules & attendance logs',
        },
      ],
    },
    problem: {
      tag: 'SECTION 02 — THE REALITY BEFORE ATRIUM',
      headline: 'Managing day-to-day operations feels like putting out fires on three fronts.',
      subline: 'When tools are fragmented, you spend more time fixing clerical mistakes than growing revenue.',
      points: [
        {
          title: 'Scattered Communications',
          desc: 'Your vital records are trapped in WhatsApp voice notes, loose paper dockets, and corrupted spreadsheets that nobody updates.',
        },
        {
          title: 'Blind Spot Revenue',
          desc: 'Finding out today’s actual cash take requires waiting for manager calls at midnight or driving down to count the register yourself.',
        },
        {
          title: 'Payroll & Till Disputes',
          desc: 'Staff commissions, overtime hours, and cash drawer shortages calculated by hand cause employee friction and cash leaks every month.',
        },
        {
          title: 'The Multi-Branch Trap',
          desc: 'Opening a second or third location feels impossible because your entire operation collapses if you are not physically standing in the room.',
        },
      ],
    },
    shift: {
      tag: 'SECTION 03 — THE UNIFIED SHIFT',
      headline: 'One single system replaces the notebooks, the chat groups, and the panic.',
      subline: 'Every daily operation resolves into a single source of truth across your locations.',
      points: [
        {
          title: 'Everything in One Place',
          desc: 'Client check-ins, service bookings, inventory movements, and staff shifts live together in one clean, synchronized workspace.',
        },
        {
          title: 'Live Numbers Everywhere',
          desc: 'Open your phone or laptop anywhere and see exact net revenue, active clients, and cash in register update in real time.',
        },
        {
          title: 'Automated Payroll & Records',
          desc: 'Staff hours, service tips, and practitioner commissions calculate systematically with one tap, eliminating recurring disputes.',
        },
        {
          title: 'Multi-Branch Clarity',
          desc: 'Oversee two, five, or ten locations from a single screen with zero guesswork and no need to be in multiple places at once.',
        },
      ],
    },
    howItWorks: {
      tag: 'SECTION 04 — FAST SETUP',
      headline: 'Up and running on your current hardware before tomorrow’s morning rush.',
      subline: 'No complicated installations, no expensive proprietary terminals, no technician fees.',
      steps: [
        {
          stepNumber: '01',
          title: 'Select your business type during initial setup.',
          caption: 'Whether you operate a gym, salon, café, creative studio, rental space, or school, Atrium initializes in under two minutes.',
          mockType: 'setup',
        },
        {
          stepNumber: '02',
          title: 'The workspace molds to your exact workflow.',
          caption: 'Zero irrelevant clutter. Only the checkouts, scheduling tools, and tracking metrics relevant to your trade appear on screen.',
          mockType: 'config',
        },
        {
          stepNumber: '03',
          title: 'Run daily operations from one dashboard.',
          caption: 'Customer check-ins, service bookings, till dockets, and staff schedules handled in effortless taps.',
          mockType: 'operations',
        },
        {
          stepNumber: '04',
          title: 'Watch real-time numbers across every branch.',
          caption: 'Instant alerts, cash reconciliations, and inventory warnings piped straight to your screen.',
          mockType: 'branches',
        },
      ],
    },
    verticals: {
      tag: 'SECTION 05 — VERTICAL PROOF',
      headline: 'Engineered for the operational realities of your industry.',
      subline: 'Every category gets purpose-built screens, workflows, and automation rules that mirror your day-to-day operations.',
      items: [
        {
          id: 'memberships',
          name: 'Memberships & Classes',
          featureLine: 'Automated turnstile check-in matching, instant subscription renewal alerts, and coach session quotas without reception bottlenecks.',
          metricPreview: 'Automated Access & Expiry Management',
          operationalInsight:
            'Built after observing how club operators lose up to 15% of membership revenue each quarter simply because expired pass enforcement at the front desk depends on tired staff checking paper logs or WhatsApp chats.',
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
            'Designed around the daily friction of end-of-day commission reconciliations, where owners spend hours calculating practitioner splits and tracking tips scribbled down on paper appointment cards.',
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
            'Developed after studying how managers struggle with shift handoffs and blind spots between kitchen orders and till counts, often only discovering missing inventory weeks later during manual audits.',
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
            'Created after seeing design and engineering partners juggle client deliverables across chat groups, losing track of scope creep and billable milestones until invoices were already overdue.',
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
            'Informed by venue managers managing bookings across separate Google Calendars and phone calls, resulting in double-booked meeting zones and untracked cash security deposits.',
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
            'Shaped by observing the administrative chaos of cohort enrollments, where installment tracking across hundreds of students is still managed on disconnected desktop Excel files.',
          sampleKpis: [
            { label: 'Sample Active Students', value: '340 Enrolled' },
            { label: 'Sample Live Cohorts', value: '14 Active' },
            { label: 'Sample Fee Status', value: 'Installments Mapped' },
          ],
        },
      ],
    },
    differentiation: {
      tag: 'SECTION 06 — DIFFERENTIATION',
      headline: 'Built specifically for the realities of modern multi-location operations.',
      subline: 'Why business owners switch away from fragmented tools, paper binders, and disjointed software.',
      pillars: [
        {
          number: '01',
          title: 'Works offline without stalling',
          explanation: 'Your checkouts, bookings, and logs continue uninterrupted even during internet cutouts, syncing seamlessly the second connection restores.',
          proofDetail: 'Built on resilient local database storage; zero lost sales during regional fiber or mobile data outages.',
        },
        {
          number: '02',
          title: 'One system, every branch',
          explanation: 'Complete operational oversight across two, five, or ten locations from day one without buying separate software packages or stitching integrations together.',
          proofDetail: 'Centralized real-time synchronization lets you inspect any branch register, staff roster, or daily summary in one click.',
        },
        {
          number: '03',
          title: 'Grows with your footprint',
          explanation: 'Start with a single counter or workshop, and expand to additional terminals, staff permissions, and multiple locations without migrating to another system.',
          proofDetail: 'Scales seamlessly from an independent studio or boutique to a regional multi-branch group.',
        },
        {
          number: '04',
          title: 'Software that works, not just tools that wait',
          explanation:
            'Most business software acts as an empty database that waits for you and your staff to perform all the clerical labor. Our architecture is built around a different philosophy: software designed to progressively shoulder the routine operational load — turning raw daily entries into clear operational guidance, so business owners spend less time babysitting software and more time leading their teams.',
          proofDetail:
            'The core architecture: unified event streams across every register and desk, engineered so that proactive intelligence can be layered in naturally rather than bolted on as an afterthought.',
        },
      ],
    },
    dashboard: {
      tag: 'SECTION 07 — EXECUTIVE VISIBILITY',
      headline: 'See what matters to you — customize your overview around the numbers that drive your trade.',
      subline: 'No cluttered charts you never check. Just clean, live business vitals updated with every customer transaction.',
      caption: 'Sample interface preview — illustrative data. Drag, reorder, and isolate the exact numbers you need to make decisions.',
    },
    pricing: {
      tag: 'SECTION 08 — TRANSPARENT TIERS',
      headline: 'Predictable pricing without hidden percentage cuts on your hard-earned revenue.',
      subline: 'Choose the scale that matches your footprint today. Upgrade only when you open your next branch.',
      riskReversal: '14-day walkthrough trial on your existing hardware. No long-term lock-in. Cancel anytime.',
      billingNote: 'Billed in Algerian Dinars (DZD) or regional currency. Official commercial invoicing and bank transfer supported.',
      tiers: [
        {
          name: 'Starter',
          price: '8,500 DZD',
          period: 'per month',
          desc: 'For independent single-location owners wanting complete control of day-to-day operations.',
          features: [
            '1 physical location',
            'Up to 3 staff logins with custom role permissions',
            'Full offline-first POS & record keeping',
            'Real-time daily cash drawer reconciliation',
            'Automated SMS & WhatsApp client notifications',
            'Priority WhatsApp technical support',
          ],
          ctaText: 'Start 14-Day Walkthrough',
        },
        {
          name: 'Pro',
          price: '16,000 DZD',
          period: 'per month',
          desc: 'For growing businesses expanding into multiple branches or higher daily transaction volume.',
          features: [
            'Up to 3 branch locations included',
            'Unlimited staff accounts & shift managers',
            'Multi-branch consolidated operational dashboard',
            'Automated payroll, commissions, and shifts tally',
            'Raw inventory batch tracking & supplier balances',
            'Direct phone line & remote setup assistance',
          ],
          highlighted: true,
          ctaText: 'Start 14-Day Walkthrough',
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          period: 'tailored setup',
          desc: 'For established regional chains, franchise operators, and large multi-brand service groups.',
          features: [
            'Unlimited branch locations',
            'On-site hardware deployment and staff onboarding',
            'Dedicated database instance with automated offsite backups',
            'Custom hardware integrations (turnstiles, scales, kitchen displays)',
            'Direct SLA with dedicated Stoa Studio engineer',
          ],
          ctaText: 'Contact for Custom Setup',
        },
      ],
    },
    credibility: {
      tag: 'SECTION 09 — PROVEN FOUNDATION',
      headline: 'Built from the ground up, not bolted together.',
      leadSentence:
        'Atrium didn’t start as a generic software template. It was originally engineered to solve the complex daily operations of a live multi-facility wellness and commercial center — where fitness memberships, treatment appointments, and counter sales all had to function under one roof without crashing when the internet went down.',
      researchSentence:
        'We refined that foundation through direct, on-the-ground study of how service and retail operators across Algeria manage their businesses — observing exactly where spreadsheets break, where WhatsApp coordination causes chaos, and why imported foreign software fails when local operational realities hit.',
      conclusionSentence:
        'The result is an operating system built from firsthand operational truth: resilient, offline-first, and structured around how businesses in our region actually work.',
      locationBadge: 'Engineered in Algiers by From Scratch • Refined through direct operational research',
    },
    finalCta: {
      headline: 'Stop running your business out of a WhatsApp thread.',
      subline: 'See Atrium configured for your exact trade and location in a concise 15-minute screen walkthrough.',
      ctaButton: 'Book a 15-Minute Walkthrough',
    },
    footer: {
      tagline: 'The desktop + cloud operating system for modern multi-location commerce.',
      byline: 'Crafted with precision by From Scratch. Algiers, Algeria.',
      linksHeading: 'Platform',
      legalHeading: 'Legal & Trust',
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
      bookDemo: 'Réserver une Démo',
    },
    hero: {
      badge: 'STOA STUDIO • COMMERCE MULTI-SITES',
      brandName: 'Atrium',
      serviceLine: 'as a Service',
      subheadline:
        "La plupart des logiciels se contentent d'afficher des formulaires vides en attendant que vos équipes fassent tout le travail clérical. Nous concevons Atrium pour porter la charge opérationnelle avec vous : réunir l'accueil, la coordination des équipes et la visibilité en direct sur vos revenus, pour passer moins de temps à gérer des outils et plus de temps à développer votre activité.",
      ctaButton: 'Réserver une Démo de 15 Min',
      scrollHint: 'Faites défiler pour voir la transition du désordre au contrôle unifié',
    },
    proofStrip: {
      tag: 'CONÇU SUR MESURE POUR 6 CATÉGORIES DE COMMERCE',
      headline: 'Configuré pour votre métier exact dès le premier jour.',
      subline:
        'Aucun compromis avec des outils généralistes. Atrium adapte ses flux de travail à la réalité exacte de votre fonctionnement et de vos encaissements.',
      categories: [
        {
          id: 'memberships',
          label: 'Memberships & Classes',
          examples: 'Salles de sport, studios de fitness, académies sportives, yoga & arts martiaux',
          operationalFocus: 'Accès automatisé par tourniquets, alertes de renouvellement et quotas de coachs',
        },
        {
          id: 'appointments',
          label: 'Appointments & Care',
          examples: 'Salons de coiffure, spas, barbershops, cliniques de bien-être',
          operationalFocus: 'Planning par fauteuil, calcul des commissions praticiens et réduction des no-shows',
        },
        {
          id: 'orders',
          label: 'Orders & Stock',
          examples: 'Restaurants, cafés, commerces de détail spécialisés',
          operationalFocus: 'Caisse rapide, rotation des tables et déstockage des ingrédients en temps réel',
        },
        {
          id: 'projects',
          label: 'Projects & Studios',
          examples: "Agences d'architecture, studios créatifs, cabinets de conseil",
          operationalFocus: 'Suivi des livrables par étapes, validation jalons et ventilation des heures budgétées',
        },
        {
          id: 'rentals',
          label: 'Spaces & Rentals',
          examples: 'Espaces de coworking, salles événementielles, location de matériel',
          operationalFocus: 'Grille des créneaux, gestion des cautions et occupation des zones',
        },
        {
          id: 'education',
          label: 'Schools & Training',
          examples: 'Écoles privées, instituts de langues, centres de formation professionnelle',
          operationalFocus: 'Inscriptions par promotions, échéanciers de scolarité et feuilles de présence',
        },
      ],
    },
    problem: {
      tag: 'SECTION 02 — LA RÉALITÉ AVANT ATRIUM',
      headline: 'Gérer le quotidien ressemble à éteindre des incendies sur trois fronts.',
      subline: 'Quand vos outils sont dispersés, vous perdez votre temps à corriger des erreurs au lieu de développer votre chiffre d’affaires.',
      points: [
        {
          title: 'Données Éparpillées',
          desc: 'Vos informations vitales sont coincées dans des mémos vocaux WhatsApp, des carnets volants et des tableurs jamais à jour.',
        },
        {
          title: 'Visibilité Nulle en Direct',
          desc: 'Connaître les recettes réelles du jour exige d’attendre les appels tardifs du responsable ou de vous déplacer pour compter la caisse.',
        },
        {
          title: 'Litiges de Salaires et de Caisse',
          desc: 'Calculer à la main les commissions et les heures des employés crée des tensions et des pertes financières chaque fin de mois.',
        },
        {
          title: 'Le Piège du Second Local',
          desc: 'Ouvrir une deuxième succursale semble impossible car tout votre établissement dépend de votre présence physique sur place.',
        },
      ],
    },
    shift: {
      tag: 'SECTION 03 — LA TRANSFORMATION UNIFIÉE',
      headline: 'Un seul système remplace les carnets, les groupes de discussion et le stress.',
      subline: 'Toutes vos opérations quotidiennes se rassemblent dans une source de vérité unique.',
      points: [
        {
          title: 'Tout Réuni au Même Endroit',
          desc: 'Accès clients, réservations de soins, mouvements de stock et planning du personnel synchronisés dans un espace clair.',
        },
        {
          title: 'Chiffres en Direct Partout',
          desc: 'Consultez votre téléphone ou ordinateur où que vous soyez et suivez vos revenus nets et votre caisse en temps réel.',
        },
        {
          title: 'Paie & Reçus Automatisés',
          desc: 'Heures prestées, pourboires et commissions des praticiens calculés sans aucune erreur de saisie manuelle.',
        },
        {
          title: 'Clarté Multi-Succursales',
          desc: 'Supervisez deux, cinq ou dix adresses depuis un seul écran sans avoir besoin de courir entre plusieurs villes.',
        },
      ],
    },
    howItWorks: {
      tag: 'SECTION 04 — MISE EN PLACE RAPIDE',
      headline: 'Opérationnel sur votre matériel actuel avant le coup de feu de demain matin.',
      subline: 'Aucune installation fastidieuse, aucun terminal propriétaire hors de prix, aucun frais de technicien.',
      steps: [
        {
          stepNumber: '01',
          title: 'Sélectionnez votre type d’activité lors de la configuration.',
          caption: 'Que vous dirigiez un club, un salon, un café, une agence, un espace ou un centre de formation, Atrium s’initialise en 2 minutes.',
          mockType: 'setup',
        },
        {
          stepNumber: '02',
          title: 'L’espace s’adapte exactement à votre flux de travail.',
          caption: 'Zéro élément superflu. Seuls les outils d’encaissement, de planning et de métriques propres à votre métier s’affichent.',
          mockType: 'config',
        },
        {
          stepNumber: '03',
          title: 'Gérez vos opérations quotidiennes depuis un tableau unique.',
          caption: 'Pointages clients, réservations, bons de commande et plannings traités en quelques gestes fluides.',
          mockType: 'operations',
        },
        {
          stepNumber: '04',
          title: 'Suivez vos indicateurs en direct sur tous vos sites.',
          caption: 'Alertes instantanées, réconciliations de caisse et ruptures de stock transmises directement sur votre écran.',
          mockType: 'branches',
        },
      ],
    },
    verticals: {
      tag: 'SECTION 05 — VOTRE MÉTIER EN DÉTAIL',
      headline: 'Pensé pour les réalités opérationnelles de votre secteur.',
      subline: 'Chaque catégorie bénéficie d’écrans et de règles d’automatisation adaptés à son quotidien.',
      items: [
        {
          id: 'memberships',
          name: 'Memberships & Classes',
          featureLine: 'Validation automatisée aux tourniquets, rappels d’échéance d’abonnement et suivi des quotas de cours.',
          metricPreview: 'Gestion Fluide des Accès et Échéances',
          operationalInsight:
            'Conçu après avoir observé que les clubs perdent jusqu’à 15% de revenus chaque trimestre simplement parce que le contrôle des cartes expirées repose sur la mémoire du personnel d’accueil.',
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
            'Développé pour résoudre le casse-tête de fin de journée, où les gérants passent des heures à recalculer les pourcentages de chaque coiffeur ou thérapeute sur des fiches papier.',
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
            'Créé après avoir analysé les frictions de transmission entre salle et caisse, où les écarts de stock ne sont découverts que des semaines plus tard lors d’inventaires manuels.',
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
            'Né du constat que les agences et cabinets perdent la trace des heures supplémentaires et des livrables non validés, entraînant des retards de facturation.',
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
            'Inspiré des gestionnaires de lieux jonglant entre plusieurs calendriers déconnectés et des appels téléphoniques, provoquant des doublons d’occupation et des cautions égarées.',
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
            'Façonné après avoir constaté la lourdeur administrative du suivi des tranches de paiement de centaines d’apprenants sur des classeurs Excel déconnectés.',
          sampleKpis: [
            { label: 'Exemple Apprenants Inscrits', value: '340' },
            { label: 'Exemple Sessions en Cours', value: '14 Promos' },
            { label: 'Exemple Règlements Suivis', value: 'Échéances Claires' },
          ],
        },
      ],
    },
    differentiation: {
      tag: 'SECTION 06 — DIFFÉRENCIATION RÉELLE',
      headline: 'Conçu pour faire face aux contraintes du commerce multi-sites moderne.',
      subline: 'Pourquoi les chefs d’entreprise abandonnent les logiciels importés et les carnets manuscrits.',
      pillars: [
        {
          number: '01',
          title: 'Fonctionne hors-ligne sans interruption',
          explanation: 'Vos encaissements et registres continuent sans internet en cas de coupure de réseau, puis se synchronisent dès le retour de la connexion.',
          proofDetail: 'Moteur local SQLite ultra-robuste : zéro vente perdue lors des coupures de fibre ou de réseau mobile.',
        },
        {
          number: '02',
          title: 'Un seul système pour tous vos points de vente',
          explanation: 'Visibilité consolidée sur plusieurs adresses dès le premier jour sans acheter des licences multiples ni bricoler des passerelles.',
          proofDetail: 'Basculez instantanément entre vos succursales depuis une interface unique et centralisée.',
        },
        {
          number: '03',
          title: 'Grandit avec votre entreprise sans changer d’outil',
          explanation: 'Démarrez avec une seule caisse ou atelier, ajoutez des postes employés, des autorisations ou de nouvelles adresses sans heurt.',
          proofDetail: 'Accompagne la croissance d’une boutique indépendante jusqu’à une chaîne régionale à succursales multiples.',
        },
        {
          number: '04',
          title: 'Un logiciel qui agit, pas seulement des outils passifs',
          explanation:
            'La plupart des logiciels de gestion agissent comme de simples bases de données attendant que vos équipes saisissent manuellement chaque donnée. Notre architecture repose sur une philosophie différente : un système conçu pour assumer progressivement la charge administrative de routine et transformer les saisies quotidiennes en repères d’action clairs, afin que les dirigeants passent moins de temps à surveiller des écrans et plus de temps avec leurs clients.',
          proofDetail:
            'Une architecture d’événements unifiés sur chaque poste, pensée pour que les automatisations intelligentes s’intègrent naturellement à mesure des évolutions.',
        },
      ],
    },
    dashboard: {
      tag: 'SECTION 07 — VISIBILITÉ STRATÉGIQUE',
      headline: 'Visualisez ce qui compte pour vous — composez votre écran de contrôle selon vos vraies priorités.',
      subline: 'Fini les graphiques inutiles que personne ne lit. Uniquement les constantes vitales de votre entreprise.',
      caption: 'Aperçu d’interface — données illustratives. Organisez vos indicateurs préférés pour décider vite avant même la fin du service.',
    },
    pricing: {
      tag: 'SECTION 08 — TARIFS TRANSPARENTS',
      headline: 'Un abonnement fixe et clair sans pourcentage prélevé sur votre chiffre d’affaires.',
      subline: 'Choisissez le niveau qui correspond à votre étape actuelle. Évoluez uniquement lorsque vous ouvrez votre prochaine adresse.',
      riskReversal: 'Essai de démonstration de 14 jours sur votre matériel existant. Sans engagement. Résiliation libre.',
      billingNote: 'Facturation en Dinars Algériens (DZD) ou devise locale. Facture officielle et virement bancaire disponibles.',
      tiers: [
        {
          name: 'Starter',
          price: '8 500 DZD',
          period: 'par mois',
          desc: 'Pour les gérants d’un établissement unique souhaitant reprendre le contrôle absolu de leurs journées.',
          features: [
            '1 établissement physique',
            'Jusqu’à 3 accès employés avec permissions modulables',
            'Caisse et gestion de fiches 100% hors-ligne',
            'Clôture et réconciliation de caisse quotidienne',
            'Notifications automatiques clients par SMS / WhatsApp',
            'Assistance technique directe via WhatsApp',
          ],
          ctaText: 'Démarrer l’Essai de 14 Jours',
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
          ctaText: 'Démarrer l’Essai de 14 Jours',
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
            'Contrat de service prioritaire avec un ingénieur From Scratch',
          ],
          ctaText: 'Contacter pour Étude Personnalisée',
        },
      ],
    },
    credibility: {
      tag: 'SECTION 09 — FONDATION ÉPROUVÉE',
      headline: 'Bâti depuis le terrain, pas assemblé à la hâte.',
      leadSentence:
        'Atrium n’est pas né d’un modèle logiciel générique. Il a été initialement développé pour répondre aux exigences opérationnelles complexes d’un centre commercial et bien-être pluri-activités — où adhésions sportives, soins sur rendez-vous et ventes au comptoir devaient tourner sous le même toit sans jamais planter lors des coupures internet.',
      researchSentence:
        'Nous avons perfectionné cette base grâce à l’observation directe du fonctionnement quotidien des commerces et services en Algérie — en étudiant exactement là où les tableurs s’effondrent, où les échanges WhatsApp deviennent chaotiques et pourquoi les logiciels étrangers importés échouent face aux contraintes locales.',
      conclusionSentence:
        'Le résultat est un système d’exploitation enraciné dans l’expérience du terrain : résilient, pensé hors-ligne et calqué sur la manière dont les entreprises de notre région travaillent réellement.',
      locationBadge: 'Conçu à Alger par From Scratch • Perfectionné par la recherche opérationnelle directe',
    },
    finalCta: {
      headline: 'Cessez de piloter votre entreprise au fil d’une discussion WhatsApp.',
      subline: 'Découvrez Atrium configuré pour votre secteur d’activité lors d’une démonstration claire de 15 minutes.',
      ctaButton: 'Réserver une Démo de 15 Min',
    },
    footer: {
      tagline: 'Le système d’exploitation moderne pour les entreprises de service et commerce multi-sites.',
      byline: 'Conçu avec rigueur par From Scratch. Alger, Algérie.',
      linksHeading: 'Plateforme',
      legalHeading: 'Mentions & Confiance',
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
      bookDemo: 'حجز عرض توضيحي',
    },
    hero: {
      badge: 'فروم سكراتش • إدارة التجارة متعددة الفروع',
      brandName: 'أتريوم',
      serviceLine: 'كخدمة ذكية',
      subheadline:
        'معظم برمجيات الأعمال تعطيك حقولاً فارغة وتنتظر منك القيام بجميع الأعباء الإدارية المرهقة. نحن نبني أتريوم ليتحمل هذا العبء معك — ليوحد الاستقبال، وتنسيق الموظفين، والمداخيل الحية في مصدر حقيقة واحد، لتتفرغ لتطوير مشروعك بدلاً من مراقبة شاشات البرامج.',
      ctaButton: 'احجز عرضاً توضيحياً (15 دقيقة)',
      scrollHint: 'مرر للأسفل لاكتشاف الانتقال من الفوضى إلى التحكم الشامل والمنظم',
    },
    proofStrip: {
      tag: 'مصمم خصيصاً عبر 6 قطاعات تجارية وخدمية',
      headline: 'مهيأ تماماً لطبيعة نشاطك من اليوم الأول.',
      subline: 'لا برمجيات عامة ولا حلول ترقيعية. يتكيف أتريوم مع طريقة تقديمك للخدمة ونظام الفوترة الخاص بمجالك بدقة.',
      categories: [
        {
          id: 'memberships',
          label: 'الاشتراكات والحصص',
          examples: 'القاعات الرياضية، نوادي اللياقة، الأكاديميات الرياضية، استوديوهات اليوغا وفنون القتال',
          operationalFocus: 'دخول تلقائي بالبوابات، تنبيهات بانتهاء الاشتراكات، وحساب حصص المدربين',
        },
        {
          id: 'appointments',
          label: 'المواعيد والعناية',
          examples: 'صالونات الحلاقة، مراكز التجميل، السبا، والعيادات الصحية',
          operationalFocus: 'جدولة حسب المقاعد، تقسيم عمولات المختصين، والحد من تفويت المواعيد',
        },
        {
          id: 'orders',
          label: 'الطلبات والمخزون',
          examples: 'المطاعم، المقاهي، ومتاجر التجزئة المتخصصة',
          operationalFocus: 'كاشير سريع، تتبع دوران الطاولات، وجرد مباشر للمواد الأولية فور البيع',
        },
        {
          id: 'projects',
          label: 'المشاريع والاستوديوهات',
          examples: 'مكاتب الهندسة المعمارية، وكالات التصميم، والشركات الاستشارية',
          operationalFocus: 'متابعة مراحل التسليم، توثيق إنجازات العملاء، وتوزيع ساعات الميزانية',
        },
        {
          id: 'rentals',
          label: 'المساحات والتأجير',
          examples: 'مساحات العمل المشترك، قاعات الفعاليات، وتأجير المعدات',
          operationalFocus: 'جدول إشغال القاعات، تنظيم الودائع والتأمينات، والتحكم في سعة الأماكن',
        },
        {
          id: 'education',
          label: 'التعليم والتدريب',
          examples: 'المدارس الخاصة، معاهد اللغات، ومراكز التدريب المهني',
          operationalFocus: 'تسجيل الدفعات، جداول أقساط المصاريف الدراسية، وسجلات الحضور والغياب',
        },
      ],
    },
    problem: {
      tag: 'المحور 02 — الواقع قبل أتريوم',
      headline: 'إدارة العمل اليومي تستهلك طاقتك في حل مشاكل كان يمكن تفاديها.',
      subline: 'عندما تكون أدواتك مشتتة، يضيع وقتك الثمين في تصحيح أخطاء الحسابات بدل زيادة الأرباح.',
      points: [
        {
          title: 'بيانات مشتتة وفوضوية',
          desc: 'سجلاتك المهمة حبيسة رسائل واتساب الصوتية، دفاتر الفواتير الورقية، وجداول إكسل التي لا يحدّثها أحد.',
        },
        {
          title: 'انعدام الرؤية اللحظية',
          desc: 'معرفة المداخيل الحقيقية اليوم تتطلب الانتظار حتى منتصف الليل للاتصال بالمدير أو النزول شخصياً لجرد الصندوق.',
        },
        {
          title: 'خلافات الرواتب والصندوق',
          desc: 'حساب ساعات الموظفين، العمولات ونواقص الصندوق يدوياً يتسبب في نزاعات متكررة وهدر مالي مستمر كل شهر.',
        },
        {
          title: 'فخ التوسع وفتح فروع جديدة',
          desc: 'افتتاح فرع ثانٍ يبدو مخاطرة مرعبة لأن مشروعك بأكمله يتوقف تماماً إذا لم تكن واقفاً بنفسك داخل المحل.',
        },
      ],
    },
    shift: {
      tag: 'المحور 03 — التحول الشامل مع أتريوم',
      headline: 'نظام واحد متكامل ينهي فوضى الدفاتر الورقية، مجموعات الدردشة، والقلق الدائم.',
      subline: 'تتحد كل عملياتك اليومية في لوحة تحكم واحدة موثوقة في جميع فروعك.',
      points: [
        {
          title: 'كل شيء في مكان موحد',
          desc: 'تسجيل دخول الزبائن، مواعيد الخدمات، حركة السلع ومناوبات العمال تتزامن في بيئة عمل واحدة منظمة وسريعة.',
        },
        {
          title: 'أرقام حية في أي لحظة',
          desc: 'افتح هاتفك أو حاسوبك من أي مكان وشاهد صافي الأرباح، عدد العملاء المتواجدين ورصيد الصندوق لحظة بلحظة.',
        },
        {
          title: 'رواتب وسجلات مؤتمتة',
          desc: 'ساعات العمل، نسب ومستحقات الموظفين تُحسب بدقة آلية دون أخطاء أو خلافات متكررة.',
        },
        {
          title: 'وضوح تام عبر الفروع',
          desc: 'أشرف على فرعين، خمسة أو عشرة فروع من شاشة واحدة دون الحاجة للتنقل المضني بين المدن والمواقع.',
        },
      ],
    },
    howItWorks: {
      tag: 'المحور 04 — تشغيل فوري وبسيط',
      headline: 'يعمل على أجهزتك الحالية قبل بدء دوام الغد دون تعقيد.',
      subline: 'لا يتطلب أجهزة باهظة الثمن، لا برامج تثبيت معقدة، ولا رسوم فنيين.',
      steps: [
        {
          stepNumber: '01',
          title: 'اختر نوع نشاطك التجاري أثناء الإعداد الأول.',
          caption: 'سواء كنت تدير قاعة رياضة، صالوناً، مقهى، استوديو، مساحة عمل، أو معهداً، أتريوم ينطلق في دقيقتين.',
          mockType: 'setup',
        },
        {
          stepNumber: '02',
          title: 'مساحة العمل تتكيف فوراً مع طبيعة مهنتك.',
          caption: 'صفر قوائم زائدة. تظهر على الشاشة فقط أدوات الدفع، الجدولة والتقارير المتعلقة بقطاعك بدقة.',
          mockType: 'config',
        },
        {
          stepNumber: '03',
          title: 'أدر معاملاتك اليومية من لوحة واحدة سلسة.',
          caption: 'تسجيل المشتركين، الحجوزات، فواتير الصندوق ومناوبات العمال تتم بلمسات واضحة وسريعة.',
          mockType: 'operations',
        },
        {
          stepNumber: '04',
          title: 'شاهد أرقامك الحية ومخزونك في جميع الفروع.',
          caption: 'تنبيهات فورية بنواقص السلع، تصفية الحسابات اليومية وحركة الصناديق تصل إلى شاشتك مباشرة.',
          mockType: 'branches',
        },
      ],
    },
    verticals: {
      tag: 'المحور 05 — مصمم لواقع قطاعك',
      headline: 'مبني ليلائم تماماً وتيرة العمل الواقعية في مجالك.',
      subline: 'يحصل كل قطاع على واجهات وقواعد عمل مصممة لتطابق تفاصيل نشاطه اليومي بدقة.',
      items: [
        {
          id: 'memberships',
          name: 'الاشتراكات والحصص',
          featureLine: 'تسجيل دخول متزامن بالبوابات، تنبيهات بانتهاء الاشتراكات، ومتابعة حصص المدربين دون طوابير عند الاستقبال.',
          metricPreview: 'انضباط الحضور وتجديد الاشتراكات',
          operationalInsight:
            'صُمم بعد دراسة ميدانية أظهرت كيف تفقد الأندية الرياضية ما يصل إلى 15% من مداخيلها دورياً بسبب اعتماد التحقق من البطاقات المنتهية على موظف استقبال مشتت وملاحظات ورقية.',
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
            'طُوّر لحل الإرهاق اليومي في نهاية الدوام، حيث يقضي أصحاب الصالونات ساعات طويلة في حساب نسب الحلاقين والإكراميات المسجلة على قصاصات أوراق متناثرة.',
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
            'انبثق من دراسة معاناة المدراء في تسليم المناوبات بين المطبخ ونقاط البيع، حيث لا تُكتشف النواقص إلا بعد أسابيع أثناء الجرد اليدوي المتأخر.',
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
            'صُمم بعد معاينة مكاتب التصميم والاستشارات وهي تخسر أتعاب الأعمال الإضافية وتتأخر في تحصيل الفواتير بسبب تشتت الاتفاقات عبر مجموعات الدردشة.',
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
            'مبني بناءً على واقع مديري القاعات الذين ينسقون الحجوزات عبر مكالمات وتقويمات شخصية منفصلة، مما يؤدي لتكرار حجز نفس القاعة وضياع تتبع التأمينات النقدية.',
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
            'صُمم لمعالجة فوضى تسجيل الدورات ومتابعة استحقاق الرسوم الدراسية لمئات المتدربين على ملفات إكسل منفصلة يصعب تدقيقها.',
          sampleKpis: [
            { label: 'نموذج الطلاب المسجلين', value: '340 طالباً' },
            { label: 'نموذج الأفواج النشطة', value: '14 فوجاً' },
            { label: 'نموذج تسوية الرسوم', value: 'أقساط مجدولة' },
          ],
        },
      ],
    },
    differentiation: {
      tag: 'المحور 06 — الفرق الجوهري',
      headline: 'صُمم خصيصاً لمواكبة التحديات الواقعية للأنشطة متعددة الفروع.',
      subline: 'لماذا يستبدل أصحاب المشاريع البرامج العامة والورق بمنصة أتريوم.',
      pillars: [
        {
          number: '01',
          title: 'يعمل دون إنترنت دون أي توقف',
          explanation: 'تستمر عمليات البيع، الحجوزات والسجلات عند انقطاع شبكة الإنترنت، وتتزامن البيانات تلقائياً فور عودة الاتصال.',
          proofDetail: 'قاعدة بيانات محلية فائقة المتانة؛ لا مبيعات ضائعة أثناء انقطاعات الألياف البصرية أو شبكة الهاتف.',
        },
        {
          number: '02',
          title: 'نظام واحد لكل فروعك دون عناء',
          explanation: 'رؤية مركزية متكاملة لجميع مواقعك وفروعك من اليوم الأول دون الحاجة لشراء تراخيص منفصلة أو ربط يدوي.',
          proofDetail: 'تنقل بين بيانات فروعك في مدن ومواقع مختلفة بنقرة واحدة من شاشة واحدة متصلة.',
        },
        {
          number: '03',
          title: 'ينمو معك بسهولة مع توسع نشاطك',
          explanation: 'ابدأ بنقطة بيع أو مكتب واحد، وأضف أجهزة جديدة، صلاحيات للموظفين، وفروعاً إضافية دون تغيير نظامك البرمجي.',
          proofDetail: 'يتكيف بسلاسة مع نمو نشاط تجاري ناشئ ليواكب شبكة فروع متعددة التخصصات.',
        },
        {
          number: '04',
          title: 'برمجيات تؤدي العمل، لا مجرد أدوات تنتظرك',
          explanation:
            'معظم برمجيات الأعمال ليست سوى قواعد بيانات صامتة تنتظر من موظفيك إدخال كل صغيرة وكبيرة يدوياً. هندستنا تنطلق من فلسفة مغايرة: برمجيات مصممة لتتحمل تدريجياً أعباء العمل الإداري الروتيني — لتحول المعاملات اليومية إلى رؤى وتوجيهات عملية واضحة، ليقضي أصحاب المشاريع وقتاً أقل في تفقد البرامج ووقتاً أطول في قيادة فرقهم.',
          proofDetail:
            'الهندسة الأساسية: تدفق أحداث موحد عبر كل نقطة كاشير ومكتب استقبال، مهيأ لدمج الذكاء العملي في صلب العمليات مستقبلاً دون تعقيد.',
        },
      ],
    },
    dashboard: {
      tag: 'المحور 07 — رؤية إدارية واضحة',
      headline: 'شاهد ما يهمك فقط — خصص لوحة معلوماتك وفق المؤشرات المؤثرة في قطاعك.',
      subline: 'وداعاً للرسوم البيانية المحشوة التي لا يقرأها أحد. أرقام حية وواضحة ترشدك للقرار الصائب دائماً.',
      caption: 'معاينة لواجهة نموذجية — بيانات توضيحية. رتب مؤشرات عملك المفضلة لاتخاذ قرارات سريعة ومربحة كل صباح.',
    },
    pricing: {
      tag: 'المحور 08 — أسعار واضحة ومباشرة',
      headline: 'اشتراك ثابت وشفاف دون أي اقتطاع لنسبة مئوية من أرباحك وعرق جبينك.',
      subline: 'اختر الباقة المناسبة لحجم نشاطك اليوم، وقم بالترقية فقط عندما تفتتح فرعك القادم.',
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
          ctaText: 'ابدأ تجربة الـ 14 يوماً',
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
          ctaText: 'ابدأ تجربة الـ 14 يوماً',
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
      tag: 'المحور 09 — واقع مثبت على الأرض',
      headline: 'بُني من الميدان، لا تجميعاً على عجل.',
      leadSentence:
        'لم يبدأ أتريوم كقالب برمجي جاهز. لقد طُوّر في الأصل لتنظيم العمليات اليومية المعقدة لمركز تجاري وترفيهي حي ومتعدد الأنشطة — حيث كان لزاماً لاشتراكات اللياقة، ومواعيد العناية، ومبيعات الكاشير أن تعمل كلها تحت سقف واحد ودون توقف حتى عند انقطاع الإنترنت.',
      researchSentence:
        'ثم عمقنا هذه النواة عبر المعايشة الميدانية المباشرة لأسلوب إدارة أصحاب المشاريع والخدمات في الجزائر — لنرصد بالدقة أين تنكسر جداول إكسل، وأين يُحدث التنسيق عبر واتساب الفوضى، ولماذا تعجز البرمجيات الأجنبية المستوردة عن تلبية الواقع المحلي.',
      conclusionSentence:
        'والنتيجة هي نظام تشغيل تجاري مستمد من الحقيقة الميدانية: فائق المرونة، مصمم ليعمل دون إنترنت، ومبني تماماً وفق الكيفية التي تدير بها مؤسساتنا أعمالها في الواقع.',
      locationBadge: 'صنع في الجزائر من طرف فروم سكراتش • صُقل بالبحث الميداني المباشر',
    },
    finalCta: {
      headline: 'توقف عن إدارة عملك وتجارتك عبر رسائل واتساب المشتتة.',
      subline: 'شاهد أتريوم مهيأً تماماً لطبيعة نشاطك وموقعك خلال عرض توضيحي موجز لمدة 15 دقيقة.',
      ctaButton: 'احجز عرضاً توضيحياً (15 دقيقة)',
    },
    footer: {
      tagline: 'النظام الشامل لإدارة الأنشطة التجارية والخدمية العصرية متعددة الفروع.',
      byline: 'صنع بإتقان من طرف فروم سكراتش. الجزائر العاصمة، الجزائر.',
      linksHeading: 'المنصة',
      legalHeading: 'الثقة والقانون',
      contactHeading: 'تواصل مباشر',
      copyright: '© 2026 أتريوم / فروم سكراتش. جميع الحقوق محفوظة.',
      contactEmail: 'contact@fromscratch.dz',
      phone: '+213 (0) 550 92 14 08',
    },
  },
};
