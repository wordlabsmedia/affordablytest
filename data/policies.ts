import type { InsuranceType } from '@/constants/Insurance';

export interface CoverageItem {
  label: string;
  value: string;
}

export interface Policy {
  id: string;
  type: InsuranceType;
  carrier: string;
  policyNumber: string;
  memberId?: string;
  groupNumber?: string;
  premium: number;
  deductible: number;
  coverageStart: string;
  coverageEnd: string;
  status: 'active' | 'expiring_soon' | 'expired';
  nextPayment: string;
  coverageDetails: CoverageItem[];
}

export const policies: Policy[] = [
  {
    id: 'health-1',
    type: 'health',
    carrier: 'United Healthcare',
    policyNumber: 'UHC-2025-884721',
    memberId: 'MBR-449201',
    groupNumber: 'GRP-88210',
    premium: 385,
    deductible: 1500,
    coverageStart: '2025-01-01',
    coverageEnd: '2025-12-31',
    status: 'active',
    nextPayment: '2026-04-01',
    coverageDetails: [
      { label: 'Plan Type', value: 'PPO' },
      { label: 'Deductible', value: '$1,500' },
      { label: 'Out-of-Pocket Max', value: '$6,000' },
      { label: 'Copay (Primary)', value: '$25' },
      { label: 'Copay (Specialist)', value: '$50' },
      { label: 'ER Copay', value: '$250' },
      { label: 'Prescription (Generic)', value: '$10' },
      { label: 'Prescription (Brand)', value: '$35' },
    ],
  },
  {
    id: 'auto-1',
    type: 'auto',
    carrier: 'Progressive',
    policyNumber: 'PRG-2025-331054',
    premium: 142,
    deductible: 500,
    coverageStart: '2025-03-15',
    coverageEnd: '2025-09-15',
    status: 'active',
    nextPayment: '2026-04-15',
    coverageDetails: [
      { label: 'Bodily Injury', value: '$100k/$300k' },
      { label: 'Property Damage', value: '$100k' },
      { label: 'Collision Deductible', value: '$500' },
      { label: 'Comprehensive Deductible', value: '$250' },
      { label: 'Uninsured Motorist', value: '$100k/$300k' },
      { label: 'Medical Payments', value: '$5,000' },
      { label: 'Rental Reimbursement', value: '$50/day' },
    ],
  },
  {
    id: 'home-1',
    type: 'home',
    carrier: 'State Farm',
    policyNumber: 'SF-2025-772103',
    premium: 167,
    deductible: 2500,
    coverageStart: '2025-06-01',
    coverageEnd: '2026-06-01',
    status: 'active',
    nextPayment: '2026-04-01',
    coverageDetails: [
      { label: 'Dwelling Coverage', value: '$350,000' },
      { label: 'Personal Property', value: '$175,000' },
      { label: 'Liability', value: '$300,000' },
      { label: 'Medical Payments', value: '$5,000' },
      { label: 'Deductible', value: '$2,500' },
      { label: 'Loss of Use', value: '$70,000' },
    ],
  },
  {
    id: 'life-1',
    type: 'life',
    carrier: 'Northwestern Mutual',
    policyNumber: 'NWM-2025-550891',
    premium: 89,
    deductible: 0,
    coverageStart: '2025-01-15',
    coverageEnd: '2045-01-15',
    status: 'active',
    nextPayment: '2026-04-15',
    coverageDetails: [
      { label: 'Policy Type', value: '20-Year Term' },
      { label: 'Death Benefit', value: '$500,000' },
      { label: 'Term Length', value: '20 Years' },
      { label: 'Convertible', value: 'Yes' },
      { label: 'Accelerated Death Benefit', value: 'Included' },
      { label: 'Waiver of Premium', value: 'Included' },
    ],
  },
];
