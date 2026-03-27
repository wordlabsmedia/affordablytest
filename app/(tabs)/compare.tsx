import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';

import { Text } from '@/components/Themed';
import { CategoryChips } from '@/components/CategoryChips';
import { ComparisonCard } from '@/components/ComparisonCard';
import { carrierQuotes } from '@/data/carriers';
import { policies } from '@/data/policies';
import type { InsuranceType } from '@/constants/Insurance';
import { insuranceConfig } from '@/constants/Insurance';
import { spacing, borderRadius } from '@/constants/Spacing';
import { typography } from '@/constants/Typography';
import Colors from '@/constants/Colors';
import { useAppStore } from '@/store/useAppStore';

export default function CompareScreen() {
  const isDark = useAppStore((s) => s.isDarkMode);
  const colors = Colors[isDark ? 'dark' : 'light'];
  const [selectedCategory, setSelectedCategory] = useState<InsuranceType | null>(null);

  const filteredQuotes = selectedCategory
    ? carrierQuotes.filter((q) => q.type === selectedCategory)
    : carrierQuotes;

  const currentPolicy = selectedCategory
    ? policies.find((p) => p.type === selectedCategory)
    : null;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Compare Plans</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Find better rates from trusted carriers
        </Text>
      </View>

      <CategoryChips selected={selectedCategory} onSelect={setSelectedCategory} />

      {currentPolicy && (
        <View style={[styles.currentBanner, { backgroundColor: colors.accentLight }]}>
          <Text style={[styles.currentLabel, { color: colors.textSecondary }]}>
            Your current {insuranceConfig[selectedCategory!].label.toLowerCase()} insurance
          </Text>
          <View style={styles.currentRow}>
            <Text style={[styles.currentCarrier, { color: colors.text }]}>
              {currentPolicy.carrier}
            </Text>
            <Text style={[styles.currentPrice, { color: colors.text }]}>
              ${currentPolicy.premium}/mo
            </Text>
          </View>
        </View>
      )}

      <View style={styles.results}>
        <Text style={[styles.resultsCount, { color: colors.textMuted }]}>
          {filteredQuotes.length} plans found
          {filteredQuotes.filter((q) => q.savingsVsCurrent > 0).length > 0 &&
            ` \u00B7 ${filteredQuotes.filter((q) => q.savingsVsCurrent > 0).length} with savings`}
        </Text>
        {filteredQuotes
          .sort((a, b) => b.savingsVsCurrent - a.savingsVsCurrent)
          .map((quote) => (
            <ComparisonCard key={quote.id} quote={quote} />
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
  currentBanner: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
  },
  currentLabel: {
    ...typography.caption,
    marginBottom: spacing.xs,
  },
  currentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentCarrier: {
    ...typography.bodyBold,
  },
  currentPrice: {
    ...typography.h3,
  },
  results: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  resultsCount: {
    ...typography.caption,
    marginBottom: spacing.md,
  },
  bottomPadding: {
    height: spacing.xxl,
  },
});
