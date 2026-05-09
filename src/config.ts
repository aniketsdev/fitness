// Single source of truth for all swappable content.
// Search this file for "TODO_REPLACE" before going live.

export const COACH = {
  name: 'Shubham Rawat',
  title: 'Certified Fitness Coach',
  city: 'TODO_REPLACE_WITH_CITY',
  yearsExperience: 7,
  clientsTrained: '500+',
  successRate: '92%',
} as const;

export const WHATSAPP_CONFIG = {
  // E.164 format without the leading "+", e.g. '919876543210' for India
  number: 'TODO_REPLACE_WITH_E164_NUMBER',
  defaultMessage:
    "Hi Shubham, I'm interested in your coaching. Can we talk?",
} as const;

export const SOCIAL_LINKS = {
  instagram: 'TODO_REPLACE_WITH_INSTAGRAM_URL',
} as const;

// Placeholder images from Unsplash — swap with real photos before launch.
// All URLs use the unsplash.com CDN; no auth needed.
export const IMAGES = {
  coachPortrait:
    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=80',
  aboutPortrait:
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80',
  beforeAfter: [
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
  ],
  testimonialAvatars: [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  ],
} as const;

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Results', href: '#results' },
  { label: 'Contact', href: '#contact' },
] as const;
