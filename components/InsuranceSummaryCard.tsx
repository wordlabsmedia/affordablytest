import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { Text } from './Themed';
import type { Policy } from '@/data/policies';
import { insuranceConfig } from '@/constants/Insurance';
import { spacing, borderRadius } from '@/constants/Spacing';
import { typography } from '@/constants/Typography';
import Colors from '@/constants/Colors';
import { useAppStore } from '@/store/useAppStore';

interface Props {
  policy: Policy;
}

export function InsuranceSummaryCard({ policy }: Props) {
  const config = insuranceConfig[policy.type];
  const isDark = useAppStore((s) => s.isDarkMode);
  const colors = Colors[isDark ? 'dark' : 'light'];
  const router = useRouter();

  const statusColor = policy.status === 'active' ? colors.success :
    policy.status === 'expiring_soon' ? colors.warning : colors.error;
  const statusLabel = policy.status === 'active' ? 'Active' :
    policy.status === 'expiring_soon' ? 'Expiring Soon' : 'Expired';

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
      onPress={() => router.push(`/policy/${policy.id}`)}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: config.lightColor }]}>
        <Ionicons name={config.icon as any} size={24} color={config.color} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.type, { color: colors.textMuted }]}>{config.label} Insurance</Text>
        <Text style={[styles.carrier, { color: colors.text }]}>{policy.carrier}</Text>
        <View style={styles.row}>
          <Text style={[styles.premium, { color: colors.text }]}>${policy.premium}</Text>
          <Text style={[styles.perMonth, { color: colors.textMuted }]}>/mo</Text>
        </View>
      </View>
      <View style={styles.right}>
        <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusText, { color: statusColor }]}>{statusLabel}</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  type: {
    ...typography.caption,
  },
  carrier: {
    ...typography.bodyBold,
    marginBottom: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  premium: {
    ...typography.h3,
  },
  perMonth: {
    ...typography.caption,
    marginLeft: 2,
  },
  right: {
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: spacing.xs,
  },
  statusText: {
    ...typography.small,
    fontWeight: '600',
  },
});
