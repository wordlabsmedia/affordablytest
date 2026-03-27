import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Share } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '@/components/Themed';
import { carrierQuotes } from '@/data/carriers';
import { policies } from '@/data/policies';
import { insuranceConfig } from '@/constants/Insurance';
import { spacing, borderRadius } from '@/constants/Spacing';
import { typography } from '@/constants/Typography';
import Colors from '@/constants/Colors';
import { useAppStore } from '@/store/useAppStore';

export default function ComparisonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const isDark = useAppStore((s) => s.isDarkMode);
  const colors = Colors[isDark ? 'dark' : 'light'];
  const router = useRouter();

  const quote = carrierQuotes.find((q) => q.id === id);
  if (!quote) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Quote not found</Text>
      </View>
    );
  }

  const currentPolicy = policies.find((p) => p.type === quote.type);
  const config = insuranceConfig[quote.type];
  const annualSavings = quote.savingsVsCurrent * 12;

  const handleShare = async () => {
    await Share.share({
      message: `Check out ${quote.carrier} ${config.label} insurance on Affordably! $${quote.premium}/mo - could save $${quote.savingsVsCurrent}/mo vs my current plan.`,
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={[styles.carrierIcon, { backgroundColor: colors.accentLight }]}>
          <Ionicons name="business-outline" size={28} color={colors.primary} />
        </View>
        <Text style={[styles.carrier, { color: colors.text }]}>{quote.carrier}</Text>
        <Text style={[styles.type, { color: colors.textSecondary }]}>{config.label} Insurance</Text>
        <View style={styles.ratingRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Ionicons
              key={star}
              name={star <= Math.floor(quote.rating) ? 'star' : 'star-half'}
              size={18}
              color="#F59E0B"
            />
          ))}
          <Text style={[styles.ratingText, { color: colors.textMuted }]}>{quote.rating}</Text>
        </View>
      </View>

      {currentPolicy && (
        <View style={styles.comparisonSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Price Comparison</Text>
          <View style={[styles.comparisonCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <View style={styles.compareRow}>
              <View style={styles.compareItem}>
                <Text style={[styles.compareLabel, { color: colors.textMuted }]}>Current</Text>
                <Text style={[styles.compareCarrier, { color: colors.textSecondary }]}>{currentPolicy.carrier}</Text>
                <Text style={[styles.comparePrice, { color: colors.text }]}>${currentPolicy.premium}/mo</Text>
              </View>
              <View style={[styles.vsCircle, { backgroundColor: colors.accentLight }]}>
                <Text style={[styles.vsText, { color: colors.primary }]}>VS</Text>
              </View>
              <View style={[styles.compareItem, styles.compareItemRight]}>
                <Text style={[styles.compareLabel, { color: colors.textMuted }]}>New</Text>
                <Text style={[styles.compareCarrier, { color: colors.textSecondary }]}>{quote.carrier}</Text>
                <Text style={[styles.comparePrice, { color: colors.success }]}>${quote.premium}/mo</Text>
              </View>
            </View>
            {quote.savingsVsCurrent > 0 && (
              <View style={[styles.savingsRow, { backgroundColor: colors.success + '10' }]}>
                <Ionicons name="arrow-down-circle" size={20} color={colors.success} />
                <Text style={[styles.savingsText, { color: colors.success }]}>
                  Save ${quote.savingsVsCurrent}/mo (${annualSavings}/year)
                </Text>
              </View>
            )}
          </View>
        </View>
      )}

      <View style={styles.highlightsSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Plan Highlights</Text>
        {quote.highlights.map((h, i) => (
          <View key={i} style={styles.highlightRow}>
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            <Text style={[styles.highlightText, { color: colors.text }]}>{h}</Text>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={[styles.primaryButton, { backgroundColor: colors.primary }]}>
          <Ionicons name="flash-outline" size={20} color="#FFFFFF" />
          <Text style={styles.primaryButtonText}>Switch & Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.secondaryButton, { borderColor: colors.cardBorder }]}
          onPress={handleShare}
        >
          <Ionicons name="share-outline" size={20} color={colors.primary} />
          <Text style={[styles.secondaryButtonText, { color: colors.primary }]}>Share</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  carrierIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  carrier: {
    ...typography.h1,
  },
  type: {
    ...typography.body,
    marginTop: spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: spacing.sm,
  },
  ratingText: {
    ...typography.caption,
    marginLeft: spacing.sm,
  },
  comparisonSection: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  comparisonCard: {
    borderRadius: borderRadius.md,
    borderWidth: 1,
    overflow: 'hidden',
  },
  compareRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  compareItem: {
    flex: 1,
  },
  compareItemRight: {
    alignItems: 'flex-end',
  },
  compareLabel: {
    ...typography.small,
    marginBottom: 4,
  },
  compareCarrier: {
    ...typography.caption,
    marginBottom: 4,
  },
  comparePrice: {
    ...typography.h2,
  },
  vsCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: spacing.sm,
  },
  vsText: {
    ...typography.captionBold,
  },
  savingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
  },
  savingsText: {
    ...typography.bodyBold,
  },
  highlightsSection: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  highlightText: {
    ...typography.body,
  },
  actions: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
    gap: spacing.sm,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.md,
  },
  primaryButtonText: {
    ...typography.bodyBold,
    color: '#FFFFFF',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  secondaryButtonText: {
    ...typography.bodyBold,
  },
  bottomPadding: {
    height: spacing.xxxl,
  },
});
