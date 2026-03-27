import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { Text } from './Themed';
import { spacing, borderRadius } from '@/constants/Spacing';
import { typography } from '@/constants/Typography';
import Colors, { brand } from '@/constants/Colors';
import { useAppStore } from '@/store/useAppStore';

interface Props {
  amount: number;
  vertical: string;
}

export function SavingsBanner({ amount, vertical }: Props) {
  const isDark = useAppStore((s) => s.isDarkMode);
  const colors = Colors[isDark ? 'dark' : 'light'];
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[styles.banner, { backgroundColor: colors.accentLight }]}
      onPress={() => router.push('/(tabs)/compare')}
      activeOpacity={0.7}
    >
      <View style={styles.iconWrap}>
        <Ionicons name="trending-down-outline" size={24} color={brand.accent} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          You could save ${amount}/mo
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          on {vertical} insurance. Tap to compare quotes.
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(107, 203, 184, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    ...typography.bodyBold,
  },
  subtitle: {
    ...typography.caption,
    marginTop: 2,
  },
});
