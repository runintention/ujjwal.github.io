import { PortfolioProject, ClientTestimonial } from '../types';

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'dentacure-same-day-implant',
    title: 'One Day Is All It Takes To Restore Your Smile',
    client: 'Denta Cure',
    category: 'paid-ads',
    duration: '00:16',
    resolution: '9:16 Vertical · 4K UHD',
    viewsMetric: '1.24M Views',
    retentionMetric: '84.2% Hook Rate',
    tagline: 'High-converting clinical patient acquisition reel engineered for same-day dental implants.',
    description: 'Transforming clinical dental surgery into an immediate, high-trust patient conversion reel. Featuring direct-to-camera clinical authority, on-screen kinetic hook typography, and seamless surgery workflow proof.',
    image: '/images/dentacure_same_day_implant_poster_1792352905275.jpg',
    videoUrl: '/dentacure_same_day_implant.mp4',
    editorNotes: {
      hookStrategy: 'Immediate 1-second value proposition with bold kinetic typography & clinical authority',
      pacingBPM: 'Rhythmic pattern interrupts highlighting sterilization facility and 3D panoramic imaging',
      soundLayers: 'Crisp clinical audio mastering with subtle ambient warmth and binaural score',
      colorProfile: 'Clean medical grade: crisp whites, saturated cobalt scrubs, balanced clinical warmth',
    },
    keyTimestamps: [
      { time: '00:00', label: 'Hook: One Day Is All It Takes' },
      { time: '00:04', label: 'Problem: Why Wait Months?' },
      { time: '00:08', label: 'Solution: Latest Digital Technology & Sterilization Room' },
      { time: '00:12', label: 'Outcome: Natural Looking Result & Smile' }
    ]
  },
  {
    id: 'athletic-hyper-hook',
    title: 'Apex V2 Velocity: 0-60 in High-Rep Energy',
    client: 'Kinetics Athletic Wear',
    category: 'paid-ads',
    duration: '00:32',
    resolution: '9:16 Vertical · 4K UHD',
    viewsMetric: '5.1M Paid Impressions',
    retentionMetric: '81.2% Hook Rate (3s)',
    roasMetric: '5.4x Attributed ROAS',
    tagline: 'High-octane Meta & TikTok performance creative engineered for sub-second thumb stopping.',
    description: 'Engineered specifically for short attention spans on TikTok and Instagram Reels. Built with 120fps speed ramps, custom bass impact transients, rhythmic micro-glitches, and bold localized subtitles.',
    image: '/images/portfolio_shortform_hook_1792097292857.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    editorNotes: {
      hookStrategy: 'Foot plant impact timed to instant 40Hz sub-drop and neon chromatic aberration',
      pacingBPM: '138 BPM tempo-locked cuts matching the music drop sequence',
      soundLayers: 'Custom foley: shoe squeak, heavy breathing, stadium ambience & whoosh transitions',
      colorProfile: 'Vibrant punch grade with saturated cobalt blues and warm tungsten rim highlights',
    },
    keyTimestamps: [
      { time: '00:00', label: 'High-Grit Footstep Hook' },
      { time: '00:08', label: 'Split-Screen Material Durability' },
      { time: '00:19', label: 'Customer Proof & Real Field Test' },
      { time: '00:28', label: 'Urgency CTA & Offer Display' }
    ]
  },
  {
    id: 'master-horologist',
    title: 'The Art of Hundredths: Horology Master',
    client: 'Chronométrie Vaneau Paris',
    category: 'brand-films',
    duration: '04:15',
    resolution: 'Cinema 4K · 24 FPS',
    viewsMetric: '890K Organic Views',
    retentionMetric: '73.8% Full Completion',
    tagline: 'Award-winning luxury launch film highlighting hand-turned micro gears and Parisian heritage.',
    description: 'Directed and edited as an ode to mechanical timelessness. We orchestrated macro extreme close-ups, delicate mechanical watch foley, natural ambient lighting, and bespoke orchestral pacing.',
    image: '/images/portfolio_doc_cinematic_1792097289919.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    editorNotes: {
      hookStrategy: 'Single ticking escapement wheel with macro focus rack and silence into heavy chime',
      pacingBPM: 'Deliberate meditative cuts with match-on-action transitions',
      soundLayers: 'Binaural mechanical ticking, velvet brush strokes, wooden bench creaks',
      colorProfile: 'Warm amber DaVinci film look, lifted shadows with rich chocolate tones',
    },
    keyTimestamps: [
      { time: '00:00', label: 'The Solitary Workshop at Dawn' },
      { time: '01:10', label: '0.02mm Tolerance Assembly' },
      { time: '02:45', label: 'The Escapement Spring Tension' },
      { time: '03:50', label: 'Finished Timepiece Reveal' }
    ]
  },
  {
    id: 'founder-vsl-authority',
    title: 'The Modern Dental Acquisition Funnel',
    client: 'Dr. Michael Sterling, DDS',
    category: 'talking-head',
    duration: '11:20',
    resolution: '4K UHD · 30 FPS',
    viewsMetric: '$320K Added Procedures',
    retentionMetric: '64.5% Retention to Pitch',
    roasMetric: '6.1x Return on Funnel',
    tagline: 'High-ticket clinical patient acquisition video engineered to filter and book high-value cases.',
    description: 'Turned a medical founder speaking to a teleprompter into an authoritative, charismatic market authority. We removed speech disfluencies, reframed angles between 2 camera cuts, and layered subtle ambient studio sound design.',
    image: '/images/portfolio_hero_showreel_1792097289174.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    editorNotes: {
      hookStrategy: 'The $30,000 Patient Problem: Direct eye contact + problem illustration callout',
      pacingBPM: 'Seamless J-cuts and L-cuts to maintain natural conversational momentum',
      soundLayers: 'Surgical dialogue restoration: De-reverb, spectral repair, warmth curve boost',
      colorProfile: 'Clean clinical high-end tone: Pristine whites, natural skin tones, zero green cast',
    },
    keyTimestamps: [
      { time: '00:00', label: 'The Broken Clinic Model' },
      { time: '03:12', label: 'Predictable Patient Acquisition System' },
      { time: '06:50', label: 'Invisalign & Implant Case Breakdowns' },
      { time: '09:30', label: 'Direct Calendar Booking Qualification' }
    ]
  }
];

