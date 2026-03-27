import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from './Themed';
import { spacing } from '@/constants/Spacing';
import { typography } from '@/constants/Typography';
import Colors, { brand } from '@/constants/Colors';
import { useAppStore } from '@/store/useAppStore';

interface Props {
  name: string;
  subtitle?: string;
}

export function MascotGreeting({ name, subtitle }: Props) {
  const isDark = useAppStore((s) => s.isDarkMode);
  const colors = Colors[isDark ? 'dark' : 'light'];

  return (
    <View style={styles.container}>
      <View style={styles.mascotCircle}>
        <View style={styles.mascotBody}>
          <View style={styles.eyeRow}>
            <View style={styles.eye} />
            <View style={styles.eye} />
          </View>
          <View style={styles.smile} />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.greeting, { color: colors.text }]}>
          Hi {name}!
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {subtitle || "Here's your insurance overview"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  mascotCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: brand.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  mascotBody: {
    alignItems: 'center',
  },
  eyeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 4,
  },
  eye: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: brand.primary,
  },
  smile: {
    width: 12,
    height: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: brand.primary,
  },
  textContainer: {
    flex: 1,
  },
  greeting: {
    ...typography.h2,
  },
  subtitle: {
    ...typography.body,
    marginTop: 2,
  },
});
