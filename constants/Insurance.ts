import { verticalColors } from './Colors';

export type InsuranceType = 'auto' | 'home' | 'health' | 'life';

export const insuranceConfig: Record<InsuranceType, {
  label: string;
  icon: string;
  color: string;
  lightColor: string;
}> = {
  auto: {
    label: 'Auto',
    icon: 'car-outline',
    color: verticalColors.auto.main,
    lightColor: verticalColors.auto.light,
  },
  home: {
    label: 'Home',
    icon: 'home-outline',
    color: verticalColors.home.main,
    lightColor: verticalColors.home.light,
  },
  health: {
    label: 'Health',
    icon: 'heart-outline',
    color: verticalColors.health.main,
    lightColor: verticalColors.health.light,
  },
  life: {
    label: 'Life',
    icon: 'shield-checkmark-outline',
    color: verticalColors.life.main,
    lightColor: verticalColors.life.light,
  },
};

export const insuranceTypes: InsuranceType[] = ['auto', 'home', 'health', 'life'];
