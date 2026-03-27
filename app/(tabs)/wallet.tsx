import React, { useRef } from 'react';
import { StyleSheet, ScrollView, View, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '@/components/Themed';
import { InsuranceCard } from '@/components/InsuranceCard';
import { policies } from '@/data/policies';
import { spacing, borderRadius } from '@/constants/Spacing';
import { typography } from '@/constants/Typography';
import Colors, { brand } from '@/constants/Colors';
import { useAppStore } from '@/store/useAppStore';

const CARD_WIDTH = Dimensions.get('window').width - spacing.xl * 2;

export default function WalletScreen() {
  const isDark = useAppStore((s) => s.isDarkMode);
  const colors = Colors[isDark ? 'dark' : 'light'];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>My Insurance</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {policies.length} active policies. Tap a card to see coverage details.
        </Text>
      </View>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardScroller}
        snapToInterval={CARD_WIDTH + spacing.md}
        decelerationRate="fast"
      >
        {policies.map((policy) => (
          <View key={policy.id} style={styles.cardWrapper}>
            <InsuranceCard policy={policy} />
          </View>
        ))}
      </ScrollView>

      <View style={styles.dotsRow}>
        {policies.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { backgroundColor: i === 0 ? colors.primary : colors.cardBorder },
            ]}
          />
        ))}
      </View>

      <View style={styles.listSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>

        <TouchableOpacity style={[styles.actionRow, { borderBottomColor: colors.cardBorder }]}>
          <View style={[styles.actionIcon, { backgroundColor: colors.accentLight }]}>
            <Ionicons name="add-circle-outline" size={22} color={colors.primary} />
          </View>
          <View style={styles.actionContent}>
            <Text style={[styles.actionTitle, { color: colors.text }]}>Add Insurance</Text>
            <Text style={[styles.actionSub, { color: colors.textSecondary }]}>
              Add another policy to your wallet
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionRow, { borderBottomColor: colors.cardBorder }]}>
          <View style={[styles.actionIcon, { backgroundColor: colors.accentLight }]}>
            <Ionicons name="share-outline" size={22} color={colors.primary} />
          </View>
          <View style={styles.actionContent}>
            <Text style={[styles.actionTitle, { color: colors.text }]}>Share Card</Text>
            <Text style={[styles.actionSub, { color: colors.textSecondary }]}>
              Send insurance info to a doctor or mechanic
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionRow, { borderBottomColor: colors.cardBorder }]}>
          <View style={[styles.actionIcon, { backgroundColor: colors.accentLight }]}>
            <Ionicons name="document-text-outline" size={22} color={colors.primary} />
          </View>
          <View style={styles.actionContent}>
            <Text style={[styles.actionTitle, { color: colors.text }]}>View Documents</Text>
            <Text style={[styles.actionSub, { color: colors.textSecondary }]}>
              Access policy documents and ID cards
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.h1,
  },
  subtitle: {
    ...typography.body,
    marginTop: spacing.xs,
  },
  cardScroller: {
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  cardWrapper: {
    marginRight: spacing.md,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  listSection: {
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    ...typography.h2,
    marginBottom: spacing.md,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    ...typography.bodyBold,
  },
  actionSub: {
    ...typography.caption,
    marginTop: 2,
  },
  bottomPadding: {
    height: spacing.xxl,
  },
});
