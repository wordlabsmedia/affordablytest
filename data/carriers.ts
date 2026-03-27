import type { InsuranceType } from '@/constants/Insurance';

export interface CarrierQuote {
  id: string;
  type: InsuranceType;
  carrier: string;
  premium: number;
  highlights: string[];
  rating: number;
  savingsVsCurrent: number;
}

export const carrierQuotes: CarrierQuote[] = [
  // Auto
  {
    id: 'auto-q1',
    type: 'auto',
    carrier: 'GEICO',
    premium: 118,
    highlights: ['Accident forgiveness', 'Multi-vehicle discount', '24/7 claims'],
    rating: 4.5,
    savingsVsCurrent: 24,
  },
  {
    id: 'auto-q2',
    type: 'auto',
    carrier: 'State Farm',
    premium: 129,
    highlights: ['Drive Safe & Save', 'Good student discount', 'Roadside assistance'],
    rating: 4.6,
    savingsVsCurrent: 13,
  },
  {
    id: 'auto-q3',
    type: 'auto',
    carrier: 'Allstate',
    premium: 135,
    highlights: ['Drivewise rewards', 'New car replacement', 'Deductible rewards'],
    rating: 4.3,
    savingsVsCurrent: 7,
  },
  {
    id: 'auto-q4',
    type: 'auto',
    carrier: 'Liberty Mutual',
    premium: 148,
    highlights: ['Better car replacement', 'Accident forgiveness', 'Teacher discount'],
    rating: 4.2,
    savingsVsCurrent: -6,
  },
  // Home
  {
    id: 'home-q1',
    type: 'home',
    carrier: 'Lemonade',
    premium: 139,
    highlights: ['AI-powered claims', 'Zero deductible option', 'Giveback program'],
    rating: 4.4,
    savingsVsCurrent: 28,
  },
  {
    id: 'home-q2',
    type: 'home',
    carrier: 'USAA',
    premium: 148,
    highlights: ['Military discount', 'Replacement cost', 'Flood coverage'],
    rating: 4.8,
    savingsVsCurrent: 19,
  },
  {
    id: 'home-q3',
    type: 'home',
    carrier: 'Allstate',
    premium: 159,
    highlights: ['Claim-free bonus', 'Identity protection', 'Smart home discount'],
    rating: 4.3,
    savingsVsCurrent: 8,
  },
  // Health
  {
    id: 'health-q1',
    type: 'health',
    carrier: 'Blue Cross Blue Shield',
    premium: 355,
    highlights: ['Nationwide network', 'Telehealth included', 'Wellness rewards'],
    rating: 4.5,
    savingsVsCurrent: 30,
  },
  {
    id: 'health-q2',
    type: 'health',
    carrier: 'Aetna',
    premium: 369,
    highlights: ['$0 preventive care', 'Mental health coverage', 'Fitness discounts'],
    rating: 4.3,
    savingsVsCurrent: 16,
  },
  {
    id: 'health-q3',
    type: 'health',
    carrier: 'Cigna',
    premium: 378,
    highlights: ['Virtual care 24/7', 'Prescription savings', 'Global coverage'],
    rating: 4.4,
    savingsVsCurrent: 7,
  },
  // Life
  {
    id: 'life-q1',
    type: 'life',
    carrier: 'Haven Life',
    premium: 72,
    highlights: ['No medical exam', 'Online application', 'Instant decision'],
    rating: 4.6,
    savingsVsCurrent: 17,
  },
  {
    id: 'life-q2',
    type: 'life',
    carrier: 'Bestow',
    premium: 78,
    highlights: ['10-minute application', 'No hidden fees', 'Flexible terms'],
    rating: 4.5,
    savingsVsCurrent: 11,
  },
  {
    id: 'life-q3',
    type: 'life',
    carrier: 'Ladder',
    premium: 82,
    highlights: ['Adjustable coverage', 'Instant quotes', 'No cancellation fees'],
    rating: 4.4,
    savingsVsCurrent: 7,
  },
];
