import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '@/components/Themed';
import { policies } from '@/data/policies';
import { insuranceConfig } from '@/constants/Insurance';
import { spacing, borderRadius } from '@/constants/Spacing';
import { typography } from '@/constants/Typography';
import Colors, { brand } from '@/constants/Colors';
import { useAppStore } from '@/store/useAppStore';

export default function PolicyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const isDark = useAppStore((s) => s.isDarkMode);
  const colors = Colors[isDark ? 'dark' : 'light'];
  const router = useRouter();

  const policy = policies.find((p) => p.id === id);
  if (!policy) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Policy not found</Text>
      </View>
    );
  }

  const config = insuranceConfig[policy.type];
  const statusColor = policy.status === 'active' ? colors.success :
    policy.status === 'expiring_soon' ? colors.warning : colors.error;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.hero, { backgroundColor: colors.accentLight }]}>
        <View style={[styles.heroIcon, { backgroundColor: config.color + '20' }]}>
          <Ionicons name={config.icon as any} size={32} color={config.color} />
        </View>
        <Text style={[styles.heroTitle, { color: colors.text }]}>{config.label} Insurance</Text>
        <Text style={[styles.heroCarrier, { color: colors.textSecondary }]}>{policy.carrier}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusText, { color: statusColor }]}>
            {policy.status === 'active' ? 'Active' : policy.status === 'expiring_soon' ? 'Expiring Soon' : 'Expired'}
          </Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Policy Information</Text>
        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <InfoRow label="Policy Number" value={policy.policyNumber} colors={colors} />
          {policy.memberId && <InfoRow label="Member ID" value={policy.memberId} colors={colors} />}
          {policy.groupNumber && <InfoRow label="Group Number" value={policy.groupNumber} colors={colors} />}
          <InfoRow label="Monthly Premium" value={`$${policy.premium}`} colors={colors} />
          <InfoRow label="Deductible" value={`$${policy.deductible.toLocaleString()}`} colors={colors} />
          <InfoRow label="Coverage Start" value={policy.coverageStart} colors={colors} />
          <InfoRow label="Coverage End" value={policy.coverageEnd} colors={colors} />
          <InfoRow label="Next Payment" value={policy.nextPayment} colors={colors} isLast />
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Coverage Details</Text>
        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          {policy.coverageDetails.map((item, index) => (
            <InfoRow
              key={index}
              label={item.label}
              value={item.value}
              colors={colors}
              isLast={index === policy.coverageDetails.length - 1}
            />
          ))}
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/(tabs)/compare')}
        >
          <Ionicons name="swap-horizontal-outline" size={20} color="#FFFFFF" />
          <Text style={styles.primaryButtonText}>Compare Plans</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.secondaryButton, { borderColor: colors.cardBorder }]}
          onPress={() => router.push('/(tabs)/benefits')}
        >
          <Ionicons name="gift-outline" size={20} color={colors.primary} />
          <Text style={[styles.secondaryButtonText, { color: colors.primary }]}>View Benefits</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

function InfoRow({ label, value, colors, isLast = false }: {
  label: string; value: string; colors: any; isLast?: boolean;
}) {
  return (
    <View style={[styles.infoRow, !isLast && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.cardBorder }]}>
      <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{label}</Text>
      <Text style={[styles.infoValue, { color: colors.text }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  heroIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  heroTitle: {
    ...typography.h1,
  },
  heroCarrier: {
    ...typography.body,
    marginTop: spacing.xs,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    marginTop: spacing.md,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.sm,
  },
  statusText: {
    ...typography.captionBold,
  },
  infoSection: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  infoCard: {
    borderRadius: borderRadius.md,
    borderWidth: 1,
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  infoLabel: {
    ...typography.body,
  },
  infoValue: {
    ...typography.bodyBold,
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
