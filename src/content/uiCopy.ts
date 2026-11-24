import { Language } from './copy';

export interface DomainEnrichment {
  stages: Array<{ name: string; detail: string }>;
  telemetry: Array<{ label: string; value: string }>;
}

export interface ProblemDiagnostic {
  hiddenCost: string;
  atriumResolution: string;
  metricPill: { label: string; value: string };
}

export interface ShiftComparison {
  legacyChaos: string;
  atriumClarity: string;
  telemetryStat: { label: string; value: string };
}

export interface LocalizedUiCopy {
  proofStrip: {
    exploreLink: string;
    viewSpec: string;
    domainWorkflowTag: string;
    workflowHeading: string;
    readyToDeploy: string;
    autoLabel: string;
    pausedLabel: string;
    enrichments: Record<string, DomainEnrichment>;
  };
  problem: {
    badgeTag: string;
    diagnosisLabel: string;
    hiddenCostLabel: string;
    safeguardLabel: string;
    resolvedLabel: string;
    calloutTitle: string;
    calloutBody: string;
    diagnostics: Record<number, ProblemDiagnostic>;
  };
  shift: {
    badgeTag: string;
    evolutionLabel: string;
    legacyLabel: string;
    atriumLabel: string;
    synchronizedLabel: string;
    coreBadge: string;
    comparisons: Record<number, ShiftComparison>;
  };
  howItWorks: {
    stepLabel: string;
    activeWorkflow: string;
    canvasHeaderPrefix: string;
    engineStatus: string;
    stepOf: (current: number, total: number) => string;
    initTitle: string;
    initDesc: string;
    initLoaded: string;
    initStatus: string;
    initItems: string[];
    pruningTitle: string;
    pruningDesc: string;
    pruningRows: Array<{ label: string; status: string }>;
    floorTitle: string;
    floorDesc: string;
    floorCheckin: string;
    floorValid: string;
    floorBooking: string;
    floorBookingAmount: string;
    floorTillLabel: string;
    floorTillStatus: string;
    branchesTitle: string;
    branchesDesc: string;
    branchesCards: Array<{ branch: string; sample: string; amount: string; checkins: string }>;
    branchesTotalLabel: string;
    branchesTotalValue: string;
  };
  verticals: {
    badgeLabel: string;
    insightLabel: string;
    focusLabel: string;
    floorDeskPrefix: string;
    sampleInterface: string;
    activityTitle: string;
    activities: Array<{ label: string; status: string; tone: 'emerald' | 'accent' | 'muted' }>;
    footerLeft: string;
    footerRight: string;
  };
  differentiation: {
    pillarPrefix: string;
    calloutTitle: string;
    calloutBody: string;
  };
  dashboard: {
    filters: { all: string; sales: string; staff: string };
    summaryTitle: string;
    sampleBadge: string;
    subtitle: string;
    cards: Array<{
      id: string;
      category: 'sales' | 'staff';
      label: string;
      end: number;
      duration: number;
      delay: number;
      unit: string;
      subtext: string;
      accent?: boolean;
      tone: 'emerald' | 'muted' | 'accent';
    }>;
    tableTitle: string;
    tableHeaders: [string, string, string, string];
    rows: Array<{
      branch: string;
      status: string;
      tone: 'emerald' | 'amber';
      sync: string;
      gross: string;
    }>;
  };
  slider: {
    tag: string;
    headlinePrimary: string;
    headlineAccent: string;
    subline: string;
    eyebrow: string;
    heading: string;
    dragHint: string;
    ariaLabel: string;
    beforeBadge: string;
    withBadge: string;
    sampleLabel: string;
    beforeCards: [
      { title: string; quote: string; footer: string },
      { title: string; errorLine: string; footer: string }
    ];
    withCards: [
      { eyebrow: string; title: string; row1L: string; row1R: string; row2L: string; row2R: string },
      { eyebrow: string; title: string; row1L: string; row1R: string; row2L: string; row2R: string }
    ];
    beforeFooter: string;
    withFooter: string;
    checks: Array<{ title: string; desc: string }>;
  };
  pricing: {
    guaranteeBadge: string;
    popularBadge: string;
  };
  credibility: {
    subline: string;
  };
  faq: {
    supportHeading: string;
  };
  finalCta: {
    onboardingLabel: string;
    slotsLabel: string;
    checks: [string, string, string];
    responseTime: string;
  };
  footer: {
    locationLabel: string;
    locationValue: string;
    responseLabel: string;
    responseValue: string;
    emailLabel: string;
    phoneLabel: string;
    badges: [string, string, string];
  };
}

