import type { InsuranceType } from '@/constants/Insurance';

export type BenefitCategory = 'included' | 'redeemable';

export interface Benefit {
  id: string;
  policyType: InsuranceType;
  category: BenefitCategory;
  title: string;
  description: string;
  howToUse: string;
  ctaLabel: string;
  ctaUrl: string;
  isUsed: boolean;
  icon: string;
}

export const benefits: Benefit[] = [
  // Health -- Included (automatically part of your plan)
  {
    id: 'h-5',
    policyType: 'health',
    category: 'included',
    title: '100% Preventive Care',
    description: 'Annual physicals, vaccinations, screenings, and wellness visits are covered at 100% with no copay when using in-network providers.',
    howToUse: 'Schedule your annual wellness visit with any in-network provider. No referral needed for preventive services.',
    ctaLabel: 'Find In-Network Doctors',
    ctaUrl: 'https://example.com/providers',
    isUsed: true,
    icon: 'medkit-outline',
  },
  {
    id: 'h-1',
    policyType: 'health',
    category: 'included',
    title: 'Free Telehealth Visits',
    description: 'Your United Healthcare plan includes unlimited telehealth visits at no additional cost. See a doctor from home for common illnesses, prescriptions, and follow-ups.',
    howToUse: 'Download the UHC app or visit the telehealth portal. Log in with your member ID to schedule a virtual visit.',
    ctaLabel: 'Visit Telehealth Portal',
    ctaUrl: 'https://example.com/telehealth',
    isUsed: false,
    icon: 'videocam-outline',
  },
  // Health -- Redeemable (consumer must sign up or claim)
  {
    id: 'h-2',
    policyType: 'health',
    category: 'redeemable',
    title: 'Gym & Fitness Discounts',
    description: 'Get up to $150/quarter reimbursement for gym memberships and fitness classes through the Renew Active program.',
    howToUse: 'Enroll in Renew Active through your UHC member portal. Choose from 25,000+ participating gyms and fitness locations.',
    ctaLabel: 'Find Participating Gyms',
    ctaUrl: 'https://example.com/fitness',
    isUsed: false,
    icon: 'fitness-outline',
  },
  {
    id: 'h-3',
    policyType: 'health',
    category: 'redeemable',
    title: 'Free Nutrition & Diet Program',
    description: 'Access personalized nutrition counseling and diet plans at no extra cost. Includes 6 free sessions with a registered dietitian per year.',
    howToUse: 'Call the member services number on your card to request a nutrition counseling referral. No additional copay required.',
    ctaLabel: 'Start Nutrition Program',
    ctaUrl: 'https://example.com/nutrition',
    isUsed: false,
    icon: 'nutrition-outline',
  },
  {
    id: 'h-4',
    policyType: 'health',
    category: 'redeemable',
    title: 'Mental Health App Access',
    description: 'Free premium access to Calm and Talkspace. Includes unlimited messaging therapy and monthly video sessions.',
    howToUse: 'Download Calm or Talkspace and sign up using your UHC member ID for free premium access.',
    ctaLabel: 'Activate Free Access',
    ctaUrl: 'https://example.com/mental-health',
    isUsed: true,
    icon: 'happy-outline',
  },
  // Auto -- Included
  {
    id: 'a-1',
    policyType: 'auto',
    category: 'included',
    title: '24/7 Roadside Assistance',
    description: 'Free towing up to 15 miles, jump starts, flat tire changes, lockout service, and fuel delivery included with your policy.',
    howToUse: 'Call Progressive Roadside Assistance or use the Progressive app to request help. Service is dispatched within 30 minutes.',
    ctaLabel: 'Save Emergency Number',
    ctaUrl: 'tel:+18007762778',
    isUsed: true,
    icon: 'build-outline',
  },
  {
    id: 'a-2',
    policyType: 'auto',
    category: 'included',
    title: 'Rental Car Coverage',
    description: 'Get up to $50/day for a rental car while your vehicle is being repaired after a covered claim.',
    howToUse: 'File a claim through the Progressive app. Rental coverage is automatically applied when your car is in the shop.',
    ctaLabel: 'View Rental Partners',
    ctaUrl: 'https://example.com/rental',
    isUsed: false,
    icon: 'car-sport-outline',
  },
  {
    id: 'a-3',
    policyType: 'auto',
    category: 'included',
    title: 'Accident Forgiveness',
    description: 'Your first at-fault accident won\'t raise your rates. This benefit is active after being claim-free for 3 years.',
    howToUse: 'This benefit applies automatically. If you have an at-fault accident, your rate will not increase at renewal.',
    ctaLabel: 'Check Eligibility',
    ctaUrl: 'https://example.com/forgiveness',
    isUsed: false,
    icon: 'shield-outline',
  },
  // Auto -- Redeemable
  {
    id: 'a-4',
    policyType: 'auto',
    category: 'redeemable',
    title: 'Safe Driver Discount',
    description: 'Save up to 30% with Snapshot. Plug in the device or use the app to track safe driving habits and earn discounts.',
    howToUse: 'Request a free Snapshot device from Progressive or download the app. Drive for 30 days to get your personalized rate.',
    ctaLabel: 'Get Snapshot',
    ctaUrl: 'https://example.com/snapshot',
    isUsed: false,
    icon: 'speedometer-outline',
  },
  // Home -- Included
  {
    id: 'ho-2',
    policyType: 'home',
    category: 'included',
    title: 'Equipment Breakdown Coverage',
    description: 'Covers repair or replacement of major home systems: HVAC, water heater, electrical panels, and appliances due to mechanical breakdown.',
    howToUse: 'File a claim online or call State Farm when a covered appliance or system breaks down. A $500 deductible applies.',
    ctaLabel: 'View Covered Items',
    ctaUrl: 'https://example.com/equipment',
    isUsed: false,
    icon: 'construct-outline',
  },
  {
    id: 'ho-3',
    policyType: 'home',
    category: 'included',
    title: 'Water Backup Coverage',
    description: 'Up to $10,000 coverage for damage caused by sewer, drain, or sump pump backup -- often excluded from standard policies.',
    howToUse: 'This coverage is active on your policy. File a claim through State Farm if you experience water backup damage.',
    ctaLabel: 'Learn More',
    ctaUrl: 'https://example.com/water',
    isUsed: true,
    icon: 'water-outline',
  },
  // Home -- Redeemable
  {
    id: 'ho-1',
    policyType: 'home',
    category: 'redeemable',
    title: 'Identity Theft Protection',
    description: 'Free identity theft monitoring and up to $25,000 in identity recovery coverage included with your homeowners policy.',
    howToUse: 'Activate your identity theft monitoring through the State Farm app under "Policy Benefits".',
    ctaLabel: 'Activate Monitoring',
    ctaUrl: 'https://example.com/identity',
    isUsed: false,
    icon: 'finger-print-outline',
  },
  // Life -- Included
  {
    id: 'l-1',
    policyType: 'life',
    category: 'included',
    title: 'Living Benefits',
    description: 'Access up to 75% of your death benefit early if diagnosed with a qualifying terminal, chronic, or critical illness.',
    howToUse: 'Contact Northwestern Mutual to file a living benefits claim. A qualifying medical condition and documentation are required.',
    ctaLabel: 'View Qualifying Conditions',
    ctaUrl: 'https://example.com/living-benefits',
    isUsed: false,
    icon: 'heart-circle-outline',
  },
  {
    id: 'l-3',
    policyType: 'life',
    category: 'included',
    title: 'Conversion Privilege',
    description: 'Convert your term policy to permanent life insurance without a medical exam before the conversion deadline.',
    howToUse: 'Contact your Northwestern Mutual advisor to discuss conversion options. Must convert before age 65 or end of term.',
    ctaLabel: 'Speak to Advisor',
    ctaUrl: 'https://example.com/convert',
    isUsed: false,
    icon: 'swap-horizontal-outline',
  },
  // Life -- Redeemable
  {
    id: 'l-2',
    policyType: 'life',
    category: 'redeemable',
    title: 'Policy Loan Option',
    description: 'Borrow against your policy\'s cash value at competitive interest rates. No credit check required.',
    howToUse: 'Log in to your Northwestern Mutual account and navigate to "Policy Loans". Current loan rate: 5.0% APR.',
    ctaLabel: 'Check Cash Value',
    ctaUrl: 'https://example.com/policy-loan',
    isUsed: false,
    icon: 'cash-outline',
  },
];
