import React, { useState, useCallback } from 'react';
import { StyleSheet, ScrollView, RefreshControl, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '@/components/Themed';
import { MascotGreeting } from '@/components/MascotGreeting';
import { InsuranceSummaryCard } from '@/components/InsuranceSummaryCard';
import { SavingsBanner } from '@/components/SavingsBanner';
import { policies } from '@/data/policies';
import { tips } from '@/data/tips';
import { mockUser } from '@/data/user';
import { spacing, borderRadius } from '@/constants/Spacing';
import { typography } from '@/constants/Typography';
import Colors, { brand } from '@/constants/Colors';
import { useAppStore } from '@/store/useAppStore';

export default function HomeScreen() {
  const isDark = useAppStore((s) => s.isDarkMode);
  const colors = Colors[isDark ? 'dark' : 'light'];
  const [refreshing, setRefreshing] = useState(false);

  const todayTip = tips[Math.floor(Date.now() / 86400000) % tips.length];
  const totalMonthly = policies.reduce((sum, p) => sum + p.premium, 0);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
      }
    >
      <MascotGreeting name={mockUser.firstName} />

      <View style={[styles.totalCard, { backgroundColor: colors.accentLight }]}>
        <View style={styles.totalRow}>
          <View>
            <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>Monthly Total</Text>
            <Text style={[styles.totalAmount, { color: colors.text }]}>${totalMonthly}</Text>
          </View>
          <View style={styles.totalRight}>
            <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>Policies</Text>
            <Text style={[styles.totalAmount, { color: colors.text }]}>{policies.length}</Text>
          </View>
          <View>
            <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>Annual Savings</Text>
            <Text style={[styles.totalAmount, { color: colors.success }]}>${mockUser.totalAnnualSavings}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <SavingsBanner amount={47} vertical="auto" />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Policies</Text>
        {policies.map((policy) => (
          <InsuranceSummaryCard key={policy.id} policy={policy} />
        ))}
      </View>

      <View style={[styles.tipCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
        <View style={styles.tipHeader}>
          <Ionicons name="bulb-outline" size={20} color={brand.accent} />
          <Text style={[styles.tipTitle, { color: colors.text }]}>Tip of the Day</Text>
          <View style={[styles.tipBadge, { backgroundColor: colors.accentLight }]}>
            <Text style={[styles.tipBadgeText, { color: colors.primary }]}>{todayTip.category}</Text>
          </View>
        </View>
        <Text style={[styles.tipHeadline, { color: colors.text }]}>{todayTip.title}</Text>
        <Text style={[styles.tipBody, { color: colors.textSecondary }]}>{todayTip.body}</Text>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  totalCard: {
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    ...typography.caption,
    marginBottom: 4,
  },
  totalAmount: {
    ...typography.h2,
  },
  totalRight: {
    alignItems: 'center',
  },
  section: {
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    ...typography.h2,
    marginBottom: spacing.md,
  },
  tipCard: {
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginTop: spacing.lg,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  tipTitle: {
    ...typography.captionBold,
    flex: 1,
  },
  tipBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  tipBadgeText: {
    ...typography.small,
    fontWeight: '600',
  },
  tipHeadline: {
    ...typography.bodyBold,
    marginBottom: 4,
  },
  tipBody: {
    ...typography.body,
  },
  bottomPadding: {
    height: spacing.xxl,
  },
});
