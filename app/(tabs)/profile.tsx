import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '@/components/Themed';
import { SettingsRow } from '@/components/SettingsRow';
import { mockUser } from '@/data/user';
import { policies } from '@/data/policies';
import { spacing, borderRadius } from '@/constants/Spacing';
import { typography } from '@/constants/Typography';
import Colors, { brand } from '@/constants/Colors';
import { useAppStore } from '@/store/useAppStore';

export default function ProfileScreen() {
  const isDark = useAppStore((s) => s.isDarkMode);
  const toggleDarkMode = useAppStore((s) => s.toggleDarkMode);
  const colors = Colors[isDark ? 'dark' : 'light'];

  const memberSinceDate = new Date(mockUser.memberSince).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.profileSection}>
        <View style={[styles.avatar, { backgroundColor: brand.accent }]}>
          <Text style={styles.initials}>{mockUser.avatarInitials}</Text>
        </View>
        <Text style={[styles.name, { color: colors.text }]}>
          {mockUser.firstName} {mockUser.lastName}
        </Text>
        <Text style={[styles.email, { color: colors.textSecondary }]}>{mockUser.email}</Text>
        <Text style={[styles.memberSince, { color: colors.textMuted }]}>
          Member since {memberSinceDate}
        </Text>
      </View>

      <View style={[styles.savingsCard, { backgroundColor: colors.accentLight }]}>
        <View style={styles.savingsRow}>
          <View style={styles.savingsItem}>
            <Text style={[styles.savingsAmount, { color: colors.success }]}>
              ${mockUser.totalAnnualSavings}
            </Text>
            <Text style={[styles.savingsLabel, { color: colors.textSecondary }]}>
              Annual Savings
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.cardBorder }]} />
          <View style={styles.savingsItem}>
            <Text style={[styles.savingsAmount, { color: colors.text }]}>
              {policies.length}
            </Text>
            <Text style={[styles.savingsLabel, { color: colors.textSecondary }]}>
              Active Policies
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.cardBorder }]} />
          <View style={styles.savingsItem}>
            <Text style={[styles.savingsAmount, { color: colors.text }]}>
              ${policies.reduce((s, p) => s + p.premium, 0)}
            </Text>
            <Text style={[styles.savingsLabel, { color: colors.textSecondary }]}>
              Monthly Total
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.settingsSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>
        <SettingsRow
          icon="moon-outline"
          label="Dark Mode"
          isSwitch
          switchValue={isDark}
          onSwitchChange={toggleDarkMode}
        />
        <SettingsRow
          icon="notifications-outline"
          label="Notifications"
          onPress={() => {}}
        />
        <SettingsRow
          icon="lock-closed-outline"
          label="Privacy & Security"
          onPress={() => {}}
        />
      </View>

      <View style={styles.settingsSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Support</Text>
        <SettingsRow
          icon="help-circle-outline"
          label="Help & Support"
          onPress={() => {}}
        />
        <SettingsRow
          icon="star-outline"
          label="Rate Affordably"
          onPress={() => {}}
        />
        <SettingsRow
          icon="chatbubble-outline"
          label="Send Feedback"
          onPress={() => {}}
        />
      </View>

      <TouchableOpacity style={[styles.signOutButton, { borderColor: colors.error }]}>
        <Text style={[styles.signOutText, { color: colors.error }]}>Sign Out</Text>
      </TouchableOpacity>

      <Text style={[styles.version, { color: colors.textMuted }]}>Affordably v1.0.0</Text>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  initials: {
    ...typography.h1,
    color: '#FFFFFF',
  },
  name: {
    ...typography.h2,
  },
  email: {
    ...typography.body,
    marginTop: spacing.xs,
  },
  memberSince: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
  savingsCard: {
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.xl,
  },
  savingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  savingsItem: {
    flex: 1,
    alignItems: 'center',
  },
  savingsAmount: {
    ...typography.h2,
    marginBottom: 4,
  },
  savingsLabel: {
    ...typography.small,
    textAlign: 'center',
  },
  divider: {
    width: 1,
    height: 40,
  },
  settingsSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.sm,
  },
  signOutButton: {
    marginHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  signOutText: {
    ...typography.bodyBold,
  },
  version: {
    ...typography.small,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  bottomPadding: {
    height: spacing.xxl,
  },
});
