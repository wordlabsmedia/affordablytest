import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { Text } from './Themed';
import type { Benefit } from '@/data/benefits';
import { spacing, borderRadius } from '@/constants/Spacing';
import { typography } from '@/constants/Typography';
import Colors from '@/constants/Colors';
import { useAppStore } from '@/store/useAppStore';

interface Props {
  benefit: Benefit;
}

export function BenefitItem({ benefit }: Props) {
  const isDark = useAppStore((s) => s.isDarkMode);
  const colors = Colors[isDark ? 'dark' : 'light'];
  const usedBenefits = useAppStore((s) => s.usedBenefits);
  const isUsed = usedBenefits.includes(benefit.id);
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
      onPress={() => router.push(`/benefit/${benefit.id}`)}
      activeOpacity={0.7}
    >
      <View style={styles.row}>
        <View style={[styles.iconWrap, { backgroundColor: colors.accentLight }]}>
          <Ionicons name={benefit.icon as any} size={22} color={colors.primary} />
        </View>
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>{benefit.title}</Text>
          <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={2}>
            {benefit.description}
          </Text>
        </View>
        <View style={styles.right}>
          {benefit.category === 'redeemable' && !isUsed ? (
            <View style={[styles.redeemBadge, { backgroundColor: colors.accent + '20' }]}>
              <Text style={[styles.badgeText, { color: colors.accent }]}>Redeem</Text>
            </View>
          ) : benefit.category === 'redeemable' && isUsed ? (
            <View style={[styles.redeemBadge, { backgroundColor: colors.success + '15' }]}>
              <Text style={[styles.badgeText, { color: colors.success }]}>Claimed</Text>
            </View>
          ) : null}
          <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
        </View>
      </View>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
    marginRight: spacing.sm,
  },
  title: {
    ...typography.bodyBold,
  },
  description: {
    ...typography.caption,
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  redeemBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  badgeText: {
    ...typography.small,
    fontWeight: '600',
  },
});
