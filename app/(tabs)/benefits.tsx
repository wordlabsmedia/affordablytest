import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Text } from '@/components/Themed';
import { CategoryChips } from '@/components/CategoryChips';
import { BenefitItem } from '@/components/BenefitItem';
import { benefits } from '@/data/benefits';
import { InsuranceType, insuranceConfig, insuranceTypes } from '@/constants/Insurance';
import { spacing, borderRadius } from '@/constants/Spacing';
import { typography } from '@/constants/Typography';
import Colors from '@/constants/Colors';
import { useAppStore } from '@/store/useAppStore';

export default function BenefitsScreen() {
  const isDark = useAppStore((s) => s.isDarkMode);
  const colors = Colors[isDark ? 'dark' : 'light'];
  const usedBenefits = useAppStore((s) => s.usedBenefits);
  const router = useRouter();
  const params = useLocalSearchParams<{ filter?: string }>();

  const [selectedCategory, setSelectedCategory] = useState<InsuranceType | null>(null);

  // Pick up filter from URL params (e.g., navigating from policy detail)
  useEffect(() => {
    if (params.filter && insuranceTypes.includes(params.filter as InsuranceType)) {
      setSelectedCategory(params.filter as InsuranceType);
      // Clear the param so it doesn't persist on tab switches
      router.setParams({ filter: undefined } as any);
    }
  }, [params.filter]);

  const filteredBenefits = selectedCategory
    ? benefits.filter((b) => b.policyType === selectedCategory)
    : benefits;

  const includedBenefits = filteredBenefits.filter((b) => b.category === 'included');
  const redeemableBenefits = filteredBenefits.filter((b) => b.category === 'redeemable');
  const unusedRedeemable = redeemableBenefits.filter((b) => !usedBenefits.includes(b.id));

  const filterLabel = selectedCategory
    ? insuranceConfig[selectedCategory].label
    : null;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Your Benefits</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {filterLabel
            ? `${filterLabel} insurance benefits`
            : 'Discover perks included in your plans'}
        </Text>
      </View>

      {unusedRedeemable.length > 0 && (
        <View style={[styles.alertBanner, { backgroundColor: colors.accent + '15' }]}>
          <View style={styles.alertIcon}>
            <Ionicons name="gift-outline" size={22} color={colors.accent} />
          </View>
          <View style={styles.alertContent}>
            <Text style={[styles.alertTitle, { color: colors.text }]}>
              {unusedRedeemable.length} perk{unusedRedeemable.length > 1 ? 's' : ''} to redeem
            </Text>
            <Text style={[styles.alertSub, { color: colors.textSecondary }]}>
              Sign up to unlock these benefits
            </Text>
          </View>
        </View>
      )}

      <CategoryChips selected={selectedCategory} onSelect={setSelectedCategory} />

      {/* Included Benefits */}
      {includedBenefits.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="shield-checkmark-outline" size={18} color={colors.success} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Included in Your Plan</Text>
            <View style={[styles.countBadge, { backgroundColor: colors.success + '15' }]}>
              <Text style={[styles.countText, { color: colors.success }]}>{includedBenefits.length}</Text>
            </View>
          </View>
          <Text style={[styles.sectionSub, { color: colors.textMuted }]}>
            These are automatically active with your coverage
          </Text>
          {includedBenefits.map((benefit) => (
            <BenefitItem key={benefit.id} benefit={benefit} />
          ))}
        </View>
      )}

      {/* Redeemable Benefits */}
      {redeemableBenefits.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="gift-outline" size={18} color={colors.accent} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Available to Redeem</Text>
            <View style={[styles.countBadge, { backgroundColor: colors.accent + '15' }]}>
              <Text style={[styles.countText, { color: colors.accent }]}>{redeemableBenefits.length}</Text>
            </View>
          </View>
          <Text style={[styles.sectionSub, { color: colors.textMuted }]}>
            Sign up or claim these extra perks
          </Text>
          {redeemableBenefits.map((benefit) => (
            <BenefitItem key={benefit.id} benefit={benefit} />
          ))}
        </View>
      )}

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  title: {
    ...typography.h1,
  },
  subtitle: {
    ...typography.body,
    marginTop: spacing.xs,
  },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  alertIcon: {
    marginRight: spacing.md,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    ...typography.bodyBold,
  },
  alertSub: {
    ...typography.caption,
    marginTop: 2,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sectionTitle: {
    ...typography.h3,
    flex: 1,
  },
  sectionSub: {
    ...typography.small,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  countBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    minWidth: 24,
    alignItems: 'center',
  },
  countText: {
    ...typography.captionBold,
  },
  bottomPadding: {
    height: spacing.xxl,
  },
});
