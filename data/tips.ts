export interface InsuranceTip {
  id: string;
  title: string;
  body: string;
  category: string;
}

export const tips: InsuranceTip[] = [
  {
    id: 'tip-1',
    title: 'Bundle & Save',
    body: 'Bundling home and auto insurance with the same carrier can save you 5-25% on both policies.',
    category: 'Savings',
  },
  {
    id: 'tip-2',
    title: 'Review Annually',
    body: 'Insurance rates change every year. Comparing quotes annually could save you hundreds.',
    category: 'Savings',
  },
  {
    id: 'tip-3',
    title: 'Raise Your Deductible',
    body: 'Increasing your deductible from $500 to $1,000 can lower your premium by up to 25%.',
    category: 'Auto',
  },
  {
    id: 'tip-4',
    title: 'Know Your Benefits',
    body: 'Most health plans include free preventive care, telehealth, and wellness programs that go unused.',
    category: 'Health',
  },
  {
    id: 'tip-5',
    title: 'Credit Score Matters',
    body: 'In most states, a higher credit score can mean lower insurance premiums. Check your score regularly.',
    category: 'General',
  },
  {
    id: 'tip-6',
    title: 'Life Insurance Is Cheapest Young',
    body: 'Locking in a term life policy in your 20s or 30s can cost 50% less than waiting until your 40s.',
    category: 'Life',
  },
  {
    id: 'tip-7',
    title: 'Home Inventory Saves Time',
    body: 'Keep a photo inventory of your belongings. It speeds up home insurance claims dramatically.',
    category: 'Home',
  },
];
