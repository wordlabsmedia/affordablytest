import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '@/components/Themed';
import { CategoryChips } from '@/components/CategoryChips';
import { BenefitItem } from '@/components/BenefitItem';
import { benefits } from '@/data/benefits';
import type { InsuranceType } from '@/constants/Insurance';
import { spacing, borderRadius } from '@/constants/Spacing';
import { typography } from '@/constants/Typography';
import Colors from '@/constants/Colors';
import { useAppStore } from '@/store/useAppStore';

export default function BenefitsScreen() {
  const isDark = useAppStore((s) => s.isDarkMode);
  const colors = Colors[isDark ? 'dark' : 'light'];
  const usedBenefits = useAppStore((s) => s.usedBenefits);
  const [selectedCategory, setSelectedCategory] = useState<InsuranceType | null>(null);

  const filteredBenefits = selectedCategory
    ? benefits.filter((b) => b.policyType === selectedCategory)
    : benefits;

  const unusedCount = benefits.filter((b) => !usedBenefits.includes(b.id)).length;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Your Benefits</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Discover perks included in your plans
        </Text>
      </View>

      {unusedCount > 0 && (
        <View style={[styles.alertBanner, { backgroundColor: colors.accent + '15' }]}>
          <View style={styles.alertIcon}>
            <Ionicons name="gift-outline" size={22} color={colors.accent} />
          </View>
          <View style={styles.alertContent}>
            <Text style={[styles.alertTitle, { color: colors.text }]}>
              {unusedCount} unused benefit{unusedCount > 1 ? 's' : ''}
            </Text>
            <Text style={[styles.alertSub, { color: colors.textSecondary }]}>
              You have benefits you haven't explored yet
            </Text>
          </View>
        </View>
      )}

      <CategoryChips selected={selectedCategory} onSelect={setSelectedCategory} />

      <View style={styles.list}>
        <Text style={[styles.resultsCount, { color: colors.textMuted }]}>
          {filteredBenefits.length} benefit{filteredBenefits.length !== 1 ? 's' : ''}
        </Text>
        {filteredBenefits.map((benefit) => (
          <BenefitItem key={benefit.id} benefit={benefit} />
        ))}
      </View>

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
  list: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  resultsCount: {
    ...typography.caption,
    marginBottom: spacing.md,
  },
  bottomPadding: {
    height: spacing.xxl,
  },
});
