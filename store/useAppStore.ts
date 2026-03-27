import { create } from 'zustand';
import type { InsuranceType } from '@/constants/Insurance';

interface AppState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  selectedCategory: InsuranceType | null;
  setSelectedCategory: (category: InsuranceType | null) => void;
  favoriteCarriers: string[];
  toggleFavoriteCarrier: (carrierId: string) => void;
  usedBenefits: string[];
  markBenefitUsed: (benefitId: string) => void;
  benefitsFilter: InsuranceType | null;
  setBenefitsFilter: (filter: InsuranceType | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  favoriteCarriers: [],
  toggleFavoriteCarrier: (carrierId) =>
    set((state) => ({
      favoriteCarriers: state.favoriteCarriers.includes(carrierId)
        ? state.favoriteCarriers.filter((id) => id !== carrierId)
        : [...state.favoriteCarriers, carrierId],
    })),

  usedBenefits: ['h-4', 'h-5', 'a-1', 'ho-3'],
  markBenefitUsed: (benefitId) =>
    set((state) => ({
      usedBenefits: state.usedBenefits.includes(benefitId)
        ? state.usedBenefits
        : [...state.usedBenefits, benefitId],
    })),

  benefitsFilter: null,
  setBenefitsFilter: (filter) => set({ benefitsFilter: filter }),
}));
