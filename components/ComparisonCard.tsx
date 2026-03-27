import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { Text } from './Themed';
import type { CarrierQuote } from '@/data/carriers';
import { spacing, borderRadius } from '@/constants/Spacing';
import { typography } from '@/constants/Typography';
import Colors from '@/constants/Colors';
import { useAppStore } from '@/store/useAppStore';

interface Props {
  quote: CarrierQuote;
}

export function ComparisonCard({ quote }: Props) {
  const isDark = useAppStore((s) => s.isDarkMode);
  const colors = Colors[isDark ? 'dark' : 'light'];
  const router = useRouter();

  const hasSavings = quote.savingsVsCurrent > 0;

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
      onPress={() => router.push(`/comparison/${quote.id}`)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.carrierInfo}>
          <View style={[styles.carrierIcon, { backgroundColor: colors.accentLight }]}>
            <Ionicons name="business-outline" size={20} color={colors.primary} />
          </View>
          <View>
            <Text style={[styles.carrier, { color: colors.text }]}>{quote.carrier}</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={12} color="#F59E0B" />
              <Text style={[styles.rating, { color: colors.textMuted }]}>{quote.rating}</Text>
            </View>
          </View>
        </View>
        <View style={styles.priceSection}>
          <Text style={[styles.premium, { color: colors.text }]}>${quote.premium}</Text>
          <Text style={[styles.perMonth, { color: colors.textMuted }]}>/mo</Text>
        </View>
      </View>

      <View style={styles.highlights}>
        {quote.highlights.map((h, i) => (
          <View key={i} style={styles.highlightRow}>
            <Ionicons name="checkmark-circle" size={16} color={colors.success} />
            <Text style={[styles.highlightText, { color: colors.textSecondary }]}>{h}</Text>
          </View>
        ))}
      </View>

      {hasSavings && (
        <View style={[styles.savingsBadge, { backgroundColor: colors.success + '15' }]}>
          <Ionicons name="arrow-down-outline" size={14} color={colors.success} />
          <Text style={[styles.savingsText, { color: colors.success }]}>
            Save ${quote.savingsVsCurrent}/mo vs. your current plan
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  carrierInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  carrierIcon: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carrier: {
    ...typography.bodyBold,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  rating: {
    ...typography.small,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  premium: {
    ...typography.h2,
  },
  perMonth: {
    ...typography.caption,
    marginLeft: 2,
  },
  highlights: {
    marginTop: spacing.md,
    gap: spacing.xs,
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  highlightText: {
    ...typography.caption,
  },
  savingsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    marginTop: spacing.md,
    alignSelf: 'flex-start',
  },
  savingsText: {
    ...typography.captionBold,
  },
});
