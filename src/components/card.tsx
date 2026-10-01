import { StyleSheet, View, type ViewProps } from 'react-native';

import { useAppTheme } from '@/providers/app-theme-provider';

export function Card({ style, ...props }: ViewProps) {
  const { colors } = useAppTheme();

  return (
    <View
      {...props}
      style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }, style]}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
