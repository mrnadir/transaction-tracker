import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '@/providers/app-theme-provider';

type ScreenHeaderProps = {
  title: string;
  subtitle: string;
  leading?: ReactNode;
  trailing?: ReactNode;
};

export function ScreenHeader({ title, subtitle, leading, trailing }: ScreenHeaderProps) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.row}>
      {leading}
      <View style={styles.titles}>
        <Text style={[styles.title, { color: colors.text }]} accessibilityRole="header">
          {title}
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
      </View>
      {trailing}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  titles: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 14,
  },
});
