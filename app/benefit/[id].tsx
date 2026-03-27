import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Linking } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { Text } from '@/components/Themed';
import { benefits } from '@/data/benefits';
import { policies } from '@/data/policies';
import { insuranceConfig } from '@/constants/Insurance';
import { spacing, borderRadius } from '@/constants/Spacing';
import { typography } from '@/constants/Typography';
import Colors from '@/constants/Colors';
import { useAppStore } from '@/store/useAppStore';

export default function BenefitDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const isDark = useAppStore((s) => s.isDarkMode);
  const colors = Colors[isDark ? 'dark' : 'light'];
  const usedBenefits = useAppStore((s) => s.usedBenefits);
  const markBenefitUsed = useAppStore((s) => s.markBenefitUsed);

  const benefit = benefits.find((b) => b.id === id);
  if (!benefit) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Benefit not found</Text>
      </View>
    );
  }

  const config = insuranceConfig[benefit.policyType];
  const policy = policies.find((p) => p.type === benefit.policyType);
  const isUsed = usedBenefits.includes(benefit.id);

  const handleCta = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    markBenefitUsed(benefit.id);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.hero, { backgroundColor: colors.accentLight }]}>
        <View style={[styles.heroIcon, { backgroundColor: config.color + '20' }]}>
          <Ionicons name={benefit.icon as any} size={32} color={config.color} />
        </View>
        <Text style={[styles.heroTitle, { color: colors.text }]}>{benefit.title}</Text>
        <View style={styles.metaRow}>
          <View style={[styles.typeBadge, { backgroundColor: config.lightColor }]}>
            <Ionicons name={config.icon as any} size={14} color={config.color} />
            <Text style={[styles.typeText, { color: config.color }]}>{config.label}</Text>
          </View>
          {isUsed ? (
            <View style={[styles.usedBadge, { backgroundColor: colors.success + '15' }]}>
              <Ionicons name="checkmark-circle" size={14} color={colors.success} />
              <Text style={[styles.usedText, { color: colors.success }]}>Used</Text>
            </View>
          ) : (
            <View style={[styles.newBadge, { backgroundColor: colors.accent + '20' }]}>
              <Text style={[styles.newText, { color: colors.accent }]}>New</Text>
            </View>
          )}
        </View>
      </View>

      {policy && (
        <View style={[styles.policyInfo, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <Ionicons name="shield-checkmark-outline" size={18} color={colors.primary} />
          <Text style={[styles.policyText, { color: colors.textSecondary }]}>
            Included with your {policy.carrier} plan
          </Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>About This Benefit</Text>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          {benefit.description}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>How to Use It</Text>
        <View style={[styles.howToCard, { backgroundColor: colors.accentLight }]}>
          <Ionicons name="information-circle-outline" size={20} color={colors.primary} />
          <Text style={[styles.howToText, { color: colors.text }]}>{benefit.howToUse}</Text>
        </View>
      </View>

      <View style={styles.ctaSection}>
        <TouchableOpacity
          style={[styles.ctaButton, { backgroundColor: colors.primary }]}
          onPress={handleCta}
          activeOpacity={0.8}
        >
          <Text style={styles.ctaButtonText}>{benefit.ctaLabel}</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={[styles.ctaDisclaimer, { color: colors.textMuted }]}>
          You'll be directed to the provider's website
        </Text>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
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
    textAlign: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  typeText: {
    ...typography.captionBold,
  },
  usedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  usedText: {
    ...typography.captionBold,
  },
  newBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  newText: {
    ...typography.captionBold,
  },
  policyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  policyText: {
    ...typography.caption,
    flex: 1,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  description: {
    ...typography.body,
    lineHeight: 24,
  },
  howToCard: {
    flexDirection: 'row',
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    gap: spacing.md,
  },
  howToText: {
    ...typography.body,
    flex: 1,
    lineHeight: 22,
  },
  ctaSection: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.md,
    width: '100%',
  },
  ctaButtonText: {
    ...typography.bodyBold,
    color: '#FFFFFF',
  },
  ctaDisclaimer: {
    ...typography.small,
    marginTop: spacing.sm,
  },
  bottomPadding: {
    height: spacing.xxxl,
  },
});
