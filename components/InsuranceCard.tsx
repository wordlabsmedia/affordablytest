import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { Text } from './Themed';
import type { Policy } from '@/data/policies';
import { insuranceConfig } from '@/constants/Insurance';
import { spacing, borderRadius } from '@/constants/Spacing';
import { typography } from '@/constants/Typography';
import { brand } from '@/constants/Colors';

const MAX_MOBILE_WIDTH = 430;

interface Props {
  policy: Policy;
}

export function InsuranceCard({ policy }: Props) {
  const [flipped, setFlipped] = useState(false);
  const config = insuranceConfig[policy.type];
  const { width: windowWidth } = useWindowDimensions();
  const containerWidth = Math.min(windowWidth, MAX_MOBILE_WIDTH);
  const cardWidth = containerWidth - spacing.xl * 2;

  if (flipped) {
    return (
      <TouchableOpacity
        style={[styles.card, { width: cardWidth }]}
        onPress={() => setFlipped(false)}
        activeOpacity={0.95}
      >
        <LinearGradient
          colors={[brand.primary, '#2D5A4E']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.backHeader}>
            <Text style={styles.backTitle}>Coverage Details</Text>
            <Text style={styles.tapHint}>Tap to flip back</Text>
          </View>
          <View style={styles.detailsGrid}>
            {policy.coverageDetails.map((item, index) => (
              <View key={index} style={styles.detailRow}>
                <Text style={styles.detailLabel}>{item.label}</Text>
                <Text style={styles.detailValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth }]}
      onPress={() => setFlipped(true)}
      activeOpacity={0.95}
    >
      <LinearGradient
        colors={[brand.primary, '#2D5A4E']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardHeader}>
          <View style={[styles.typeIcon, { backgroundColor: config.color + '30' }]}>
            <Ionicons name={config.icon as any} size={20} color="#FFFFFF" />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.cardType}>{config.label} Insurance</Text>
            <Text style={styles.cardCarrier}>{policy.carrier}</Text>
          </View>
          <View style={styles.affordablyBadge}>
            <Text style={styles.affordablyText}>Affordably</Text>
          </View>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Policy No.</Text>
            <Text style={styles.infoValue}>{policy.policyNumber}</Text>
          </View>
          {policy.memberId && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Member ID</Text>
              <Text style={styles.infoValue}>{policy.memberId}</Text>
            </View>
          )}
          {policy.groupNumber && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Group No.</Text>
              <Text style={styles.infoValue}>{policy.groupNumber}</Text>
            </View>
          )}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Coverage</Text>
            <Text style={styles.infoValue}>
              {policy.coverageStart.slice(0, 7)} to {policy.coverageEnd.slice(0, 7)}
            </Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.tapHint}>Tap for coverage details</Text>
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumAmount}>${policy.premium}/mo</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  gradient: {
    padding: spacing.xl,
    minHeight: 220,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  headerText: {
    flex: 1,
  },
  cardType: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.7)',
  },
  cardCarrier: {
    ...typography.h3,
    color: '#FFFFFF',
  },
  affordablyBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  affordablyText: {
    ...typography.small,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
  },
  cardBody: {
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoLabel: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.6)',
  },
  infoValue: {
    ...typography.captionBold,
    color: '#FFFFFF',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  tapHint: {
    ...typography.small,
    color: 'rgba(255,255,255,0.5)',
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
  backHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  backTitle: {
    ...typography.h3,
    color: '#FFFFFF',
  },
  detailsGrid: {
    gap: spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.15)',
  },
  detailLabel: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.7)',
  },
  detailValue: {
    ...typography.captionBold,
    color: '#FFFFFF',
  },
});
