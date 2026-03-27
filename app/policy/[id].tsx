import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { Text } from '@/components/Themed';
import { BenefitItem } from '@/components/BenefitItem';
import { policies } from '@/data/policies';
import { benefits } from '@/data/benefits';
import { insuranceConfig } from '@/constants/Insurance';
import { spacing, borderRadius } from '@/constants/Spacing';
import { typography } from '@/constants/Typography';
import Colors, { brand } from '@/constants/Colors';
import { useAppStore } from '@/store/useAppStore';

export default function PolicyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const isDark = useAppStore((s) => s.isDarkMode);
  const colors = Colors[isDark ? 'dark' : 'light'];
  const setBenefitsFilter = useAppStore((s) => s.setBenefitsFilter);
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
  const statusLabel = policy.status === 'active' ? 'Active' :
    policy.status === 'expiring_soon' ? 'Expiring Soon' : 'Expired';

  const policyBenefits = benefits.filter((b) => b.policyType === policy.type);
  const includedBenefits = policyBenefits.filter((b) => b.category === 'included');
  const redeemableBenefits = policyBenefits.filter((b) => b.category === 'redeemable');

  const handleViewAllBenefits = () => {
    setBenefitsFilter(policy.type);
    router.push('/(tabs)/benefits');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Insurance Card Graphic */}
      <View style={styles.cardSection}>
        <LinearGradient
          colors={[brand.primary, '#2D5A4E']}
          style={styles.insuranceCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.cardTop}>
            <View style={[styles.typeIcon, { backgroundColor: config.color + '30' }]}>
              <Ionicons name={config.icon as any} size={22} color="#FFFFFF" />
            </View>
            <View style={styles.cardTopRight}>
              <View style={[styles.statusBadge, { backgroundColor: statusColor + '30' }]}>
                <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                <Text style={[styles.statusText, { color: statusColor }]}>{statusLabel}</Text>
              </View>
            </View>
          </View>

          <View style={styles.cardMiddle}>
            <Text style={styles.cardLabel}>{config.label} Insurance</Text>
            <Text style={styles.cardCarrier}>{policy.carrier}</Text>
          </View>

          <View style={styles.cardDetails}>
            <View style={styles.cardDetailCol}>
              <Text style={styles.cardDetailLabel}>Policy No.</Text>
              <Text style={styles.cardDetailValue}>{policy.policyNumber}</Text>
            </View>
            {policy.memberId && (
              <View style={styles.cardDetailCol}>
                <Text style={styles.cardDetailLabel}>Member ID</Text>
                <Text style={styles.cardDetailValue}>{policy.memberId}</Text>
              </View>
            )}
          </View>
          {policy.groupNumber && (
            <View style={styles.cardDetails}>
              <View style={styles.cardDetailCol}>
                <Text style={styles.cardDetailLabel}>Group No.</Text>
                <Text style={styles.cardDetailValue}>{policy.groupNumber}</Text>
              </View>
              <View style={styles.cardDetailCol}>
                <Text style={styles.cardDetailLabel}>Coverage</Text>
                <Text style={styles.cardDetailValue}>
                  {policy.coverageStart.slice(5)} — {policy.coverageEnd.slice(5)}
                </Text>
              </View>
            </View>
          )}
          {!policy.groupNumber && (
            <View style={styles.cardDetails}>
              <View style={styles.cardDetailCol}>
                <Text style={styles.cardDetailLabel}>Coverage</Text>
                <Text style={styles.cardDetailValue}>
                  {policy.coverageStart.slice(5)} — {policy.coverageEnd.slice(5)}
                </Text>
              </View>
            </View>
          )}

          <View style={styles.cardFooter}>
            <View style={styles.affordablyBadge}>
              <Text style={styles.affordablyText}>Affordably</Text>
            </View>
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumAmount}>${policy.premium}/mo</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <Text style={[styles.statValue, { color: colors.text }]}>${policy.premium}</Text>
          <Text style={[styles.statLabel, { color: colors.textMuted }]}>Monthly</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <Text style={[styles.statValue, { color: colors.text }]}>${policy.deductible.toLocaleString()}</Text>
          <Text style={[styles.statLabel, { color: colors.textMuted }]}>Deductible</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <Text style={[styles.statValue, { color: colors.text }]}>{policy.nextPayment.slice(5)}</Text>
          <Text style={[styles.statLabel, { color: colors.textMuted }]}>Next Payment</Text>
        </View>
      </View>

      {/* Included Benefits */}
      {includedBenefits.length > 0 && (
        <View style={styles.benefitsSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="shield-checkmark-outline" size={18} color={colors.success} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Included in Your Plan</Text>
            </View>
            <Text style={[styles.sectionSub, { color: colors.textMuted }]}>
              These benefits are automatically active
            </Text>
          </View>
          {includedBenefits.slice(0, 3).map((benefit) => (
            <BenefitItem key={benefit.id} benefit={benefit} />
          ))}
        </View>
      )}

      {/* Redeemable Benefits */}
      {redeemableBenefits.length > 0 && (
        <View style={styles.benefitsSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="gift-outline" size={18} color={colors.accent} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Available to Redeem</Text>
            </View>
            <Text style={[styles.sectionSub, { color: colors.textMuted }]}>
              Sign up or claim these perks
            </Text>
          </View>
          {redeemableBenefits.slice(0, 3).map((benefit) => (
            <BenefitItem key={benefit.id} benefit={benefit} />
          ))}
        </View>
      )}

      {/* View All Benefits */}
      {policyBenefits.length > 0 && (
        <TouchableOpacity
          style={[styles.viewAllButton, { borderColor: colors.cardBorder }]}
          onPress={handleViewAllBenefits}
        >
          <Ionicons name="list-outline" size={20} color={colors.primary} />
          <Text style={[styles.viewAllText, { color: colors.primary }]}>
            View All {config.label} Benefits ({policyBenefits.length})
          </Text>
          <Ionicons name="chevron-forward" size={16} color={colors.primary} />
        </TouchableOpacity>
      )}

      {/* Coverage Details */}
      <View style={styles.coverageSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Coverage Details</Text>
        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          {policy.coverageDetails.map((item, index) => (
            <View
              key={index}
              style={[
                styles.infoRow,
                index < policy.coverageDetails.length - 1 && {
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: colors.cardBorder,
                },
              ]}
            >
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{item.label}</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/(tabs)/compare')}
        >
          <Ionicons name="swap-horizontal-outline" size={20} color="#FFFFFF" />
          <Text style={styles.primaryButtonText}>Compare Plans</Text>
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
  cardSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  insuranceCard: {
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    minHeight: 200,
    justifyContent: 'space-between',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTopRight: {
    flexDirection: 'row',
    alignItems: 'center',
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
  cardMiddle: {
    marginTop: spacing.lg,
  },
  cardLabel: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.6)',
  },
  cardCarrier: {
    ...typography.h1,
    color: '#FFFFFF',
    marginTop: 2,
  },
  cardDetails: {
    flexDirection: 'row',
    marginTop: spacing.md,
    gap: spacing.xl,
  },
  cardDetailCol: {},
  cardDetailLabel: {
    ...typography.small,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 2,
  },
  cardDetailValue: {
    ...typography.captionBold,
    color: '#FFFFFF',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.15)',
  },
  affordablyBadge: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  affordablyText: {
    ...typography.small,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
  },
  premiumBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  premiumAmount: {
    ...typography.captionBold,
    color: '#FFFFFF',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  statValue: {
    ...typography.bodyBold,
  },
  statLabel: {
    ...typography.small,
    marginTop: 2,
  },
  benefitsSection: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  sectionHeader: {
    marginBottom: spacing.md,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sectionTitle: {
    ...typography.h3,
  },
  sectionSub: {
    ...typography.small,
    marginTop: spacing.xs,
    marginLeft: spacing.xl + spacing.sm,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  viewAllText: {
    ...typography.bodyBold,
  },
  coverageSection: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
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
  bottomPadding: {
    height: spacing.xxxl,
  },
});
