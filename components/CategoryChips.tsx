import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from './Themed';
import { InsuranceType, insuranceConfig, insuranceTypes } from '@/constants/Insurance';
import { spacing, borderRadius } from '@/constants/Spacing';
import { typography } from '@/constants/Typography';
import Colors from '@/constants/Colors';
import { useAppStore } from '@/store/useAppStore';

interface Props {
  selected: InsuranceType | null;
  onSelect: (type: InsuranceType | null) => void;
  showAll?: boolean;
}

export function CategoryChips({ selected, onSelect, showAll = true }: Props) {
  const isDark = useAppStore((s) => s.isDarkMode);
  const colors = Colors[isDark ? 'dark' : 'light'];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {showAll && (
        <TouchableOpacity
          style={[
            styles.chip,
            {
              backgroundColor: selected === null ? colors.primary : colors.card,
              borderColor: selected === null ? colors.primary : colors.cardBorder,
            },
          ]}
          onPress={() => onSelect(null)}
        >
          <Text
            style={[
              styles.chipText,
              { color: selected === null ? '#FFFFFF' : colors.text },
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
      )}
      {insuranceTypes.map((type) => {
        const config = insuranceConfig[type];
        const isSelected = selected === type;
        return (
          <TouchableOpacity
            key={type}
            style={[
              styles.chip,
              {
                backgroundColor: isSelected ? colors.primary : colors.card,
                borderColor: isSelected ? colors.primary : colors.cardBorder,
              },
            ]}
            onPress={() => onSelect(isSelected ? null : type)}
          >
            <Ionicons
              name={config.icon as any}
              size={16}
              color={isSelected ? '#FFFFFF' : config.color}
              style={styles.chipIcon}
            />
            <Text
              style={[
                styles.chipText,
                { color: isSelected ? '#FFFFFF' : colors.text },
              ]}
            >
              {config.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
  },
  chipIcon: {
    marginRight: spacing.xs,
  },
  chipText: {
    ...typography.captionBold,
  },
});