export const UI_COPY: Record<Language, LocalizedUiCopy> = {
  en: {
    proofStrip: {
      exploreLink: 'Explore deep interactive setups',
      viewSpec: 'View Full Spec',
      domainWorkflowTag: 'DOMAIN WORKFLOW',
      workflowHeading: 'Operational Frontline Workflow',
      readyToDeploy: 'Ready to Deploy',
      autoLabel: 'AUTO',
      pausedLabel: 'PAUSED',
      enrichments: {
        memberships: {
          stages: [
            { name: 'NFC Turnstile Edge Check-In', detail: 'Local reader authorization in < 25ms, zero cloud delay.' },
            { name: 'Automated Trainer Quotas', detail: 'Class attendance tallies commission tiers in real-time.' },
            { name: 'Local SQLite Buffer', detail: 'Pass renewals saved offline if broadband cuts during peak.' },
          ],
          telemetry: [
            { label: 'Edge Check-in Speed', value: '18ms' },
            { label: 'Offline Resiliency', value: '100% Guaranteed' },
          ],
        },
        appointments: {
          stages: [
            { name: 'Chair & Stylist Scheduling', detail: 'Dynamic booking grid prevents double-booked suites.' },
            { name: 'Instant Tip & Service Split', detail: 'Automated commission calculation per completed treatment.' },
            { name: 'Client Preference Recall', detail: 'Color formula notes and treatment logs available instantly.' },
          ],
          telemetry: [
            { label: 'Handoff Reconciliation', value: '45 sec' },
            { label: 'Commission Accuracy', value: '100.0%' },
          ],
        },
        orders: {
          stages: [
            { name: 'Edge Kitchen Display (KDS)', detail: 'Direct LAN station routing without external internet reliance.' },
            { name: 'Fast Table Splitting & Tills', detail: 'Multiple payment methods split across seated covers seamlessly.' },
            { name: 'Recipe Inventory Depletion', detail: 'Ingredients subtracted dynamically with low-stock warnings.' },
          ],
          telemetry: [
            { label: 'Order-to-KDS Delay', value: '< 15ms' },
            { label: 'Table Turnover Gain', value: '+22%' },
          ],
        },
        projects: {
          stages: [
            { name: 'Deliverable Milestone Gates', detail: 'Every stage links directly to client sign-off and billing triggers.' },
            { name: 'Allocated Team Hours', detail: 'Track billable designer and engineer hours without spreadsheets.' },
            { name: 'Scope Change Traceability', detail: 'Revisions logged cleanly alongside approved retainer budgets.' },
          ],
          telemetry: [
            { label: 'Billing Leakage', value: '0%' },
            { label: 'Milestone Clarity', value: '100% Logged' },
          ],
        },
        rentals: {
          stages: [
            { name: 'Hourly & Daily Slot Grid', detail: 'Live room and equipment timelines prevent overlapping bookings.' },
            { name: 'Automated Deposit Ledger', detail: 'Security deposits tracked cleanly from check-in to return audit.' },
            { name: 'Instant Asset Readiness', detail: 'Flag turnaround maintenance windows automatically between renters.' },
          ],
          telemetry: [
            { label: 'Booking Conflicts', value: '0 Allowed' },
            { label: 'Deposit Audit Trail', value: 'Verified' },
          ],
        },
        education: {
          stages: [
            { name: 'Cohort & Course Enrollment', detail: 'Automated tuition installment tracking and payment schedules.' },
            { name: 'Biometric Attendance Logs', detail: 'Synchronized student logs with guardian absence notifications.' },
            { name: 'Teacher Gradebook Sync', detail: 'End-of-term transcript generation and certificate printing.' },
          ],
          telemetry: [
            { label: 'Installment Tracking', value: 'Zero Overlook' },
            { label: 'Sync Status', value: 'Edge-Backed' },
          ],
        },
      },
    },
    problem: {
      badgeTag: 'OPERATIONAL BOTTLENECK',
      diagnosisLabel: 'Field Diagnosis',
      hiddenCostLabel: 'The Hidden Operational Cost',
      safeguardLabel: 'The Atrium Safeguard',
      resolvedLabel: 'Resolved at Edge',
      calloutTitle: 'Field Reality Assessment',
      calloutBody:
        'Scattered WhatsApp messages, manual pen-and-paper registers, and unlinked payment logs create blind spots that bleed profits daily. Atrium eliminates this operational drift.',
      diagnostics: {
        0: {
          hiddenCost: 'Double-booked suites, forgotten VIP preferences, and untracked service add-ons.',
          atriumResolution: 'Every appointment, treatment note, and receipt linked to a unified customer edge profile.',
          metricPill: { label: 'Disorganized Notes', value: '0% Allowed' },
        },
        1: {
          hiddenCost: 'Unnoticed inventory shrinkage and delayed vendor payments that strain cashflow.',
          atriumResolution: 'Reconciled multi-branch register totals updated in real-time on your private mobile dashboard.',
          metricPill: { label: 'Revenue Visibility', value: 'Live Telemetry' },
        },
        2: {
          hiddenCost: 'End-of-month employee frustration, mistrust, and hours wasted arguing over payouts.',
          atriumResolution: 'Every sale automatically applies staff commission rules and logs till handoffs under 90 seconds.',
          metricPill: { label: 'Commission Disputes', value: 'Eliminated' },
        },
        3: {
          hiddenCost: 'Founders trapped on the floor as operators rather than scaling into true owners.',
          atriumResolution: 'Standardized frontline operating procedures that enforce quality and cash control autonomously.',
          metricPill: { label: 'Branch Autonomy', value: 'Multi-Location' },
        },
      },
    },
    shift: {
      badgeTag: 'ARCHITECTURAL ADVANTAGE',
      evolutionLabel: 'SYSTEM EVOLUTION',
      legacyLabel: 'Legacy Disconnected Setup',
      atriumLabel: 'The Atrium Architecture',
      synchronizedLabel: 'Synchronized',
      coreBadge: 'THE UNIFIED ATRIUM CORE: 4 scattered vectors resolve into 1 central real-time truth.',
      comparisons: {
        0: {
          legacyChaos: 'Disjointed apps for register, bookings, and inventory that never sync.',
          atriumClarity: 'One unified operational core where check-ins, bookings, and stock resolve instantly.',
          telemetryStat: { label: 'Sync Latency', value: '< 20ms' },
        },
        1: {
          legacyChaos: 'Blinded until end-of-day bank deposits or manual spreadsheet reconciliation.',
          atriumClarity: 'Live consolidated net revenue, active floor headcount, and till totals on your phone.',
          telemetryStat: { label: 'Real-Time Oversight', value: '100% Live' },
        },
        2: {
          legacyChaos: 'Frontline registers lock up and customers wait during internet outages.',
          atriumClarity: 'Embedded SQLite databases keep every till at full speed offline with zero interruption.',
          telemetryStat: { label: 'Fiber Cut Tolerance', value: 'Unlimited' },
        },
        3: {
          legacyChaos: 'Clunky POS interfaces that require days of employee training and cause register lines.',
          atriumClarity: 'Clean, tactile workflows that staff master in under 15 minutes of onboarding.',
          telemetryStat: { label: 'Staff Onboarding', value: '15 Mins' },
        },
      },
    },
    howItWorks: {
      stepLabel: 'STEP',
      activeWorkflow: 'ACTIVE WORKFLOW',
      canvasHeaderPrefix: 'ATRIUM // WORKSPACE WORKFLOW — STEP',
      engineStatus: 'ENGINE: REAL-TIME OFFLINE + SYNC',
      stepOf: (c, t) => `Step ${c} of ${t}`,
      initTitle: 'INITIALIZATION:',
      initDesc: 'Select trade vertical to generate exact register rules:',
      initLoaded: 'Loaded',
      initStatus: 'Status: Zero manual template coding. Ready in under 120 seconds.',
      initItems: ['Memberships & Classes', 'Appointments & Care', 'Orders & Stock', 'Projects & Studios'],
      pruningTitle: 'ADAPTIVE MOLDING:',
      pruningDesc: 'Irrelevant clutter is pruned. Active commerce modules initialized:',
      pruningRows: [
        { label: 'Hardware Turnstile Controller', status: 'CONNECTED' },
        { label: 'Automated Expiry Alerts (WhatsApp/SMS)', status: 'ARMED' },
        { label: 'Coach & Trainer Shift Quotas', status: 'ENABLED' },
      ],
      floorTitle: 'DAILY FLOOR DESK (SAMPLE DATA):',
      floorDesc: 'Client check-ins, till receipts & staff hours in one tap:',
      floorCheckin: 'Check-in #418 (Amine K.)',
      floorValid: 'VALID • 6-MONTH PASS',
      floorBooking: 'New Session Booking (Coach Yacine)',
      floorBookingAmount: '3,500 DZD',
      floorTillLabel: 'Daily Till Status',
      floorTillStatus: 'Reconciled • 0 DZD shortage',
      branchesTitle: 'CONSOLIDATED TELEMETRY (SAMPLE DATA):',
      branchesDesc: 'Multi-branch revenue without travelling or waiting for midnight calls:',
      branchesCards: [
        { branch: 'ALGIERS (DIDOUCHE)', sample: 'SAMPLE', amount: '142,500 DZD', checkins: '42 check-ins today' },
        { branch: 'ORAN (AKID LOTFI)', sample: 'SAMPLE', amount: '98,200 DZD', checkins: '31 check-ins today' },
      ],
      branchesTotalLabel: 'Total Regional Footprint (Sample)',
      branchesTotalValue: '240,700 DZD (Net Active)',
    },
    verticals: {
      badgeLabel: 'INDUSTRY SPECIFIC WORKFLOW',
      insightLabel: 'Field Operational Insight',
      focusLabel: 'PRIMARY OPERATIONAL FOCUS',
      floorDeskPrefix: 'ATRIUM FLOOR DESK //',
      sampleInterface: 'SAMPLE INTERFACE',
      activityTitle: 'Simulated Activity Stream',
      activities: [
        { label: 'Sample Register Action', status: 'Processed', tone: 'emerald' },
        { label: 'Sample Client Notification', status: 'Dispatched', tone: 'accent' },
        { label: 'Sample Shift Handoff Log', status: 'Reconciled', tone: 'muted' },
      ],
      footerLeft: 'Illustrative sample data',
      footerRight: 'Mode: Offline-First Engine',
    },
    differentiation: {
      pillarPrefix: 'PILLAR',
      calloutTitle: 'Zero Cloud Fragility',
      calloutBody:
        'Atrium treats the cloud as a synchronization convenience, never an existential operational requirement. When fiber cuts occur, your frontline registers stay at full speed without interruptions.',
    },
    dashboard: {
      filters: { all: 'All Vitals', sales: 'Cash & Sales', staff: 'Staff Comms' },
      summaryTitle: 'EXECUTIVE SUMMARY // CONSOLIDATED NETWORK',
      sampleBadge: 'SAMPLE DATA',
      subtitle: 'Live reconciled snapshot from edge SQLite databases',
      cards: [
        {
          id: 'revenue',
          category: 'sales',
          label: "TODAY'S NET REVENUE (SAMPLE)",
          end: 240700,
          duration: 1600,
          delay: 260,
          unit: 'DZD',
          subtext: '↑ +18.4% vs yesterday',
          tone: 'emerald',
        },
        {
          id: 'till',
          category: 'sales',
          label: 'CASH IN TILL (SAMPLE)',
          end: 86400,
          duration: 1400,
          delay: 340,
          unit: 'DZD',
          subtext: 'Zero discrepancy across 3 registers',
          tone: 'muted',
        },
        {
          id: 'floor',
          category: 'staff',
          label: 'ACTIVE CUSTOMERS ON FLOOR (SAMPLE)',
          end: 54,
          duration: 1200,
          delay: 420,
          unit: 'people',
          subtext: 'Peak window: 17:00 – 20:30',
          accent: true,
          tone: 'muted',
        },
        {
          id: 'payroll',
          category: 'staff',
          label: 'AUTOMATED PAYROLL OWED (SAMPLE)',
          end: 34200,
          duration: 1500,
          delay: 500,
          unit: 'DZD',
          subtext: 'Tallied in real-time from services',
          tone: 'accent',
        },
      ],
      tableTitle: 'Live Branch Telemetry (Sample Data)',
      tableHeaders: ['BRANCH LOCATION', 'FLOOR STATUS', 'NETWORK SYNC', 'DAILY GROSS'],
      rows: [
        { branch: 'Branch 01 — Algiers Center', status: '● 28 Active Clients', tone: 'emerald', sync: 'Synchronized (1s ago)', gross: '142,500 DZD' },
        { branch: 'Branch 02 — Oran Waterfront', status: '● 19 Active Clients', tone: 'emerald', sync: 'Synchronized (3s ago)', gross: '76,200 DZD' },
        { branch: 'Branch 03 — Blida Express', status: '● 7 Active Clients', tone: 'amber', sync: 'Offline SQLite Buffer (Ready)', gross: '22,000 DZD' },
      ],
    },
    slider: {
      tag: 'SYSTEM TRANSFORMATION',
      headlinePrimary: 'Before & After',
      headlineAccent: 'Operational Calm',
      subline: 'Move the interactive divider to witness the tangible difference between chaotic point-of-sale friction and unified frontline serenity.',
      eyebrow: 'Interactive Operational Comparison',
      heading: 'Drag the slider to inspect the operational contrast',
      dragHint: 'Drag or use arrow keys',
      ariaLabel: 'Before and after operational comparison slider',
      beforeBadge: 'BEFORE ATRIUM (CLERICAL CHAOS)',
      withBadge: 'WITH ATRIUM (THE UNIFIED DESK)',
      sampleLabel: 'SAMPLE',
      beforeCards: [
        {
          title: 'WHATSAPP VOICE MESSAGES',
          quote: '"Did Karim pay for the 6-month renew or just 1 session? Check the paper register!"',
          footer: 'Trapped in 14 different chat groups • Untracked cash',
        },
        {
          title: 'MANUAL EXCEL SHEET COLLAPSE',
          errorLine: '#REF! Missing formula in Cell D48',
          footer: 'Midnight disputes over practitioner commissions & drawer shortages',
        },
      ],
      withCards: [
        {
          eyebrow: 'SINGLE SOURCE OF TRUTH',
          title: 'Automated Register & Turnstile Log',
          row1L: 'Register 1 (Floor)',
          row1R: 'Synced (0 err)',
          row2L: 'Pass Expiring (Today)',
          row2R: 'SMS Dispatched',
        },
        {
          eyebrow: 'REAL-TIME COMMISSIONS',
          title: 'Instant Staff Reconciliation',
          row1L: 'Dr. Amel B. (Appointments)',
          row1R: '18,400 DZD',
          row2L: 'Cash Drawer Variance',
          row2R: '0.00 DZD',
        },
      ],
      beforeFooter: 'Manual paper records • Revenue blind spots • Constant owner anxiety',
      withFooter: 'Multi-Branch Offline Engine Active • Synchronized across Algiers, Oran & Sétif',
      checks: [
        {
          title: 'Zero Register Blind Spots',
          desc: 'Never stall a client queue due to intermittent Wi-Fi or regional DNS drops. Edge SQLite buffers persist every basket locally.',
        },
        {
          title: 'Automated Shift Reconciliation',
          desc: 'Eliminate paper tally sheets and end-of-day discrepancy panic. Real-time register handoffs reconcile cash in under 90 seconds.',
        },
        {
          title: 'Instant Multi-Branch Visibility',
          desc: 'Command revenue, inventory turnover, and staff commissions across all locations simultaneously from an executive telemetry view.',
        },
      ],
    },
    pricing: {
      guaranteeBadge: 'ZERO RISK GUARANTEE',
      popularBadge: 'MOST POPULAR',
    },
    credibility: {
      subline: 'Designed and architected directly on frontline commerce floors with zero synthetic filler.',
    },
    faq: {
      supportHeading: 'Direct Systems Support',
    },
    finalCta: {
      onboardingLabel: 'CONCIERGE ONBOARDING',
      slotsLabel: 'SLOTS AVAILABLE',
      checks: [
        'White-glove data migration from legacy spreadsheets or old POS systems',
        'On-site staff training and thermal printer configuration',
        'Dedicated direct WhatsApp channel with senior engineering team',
      ],
      responseTime: 'Response within 2 business hours',
    },
    footer: {
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      locationLabel: 'Location',
      locationValue: 'Algiers, Algeria',
      responseLabel: 'Response',
      responseValue: 'Direct WhatsApp line',
      badges: ['Built by From Scratch', 'Desktop & Cloud Hybrid', 'Offline-First Engine'],
    },
  },

  fr: {
    proofStrip: {
      exploreLink: 'Explorer les configurations détaillées',
      viewSpec: 'Voir Fiche Métier',
      domainWorkflowTag: 'FLUX MÉTIER',
      workflowHeading: 'Workflow Opérationnel Terrain',
      readyToDeploy: 'Prêt à Déployer',
      autoLabel: 'AUTO',
      pausedLabel: 'PAUSE',
      enrichments: {
        memberships: {
          stages: [
            { name: 'Contrôle d’Accès NFC Local', detail: 'Autorisation locale du tourniquet en < 25 ms, sans dépendre du cloud.' },
            { name: 'Quotas & Commissions Coachs', detail: 'Les séances pointées calculent automatiquement les paliers de prime.' },
            { name: 'Tampon SQLite Hors-Ligne', detail: 'Renouvellements et ventes enregistrés localement même en cas de coupure.' },
          ],
          telemetry: [
            { label: 'Vitesse Contrôle Accès', value: '18ms' },
            { label: 'Résilience Hors-Ligne', value: 'Garantie 100%' },
          ],
        },
        appointments: {
          stages: [
            { name: 'Planning Fauteuils & Praticiens', detail: 'Grille dynamique évitant tout chevauchement de rendez-vous.' },
            { name: 'Partage Pourboires & Commissions', detail: 'Calcul instantané de la part praticien à chaque prestation clôturée.' },
            { name: 'Historique & Fiches Clients', detail: 'Préférences, formules et notes de soin accessibles en un clic.' },
          ],
          telemetry: [
            { label: 'Clôture de Shift', value: '45 sec' },
            { label: 'Précision Commissions', value: '100.0%' },
          ],
        },
        orders: {
          stages: [
            { name: 'Écran Cuisine Réseau Local (KDS)', detail: 'Routage direct LAN des commandes sans aucune latence internet.' },
            { name: 'Division de Notes & Encaissement', detail: 'Encaissements mixtes rapides sur tables et comptoirs.' },
            { name: 'Déstockage Recettes Temps Réel', detail: 'Déduction dynamique des matières premières avec alertes seuils.' },
          ],
          telemetry: [
            { label: 'Latence Cuisine (KDS)', value: '< 15ms' },
            { label: 'Rotation des Tables', value: '+22%' },
          ],
        },
        projects: {
          stages: [
            { name: 'Jalons & Validations Livrables', detail: 'Chaque étape validée déclenche la facturation correspondante.' },
            { name: 'Suivi des Heures Facturables', detail: 'Ventilation précise du temps équipe sans tableurs dispersés.' },
            { name: 'Traçabilité des Avenants', detail: 'Historique clair des demandes hors forfait approuvées.' },
          ],
          telemetry: [
            { label: 'Pertes Facturation', value: '0%' },
            { label: 'Clarté des Jalons', value: '100% Tracés' },
          ],
        },
        rentals: {
          stages: [
            { name: 'Grille Créneaux Heure / Jour', detail: 'Visibilité immédiate des salles et équipements disponibles.' },
            { name: 'Registre Automatisé des Cautions', detail: 'Suivi rigoureux des dépôts de garantie du check-in au retour.' },
            { name: 'Préparation Entre Réservations', detail: 'Créneaux tampons automatiques pour remise en état.' },
          ],
          telemetry: [
            { label: 'Conflits de Réservation', value: '0 Toléré' },
            { label: 'Traçabilité Cautions', value: 'Vérifiée' },
          ],
        },
        education: {
          stages: [
            { name: 'Inscriptions par Promotions', detail: 'Suivi structuré des échéanciers de frais de scolarité.' },
            { name: 'Pointage & Alertes Parents', detail: 'Feuilles de présence synchronisées avec notification d’absence.' },
            { name: 'Relevés & Attestations', detail: 'Génération fluide des bulletins et certificats de fin de cycle.' },
          ],
          telemetry: [
            { label: 'Suivi des Échéances', value: 'Zéro Oubli' },
            { label: 'Statut Synchro', value: 'Hybride Local' },
          ],
        },
      },
    },
    problem: {
      badgeTag: 'GOULOT OPÉRATIONNEL',
      diagnosisLabel: 'Diagnostic Terrain',
      hiddenCostLabel: 'Le Coût Caché au Quotidien',
      safeguardLabel: 'La Protection Atrium',
      resolvedLabel: 'Résolu en Local',
      calloutTitle: 'Évaluation de Terrain',
      calloutBody:
        'Messages WhatsApp éparpillés, registres papier et journaux de caisse isolés créent des angles morts qui grignotent vos marges chaque jour. Atrium supprime cette dérive.',
      diagnostics: {
        0: {
          hiddenCost: 'Doublons de rendez-vous, préférences VIP oubliées et suppléments non facturés.',
          atriumResolution: 'Chaque prestation, note de soin et reçu est rattaché à une fiche client unifiée.',
          metricPill: { label: 'Fiches Égarées', value: '0% Toléré' },
        },
        1: {
          hiddenCost: 'Démarque inconnue et règlements fournisseurs retardés qui pèsent sur la trésorerie.',
          atriumResolution: 'Totaux de caisses multi-sites consolidés en direct sur votre tableau de bord.',
          metricPill: { label: 'Visibilité Revenus', value: 'En Direct' },
        },
        2: {
          hiddenCost: 'Tensions d’équipe en fin de mois et heures perdues à recalculer les parts.',
          atriumResolution: 'Chaque encaissement applique les règles de commission et clôture le tiroir en 90 s.',
          metricPill: { label: 'Litiges Primes', value: 'Éliminés' },
        },
        3: {
          hiddenCost: 'Le fondateur reste coincé derrière le comptoir au lieu de développer son enseigne.',
          atriumResolution: 'Procédures standardisées garantissant rigueur et contrôle de caisse sur chaque site.',
          metricPill: { label: 'Autonomie Sites', value: 'Multi-Succursales' },
        },
      },
    },
    shift: {
      badgeTag: 'AVANTAGE ARCHITECTURAL',
      evolutionLabel: 'ÉVOLUTION SYSTÈME',
      legacyLabel: 'Ancienne Configuration Isolée',
      atriumLabel: 'L’Architecture Atrium',
      synchronizedLabel: 'Synchronisé',
      coreBadge: 'LE CŒUR UNIFIÉ ATRIUM : 4 flux dispersés convergent vers 1 vérité en temps réel.',
      comparisons: {
        0: {
          legacyChaos: 'Outils séparés pour caisse, réservations et stock qui ne se parlent jamais.',
          atriumClarity: 'Un seul cœur opérationnel où ventes, présences et stocks se mettent à jour ensemble.',
          telemetryStat: { label: 'Latence Synchro', value: '< 20ms' },
        },
        1: {
          legacyChaos: 'Aucune visibilité avant le recomptage tardif du tiroir ou le fichier Excel du soir.',
          atriumClarity: 'Recette nette, affluence en salle et état de caisse consolidés sur votre mobile.',
          telemetryStat: { label: 'Pilotage Live', value: '100% Direct' },
        },
        2: {
          legacyChaos: 'Les caisses se figent et la file d’attente s’allonge dès que l’ADSL coupe.',
          atriumClarity: 'Base SQLite embarquée maintenant chaque poste à pleine vitesse même hors-ligne.',
          telemetryStat: { label: 'Tolérance Coupures', value: 'Illimitée' },
        },
        3: {
          legacyChaos: 'Logiciels lourds exigeant des jours de formation et ralentissant le comptoir.',
          atriumClarity: 'Interface épurée prise en main par vos équipes en moins de 15 minutes.',
          telemetryStat: { label: 'Prise en Main', value: '15 Min' },
        },
      },
    },
    howItWorks: {
      stepLabel: 'ÉTAPE',
      activeWorkflow: 'MODULE ACTIF',
      canvasHeaderPrefix: 'ATRIUM // WORKSPACE — ÉTAPE',
      engineStatus: 'MOTEUR : HORS-LIGNE + SYNCHRO',
      stepOf: (c, t) => `Étape ${c} sur ${t}`,
      initTitle: 'INITIALISATION :',
      initDesc: 'Sélectionnez votre secteur pour générer les règles de caisse :',
      initLoaded: 'Chargé',
      initStatus: 'Statut : Zéro paramétrage complexe. Opérationnel en moins de 120 s.',
      initItems: ['Abonnements & Séances', 'Soins & Rendez-vous', 'Commandes & Stock', 'Projets & Studios'],
      pruningTitle: 'MODULATION ADAPTATIVE :',
      pruningDesc: 'Les options inutiles sont masquées. Modules actifs initialisés :',
      pruningRows: [
        { label: 'Contrôleur Tourniquet Matériel', status: 'CONNECTÉ' },
        { label: 'Alertes Échéances (WhatsApp / SMS)', status: 'ARMÉ' },
        { label: 'Quotas & Commissions Coachs', status: 'ACTIF' },
      ],
      floorTitle: 'POSTE D’ACCUEIL (EXEMPLE) :',
      floorDesc: 'Passages clients, reçus de caisse et shifts en un geste :',
      floorCheckin: 'Passage #418 (Amine K.)',
      floorValid: 'VALIDE • PASS 6 MOIS',
      floorBooking: 'Nouvelle Séance (Coach Yacine)',
      floorBookingAmount: '3 500 DZD',
      floorTillLabel: 'État du Tiroir',
      floorTillStatus: 'Réconcilié • 0 DZD d’écart',
      branchesTitle: 'TÉLÉMÉTRIE CONSOLIDÉE (EXEMPLE) :',
      branchesDesc: 'Chiffre d’affaires multi-sites sans déplacements ni appels nocturnes :',
      branchesCards: [
        { branch: 'ALGER (DIDOUCHE)', sample: 'EXEMPLE', amount: '142 500 DZD', checkins: '42 passages aujourd’hui' },
        { branch: 'ORAN (AKID LOTFI)', sample: 'EXEMPLE', amount: '98 200 DZD', checkins: '31 passages aujourd’hui' },
      ],
      branchesTotalLabel: 'Empreinte Régionale Totale (Exemple)',
      branchesTotalValue: '240 700 DZD (Net Actif)',
    },
    verticals: {
      badgeLabel: 'WORKFLOW SPÉCIFIQUE AU MÉTIER',
      insightLabel: 'Constat Opérationnel Terrain',
      focusLabel: 'PRIORITÉ OPÉRATIONNELLE',
      floorDeskPrefix: 'POSTE ATRIUM //',
      sampleInterface: 'APERÇU EXEMPLE',
      activityTitle: 'Flux d’Activité Simulé',
      activities: [
        { label: 'Exemple Opération Caisse', status: 'Validé', tone: 'emerald' },
        { label: 'Exemple Notification Client', status: 'Envoyé', tone: 'accent' },
        { label: 'Exemple Clôture de Shift', status: 'Réconcilié', tone: 'muted' },
      ],
      footerLeft: 'Données illustratives',
      footerRight: 'Mode : Moteur Hors-Ligne',
    },
    differentiation: {
      pillarPrefix: 'PILIER',
      calloutTitle: 'Zéro Fragilité Cloud',
      calloutBody:
        'Atrium utilise le cloud comme commodité de synchronisation, jamais comme contrainte vitale. Lorsqu’une coupure fibre survient, vos caisses gardent leur vitesse nominale sans aucune interruption.',
    },
    dashboard: {
      filters: { all: 'Tous les Indicateurs', sales: 'Caisse & Ventes', staff: 'Équipes & Flux' },
      summaryTitle: 'SYNTHÈSE DIRECTION // RÉSEAU CONSOLIDÉ',
      sampleBadge: 'EXEMPLE',
      subtitle: 'Instantané réconcilié depuis vos bases locales SQLite',
      cards: [
        {
          id: 'revenue',
          category: 'sales',
          label: 'RECETTE NETTE DU JOUR (EXEMPLE)',
          end: 240700,
          duration: 1600,
          delay: 260,
          unit: 'DZD',
          subtext: '↑ +18,4% vs hier',
          tone: 'emerald',
        },
        {
          id: 'till',
          category: 'sales',
          label: 'ESPÈCES EN TIROIR (EXEMPLE)',
          end: 86400,
          duration: 1400,
          delay: 340,
          unit: 'DZD',
          subtext: 'Zéro écart sur 3 caisses',
          tone: 'muted',
        },
        {
          id: 'floor',
          category: 'staff',
          label: 'CLIENTS PRÉSENTS SUR PLACE (EXEMPLE)',
          end: 54,
          duration: 1200,
          delay: 420,
          unit: 'pers.',
          subtext: 'Pic d’affluence : 17:00 – 20:30',
          accent: true,
          tone: 'muted',
        },
        {
          id: 'payroll',
          category: 'staff',
          label: 'COMMISSIONS & PAIE DUES (EXEMPLE)',
          end: 34200,
          duration: 1500,
          delay: 500,
          unit: 'DZD',
          subtext: 'Calculées en temps réel par service',
          tone: 'accent',
        },
      ],
      tableTitle: 'Télémétrie des Succursales (Données Exemples)',
      tableHeaders: ['SUCCURSALE', 'ACTIVITÉ SALLE', 'SYNCHRO RÉSEAU', 'BRUT DU JOUR'],
      rows: [
        { branch: 'Site 01 — Alger Centre', status: '● 28 Clients Actifs', tone: 'emerald', sync: 'Synchronisé (il y a 1s)', gross: '142 500 DZD' },
        { branch: 'Site 02 — Oran Front de Mer', status: '● 19 Clients Actifs', tone: 'emerald', sync: 'Synchronisé (il y a 3s)', gross: '76 200 DZD' },
        { branch: 'Site 03 — Blida Express', status: '● 7 Clients Actifs', tone: 'amber', sync: 'Tampon SQLite Hors-Ligne (Prêt)', gross: '22 000 DZD' },
      ],
    },
    slider: {
      tag: 'TRANSFORMATION SYSTÈME',
      headlinePrimary: 'Avant & Après',
      headlineAccent: 'Sérénité Opérationnelle',
      subline: 'Déplacez le curseur interactif pour mesurer l’écart concret entre la friction des outils manuels et la fluidité d’un poste unifié.',
      eyebrow: 'Comparatif Interactif sur le Terrain',
      heading: 'Glissez le curseur pour comparer les opérations',
      dragHint: 'Glissez ou utilisez les flèches',
      ariaLabel: 'Curseur comparatif avant et après Atrium',
      beforeBadge: 'AVANT ATRIUM (CHAOS MANUEL)',
      withBadge: 'AVEC ATRIUM (POSTE UNIFIÉ)',
      sampleLabel: 'EXEMPLE',
      beforeCards: [
        {
          title: 'VOCAUX WHATSAPP ÉPARPILLÉS',
          quote: '« Karim a payé pour 6 mois ou juste 1 séance ? Vérifie sur le cahier papier ! »',
          footer: 'Dispersé dans 14 discussions • Espèces non tracées',
        },
        {
          title: 'TABLEURS EXCEL FRAGILES',
          errorLine: '#REF! Formule manquante en cellule D48',
          footer: 'Litiges tardifs sur les commissions et écarts de caisse',
        },
      ],
      withCards: [
        {
          eyebrow: 'SOURCE DE VÉRITÉ UNIQUE',
          title: 'Journal Caisse & Accès Automatisé',
          row1L: 'Caisse 1 (Accueil)',
          row1R: 'Synchro (0 err)',
          row2L: 'Pass expirant (Jour)',
          row2R: 'SMS Envoyé',
        },
        {
          eyebrow: 'COMMISSIONS EN DIRECT',
          title: 'Rapprochement Équipe Instantané',
          row1L: 'Dr. Amel B. (Soins)',
          row1R: '18 400 DZD',
          row2L: 'Écart Tiroir Caisse',
          row2R: '0,00 DZD',
        },
      ],
      beforeFooter: 'Registres papier • Angles morts financiers • Stress permanent du gérant',
      withFooter: 'Moteur Hors-Ligne Multi-Sites Actif • Synchronisé Alger, Oran & Sétif',
      checks: [
        {
          title: 'Zéro Angle Mort en Caisse',
          desc: 'Ne bloquez jamais une file d’attente lors d’une coupure Wi-Fi. La base locale SQLite enregistre chaque panier instantanément.',
        },
        {
          title: 'Clôture de Shift Automatisée',
          desc: 'Supprimez les feuilles de comptage papier. Les passations de caisse se réconcilient en moins de 90 secondes.',
        },
        {
          title: 'Visibilité Multi-Sites Instantanée',
          desc: 'Pilotez chiffre d’affaires, rotation des stocks et commissions sur tous vos établissements depuis une console unique.',
        },
      ],
    },
    pricing: {
      guaranteeBadge: 'GARANTIE ZÉRO RISQUE',
      popularBadge: 'LE PLUS CHOISI',
    },
    credibility: {
      subline: 'Conçu et éprouvé directement sur le terrain commercial, sans remplissage artificiel.',
    },
    faq: {
      supportHeading: 'Support Ingénierie Direct',
    },
    finalCta: {
      onboardingLabel: 'ACCOMPAGNEMENT DÉDIÉ',
      slotsLabel: 'CRÉNEAUX DISPONIBLES',
      checks: [
        'Migration accompagnée depuis vos fichiers Excel ou anciennes caisses',
        'Formation des équipes sur place et configuration des imprimantes thermiques',
        'Canal WhatsApp direct avec l’équipe d’ingénieurs seniors',
      ],
      responseTime: 'Réponse sous 2 heures ouvrées',
    },
    footer: {
      emailLabel: 'Email',
      phoneLabel: 'Téléphone',
      locationLabel: 'Localisation',
      locationValue: 'Alger, Algérie',
      responseLabel: 'Réponse',
      responseValue: 'Ligne directe WhatsApp',
      badges: ['Conçu par From Scratch', 'Hybride Bureau & Cloud', 'Moteur Hors-Ligne'],
    },
  },

  ar: {
    proofStrip: {
      exploreLink: 'استكشف التفاصيل التفاعلية للقطاعات',
      viewSpec: 'عرض المواصفات',
      domainWorkflowTag: 'مسار القطاع',
      workflowHeading: 'سير العمل الميداني في الاستقبال',
      readyToDeploy: 'جاهز للتشغيل',
      autoLabel: 'تلقائي',
      pausedLabel: 'متوقف',
      enrichments: {
        memberships: {
          stages: [
            { name: 'بوابات NFC محلية فائقة السرعة', detail: 'تحقق محلي من البطاقة في أقل من 25 مللي ثانية دون انتظار السحابة.' },
            { name: 'حصص وعمولات المدربين الآلية', detail: 'تُحتسب نسبة كل حصة حضور ضمن مستحقات المدرب لحظياً.' },
            { name: 'مخزن SQLite محلي للطوارئ', detail: 'تستمر التجديدات والمبيعات بسلاسة تامة عند انقطاع الإنترنت.' },
          ],
          telemetry: [
            { label: 'سرعة تسجيل الدخول', value: '18ms' },
            { label: 'الاستمرارية دون إنترنت', value: 'مضمونة 100%' },
          ],
        },
        appointments: {
          stages: [
            { name: 'جدولة المقاعد والمختصين', detail: 'مصفوفة مواعيد تمنع التضارب أو الحجز المزدوج للغرف.' },
            { name: 'تقسيم الإكراميات والنسب فوراً', detail: 'حساب تلقائي لنسبة المصفف أو الطبيب فور إنهاء الخدمة.' },
            { name: 'استرجاع ملف وتفضيلات العميل', detail: 'ملاحظات الجلسات والوصفات السابقة متوفرة بلمح البصر.' },
          ],
          telemetry: [
            { label: 'إغلاق الوردية', value: '45 ثانية' },
            { label: 'دقة حساب النسب', value: '100.0%' },
          ],
        },
        orders: {
          stages: [
            { name: 'شاشة المطبخ المحلية (KDS)', detail: 'توجيه الطلبات عبر الشبكة الداخلية دون الاعتماد على الإنترنت.' },
            { name: 'تقسيم الفواتير وسرعة الكاشير', detail: 'إدارة مرنة للطاولات وتعدد طرق الدفع في شاشة واحدة.' },
            { name: 'خصم المكونات والمخزون لحظياً', detail: 'جرد آلي للمواد الأولية مع تنبيهات فورية عند انخفاض الرصيد.' },
          ],
          telemetry: [
            { label: 'زمن وصول الطلب للمطبخ', value: '< 15ms' },
            { label: 'سرعة دوران الطاولات', value: '+22%' },
          ],
        },
        projects: {
          stages: [
            { name: 'اعتماد المراحل والمخرجات', detail: 'ربط كل مرحلة تسليم بموافقة العميل وإصدار الفاتورة تلقائياً.' },
            { name: 'توزيع ساعات الفريق بدقة', detail: 'تتبع ساعات المصممين والمهندسين دون الحاجة لجداول متفرقة.' },
            { name: 'ضبط التعديلات الإضافية', detail: 'توثيق الطلبات الجديدة مقارنة بنطاق العقد المعتمد.' },
          ],
          telemetry: [
            { label: 'تسرب الفوترة', value: '0%' },
            { label: 'وضوح المراحل', value: 'موثق 100%' },
          ],
        },
        rentals: {
          stages: [
            { name: 'شبكة الحجز بالساعة واليوم', detail: 'رؤية واضحة لإشغال القاعات والمعدات تمنع أي تداخل.' },
            { name: 'سجل آلي لودائع الضمان', detail: 'ضبط كامل لمبالغ التأمين من لحظة الاستلام حتى الإرجاع.' },
            { name: 'جاهزية الصيانة بين الحجوزات', detail: 'تخصيص تلقائي لفواصل التجهيز والنظافة بين المستأجرين.' },
          ],
          telemetry: [
            { label: 'تضارب المواعيد', value: '0 مسموح' },
            { label: 'تتبع التأمينات', value: 'موثق ومضبوط' },
          ],
        },
        education: {
          stages: [
            { name: 'تسجيل الأفواج والدفعات', detail: 'جدولة منظمة لأقساط الرسوم الدراسية وتنبيهات الاستحقاق.' },
            { name: 'سجلات الحضور وإشعارات الأولياء', detail: 'توثيق الغياب لحظياً مع رسائل تلقائية لمتابعة الطالب.' },
            { name: 'كشوف النقاط والشهادات', detail: 'توليد سريع لكشوف العلامات وشهادات التخرج نهاية الدورة.' },
          ],
          telemetry: [
            { label: 'متابعة الأقساط', value: 'دون نسيان' },
            { label: 'المزامنة', value: 'محلي + سحابي' },
          ],
        },
      },
    },
    problem: {
      badgeTag: 'اختناق تشغيلي',
      diagnosisLabel: 'تشخيص ميداني',
      hiddenCostLabel: 'التكلفة التشغيلية الخفية',
      safeguardLabel: 'حماية أتريوم الميدانية',
      resolvedLabel: 'يعالج محلياً',
      calloutTitle: 'تقييم الواقع الميداني',
      calloutBody:
        'رسائل واتساب المبعثرة، والدفاتر الورقية، وسجلات الدفع المنعزلة تخلق نقاطاً عمياء تستنزف أرباحك يومياً. أتريوم ينهي هذا التشتت.',
      diagnostics: {
        0: {
          hiddenCost: 'حجوزات متداخلة، نسيان تفضيلات الزبائن المميزين، وخدمات إضافية غير مسجلة.',
          atriumResolution: 'ربط كل موعد وملاحظة وإيصال بملف عميل موحد متاح لحظياً على الجهاز.',
          metricPill: { label: 'السجلات الضائعة', value: '0% مسموح' },
        },
        1: {
          hiddenCost: 'نواقص غير مكتشفة في المخزون وتأخر مستحقات الموردين بما يرهق السيولة.',
          atriumResolution: 'مطابقة لحظية لمجاميع الصناديق عبر جميع الفروع على هاتفك الخاص.',
          metricPill: { label: 'وضوح المداخيل', value: 'مباشر ولحظي' },
        },
        2: {
          hiddenCost: 'توترات نهاية الشهر مع الفريق وساعات مهدرة في مراجعة الأجور والعمولات.',
          atriumResolution: 'تُطبّق قواعد العمولات تلقائياً مع كل بيع وتُغلق الوردية في أقل من 90 ثانية.',
          metricPill: { label: 'نزاعات النسب', value: 'منتهية تماماً' },
        },
        3: {
          hiddenCost: 'بقاء المؤسس محاصراً في العمل اليومي بدل التفرغ للتوسع وبناء الفروع.',
          atriumResolution: 'إجراءات موحدة تضمن الجودة والانضباط المالي في كل فرع باستقلالية تامة.',
          metricPill: { label: 'استقلالية الفروع', value: 'متعدد المواقع' },
        },
      },
    },
    shift: {
      badgeTag: 'ميزة معمارية',
      evolutionLabel: 'تطور النظام',
      legacyLabel: 'النظام القديم المشتت',
      atriumLabel: 'معمارية أتريوم الموحدة',
      synchronizedLabel: 'متزامن لحظياً',
      coreBadge: 'نواة أتريوم الموحدة: 4 مسارات مبعثرة تلتقي في حقيقة واحدة لحظية.',
      comparisons: {
        0: {
          legacyChaos: 'تطبيقات منفصلة للكاشير، المواعيد، والمخزون لا تتزامن أبداً.',
          atriumClarity: 'نواة تشغيل موحدة تتحدث فيها نقاط البيع والحجوزات والمخزون فورياً.',
          telemetryStat: { label: 'زمن المزامنة', value: '< 20ms' },
        },
        1: {
          legacyChaos: 'غياب الرؤية حتى نهاية اليوم وجمع الجداول الورقية يدوياً.',
          atriumClarity: 'صافي الدخل، الحضور الفعلي ورصيد الصندوق مجتمعة على هاتفك لحظياً.',
          telemetryStat: { label: 'الإشراف المباشر', value: '100% حي' },
        },
        2: {
          legacyChaos: 'توقف نقاط البيع وانتظار الزبائن عند انقطاع الاتصال بالشبكة.',
          atriumClarity: 'قواعد SQLite مدمجة تبقي الكاشير بأقصى سرعة دون إنترنت وبلا انقطاع.',
          telemetryStat: { label: 'تحمل الانقطاع', value: 'غير محدود' },
        },
        3: {
          legacyChaos: 'واجهات معقدة تتطلب أياماً لتدريب الموظفين وتبطئ الطوابير.',
          atriumClarity: 'تدفق عمل بسيط وواضح يتقنه الطاقم في أقل من 15 دقيقة.',
          telemetryStat: { label: 'تدريب الفريق', value: '15 دقيقة' },
        },
      },
    },
    howItWorks: {
      stepLabel: 'الخطوة',
      activeWorkflow: 'المسار النشط',
      canvasHeaderPrefix: 'أتريوم // بيئة العمل — الخطوة',
      engineStatus: 'المحرك: محلي + مزامنة فورية',
      stepOf: (c, t) => `الخطوة ${c} من ${t}`,
      initTitle: 'التهيئة الأولية:',
      initDesc: 'اختر قطاع نشاطك لتوليد قواعد الكاشير المناسبة:',
      initLoaded: 'جاهز',
      initStatus: 'الحالة: بدون أي برمجة يدوية. جاهز في أقل من دقيقتين.',
      initItems: ['الاشتراكات والحصص', 'المواعيد والعناية', 'الطلبات والمخزون', 'المشاريع والاستوديوهات'],
      pruningTitle: 'التكييف الذكي:',
      pruningDesc: 'تُحذف العناصر غير اللازمة وتُفعّل وحدات نشاطك فقط:',
      pruningRows: [
        { label: 'متحكم بوابات الدخول (Hardware)', status: 'متصل' },
        { label: 'تنبيهات التجديد (واتساب / SMS)', status: 'مفعّل' },
        { label: 'حصص وعمولات المدربين', status: 'نشط' },
      ],
      floorTitle: 'مكتب الاستقبال اليومي (نموذج):',
      floorDesc: 'تسجيل الزبائن، الإيصالات وساعات الفريق بنقرة واحدة:',
      floorCheckin: 'دخول #418 (أمين ك.)',
      floorValid: 'ساري • اشتراك 6 أشهر',
      floorBooking: 'حجز حصة جديدة (المدرب ياسين)',
      floorBookingAmount: '3,500 دج',
      floorTillLabel: 'حالة الصندوق اليومي',
      floorTillStatus: 'مطابق • 0 دج فارق',
      branchesTitle: 'لوحة الفروع الموحدة (نموذج):',
      branchesDesc: 'مداخيل كل الفروع دون الحاجة للتنقل أو اتصالات منتصف الليل:',
      branchesCards: [
        { branch: 'الجزائر (ديدوش مراد)', sample: 'نموذج', amount: '142,500 دج', checkins: '42 عملية دخول اليوم' },
        { branch: 'وهران (عقيد لطفي)', sample: 'نموذج', amount: '98,200 دج', checkins: '31 عملية دخول اليوم' },
      ],
      branchesTotalLabel: 'الإجمالي الإقليمي (بيانات نموذجية)',
      branchesTotalValue: '240,700 دج (صافي نشط)',
    },
    verticals: {
      badgeLabel: 'مسار مخصص للقطاع',
      insightLabel: 'ملاحظة من الميدان',
      focusLabel: 'التركيز التشغيلي الأساسي',
      floorDeskPrefix: 'مكتب أتريوم //',
      sampleInterface: 'واجهة نموذجية',
      activityTitle: 'تدفق النشاط الافتراضي',
      activities: [
        { label: 'عملية كاشير نموذجية', status: 'معتمدة', tone: 'emerald' },
        { label: 'إشعار زبون تلقائي', status: 'مُرسل', tone: 'accent' },
        { label: 'سجل تسليم الوردية', status: 'مطابق', tone: 'muted' },
      ],
      footerLeft: 'بيانات توضيحية نموذجية',
      footerRight: 'الوضع: محرك دون إنترنت',
    },
    differentiation: {
      pillarPrefix: 'ركيزة',
      calloutTitle: 'صفر هشاشة سحابية',
      calloutBody:
        'يتعامل أتريوم مع السحابة كوسيلة مزامنة ومراقبة، لا كشرط لتشغيل المحل. عند انقطاع الإنترنت تواصل صناديق البيع العمل بكامل سرعتها.',
    },
    dashboard: {
      filters: { all: 'كل المؤشرات', sales: 'الصندوق والمبيعات', staff: 'الفريق والحضور' },
      summaryTitle: 'الملخص التنفيذي // الشبكة الموحدة',
      sampleBadge: 'بيانات نموذجية',
      subtitle: 'لقطة متطابقة لحظياً من قواعد البيانات المحلية',
      cards: [
        {
          id: 'revenue',
          category: 'sales',
          label: 'صافي مداخيل اليوم (نموذج)',
          end: 240700,
          duration: 1600,
          delay: 260,
          unit: 'دج',
          subtext: '↑ +18.4% مقارنة بالأمس',
          tone: 'emerald',
        },
        {
          id: 'till',
          category: 'sales',
          label: 'السيولة في الصناديق (نموذج)',
          end: 86400,
          duration: 1400,
          delay: 340,
          unit: 'دج',
          subtext: 'صفر فوارق عبر 3 صناديق',
          tone: 'muted',
        },
        {
          id: 'floor',
          category: 'staff',
          label: 'الزبائن المتواجدون حالياً (نموذج)',
          end: 54,
          duration: 1200,
          delay: 420,
          unit: 'زبون',
          subtext: 'ساعة الذروة: 17:00 – 20:30',
          accent: true,
          tone: 'muted',
        },
        {
          id: 'payroll',
          category: 'staff',
          label: 'العمولات والأجور المستحقة (نموذج)',
          end: 34200,
          duration: 1500,
          delay: 500,
          unit: 'دج',
          subtext: 'محسوبة آلياً من الخدمات المنجزة',
          tone: 'accent',
        },
      ],
      tableTitle: 'تتبع الفروع المباشر (بيانات نموذجية)',
      tableHeaders: ['الفرع والموقع', 'حالة القاعة', 'حالة المزامنة', 'إجمالي اليوم'],
      rows: [
        { branch: 'الفرع 01 — الجزائر الوسطى', status: '● 28 زبوناً نشطاً', tone: 'emerald', sync: 'متزامن (منذ 1 ثا)', gross: '142,500 دج' },
        { branch: 'الفرع 02 — واجهة وهران', status: '● 19 زبوناً نشطاً', tone: 'emerald', sync: 'متزامن (منذ 3 ثا)', gross: '76,200 دج' },
        { branch: 'الفرع 03 — البليدة إكسبرس', status: '● 7 زبائن نشطين', tone: 'amber', sync: 'مخزن محلي SQLite (جاهز)', gross: '22,000 دج' },
      ],
    },
    slider: {
      tag: 'التحول التشغيلي',
      headlinePrimary: 'قبل وبعد',
      headlineAccent: 'هدوء العمليات',
      subline: 'حرّك المؤشر التفاعلي لترى الفارق الملموس بين فوضى التتبع اليدوي وسلاسة المكتب الموحد.',
      eyebrow: 'المقارنة الميدانية التفاعلية',
      heading: 'اسحب المؤشر لمعاينة الفارق التشغيلي',
      dragHint: 'اسحب أو استخدم الأسهم',
      ariaLabel: 'مؤشر المقارنة بين الوضع اليدوي ونظام أتريوم',
      beforeBadge: 'قبل أتريوم (فوضى التشتت)',
      withBadge: 'مع أتريوم (المكتب الموحد)',
      sampleLabel: 'نموذج',
      beforeCards: [
        {
          title: 'رسائل واتساب المبعثرة',
          quote: '«هل دفع كريم اشتراك 6 أشهر أم حصة واحدة؟ راجع الدفتر الورقي!»',
          footer: 'مشتت بين 14 مجموعة محادثة • نقد غير موثق',
        },
        {
          title: 'انهيار ملفات إكسل اليدوية',
          errorLine: '#REF! معادلة مفقودة في الخلية D48',
          footer: 'خلافات منتصف الليل حول عمولات الطاقم ونواقص الصندوق',
        },
      ],
      withCards: [
        {
          eyebrow: 'مصدر حقيقة واحد',
          title: 'سجل الكاشير والبوابات الآلي',
          row1L: 'صندوق 1 (الاستقبال)',
          row1R: 'متزامن (0 أخطاء)',
          row2L: 'اشتراك ينتهي اليوم',
          row2R: 'أُرسل تنبيه SMS',
        },
        {
          eyebrow: 'العمولات لحظياً',
          title: 'تسوية فورية لمستحقات الطاقم',
          row1L: 'د. أمال ب. (المواعيد)',
          row1R: '18,400 دج',
          row2L: 'فارق درج النقد',
          row2R: '0.00 دج',
        },
      ],
      beforeFooter: 'دفاتر ورقية • نقاط عمياء مالية • توتر دائم للمالك',
      withFooter: 'محرك دون إنترنت متعدد الفروع • متزامن بين الجزائر، وهران وسطيف',
      checks: [
        {
          title: 'صفر نقاط عمياء في الصندوق',
          desc: 'لا تعطل طابور الزبائن بسبب تذبذب الشبكة. قواعد SQLite المحلية تحفظ كل فاتورة بأمان تام.',
        },
        {
          title: 'إغلاق ومطابقة الورديات آلياً',
          desc: 'تخلص من أوراق الجرد وقلق نهاية اليوم. تسليم العهدة المالية يتم ومطابقته في أقل من 90 ثانية.',
        },
        {
          title: 'رؤية فورية لكل الفروع',
          desc: 'تابع المبيعات، دوران المخزون، وعمولات الموظفين عبر جميع المواقع في وقت واحد من شاشة واحدة.',
        },
      ],
    },
    pricing: {
      guaranteeBadge: 'ضمان بدون مخاطرة',
      popularBadge: 'الأكثر اختياراً',
    },
    credibility: {
      subline: 'صُمم وهُندس مباشرة داخل بيئات العمل التجارية دون أي حشو نظري.',
    },
    faq: {
      supportHeading: 'دعم هندسي مباشر',
    },
    finalCta: {
      onboardingLabel: 'مرافقة ميدانية شاملة',
      slotsLabel: 'مواعيد متاحة',
      checks: [
        'نقل احترافي لبياناتك من ملفات إكسل أو الأنظمة القديمة',
        'تدريب الطاقم ميدانياً وضبط طابعات الإيصالات الحرارية',
        'قناة واتساب مباشرة مع فريق المهندسين المتخصصين',
      ],
      responseTime: 'استجابة خلال ساعتين في أوقات العمل',
    },
    footer: {
      emailLabel: 'البريد الإلكتروني',
      phoneLabel: 'الهاتف',
      locationLabel: 'المقر',
      locationValue: 'الجزائر العاصمة، الجزائر',
      responseLabel: 'الاستجابة',
      responseValue: 'خط واتساب مباشر',
      badges: ['تطوير فروم سكراتش', 'هجين: مكتبي وسحابي', 'يعمل دون إنترنت'],
    },
  },
};
