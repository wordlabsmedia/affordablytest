import React from 'react';
import { StyleSheet, TouchableOpacity, Switch, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from './Themed';
import { spacing } from '@/constants/Spacing';
import { typography } from '@/constants/Typography';
import Colors, { brand } from '@/constants/Colors';
import { useAppStore } from '@/store/useAppStore';

interface Props {
  icon: string;
  label: string;
  isSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  onPress?: () => void;
}

export function SettingsRow({ icon, label, isSwitch, switchValue, onSwitchChange, onPress }: Props) {
  const isDark = useAppStore((s) => s.isDarkMode);
  const colors = Colors[isDark ? 'dark' : 'light'];

  const content = (
    <View style={[styles.row, { borderBottomColor: colors.cardBorder }]}>
      <View style={[styles.iconWrap, { backgroundColor: colors.accentLight }]}>
        <Ionicons name={icon as any} size={20} color={colors.primary} />
      </View>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      {isSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ true: brand.accent, false: colors.cardBorder }}
          thumbColor="#FFFFFF"
        />
      ) : (
        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      )}
    </View>
  );

  if (isSwitch) return <View>{content}</View>;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      {content}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  label: {
    ...typography.body,
    flex: 1,
  },
});