export const CLIENT_TESTIMONIALS: ClientTestimonial[] = [
  {
    id: 'test-1',
    name: 'Dr. Marcus Vance',
    role: 'Founder & Clinical Director',
    company: 'Vance Orthodontics & Aesthetics',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=160&auto=format&fit=crop&q=80',
    rating: 5,
    quote: 'Before working with this studio, our video watch-time cratered after 30 seconds and inquiries were sparse. Within 60 days of deploying their retention-edited video system, our patient inquiries surged by 210% and our average view duration hit 68%. They are not just cutting clips—they understand conversion psychology.',
    stats: {
      beforeMetric: '22% AVD',
      afterMetric: '68.4% AVD',
      label: 'Average View Duration'
    },
    verifiedProject: 'High-Ticket Clinical Patient Funnel'
  },
  {
    id: 'test-2',
    name: 'Sarah Lin',
    role: 'Head of Growth',
    company: 'Aether HealthTech (Y Combinator S24)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
    rating: 5,
    quote: 'We spent $80k on previous agencies that gave us generic flashy edits with zero impact on CAC. Vance Editorial rebuilt our video ads pipeline. Hook rates jumped from 28% to 81%, and our Meta blended ROAS crossed 4.8x. Turnaround on revisions is reliably under 24 hours on Frame.io.',
    stats: {
      beforeMetric: '1.9x ROAS',
      afterMetric: '4.8x ROAS',
      label: 'Performance Ad Return'
    },
    verifiedProject: 'Multi-Variant Meta Ads Engine'
  },
  {
    id: 'test-3',
    name: 'Julian Thorne',
    role: 'Creator & Host',
    company: 'The Thorne Macro Report (840k Subs)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
    rating: 5,
    quote: 'YouTube rewards retention above all else. Since Alex took over my channel editing, three consecutive long-form investigative videos crossed 2 Million organic views. His sound design and dynamic pacing keep viewers glued through 20-minute financial breakdowns.',
    stats: {
      beforeMetric: '310k Avg. Views',
      afterMetric: '1.45M Avg. Views',
      label: 'Channel Average Views'
    },
    verifiedProject: 'Longform Financial Documentary Series'
  }
];

export const SYSTEM_STEPS = [
  {
    step: '01',
    title: 'Hook Retention & Narrative Deconstruction',
    tagline: 'Securing the critical first 3 seconds',
    description: 'We audit your raw footage against high-retention audience graphs. We identify the single most compelling visual and auditory hook, eliminate preamble fluff, and script pattern interrupts before the viewer can swipe away.',
    deliverable: 'Pacing script, hook variants, & audience drop-off mitigation plan'
  },
  {
    step: '02',
    title: 'High-Velocity Pacing & Micro-Cuts',
    tagline: 'Zero dead air. Relentless forward momentum',
    description: 'We apply rhythm-locked editorial cuts, match cuts, seamless J/L audio transitions, and kinetic visual framing. Every sentence is tightened while preserving natural voice and authentic speaker cadence.',
    deliverable: 'Dynamic assembly cut with calibrated frame density'
  },
  {
    step: '03',
    title: 'Hollywood Audio Design & DaVinci Color Grade',
    tagline: 'Sensory immersion that commands authority',
    description: 'Video is 60% audio. We construct multi-track spatial sound design with custom foley, sub-bass impacts, spectral voice repair, and calibrate cinematic film print emulations in DaVinci Resolve Studio.',
    deliverable: '24-bit 48kHz master audio + custom LUT & color-matched grade'
  },
  {
    step: '04',
    title: 'Omnichannel Scale & Turnaround Delivery',
    tagline: 'Production-ready assets delivered on Frame.io',
    description: 'Full-resolution master exports formatted for YouTube 16:9, vertical 9:16 reels/TikTok, and 4:5 social feeds with burnt-in animated captions, custom thumbnails, and rapid revision turnarounds.',
    deliverable: 'Master ProRes/H.265 files, metadata tags & social cutdowns'
  }
];

export const FAQ_ITEMS = [
  {
    question: 'How fast is your editing turnaround time?',
    answer: 'For short-form reels and performance ads, standard turnaround is 24 to 48 hours per batch. For YouTube long-form (10-25 mins), first rough cuts are delivered within 3 business days. Rush 24-hour turnaround is available for urgent launches.'
  },
  {
    question: 'How do we handle raw footage transfer and revisions?',
    answer: 'We use Frame.io, Google Drive, or Dropbox. You drop your raw camera files or screen captures into a shared encrypted folder. Reviewing is seamless: you can click directly on the video player in Frame.io to leave timestamped notes and drawings.'
  },
  {
    question: 'What video editing software and hardware do you use?',
    answer: 'We operate on DaVinci Resolve Studio 19 and Adobe Premiere Pro / After Effects, powered by color-calibrated ProArt OLED displays and M3 Max workstations for hardware-accelerated 4K ProRes exports.'
  },
  {
    question: 'What is your revision policy?',
    answer: 'Every project includes 2 rounds of comprehensive revisions to ensure pacing, graphics, color, and audio meet your exact standards. Additional tweaks within the original scope are handled quickly without bureaucratic delays.'
  },
  {
    question: 'Do you offer monthly retainer partnerships?',
    answer: 'Yes. Most high-growth clients prefer our dedicated monthly editor retainers (e.g., 4 YouTube long-form videos/month + 16 short-form cutdowns) which reserve guaranteed editing bandwidth and faster SLAs.'
  }
];
